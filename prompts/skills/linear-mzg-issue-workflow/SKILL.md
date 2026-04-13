# Linear Issue Workflow (MZG / markzgleason.com)

Use this skill when the task is driven by a Linear issue in the **MZG** team for the **markzgleason.com** project.

## Goal

Make Codex execute a repeatable workflow that keeps Linear issues, git branches, and GitHub PRs tightly linked:

1. Read the issue as the implementation brief
2. Plan and confirm assumptions (especially when underspecified)
3. Create or switch to an issue-linked branch
4. Implement and verify changes locally
5. Open an issue-linked PR
6. Update Linear with progress and completion notes

## Inputs (what to ask for / locate)

- Linear issue identifier (example: `MZG-23`)
- Repo workspace path (this repo)
- Any constraints from `AGENTS.md` and relevant `docs/` pages

If the user did not provide an issue identifier, create a new Linear issue first (see “Issue Creation Defaults”).

## Read The Issue (treat as source of truth)

When given an issue:

- Extract:
  - **Background** (why it matters)
  - **Scope** (what is in / out)
  - **Acceptance Criteria** (checkbox list)
  - **Constraints** (tech notes, “don’t do X”)
  - **Open Questions** (missing info / ambiguous requirements)
- If anything is underspecified:
  - Ask clarifying questions if the missing details affect UI, data shape, URLs, or public copy
  - Otherwise, proceed with explicit assumptions and write them down in a short checklist in the PR description and/or a Linear comment

## Issue Creation Defaults (MZG / markzgleason.com)

When creating a new issue for this repo:

- Team: **MZG**
- Project: **markzgleason.com**
- Type: **Story**
- Priority: **Medium**
- Title: start with an action verb (e.g., “Add pricing FAQ section”)
- Description template:
  - Background
  - User Story
  - Acceptance Criteria (checkboxes)
  - Tech Notes / Constraints

## Branch Workflow (include the ticket id)

Branch names must include the Linear identifier.

Preferred convention for this repo:

- `codex/mzg-23-<short-slug>`

If Linear provides a `gitBranchName`, prefer it when it already includes the issue id, otherwise adapt it to the above format.

Before branching:

- Ensure local `main` is up to date with `origin/main`
- Do not commit or push private notes or credentials

## Implementation Workflow

1. Create/switch to the issue branch
2. Implement the minimum change to satisfy acceptance criteria
3. Verify locally:
   - Run the repo’s build/test commands requested in `AGENTS.md` (at least `npm run build` for code-level verification)
4. Ensure no sensitive data is staged:
   - Nothing from `docs/_private/`
   - No `.env*` files
   - No secrets or internal URLs in public docs

## PR Workflow (link back to Linear)

PR title:

- Include the issue id at the start, e.g. `MZG-23: Create Linear issue workflow skill`

PR description:

- Link the Linear issue URL
- List acceptance criteria and mark what’s done
- Note any assumptions / follow-ups

If the repo uses auto-linking, add `Fixes MZG-23` in the PR body only if that matches your team’s convention; otherwise, just reference `MZG-23` and include the URL.

## Linear Hygiene (comments + status)

During work:

- Comment when:
  - You start work (branch name + high-level plan)
  - You hit blockers (what you need to proceed)
  - You open a PR (PR URL + summary)

On completion:

- Comment with:
  - What shipped
  - Verification performed (`npm run build`, e2e if applicable)
  - PR link
- Move issue state to the appropriate “Done/Completed” state for the team workflow.

