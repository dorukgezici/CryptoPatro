# Production chart

The existing Argo CD application `cryptopatro` in namespace `argocd` reads this directory from `https://github.com/dorukgezici/CryptoPatro`, target revision `HEAD`, and renders resources into namespace `default`. Argo CD owns the deployment; there is no Helm release to upgrade. The application has automatic sync, pruning, and self-healing enabled. A change to its tracked revision can deploy immediately.

The chart keeps the existing Deployment, Service, Ingress and ServiceAccount names, plus the Deployment's immutable selector labels. The existing Service port `8000` now targets the frontend's named `http` port `4321`. The ingress remains `cryptopatro.pub.gezici.me`, class `traefik`, certificate secret `cryptopatro-tls`, and certificate issuer `cloudflare`.

## Runtime and storage

One pod runs two containers:

- Astro listens on `0.0.0.0:4321` and proxies `/api` to `http://127.0.0.1:8000`. Its readiness and liveness probes exercise that route.
- FastAPI listens only on the pod's loopback interface, with one Uvicorn worker. Its exec probes request `/api/health` locally. It cannot be reached through the Service or pod IP.

Only the backend mounts the `cryptopatro-data` PVC at `/app/data`. The claim requests `1Gi` from storage class `longhorn`, using `ReadWriteOnce`. The backend runs as UID/GID `10001`, the frontend as UID/GID `1000`, and pod `fsGroup: 10001` makes the volume writable without a privileged ownership init container. Neither container receives a Kubernetes API token, and neither imports the legacy `cryptopatro` Secret.

The PVC has Argo CD `Prune=false,Delete=false` and Helm `resource-policy: keep` annotations. These protect against GitOps pruning and application deletion; they do not provide a backup or protect against an explicit operator deletion. Keep the claim name stable. A rollback to the legacy chart leaves the new claim retained and may leave Argo reporting an intentionally unpruned resource.

The Deployment always uses one replica and `Recreate`. Each rollout briefly interrupts service while the previous pod exits and the new one starts. This avoids rolling-update overlap of SQLite writers and process-local rate limiters. Do not add an HPA or manually scale the Deployment. Both containers request `100m` CPU and `128Mi` memory, with limits of one CPU and `512Mi` each. These are starting allocations for a small personal service, including Sharp image rendering and Python imports, not load-test results. Observe memory and latency before adjusting them.

The NetworkPolicy accepts TCP `4321` only from pods with both Traefik labels in namespace `kube-system`. Egress remains available for DNS, market data and optional AI calls. Kubernetes node-origin traffic and other additive NetworkPolicies can affect this boundary. Verify that the cluster network plugin enforces policy and that no other policy broadly allows access to these pods.

## Image and proxy preparation

Both release images are published and pinned in `values.yaml`. The tags identify application source commit `77048531fbdd96400ecf519b6ac3d7f5104dafcb`; chart commit `05f4a20` records the verified pins. Both images target `linux/arm64`, matching the cluster nodes.

| Container | Repository | Pinned digest |
| --- | --- | --- |
| Backend | `dorukgezici/cryptopatro` | `sha256:51683b5bd5b264cbb53ac3b9718ebb7cd48e94270cacd121d5e07fe816a6b50a` |
| Frontend | `dorukgezici/cryptopatro` | `sha256:a79a92456ee4fa8d3efff8c7d015e11963e3d615cf90bb088a553714dd249f32` |

A nonempty digest renders `repository@sha256:...` and takes precedence over the tag. With an empty digest, the chart uses `repository:tag`; use an immutable release tag in that case. For a later release, publish platform-compatible images and update both digest pins after verification. Do not reuse the legacy `latest` image for either new container.

`frontend.publicSiteUrl` is already set to `https://cryptopatro.pub.gezici.me`, and the published frontend was built for that origin. A different deployment origin requires a frontend build with matching Astro `security.allowedDomains` configuration. That setting is part of the built server; changing only the runtime public URL does not update proxy trust. Traefik must remove caller-supplied forwarding headers unless they came from an explicitly trusted upstream. Astro uses the first forwarded address once the host is allowed, so a hostname allowlist alone does not authenticate the proxy.

The current public DNS points directly at the ingress, with no Cloudflare proxy in front. The isolated cluster preview confirmed that caller-forged forwarded addresses are ignored and the HTTPS scheme and host are correct, but the real public client address is not preserved. This is a remaining cutover condition: otherwise separate visitors can share an IP rate-limit bucket. Production still serves the legacy application. Resolve and recheck the actual ingress path before promotion; a Service with `externalTrafficPolicy: Cluster` can source-NAT traffic. Do not enable unrestricted forwarded-header trust to compensate for lost client addresses. [The verification report](../../docs/verification.md) separates preview evidence from production status.

Optional AI is disabled by default. To enable it, set `backend.ai.model` to a valid `openai:MODEL_ID`, `backend.ai.existingSecret` to a separately managed Secret in namespace `default`, and `backend.ai.apiKeyKey` to its OpenAI key entry. The chart requires the Secret name when a model is configured and only then emits a `secretKeyRef`. It does not create or print credentials. Local portfolio summaries work without those settings.

## Review before sync

```sh
helm lint backend/helm
helm template cryptopatro backend/helm --namespace default > /tmp/cryptopatro-rendered.yaml
kubectl -n default get deployment cryptopatro -o jsonpath='{.spec.selector.matchLabels}'
kubectl get storageclass longhorn
kubectl -n kube-system get pods -l app.kubernetes.io/name=traefik --show-labels
kubectl get namespace kube-system --show-labels
kubectl -n default get networkpolicy
argocd app diff cryptopatro
```

Check image platform compatibility with the actual cluster nodes. Preserve the previous Git revision and image tag, and leave the legacy PostgreSQL database, RabbitMQ and Secret unchanged. The new SQLite application does not migrate or consume old Django records. Rollback to the legacy application therefore restores its previous database view rather than importing new portfolio data.

## SQLite backup

Use SQLite's online backup API while the backend is running. Copying only the live `.sqlite3` file can omit committed data still in its WAL file. The following command streams a consistent snapshot into a private local file without requiring `tar` in the container:

```sh
umask 077
cryptopatro_backup="cryptopatro-$(date -u +%Y%m%dT%H%M%SZ).sqlite3"
kubectl exec -i -n default deployment/cryptopatro -c backend -- python - <<'PY' > "$cryptopatro_backup"
import os
import sqlite3
import sys
import tempfile
from pathlib import Path

source_path = Path(os.environ['CRYPTOPATRO_DATABASE_PATH'])
with tempfile.TemporaryDirectory(prefix='cryptopatro-backup-') as directory:
    snapshot = Path(directory) / 'snapshot.sqlite3'
    with sqlite3.connect(source_path.resolve().as_uri() + '?mode=ro', uri=True) as source:
        with sqlite3.connect(snapshot) as destination:
            source.backup(destination)
            if destination.execute('PRAGMA integrity_check').fetchone()[0] != 'ok':
                raise RuntimeError('Snapshot integrity check failed')
    with snapshot.open('rb') as stream:
        while chunk := stream.read(1024 * 1024):
            sys.stdout.buffer.write(chunk)
PY
```

Check the command's exit status and verify the downloaded snapshot locally before retaining it:

```sh
python3 - "$cryptopatro_backup" <<'PY'
import sqlite3
import sys
from pathlib import Path

path = Path(sys.argv[1]).resolve()
assert path.stat().st_size > 0, 'Backup is empty'
with sqlite3.connect(path.as_uri() + '?mode=ro', uri=True) as db:
    assert db.execute('PRAGMA integrity_check').fetchone()[0] == 'ok'
print('Backup integrity verified')
PY
```

Take a snapshot before every application or schema change, and arrange a regular encrypted copy outside the cluster. A Longhorn snapshot on the same storage system is useful but is not an independent backup. Backups contain private holdings and token hashes; restrict access to them.

## Rollback and restore

Use a reviewed Git revert or image-tag change in the Argo source as the normal rollback. `kubectl rollout undo` is temporary while Argo self-healing remains enabled. Schema version 2 is checked at startup; a future older image may refuse a newer database. Keep each pre-upgrade snapshot with its corresponding Git revision and image tags.

For an emergency application rollback that needs inspection first, disable automated reconciliation, then select and sync the reviewed previous Git revision:

```sh
argocd app set cryptopatro --sync-policy none
argocd app history cryptopatro
argocd app diff cryptopatro --revision PREVIOUS_GIT_REVISION
argocd app sync cryptopatro --revision PREVIOUS_GIT_REVISION
kubectl -n default rollout status deployment/cryptopatro --timeout=300s
```

Make the same rollback in Git before re-enabling automatic sync, or the original `HEAD` revision will be reapplied. Restore the prior policy only after Git contains the desired state:

```sh
argocd app set cryptopatro --sync-policy automated --auto-prune --self-heal
```

A database restore is a separate operation. First preserve a fresh snapshot of the current database and stop reconciliation and the application. Mount `cryptopatro-data` in a temporary maintenance pod as UID/GID/fsGroup `10001`; it must be the only pod accessing the claim. Validate the selected backup, copy it to a new file on the volume, then replace `cryptopatro.sqlite3` and remove the obsolete `-wal` and `-shm` files while no application connection is open. Remove the maintenance pod before restoring the single application replica. Verify health, private holdings and share URLs before resuming Argo reconciliation. Do not delete the PVC as a restore method.

Official references: [Argo sync options](https://argo-cd.readthedocs.io/en/stable/user-guide/sync-options/), [Kubernetes NetworkPolicies](https://kubernetes.io/docs/concepts/services-networking/network-policies/), [Python SQLite online backup](https://docs.python.org/3.15/library/sqlite3.html#sqlite3.Connection.backup).
