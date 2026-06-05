import type { SecurityEvent } from '../types/security'
import { formatDateTime, formatLabel } from '../utils/format'
import { SeverityBadge, StatusBadge } from './Badges'

export function EventFeed({
  events,
  selectedEventId,
  onSelectEvent,
}: {
  events: SecurityEvent[]
  selectedEventId: string
  onSelectEvent: (event: SecurityEvent) => void
}) {
  return (
    <section className="panel event-feed" id="events">
      <div className="panel-heading">
        <div>
          <span className="eyebrow">Live Queue</span>
          <h2>Security Event Feed</h2>
        </div>
        <span className="queue-count">{events.length} visible</span>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Event</th>
              <th>Source</th>
              <th>Risk</th>
              <th>Severity</th>
              <th>Status</th>
              <th>Observed</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr
                key={event.id}
                className={event.id === selectedEventId ? 'selected' : ''}
                onClick={() => onSelectEvent(event)}
              >
                <td>
                  <button type="button" onClick={() => onSelectEvent(event)}>
                    <strong>{event.summary}</strong>
                    <span>{formatLabel(event.eventType)} | {event.actor}</span>
                  </button>
                </td>
                <td>
                  <strong className="mono-cell">{event.ipAddress}</strong>
                  <span className="subtle-cell">{formatLabel(event.source)}</span>
                </td>
                <td>{event.riskScore}</td>
                <td><SeverityBadge severity={event.severity} /></td>
                <td><StatusBadge status={event.status} /></td>
                <td>{formatDateTime(event.timestamp)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {events.length === 0 && (
        <div className="empty-state">
          <strong>No matching events</strong>
          <p>Adjust search or filters to return events to the queue.</p>
        </div>
      )}
    </section>
  )
}
