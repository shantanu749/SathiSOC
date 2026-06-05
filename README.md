# SathiSOC Lite

SathiSOC Lite is an open-source, lightweight SOC dashboard for small startups, student platforms, and lean engineering teams that need visibility into suspicious website activity without operating a full enterprise SIEM.

It ships with safe mock telemetry, a typed event model, reusable React components, local persistence, export workflows, starter detection rules, and a triage playbook. The project is designed to be public-safe for GitHub and practical to adapt later for MySkillSathi or another real platform.

## Why This Tool Exists

Many small teams need basic security monitoring long before they can justify enterprise SIEM pricing or operational complexity. SathiSOC Lite focuses on the workflows that matter first: seeing suspicious events, filtering the queue, reviewing evidence, adding analyst notes, exporting summaries, and closing alerts with repeatable triage guidance.

## Features

- Dashboard overview with total events, open alerts, high severity alerts, average risk, and unique source IPs
- Security event feed with search and filters
- Severity labels: Low, Medium, High, Critical
- Event status workflow: New, Reviewing, Resolved, False Positive
- Event detail panel with evidence, risk score, confidence score, owner, source, category, and recommendation
- Analyst notes persisted in localStorage
- Status updates persisted in localStorage
- CSV export for filtered events
- Markdown incident summary export for the selected event
- Starter detection rules with thresholds, time windows, enabled state, and MITRE ATT&CK mapping
- SOC triage playbook for consistent analyst workflow
- Responsive dark theme built with React + TypeScript
- Backend-ready service layer for future API integration
- GitHub Actions CI for lint and build
- Vercel-ready Vite project

## Screenshots

Add screenshots here after deployment or local capture.

```text
docs/screenshots/dashboard-overview.png
docs/screenshots/event-detail-panel.png
```

## Project Structure

```text
src/
  components/          Reusable dashboard UI components
  data/                Mock events, rules, and playbook content
  services/            Mock API, localStorage persistence, export helpers
  types/               Security event and UI TypeScript models
  utils/               Formatting helpers
docs/
  api.md               Future backend API contract
public/
  sample-security-event.schema.json
```

## Installation

```bash
git clone https://github.com/your-org/sathisoc-lite.git
cd sathisoc-lite
npm install
```

## Run Locally

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Data Model

The main event model lives in `src/types/security.ts`. Mock events, starter rules, and triage content live in `src/data/securityData.ts`.

Sample event:

```json
{
  "id": "evt-1001",
  "eventType": "failed_login",
  "category": "authentication",
  "source": "auth_service",
  "severity": "high",
  "status": "new",
  "actor": "demo-user",
  "assignedTo": "Unassigned",
  "ipAddress": "192.168.1.10",
  "userAgent": "Chrome on Windows",
  "timestamp": "2026-06-05T10:30:00Z",
  "lastUpdated": "2026-06-05T10:34:00Z",
  "confidence": 86,
  "riskScore": 82,
  "summary": "Multiple failed login attempts from the same IP",
  "evidence": ["5 failed logins in 10 minutes", "No successful login observed"],
  "recommendation": "Block source IP temporarily, reset password, and monitor account activity"
}
```

A JSON Schema is included at `public/sample-security-event.schema.json`.

## Connecting a Real Backend Later

The current app uses mock data intentionally. The integration point is `src/services/securityEventsApi.ts`.

Recommended next steps:

1. Replace `listSecurityEvents()` with a real `fetch` call.
2. Replace localStorage status and notes persistence with API requests.
3. Keep API responses aligned with `SecurityEvent` in `src/types/security.ts`.
4. Add authentication, authorization, audit logging, input validation, and rate limiting before production use.

Suggested endpoints are documented in `docs/api.md`.

## Security And Privacy Note

This repository contains no real company data, real users, private endpoints, credentials, or secrets. All events use demo actors and documentation-safe IP ranges. Review any telemetry source carefully before connecting production systems, and avoid storing unnecessary personal data in security events.

## Roadmap

- Backend API integration
- PostgreSQL or MongoDB event storage
- Email and Slack alerts
- Role-based access
- Audit logs
- Real detection rule engine
- Docker support
- Unit and component tests
- Rule editor UI

## Deploying To Vercel

SathiSOC Lite is a standard Vite app. Import the repository into Vercel and use:

```text
Build command: npm run build
Output directory: dist
Install command: npm install
```

The repository includes `vercel.json` with these defaults.

## Contributing

See `CONTRIBUTING.md`.

## Security Policy

See `SECURITY.md`.

## License

MIT. See `LICENSE`.
