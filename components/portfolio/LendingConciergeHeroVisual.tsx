export function LendingConciergeHeroVisual() {
  return (
    <div className="lending-hero-visual" aria-hidden>
      <div className="lending-hero-rings" />
      <div className="lending-hero-board">
        <div className="lending-board-grid" />
        <div className="lending-scanline" />
        <div className="lending-signal-token" />
        <div className="lending-node lending-node-lead">
          <span className="lending-node-label">Lead intake</span>
          <strong>Missing fields</strong>
          <p>Income, loan goal, timeline</p>
        </div>
        <div className="lending-node lending-node-voice">
          <span className="lending-node-label">Voice AI call</span>
          <strong>Qualifying</strong>
          <p>Short Q&A loop</p>
        </div>
        <div className="lending-node lending-node-crm">
          <span className="lending-node-label">CRM record</span>
          <strong>Updated</strong>
          <ul>
            <li />
            <li />
            <li />
          </ul>
        </div>
        <div className="lending-node lending-node-handoff">
          <span className="lending-node-label">Rep handoff</span>
          <strong>Ready to close</strong>
          <p>Qualified + routed</p>
        </div>
        <div className="lending-callout lending-callout-before">Before: incomplete</div>
        <div className="lending-callout lending-callout-after">After: rep-ready</div>
        <span className="lending-link lending-link-1" />
        <span className="lending-link lending-link-2" />
        <span className="lending-link lending-link-3" />
      </div>
    </div>
  );
}
