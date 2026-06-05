import { detectionRules } from '../data/securityData'
import { formatLabel } from '../utils/format'
import { SeverityBadge } from './Badges'

export function DetectionRulesPanel() {
  return (
    <section className="panel rules-panel" id="detection-rules">
      <div className="panel-heading">
        <div>
          <span className="eyebrow">Starter Content</span>
          <h2>Detection Rules</h2>
        </div>
      </div>
      <div className="rule-list">
        {detectionRules.map((rule) => (
          <article key={rule.id} className="rule-item">
            <div>
              <strong>{rule.name}</strong>
              <p>{rule.description}</p>
              <dl className="rule-meta">
                <div><dt>Condition</dt><dd>{rule.condition}</dd></div>
                <div><dt>Threshold</dt><dd>{rule.threshold}</dd></div>
                <div><dt>Window</dt><dd>{rule.timeWindow}</dd></div>
                <div><dt>MITRE</dt><dd>{rule.mitreTechnique}</dd></div>
              </dl>
            </div>
            <div className="rule-state">
              <SeverityBadge severity={rule.severity} />
              <span className={`rule-toggle ${rule.enabled ? 'enabled' : ''}`}>{formatLabel(rule.enabled ? 'enabled' : 'disabled')}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
