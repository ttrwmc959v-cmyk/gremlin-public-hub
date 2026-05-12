# Gremlin — Broken People Public Hub

One-page promotional link hub for **Gremlin** (rapper / Broken People Family). Built static-only, mobile-first, with strong push-button reliability for Facebook / Instagram in-app browsers.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | The whole page. Inline SVG brand mark, OG/Twitter metadata, semantic anchors. |
| `styles.css` | Dark alien palette — neon green `#67ff9a`, alien purple `#b07bff`, magenta glitch `#ff3df2`. Glitch hero, orbital background, UFO scan/beam button feedback. |
| `script.js` | Click handler fallback (window.open → location.href), UFO ripple feedback, ambient parallax. |
| `favicon.svg` | Hex-frame alien glyph, gradient stroke. |
| `og-image.svg` | 1200×630 social share preview. |
| `.nojekyll` | Disables Jekyll processing on GitHub Pages. |

## Design Decisions

- **Aesthetic:** futuristic rapper / space hip-hop. Deep black background, neon green + alien purple gradients, dotted orbit rings, drifting starfield, RGB glitch on the hero phrase **BROKEN PEOPLE** with a subtle break-apart/reassemble motion.
- **Type:** Clash Display (display, Fontshare), Space Grotesk (body, Fontshare), Major Mono Display (mono accents, Google Fonts), JetBrains Mono fallback. All loaded via CDN with `preconnect`.
- **Logo:** Original SVG — hex frame with gradient stroke, almond-eyed alien gremlin head, glitch slash through the frame, antenna spark. Used inline in the page and as the favicon (simplified). Not copied from any external clothing logo.
- **Buttons:** Two primary CTAs (Merch / Spotify) with corner-cut accents, gradient surface, UFO scan-line sweep on hover/press. Secondary grid of 7 channel links with alien "tractor beam" glow that pulls upward on press.
- **Accessibility:** WCAG-AA contrast on all text. Focus-visible outlines. `prefers-reduced-motion` disables animations. 76 px+ minimum touch targets on primary CTAs, 92 px on grid links.

## Button Reliability (the critical requirement)

Every visible button/link is:

1. A real `<a href="…">` with `target="_blank" rel="noopener noreferrer"`.
2. Carries a matching `data-open-url` attribute identical to its `href`.
3. Wired through a JS handler that calls `window.open(destination, '_blank', 'noopener,noreferrer')` and falls back to `window.location.href = destination` if the popup is blocked — this is the path that fixes Facebook / Instagram / TikTok in-app webviews where `target="_blank"` silently fails.
4. No `mailto:` or `tel:` links anywhere.

## Links included

- Merch / Broken People Clothing drop alerts — https://gremlinraps.com/
- YouTube — https://www.youtube.com/channel/UC8V8PF8q1Ko4TqmODuvV6Fg
- Instagram — https://www.instagram.com/gremlinraps/
- Facebook — https://www.facebook.com/gremlinraps
- Spotify (artist) — https://open.spotify.com/artist/79RyMeAMdX3QgPGqYG0dCA
- X / Twitter — https://x.com/gremlinraps
- Contact / DM — https://www.instagram.com/gremlinraps/

TikTok intentionally omitted — no verified handle found.

## Local check

Open `index.html` in any browser, or:

```bash
cd gremlin-public-hub
python3 -m http.server 8000
# visit http://localhost:8000/
```

## Deploy

Static-only — drop into any host (GitHub Pages with `.nojekyll`, S3, Netlify, etc.). No build step.
