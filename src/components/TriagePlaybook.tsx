import { triageSteps } from '../data/securityData'

export function TriagePlaybook() {
  return (
    <section className="panel playbook" id="triage-playbook">
      <div className="panel-heading">
        <div>
          <span className="eyebrow">SOC Workflow</span>
          <h2>Triage Playbook</h2>
        </div>
      </div>
      <ol>
        {triageSteps.map((step) => (
          <li key={step.title}>
            <strong>{step.title}</strong>
            <p>{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
