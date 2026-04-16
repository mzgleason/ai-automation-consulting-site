# Shared System Prompt — Portfolio Project Card Images

Source of truth: `docs/visual-systems/portfolio-project-card-image-system.md`

Use this block as the first instruction in every project-card image run:

"You are generating images for a cohesive portfolio system. All images must share the same visual style, composition, and density, feel like part of a single product design language, use a dark neutral background and restrained palette, and maintain strong central composition for card cropping. Do not vary the overall style between images. Only vary subject matter and accent color."

## Non-negotiable constraints
- centered focal composition
- medium density (3 to 5 core elements)
- layered panels/nodes with one clear flow direction
- dark neutral background + light neutral structural elements
- one muted accent color per project
- avoid robots, glowing brains, stock humans, neon cyberpunk, generic arrow spam, literal screenshots

## Batch method
1. Generate all project cover images in one run.
2. Evaluate as a set, not individually.
3. If one image drifts, regenerate the full set.
