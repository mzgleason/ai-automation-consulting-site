import { EditorialContainer } from "@/components/playbook/EditorialContainer";
import { Grid12 } from "@/components/playbook/Grid12";
import { PageShell } from "@/components/playbook/PageShell";
import { SectionContainer } from "@/components/playbook/SectionContainer";
import { SystemContainer } from "@/components/playbook/SystemContainer";
import Image from "next/image";
import Link from "next/link";

export default function AITechnicalDiscoveryPlaybookPage() {
  return (
    <PageShell>
      <SectionContainer>
        <SystemContainer>
          <Grid12>
            <div className="pb-hero-grid" style={{ gridColumn: "1 / span 12", display: "contents" }}>
            </div>
            <div className="pb-hero-copy" style={{ gridColumn: "1 / span 4" }}>
              <EditorialContainer>
                <p className="pb-label">Playbook / 01</p>
                <h1 className="pb-hero-headline">
                  AI-Assisted
                  <br />
                  Technical
                  <br />
                  Discovery
                </h1>
                <div className="pb-rule" />
                <p className="pb-body">
                  Reduce discovery loops by giving product workflows system-level context before engineering refinement
                  begins.
                </p>
                <p className="pb-support">System-Aware Product Discovery For Complex Platforms</p>
              </EditorialContainer>
            </div>

            <div className="pb-flow-wrap" style={{ gridColumn: "5 / span 5" }}>
              <div className="pb-flow-stage">
              <div className="pb-flow">
                <div className="pb-flow-node pb-flow-node-with-icon">
                  <Image src="/images/icons/carbon/document.svg" alt="" width={20} height={20} />
                  <span>PRD Framework</span>
                </div>
                <div className="pb-flow-arrow">↓</div>
                <div className="pb-flow-node pb-flow-node-with-icon">
                  <Image src="/images/icons/carbon/data-base.svg" alt="" width={20} height={20} />
                  <span>Repo Knowledge Layer</span>
                </div>
                <div className="pb-flow-arrow">↓</div>
                <div className="pb-flow-node pb-flow-node-with-icon">
                  <Image src="/images/icons/carbon/network.svg" alt="" width={20} height={20} />
                  <span>Architecture References</span>
                </div>
                <div className="pb-flow-arrow">↓</div>
                <div className="pb-flow-node pb-flow-node-accent pb-flow-node-with-icon">
                  <Image src="/images/icons/carbon/artificial-intelligence-outline.svg" alt="" width={20} height={20} />
                  <span>AI Discovery Workflow</span>
                </div>
                <div className="pb-flow-arrow">↓</div>
                <div className="pb-flow-row">
                  <div className="pb-flow-node pb-flow-node-with-icon">
                    <Image src="/images/icons/carbon/help.svg" alt="" width={20} height={20} />
                    <span>Scoped Technical Questions</span>
                  </div>
                  <div className="pb-flow-node pb-flow-node-with-icon">
                    <Image src="/images/icons/carbon/network-chart.svg" alt="" width={20} height={20} />
                    <span>Impacted Systems &amp; Dependencies</span>
                  </div>
                </div>
                <div className="pb-flow-arrow">↓</div>
                <div className="pb-flow-node pb-flow-node-with-icon">
                  <Image src="/images/icons/carbon/code.svg" alt="" width={20} height={20} />
                  <span>Engineering Refinement</span>
                </div>
              </div>
              </div>
            </div>

            <div className="pb-hero-meta" style={{ gridColumn: "10 / span 3" }}>
              <aside className="pb-card pb-meta">
                <dl>
                  <div className="pb-meta-item">
                    <div className="pb-meta-row">
                      <svg className="pb-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z"/><path d="M4 7.5L12 12l8-4.5"/></svg>
                      <div><dt>Best For</dt><dd>Complex platforms</dd></div>
                    </div>
                  </div>
                  <div className="pb-meta-item">
                    <div className="pb-meta-row">
                      <svg className="pb-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 3"/></svg>
                      <div><dt>Primary Outcome</dt><dd>Faster scoped discovery</dd></div>
                    </div>
                  </div>
                  <div className="pb-meta-item">
                    <div className="pb-meta-row">
                      <svg className="pb-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 3l8 4-8 4-8-4 8-4z"/><path d="M4 12l8 4 8-4"/><path d="M4 17l8 4 8-4"/></svg>
                      <div><dt>Systems</dt><dd>Multi-repo environments</dd></div>
                    </div>
                  </div>
                  <div className="pb-meta-item">
                    <div className="pb-meta-row">
                      <svg className="pb-meta-icon" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                        <path fill="currentColor" d="M30 30h-2v-5a5.006 5.006 0 0 0-5-5v-2a7.01 7.01 0 0 1 7 7Zm-8 0h-2v-5a5.006 5.006 0 0 0-5-5H9a5.006 5.006 0 0 0-5 5v5H2v-5a7.01 7.01 0 0 1 7-7h6a7.01 7.01 0 0 1 7 7ZM20 2v2a5 5 0 0 1 0 10v2a7 7 0 0 0 0-14m-8 2a5 5 0 1 1-5 5a5 5 0 0 1 5-5m0-2a7 7 0 1 0 7 7a7 7 0 0 0-7-7"/>
                      </svg>
                      <div><dt>Workflow Type</dt><dd>Product + Engineering</dd></div>
                    </div>
                  </div>
                  <div className="pb-meta-item">
                    <div className="pb-meta-row">
                      <svg className="pb-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>
                      <div><dt>Requires</dt><dd>Repo access + architecture summaries</dd></div>
                    </div>
                  </div>
                </dl>
              </aside>
            </div>
          </Grid12>
        </SystemContainer>
      </SectionContainer>

      <SectionContainer>
        <SystemContainer>
          <div className="pb-problem">
            <p className="pb-label">The Problem</p>
            <div className="pb-problem-top">
              <div className="pb-problem-left">
                <h2 className="pb-problem-headline">
                  Discovery slows when
                  <br />
                  system knowledge becomes
                  <br />
                  organizational memory.
                </h2>
              </div>
              <div className="pb-problem-right">
                <p className="pb-body">
                  Implementation knowledge is distributed across repositories, teams, and historical decisions.
                  Product managers often rely on synchronous engineering conversations to uncover edge cases,
                  integration points, and downstream impact - creating bottlenecks and context switching that slow
                  everyone down.
                </p>
              </div>
            </div>

            <div className="pb-problem-cards">
              <article className="pb-problem-card">
                <svg className="pb-problem-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="6" cy="5" r="2"/><circle cx="18" cy="5" r="2"/><circle cx="6" cy="19" r="2"/><circle cx="18" cy="19" r="2"/><path d="M6 7v10M18 7v10M8 5h8M8 19h8"/>
                </svg>
                <h3>Edge Cases</h3>
              </article>

              <article className="pb-problem-card">
                <svg className="pb-problem-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M10.5 13.5l3-3"/><path d="M7 17a3.5 3.5 0 0 1 0-5l2.5-2.5a3.5 3.5 0 0 1 5 5L13 16"/><path d="M17 7a3.5 3.5 0 0 1 0 5l-2.5 2.5a3.5 3.5 0 0 1-5-5L11 8"/>
                </svg>
                <h3>Integrations</h3>
              </article>

              <article className="pb-problem-card">
                <svg className="pb-problem-icon" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                  <path fill="currentColor" d="M27 25h-6a3 3 0 0 0-3 3v2h2v-2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2h2v-2a3 3 0 0 0-3-3m-7-5a4 4 0 1 0 4-4a4 4 0 0 0-4 4m6 0a2 2 0 1 1-2-2a2 2 0 0 1 2 2M6 21v-1H4v1a7 7 0 0 0 7 7h3v-2h-3a5 5 0 0 1-5-5m13-11h7v2h-7zm0-4h10v2H19zm0-4h10v2H19zm-8 9H5a3 3 0 0 0-3 3v2h2v-2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2h2v-2a3 3 0 0 0-3-3m-3-1a4 4 0 1 0-4-4a4 4 0 0 0 4 4m0-6a2 2 0 1 1-2 2a2 2 0 0 1 2-2"/>
                </svg>
                <h3>Tribal Knowledge</h3>
              </article>

              <article className="pb-problem-card">
                <svg className="pb-problem-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M4 8h14"/><path d="M15 5l3 3-3 3"/><path d="M20 16H6"/><path d="M9 13l-3 3 3 3"/>
                </svg>
                <h3>Cross-Team Dependencies</h3>
              </article>

              <article className="pb-problem-card">
                <svg className="pb-problem-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="9"/><path d="M9.6 9.4a2.6 2.6 0 1 1 3.2 2.5c-.7.2-1.1.8-1.1 1.5v.4"/><circle cx="12" cy="17.2" r="1"/>
                </svg>
                <h3>Implementation Uncertainty</h3>
              </article>
            </div>
          </div>
        </SystemContainer>
      </SectionContainer>

      <div className="pb-light-zone">
        <SectionContainer>
          <SystemContainer>
            <section className="pb-workflow">
            <header className="pb-workflow-head">
              <h2>A Discovery System That Builds Context</h2>
              <p className="pb-body">Move from idea to a scoped, technically-aware plan-faster.</p>
            </header>

            <div className="pb-workflow-row" role="list" aria-label="Discovery workflow steps">
              <article className="pb-workflow-card" role="listitem">
                <div className="pb-workflow-badge pb-workflow-badge-blue"><Image src="/images/icons/carbon/document.svg" alt="" width={20} height={20} /></div>
                <p className="pb-workflow-step">01</p>
                <h3>PRD Framework</h3>
                <p>Start with a proven structure. Define objectives, constraints, and success metrics.</p>
              </article>

              <div className="pb-workflow-arrow" aria-hidden="true">→</div>

              <article className="pb-workflow-card" role="listitem">
                <div className="pb-workflow-badge pb-workflow-badge-green"><Image src="/images/icons/carbon/stacked-scrolling-1.svg" alt="" width={20} height={20} /></div>
                <p className="pb-workflow-step">02</p>
                <h3>Repo Mapping</h3>
                <p>AI summarizes each repository, its purpose, responsibilities, and primary connections.</p>
              </article>

              <div className="pb-workflow-arrow" aria-hidden="true">→</div>

              <article className="pb-workflow-card" role="listitem">
                <div className="pb-workflow-badge pb-workflow-badge-purple"><Image src="/images/icons/carbon/data-base.svg" alt="" width={20} height={20} /></div>
                <p className="pb-workflow-step">03</p>
                <h3>Architecture References</h3>
                <p>Build a layered understanding of systems, services, and data flows.</p>
              </article>

              <div className="pb-workflow-arrow" aria-hidden="true">→</div>

              <article className="pb-workflow-card" role="listitem">
                <div className="pb-workflow-badge pb-workflow-badge-cyan"><Image src="/images/icons/carbon/chat.svg" alt="" width={20} height={20} /></div>
                <p className="pb-workflow-step">04</p>
                <h3>Discovery</h3>
                <p>AI asks targeted questions, identifies edge cases, and uncovers assumptions.</p>
              </article>

              <div className="pb-workflow-arrow" aria-hidden="true">→</div>

              <article className="pb-workflow-card" role="listitem">
                <div className="pb-workflow-badge pb-workflow-badge-amber"><Image src="/images/icons/carbon/code.svg" alt="" width={20} height={20} /></div>
                <p className="pb-workflow-step">05</p>
                <h3>Implementation Awareness</h3>
                <p>Surface likely change areas, files, and impacted systems.</p>
              </article>

              <div className="pb-workflow-arrow" aria-hidden="true">→</div>

              <article className="pb-workflow-card" role="listitem">
                <div className="pb-workflow-badge pb-workflow-badge-mint"><Image src="/images/icons/carbon/user-multiple.svg" alt="" width={20} height={20} /></div>
                <p className="pb-workflow-step">06</p>
                <h3>Engineering Review</h3>
                <p>Collaborate with engineering to refine, validate, and finalize the plan.</p>
              </article>
            </div>

            <div className="pb-workflow-result">
              <span>✦</span>
              <p>The result: better first-pass PRDs, fewer discovery loops, and higher quality engineering conversations.</p>
            </div>
            </section>
          </SystemContainer>
        </SectionContainer>
      </div>

      <div className="pb-light-zone">
        <SectionContainer>
          <SystemContainer>
            <section className="pb-context">
              <div className="pb-context-shell">
              <aside className="pb-context-intro">
                <h2>AI Context That Evolves With Your System</h2>
                <p>Stay aligned with how your systems actually work.</p>
                <ul className="pb-context-points">
                  <li><Image src="/images/icons/carbon/document.svg" alt="" aria-hidden="true" width={20} height={20} />Up-to-date repo understanding</li>
                  <li><Image src="/images/icons/carbon/network-wired.svg" alt="" aria-hidden="true" width={20} height={20} />Integration and dependency maps</li>
                  <li><Image src="/images/icons/carbon/code.svg" alt="" aria-hidden="true" width={20} height={20} />Suggested change locations</li>
                  <li><Image src="/images/icons/carbon/circle-check.svg" alt="" aria-hidden="true" width={20} height={20} />Evidence-backed recommendations</li>
                </ul>
              </aside>

              <div className="pb-context-main">
                <section className="pb-context-col">
                  <h3>Repository Summary</h3>
                  <p className="pb-context-repo">loan-application-service</p>
                  <h4>Purpose</h4>
                  <p>Core service for creating and managing loan applications from intake to decisioning.</p>
                  <h4>Primary Connections</h4>
                  <ul>
                    <li>lead-ingestion-service</li>
                    <li>customer-identity-api</li>
                    <li>underwriting-engine</li>
                    <li>document-service</li>
                  </ul>
                  <h4>Common Change Areas</h4>
                  <ul className="pb-context-code-list">
                    <li>validation/</li>
                    <li>workflow-routing/</li>
                    <li>decision-logic/</li>
                    <li>integration-mappers/</li>
                    <li>api/</li>
                  </ul>
                </section>

                <section className="pb-context-col pb-context-map">
                  <div className="pb-context-map-head">
                    <h3>System Relationships</h3>
                    <div className="pb-context-legend" aria-hidden="true">
                      <span><i className="pb-line-key pb-line-key-primary" />Primary</span>
                      <span><i className="pb-line-key pb-line-key-secondary" />Secondary</span>
                    </div>
                  </div>
                  <div className="pb-context-map-stage">
                    <Image src="/images/playbooks/tech-discovery-system-map.svg" alt="System relationships map for loan-application-service and connected services" className="pb-context-map-image" width={900} height={520} />
                  </div>
                </section>

                <section className="pb-context-col">
                  <h3>Likely Change Locations</h3>
                  <div className="pb-context-code">
                    <p>src/workflows/</p>
                    <p>src/validation/</p>
                    <p>src/integration/mappers/</p>
                    <p>src/api/</p>
                  </div>
                  <h4>Considerations</h4>
                  <ul>
                    <li>Impacts underwriting flow</li>
                    <li>Triggers document generation</li>
                    <li>Affects customer notifications</li>
                  </ul>
                  <div className="pb-context-confidence">
                    <p>Confidence</p>
                    <strong>High</strong>
                    <div className="pb-context-confidence-track">
                      <span />
                    </div>
                  </div>
                </section>
              </div>
              </div>
            </section>
          </SystemContainer>
        </SectionContainer>
      </div>

      <div className="pb-light-zone">
        <SectionContainer>
          <SystemContainer>
            <section className="pb-summary-grid" aria-label="Discovery tradeoffs and outcomes">
              <article className="pb-summary-card pb-summary-card-no-replace">
                <p className="pb-summary-eyebrow">What This Does Not Replace</p>
                <div className="pb-summary-split">
                  <p className="pb-summary-lead">This does not replace engineering judgment.</p>
                  <ul>
                    <li>Engineering judgment</li>
                    <li>Architecture review</li>
                    <li>Production validation</li>
                    <li>Implementation ownership</li>
                    <li>Technical tradeoff analysis</li>
                  </ul>
                </div>
              </article>

              <article className="pb-summary-card pb-summary-card-failure">
                <p className="pb-summary-eyebrow">Failure Modes</p>
                <ul>
                  <li><Image src="/images/icons/carbon/warning-triangle.svg" alt="" aria-hidden="true" width={20} height={20} /><span>Stale architecture context</span></li>
                  <li><Image src="/images/icons/carbon/warning-triangle.svg" alt="" aria-hidden="true" width={20} height={20} /><span>Hallucinated dependencies</span></li>
                  <li><Image src="/images/icons/carbon/warning-triangle.svg" alt="" aria-hidden="true" width={20} height={20} /><span>Outdated implementation paths</span></li>
                  <li><Image src="/images/icons/carbon/warning-triangle.svg" alt="" aria-hidden="true" width={20} height={20} /><span>Over-confidence in AI output</span></li>
                  <li><Image src="/images/icons/carbon/warning-triangle.svg" alt="" aria-hidden="true" width={20} height={20} /><span>Missing organizational context</span></li>
                </ul>
              </article>

              <article className="pb-summary-card pb-summary-card-outcomes">
                <p className="pb-summary-eyebrow">Outcomes</p>
                <ul>
                  <li><Image src="/images/icons/carbon/circle-check.svg" alt="" aria-hidden="true" width={20} height={20} /><span>Better first-pass PRDs</span></li>
                  <li><Image src="/images/icons/carbon/circle-check.svg" alt="" aria-hidden="true" width={20} height={20} /><span>Faster discovery cycles</span></li>
                  <li><Image src="/images/icons/carbon/circle-check.svg" alt="" aria-hidden="true" width={20} height={20} /><span>Earlier edge-case visibility</span></li>
                  <li><Image src="/images/icons/carbon/circle-check.svg" alt="" aria-hidden="true" width={20} height={20} /><span>Reduced tribal knowledge dependency</span></li>
                  <li><Image src="/images/icons/carbon/circle-check.svg" alt="" aria-hidden="true" width={20} height={20} /><span>Higher-quality engineering discussions</span></li>
                </ul>
              </article>
            </section>
          </SystemContainer>
        </SectionContainer>
      </div>

      <div className="pb-light-zone">
        <SectionContainer>
          <SystemContainer>
            <section className="pb-final-cta" aria-label="Playbook final call to action">
              <div className="pb-final-cta-icon" aria-hidden="true"><Image src="/images/icons/carbon/compass.svg" alt="" width={20} height={20} /></div>

              <div className="pb-final-cta-copy">
                <h2>Build the system. Compound the advantage.</h2>
                <p>
                  This playbook helps product and engineering teams turn fragmented knowledge into clarity, alignment,
                  and momentum.
                </p>
              </div>

              <div className="pb-final-cta-actions">
                <Link href="/contact" className="pb-final-cta-primary">Let&apos;s Work Together <span aria-hidden="true">→</span></Link>
                <Link href="/playbooks" className="pb-final-cta-secondary">View All Playbooks <span aria-hidden="true">→</span></Link>
              </div>
            </section>
          </SystemContainer>
        </SectionContainer>
      </div>
    </PageShell>
  );
}
