{{- define "cryptopatro.fullname" -}}
{{- .Release.Name | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{/* A registry digest takes precedence over the human-readable release tag. */}}
{{- define "cryptopatro.image" -}}
{{- $repository := required "image.repository is required" .repository -}}
{{- if .digest -}}
{{- if not (regexMatch "^sha256:[a-f0-9]{64}$" .digest) -}}
{{- fail "image.digest must be sha256 followed by 64 lowercase hexadecimal characters" -}}
{{- end -}}
{{- printf "%s@%s" $repository .digest -}}
{{- else -}}
{{- printf "%s:%s" $repository (required "image.tag is required when image.digest is empty" .tag) -}}
{{- end -}}
{{- end -}}

{{/* These two labels are the existing Deployment's immutable selector. */}}
{{- define "cryptopatro.selectorLabels" -}}
app.kubernetes.io/name: cryptopatro
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end -}}

{{- define "cryptopatro.labels" -}}
app: cryptopatro
helm.sh/chart: {{ printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | quote }}
{{ include "cryptopatro.selectorLabels" . }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end -}}
