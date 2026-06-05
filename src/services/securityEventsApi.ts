import { mockEvents } from '../data/securityData'
import type { EventStatus, SecurityEvent } from '../types/security'

const STORAGE_KEY = 'sathisoc-lite-events'
const NOTES_KEY = 'sathisoc-lite-notes'

export type NotesByEvent = Record<string, string>

// Replace these local mock helpers with fetch calls when connecting a real backend API.
// Suggested endpoints:
// GET /api/security-events
// PATCH /api/security-events/:id/status
// PATCH /api/security-events/:id/notes
export async function listSecurityEvents(): Promise<SecurityEvent[]> {
  const storedEvents = window.localStorage.getItem(STORAGE_KEY)
  return storedEvents ? JSON.parse(storedEvents) as SecurityEvent[] : mockEvents
}

export function saveSecurityEvents(events: SecurityEvent[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(events))
}

export function updateEventStatus(events: SecurityEvent[], eventId: string, status: EventStatus) {
  const resolutionReason = status === 'resolved'
    ? 'Resolved by analyst review.'
    : status === 'false_positive'
      ? 'Closed as false positive after validation.'
      : undefined

  return events.map((event) =>
    event.id === eventId
      ? {
          ...event,
          status,
          lastUpdated: new Date().toISOString(),
          resolutionReason: resolutionReason ?? event.resolutionReason,
        }
      : event,
  )
}

export function loadAnalystNotes(): NotesByEvent {
  const storedNotes = window.localStorage.getItem(NOTES_KEY)
  return storedNotes
    ? JSON.parse(storedNotes) as NotesByEvent
    : { 'evt-1001': 'Initial review: monitor source IP and verify account owner activity.' }
}

export function saveAnalystNotes(notes: NotesByEvent) {
  window.localStorage.setItem(NOTES_KEY, JSON.stringify(notes))
}
