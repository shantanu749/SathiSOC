import type { EventStatus, Severity } from './security'

export type MetricTone = 'alert' | 'warning' | 'calm'

export type SeverityFilter = Severity | 'all'

export type StatusFilter = EventStatus | 'all'
