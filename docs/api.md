# SathiSOC Lite API Contract

The frontend currently uses mock data and localStorage. When adding a backend, keep responses aligned with `SecurityEvent` in `src/types/security.ts`.

## List Security Events

```http
GET /api/security-events
```

Optional query parameters:

```text
severity=high
status=new
q=192.168.1.10
```

## Update Event Status

```http
PATCH /api/security-events/:id/status
```

Request body:

```json
{
  "status": "reviewing"
}
```

## Update Analyst Notes

```http
PATCH /api/security-events/:id/notes
```

Request body:

```json
{
  "notes": "Validated source IP and notified account owner."
}
```

## Detection Rules

```http
GET /api/detection-rules
```

Future versions can support rule creation, enable/disable controls, and a real rule execution engine.
