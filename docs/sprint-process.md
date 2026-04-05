# Sprint Process

Use `docs/ai-website-roadmap-for-codex.md` as the roadmap for future sprint cycles.

## Sprint planning rule

- Split work according to the roadmap sprint sequence unless a later decision explicitly changes it
- Treat each sprint as a bounded deliverable with acceptance criteria
- If a sprint introduces conflicts with the roadmap or existing docs, stop and ask for clarification

## Sprint execution rule

For each sprint:

1. Audit the repo against the sprint scope
2. Implement the sprint deliverables
3. Validate the sprint with the required quality gates
4. Evaluate the outcome against the sprint acceptance criteria
5. Report only what changed, what works, how it was validated, and any blockers

## Validation rule

Before calling a sprint complete, run the relevant checks:

- `npm run lint`
- `npm run test`
- `npm run build`

If an additional acceptance or manual browser check is needed for that sprint, include it in the sprint closeout.

## Agent rule

- Subagents may be used for new sprint cycles when the work can be split cleanly
- Any agent that completes sprint work must also evaluate its own output against the sprint acceptance criteria
- Do not mark a sprint complete until both validation and evaluation are done
