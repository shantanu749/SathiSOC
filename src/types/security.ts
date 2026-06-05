export type Severity = 'low' | 'medium' | 'high' | 'critical'

export type EventStatus = 'new' | 'reviewing' | 'resolved' | 'false_positive'

export type EventCategory =
  | 'authentication'
  | 'account_abuse'
  | 'api_security'
  | 'admin_activity'
  | 'spam'

export type EventSource = 'web_app' | 'auth_service' | 'api_gateway' | 'admin_panel' | 'public_form'

export type SecurityEventType =
  | 'failed_login'
  | 'admin_login'
  | 'password_reset_burst'
  | 'signup_spike'
  | 'role_change'
  | 'contact_form_spam'
  | 'suspicious_user_agent'
  | 'api_error_spike'
  | 'unusual_ip_activity'
  | 'possible_bruteforce'

export interface SecurityEvent {
  id: string
  eventType: SecurityEventType
  category: EventCategory
  source: EventSource
  severity: Severity
  status: EventStatus
  actor: string
  assignedTo: string
  ipAddress: string
  userAgent: string
  timestamp: string
  lastUpdated: string
  confidence: number
  riskScore: number
  summary: string
  evidence: string[]
  recommendation: string
  resolutionReason?: string
}

export interface DetectionRule {
  id: string
  name: string
  description: string
  severity: Severity
  enabled: boolean
  condition: string
  threshold: string
  timeWindow: string
  mitreTechnique: string
}

export interface TriageStep {
  title: string
  description: string
}
