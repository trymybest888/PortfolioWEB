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

## ## Handshake intro

Six hand signs based on the supplied reference images: thumb-web hook, reversed hook, pinky hook, pinky plus index hook, return to thumb-web hook, and clasp. Step 5 intentionally reuses the first image.

After the clasp, a separate released-hands image keeps each complete hand on its own side of the center line. The two hands and black panels move outward independently, with one central flare revealing the portfolio underneath. There are no repeated flashes.

- Component: app/handshake-intro.tsx
- Animation: app/handshake-intro.css
- Assets: public/handsign-v2-*.jpg
- Six gestures take about 3 seconds; the final clasp hold and door reveal extend the intro to 4.7 seconds.
- Plays once per tab session; skips section deep links and reduced-motion preferences.
- Skip button and Escape dismiss it. Failed or slow image loading releases the page automatically.
- The session key is versioned so visitors who saw the previous intro can see the revised one.