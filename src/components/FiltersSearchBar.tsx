import type { EventStatus, Severity } from '../types/security'
import type { SeverityFilter, StatusFilter } from '../types/ui'
import { formatLabel, severityOrder, statusOptions } from '../utils/format'

export function FiltersSearchBar({
  query,
  severity,
  status,
  onQueryChange,
  onSeverityChange,
  onStatusChange,
}: {
  query: string
  severity: SeverityFilter
  status: StatusFilter
  onQueryChange: (value: string) => void
  onSeverityChange: (value: SeverityFilter) => void
  onStatusChange: (value: StatusFilter) => void
}) {
  return (
    <section className="filters" aria-label="Security event filters">
      <label className="search-box">
        <span>Search events</span>
        <input
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="IP, user, event type, status..."
        />
      </label>
      <label>
        <span>Severity</span>
        <select value={severity} onChange={(event) => onSeverityChange(event.target.value as Severity | 'all')}>
          <option value="all">All severities</option>
          {severityOrder.map((item) => (
            <option key={item} value={item}>{formatLabel(item)}</option>
          ))}
        </select>
      </label>
      <label>
        <span>Status</span>
        <select value={status} onChange={(event) => onStatusChange(event.target.value as EventStatus | 'all')}>
          <option value="all">All statuses</option>
          {statusOptions.map((item) => (
            <option key={item} value={item}>{formatLabel(item)}</option>
          ))}
        </select>
      </label>
    </section>
  )
}
