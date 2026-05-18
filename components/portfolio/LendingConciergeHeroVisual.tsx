export function LendingConciergeHeroVisual() {
  return (
    <div className="lending-hero-visual" aria-hidden>
      <div className="lending-hero-rings" />
      <div className="lending-hero-board">
        <div className="lending-board-grid" />
        <div className="lending-scanline" />
        <div className="lending-signal-token" />
        <div className="lending-node lending-node-intake">
          <span className="lending-node-label">Lead intake</span>
          <strong>Signal captured</strong>
          <p>New inbound request</p>
        </div>
        <div className="lending-node lending-node-missing">
          <span className="lending-node-label">Missing data check</span>
          <strong>Gap detection</strong>
          <p>Flag incomplete records</p>
        </div>
        <div className="lending-node lending-node-outreach">
          <span className="lending-node-label">AI outreach</span>
          <strong>Context collection</strong>
          <p>Structured intake loop</p>
        </div>
        <div className="lending-node lending-node-qualify">
          <span className="lending-node-label">Qualification check</span>
          <strong>Intent + fit scored</strong>
          <p>Apply routing logic</p>
        </div>
        <div className="lending-node lending-node-escalate">
          <span className="lending-node-label">Sales rep handoff</span>
          <strong>Employee handoff</strong>
          <p>High-value cases only</p>
        </div>
        <div className="lending-callout lending-callout-before">Auto-first path</div>
        <div className="lending-callout lending-callout-after">Sales team protected</div>
        <span className="lending-link lending-link-1" />
        <span className="lending-link lending-link-2" />
        <span className="lending-link lending-link-3" />
        <span className="lending-link lending-link-4" />
      </div>
    </div>
  );
}
