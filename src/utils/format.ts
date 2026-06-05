import type { EventStatus, Severity } from '../types/security'

export const severityOrder: Severity[] = ['critical', 'high', 'medium', 'low']

export const statusOptions: EventStatus[] = ['new', 'reviewing', 'resolved', 'false_positive']

export function formatLabel(value: string) {
  return value
    .replaceAll('_', ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}

export function formatDateTime(value: string) {
  return new Date(value).toLocaleString()
}
