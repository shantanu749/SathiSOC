import type { SecurityEvent } from '../types/security'

function downloadText(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')

  anchor.href = url
  anchor.download = filename
  anchor.click()
  URL.revokeObjectURL(url)
}

function csvValue(value: string | number) {
  return `"${String(value).replaceAll('"', '""')}"`
}

export function exportEventsCsv(events: SecurityEvent[]) {
  const headers = [
    'id',
    'eventType',
    'category',
    'source',
    'severity',
    'status',
    'actor',
    'assignedTo',
    'ipAddress',
    'riskScore',
    'confidence',
    'timestamp',
    'summary',
  ]
  const rows = events.map((event) =>
    headers.map((header) => csvValue(event[header as keyof SecurityEvent] as string | number)).join(','),
  )

  downloadText('sathisoc-lite-events.csv', [headers.join(','), ...rows].join('\n'), 'text/csv')
}

export function exportIncidentMarkdown(event: SecurityEvent, notes: string) {
  const content = `# Incident Summary: ${event.id}

## Overview

- Event: ${event.summary}
- Type: ${event.eventType}
- Severity: ${event.severity}
- Status: ${event.status}
- Actor: ${event.actor}
- Source IP: ${event.ipAddress}
- Assigned To: ${event.assignedTo}
- Risk Score: ${event.riskScore}
- Confidence: ${event.confidence}

## Evidence

${event.evidence.map((item) => `- ${item}`).join('\n')}

## Recommended Action

${event.recommendation}

## Analyst Notes

${notes || 'No analyst notes recorded.'}
`

  downloadText(`${event.id}-incident-summary.md`, content, 'text/markdown')
}
