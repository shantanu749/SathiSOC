import { useEffect, useMemo, useState } from 'react'
import { DetectionRulesPanel } from './components/DetectionRulesPanel'
import { EventDetailPanel } from './components/EventDetailPanel'
import { EventFeed } from './components/EventFeed'
import { FiltersSearchBar } from './components/FiltersSearchBar'
import { MetricCard } from './components/MetricCard'
import { Sidebar } from './components/Sidebar'
import { TriagePlaybook } from './components/TriagePlaybook'
import { exportEventsCsv } from './services/exportService'
import {
  listSecurityEvents,
  loadAnalystNotes,
  saveAnalystNotes,
  saveSecurityEvents,
  updateEventStatus,
  type NotesByEvent,
} from './services/securityEventsApi'
import type { EventStatus, SecurityEvent } from './types/security'
import type { SeverityFilter, StatusFilter } from './types/ui'
import { formatLabel } from './utils/format'

function App() {
  const [events, setEvents] = useState<SecurityEvent[]>([])
  const [query, setQuery] = useState('')
  const [severity, setSeverity] = useState<SeverityFilter>('all')
  const [status, setStatus] = useState<StatusFilter>('all')
  const [selectedEventId, setSelectedEventId] = useState('')
  const [notesByEvent, setNotesByEvent] = useState<NotesByEvent>({})
  const [isLoading, setIsLoading] = useState(true)
  const [toast, setToast] = useState('')

  useEffect(() => {
    async function loadEvents() {
      try {
        const loadedEvents = await listSecurityEvents()
        setEvents(loadedEvents)
        setSelectedEventId(loadedEvents[0]?.id ?? '')
        setNotesByEvent(loadAnalystNotes())
      } finally {
        setIsLoading(false)
      }
    }

    void loadEvents()
  }, [])

  useEffect(() => {
    if (!isLoading) {
      saveSecurityEvents(events)
    }
  }, [events, isLoading])

  useEffect(() => {
    if (!isLoading) {
      saveAnalystNotes(notesByEvent)
    }
  }, [notesByEvent, isLoading])

  const filteredEvents = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return events.filter((event) => {
      const searchableValues = [
        event.ipAddress,
        event.actor,
        event.assignedTo,
        event.eventType,
        event.category,
        event.source,
        event.status,
        event.summary,
      ]
      const matchesQuery = normalizedQuery.length === 0
        || searchableValues.some((value) => value.toLowerCase().includes(normalizedQuery))
      const matchesSeverity = severity === 'all' || event.severity === severity
      const matchesStatus = status === 'all' || event.status === status

      return matchesQuery && matchesSeverity && matchesStatus
    })
  }, [events, query, severity, status])

  const selectedEvent = events.find((event) => event.id === selectedEventId) ?? filteredEvents[0] ?? events[0]

  const metrics = useMemo(() => {
    const openAlerts = events.filter((event) => !['resolved', 'false_positive'].includes(event.status)).length
    const highSeverity = events.filter((event) => ['high', 'critical'].includes(event.severity)).length
    const uniqueIps = new Set(events.map((event) => event.ipAddress)).size
    const averageRisk = events.length
      ? Math.round(events.reduce((total, event) => total + event.riskScore, 0) / events.length)
      : 0

    return { total: events.length, openAlerts, highSeverity, uniqueIps, averageRisk }
  }, [events])

  function showToast(message: string) {
    setToast(message)
    window.setTimeout(() => setToast(''), 2600)
  }

  function updateSelectedStatus(nextStatus: EventStatus) {
    if (!selectedEvent) {
      return
    }

    setEvents((currentEvents) => updateEventStatus(currentEvents, selectedEvent.id, nextStatus))
    showToast(`Event marked ${formatLabel(nextStatus)}.`)
  }

  if (isLoading) {
    return (
      <div className="loading-screen">
        <strong>SathiSOC Lite</strong>
        <p>Loading security workspace...</p>
      </div>
    )
  }

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-content">
        <header className="topbar" id="overview">
          <div>
            <span className="eyebrow">Security Monitoring for Small Teams</span>
            <h1>SathiSOC Lite</h1>
            <p>
              Lightweight SOC visibility for suspicious website activity, starter detections,
              and repeatable analyst triage.
            </p>
          </div>
          <div className="topbar-actions">
            <button type="button" onClick={() => exportEventsCsv(filteredEvents)}>Export CSV</button>
            <div className="environment-pill">Dark theme | Mock data | Vercel-ready</div>
          </div>
        </header>

        <section className="metrics-grid" aria-label="Dashboard overview metrics">
          <MetricCard label="Total Events" value={metrics.total} detail="Tracked across login, API, signup, and abuse signals" tone="calm" />
          <MetricCard label="Open Alerts" value={metrics.openAlerts} detail="New or currently under review" tone="warning" />
          <MetricCard label="High Severity" value={metrics.highSeverity} detail="High and critical events needing priority triage" tone="alert" />
          <MetricCard label="Avg Risk Score" value={metrics.averageRisk} detail={`${metrics.uniqueIps} unique source IPs observed`} />
        </section>

        <FiltersSearchBar
          query={query}
          severity={severity}
          status={status}
          onQueryChange={setQuery}
          onSeverityChange={setSeverity}
          onStatusChange={setStatus}
        />

        {selectedEvent ? (
          <div className="workbench-grid">
            <EventFeed
              events={filteredEvents}
              selectedEventId={selectedEvent.id}
              onSelectEvent={(event) => setSelectedEventId(event.id)}
            />
            <EventDetailPanel
              event={selectedEvent}
              notes={notesByEvent[selectedEvent.id] ?? ''}
              onNotesChange={(value) => setNotesByEvent((current) => ({ ...current, [selectedEvent.id]: value }))}
              onStatusChange={updateSelectedStatus}
            />
          </div>
        ) : (
          <section className="panel empty-state">
            <strong>No events available</strong>
            <p>Connect a backend or restore the mock dataset to populate the queue.</p>
          </section>
        )}

        <div className="knowledge-grid">
          <DetectionRulesPanel />
          <TriagePlaybook />
        </div>
      </main>
      {toast && <div className="toast" role="status">{toast}</div>}
    </div>
  )
}

export default App
