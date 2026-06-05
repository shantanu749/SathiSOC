export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">
          <img src="/logo.png" alt="SathiSOC Lite logo" />
        </div>
        <div>
          <strong>SathiSOC Lite</strong>
          <span>Open-source SOC starter</span>
        </div>
      </div>
      <nav aria-label="Dashboard navigation">
        {['Overview', 'Events', 'Detection Rules', 'Triage Playbook', 'Settings'].map((item) => (
          <a key={item} className={item === 'Overview' ? 'active' : ''} href={`#${item.toLowerCase().replaceAll(' ', '-')}`}>
            {item}
          </a>
        ))}
      </nav>
      <div className="sidebar-note">
        <span>Demo mode</span>
        <p>Mock telemetry only. No private endpoints, secrets, or real company data are included.</p>
      </div>
    </aside>
  )
}
