# Marat Alembikov · Portfolio

Personal portfolio of a Senior Frontend / Full-Stack engineer: case studies, side projects, LeetCode stats and a scroll-driven hero.

## Stack

- Next.js 16 (App Router, Cache Components), React 19, TypeScript
- Tailwind CSS v4
- GSAP + ScrollTrigger + SplitText, Lenis smooth scroll
- React Three Fiber for the geodesic sphere
- simple-icons for the toolbox

## Run

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build
```

## Content

All copy lives in `src/content/site.ts`; components never hard-code text. Screenshots and the CV are in `public/`.
The LeetCode block is a snapshot: update the numbers in `site.leetcode` by hand.
