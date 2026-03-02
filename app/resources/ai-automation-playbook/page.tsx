import { TrackableButton } from "@/components/TrackableButton";

export default function PlaybookPage() {
  return (
    <article className="section section-top">
      <div className="container prose">
        <p className="eyebrow">Flagship Guide</p>
        <h1>The Local SMB AI Automation Playbook</h1>
        <p>
          Use this playbook to identify high-friction workflows, prioritize by ROI, and launch your first automation
          wave without disrupting core operations.
        </p>
        <h2>Step 1: Score workflow opportunities</h2>
        <ul>
          <li>Repetition frequency per week</li>
          <li>Error risk when done manually</li>
          <li>Revenue or response-time impact</li>
        </ul>
        <h2>Step 2: Start with one measurable win</h2>
        <p>
          Select one workflow with high repeat volume and clear metrics. Avoid trying to automate everything in the
          first month.
        </p>
        <h2>Step 3: Build control points</h2>
        <p>
          Add approvals, exception handling, and rollback paths. Good automation is reliable under stress, not just
          fast during demos.
        </p>
        <TrackableButton href="/book" label="Book Discovery Call" location="playbook-cta" />
      </div>
    </article>
  );
}

