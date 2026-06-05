import type { EventStatus, Severity } from '../types/security'
import { formatLabel } from '../utils/format'

export function SeverityBadge({ severity }: { severity: Severity }) {
  return <span className={`badge severity-${severity}`}>{formatLabel(severity)}</span>
}

export function StatusBadge({ status }: { status: EventStatus }) {
  return <span className={`badge status-${status}`}>{formatLabel(status)}</span>
}
