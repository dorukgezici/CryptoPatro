{{- define "cryptopatro.fullname" -}}
{{- .Release.Name | trunc 63 | trimSuffix "-" -}}
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
