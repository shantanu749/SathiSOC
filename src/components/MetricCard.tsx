import type { MetricTone } from '../types/ui'

export function MetricCard({
  label,
  value,
  detail,
  tone,
}: {
  label: string
  value: string | number
  detail: string
  tone?: MetricTone
}) {
  return (
    <article className={`metric-card ${tone ?? ''}`}>
      <span>{label}</span>
      <strong>{value}</strong>
      <p>{detail}</p>
    </article>
  )
}
