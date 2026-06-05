export function AnalystNotes({
  notes,
  onChange,
}: {
  notes: string
  onChange: (value: string) => void
}) {
  return (
    <label className="notes-box">
      <span>Analyst notes</span>
      <textarea
        value={notes}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Add triage findings, owner, action taken, or escalation context."
      />
    </label>
  )
}
