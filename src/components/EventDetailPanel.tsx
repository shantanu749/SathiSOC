import type { EventStatus, SecurityEvent } from '../types/security'
import { exportIncidentMarkdown } from '../services/exportService'
import { formatDateTime, formatLabel } from '../utils/format'
import { SeverityBadge, StatusBadge } from './Badges'
import { AnalystNotes } from './AnalystNotes'

export function EventDetailPanel({
  event,
  notes,
  onNotesChange,
  onStatusChange,
}: {
  event: SecurityEvent
  notes: string
  onNotesChange: (value: string) => void
  onStatusChange: (status: EventStatus) => void
}) {
  return (
    <aside className="panel detail-panel">
      <div className="panel-heading">
        <div>
          <span className="eyebrow">{event.id}</span>
          <h2>Event Detail</h2>
        </div>
        <SeverityBadge severity={event.severity} />
      </div>

      <div className="detail-stack">
        <div>
          <h3>{event.summary}</h3>
          <p>{formatLabel(event.eventType)} detected for <strong>{event.actor}</strong>.</p>
        </div>
        <dl className="detail-grid">
          <div><dt>Status</dt><dd><StatusBadge status={event.status} /></dd></div>
          <div><dt>Assigned To</dt><dd>{event.assignedTo}</dd></div>
          <div><dt>Category</dt><dd>{formatLabel(event.category)}</dd></div>
          <div><dt>Source</dt><dd>{formatLabel(event.source)}</dd></div>
          <div><dt>IP Address</dt><dd>{event.ipAddress}</dd></div>
          <div><dt>Risk Score</dt><dd>{event.riskScore} / 100</dd></div>
          <div><dt>Confidence</dt><dd>{event.confidence}%</dd></div>
          <div><dt>Last Updated</dt><dd>{formatDateTime(event.lastUpdated)}</dd></div>
          <div className="wide-detail"><dt>User Agent</dt><dd>{event.userAgent}</dd></div>
        </dl>
        <div>
          <h4>Evidence</h4>
          <ul className="evidence-list">
            {event.evidence.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
        <div className="recommendation">
          <h4>Recommended Action</h4>
          <p>{event.recommendation}</p>
        </div>
        {event.resolutionReason && (
          <div className="resolution">
            <h4>Resolution Reason</h4>
            <p>{event.resolutionReason}</p>
          </div>
        )}
        <AnalystNotes notes={notes} onChange={onNotesChange} />
        <div className="action-row">
          <button type="button" onClick={() => onStatusChange('reviewing')}>Mark Reviewing</button>
          <button type="button" className="primary" onClick={() => onStatusChange('resolved')}>Resolve</button>
          <button type="button" onClick={() => onStatusChange('false_positive')}>False Positive</button>
        </div>
        <button type="button" className="wide-action" onClick={() => exportIncidentMarkdown(event, notes)}>
          Export Incident Summary
        </button>
      </div>
    </aside>
  )
}
