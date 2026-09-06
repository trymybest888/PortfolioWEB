# OPIUM Portfolio

A single-page Thai portfolio inspired by underground fashion and editorial design.

The sticky navigation scrolls to Introduction, Skills, History and Work using native hash links. The active item follows the visible section, and the scroll offset adapts to the navigation height. Reduced-motion preferences are respected.

- Introduction and section composition: app/page.tsx
- Skills: app/sections/skills.tsx
- History: app/sections/history.tsx
- Work: app/sections/work.tsx
- Navigation: app/navigation.tsx
- Styling: app/globals.css

Previous /skills, /history and /work URLs redirect to the corresponding section on the home page.

Replace YOUR NAME, location, sample skills, history and concept projects with your own information. Sample content is labeled on the website. The hero illustration is AI generated.

Use npm install, then npm run dev for development. Use npm run build for the production build.
