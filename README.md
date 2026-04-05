# Pawpress — a Ghost theme for dog people

A modern, cute, and friendly Ghost theme built for **dog walkers, groomers, doggy daycares, dog trainers, and pet enthusiasts**. Everything a pet business needs on day one — and everything toggleable so you never have to delete markup you don't use.

The signature of the theme is a **dogbone-shaped call-to-action button** (using a real CSS clip-path, not an image) that echoes through the hero, footer CTA, service cards, and 404 page.

---

## Features

All sections are individually toggleable from the Ghost admin under **Design → Site → Customize theme**.

| Section | What it is | Built from |
|---|---|---|
| **Hero** | Big headline + bone-shaped CTA | `@custom.hero_title` / `hero_subtitle` / `hero_cta_*` |
| **Meet the pack** | Team / staff / dog portraits with paw badges | Posts tagged `#pack` |
| **Services** | Services grid with bone-shape decorators | Posts tagged `#service` |
| **Gallery** | Masonry gallery with lightbox | Posts tagged `#gallery` |
| **Testimonials** | Auto-advancing carousel with avatar attribution | Posts tagged `#testimonial` |
| **Pricing** | Pricing tiers with "Most popular" highlight | Posts tagged `#pricing` |
| **Footer hours** | Opening hours + secondary nav | `@custom.hours_text` |
| **Newsletter** | Ghost-native members signup ("Join the pack") | Native Ghost members |
| **Sticky CTA** | Mobile-only booking bar with tap-to-call | Reuses hero CTA + `phone_number` |

Plus:

- **Light / Dark / Auto** color schemes
- **Custom accent color** (default: warm coral)
- **4 heading fonts × 2 body fonts** via Ghost's custom font selectors
- Full **Koenig content support** (kg-width-wide, kg-width-full, galleries, bookmark cards)
- Lightbox, carousel, smooth-scroll, mobile nav — no jQuery, ~3KB of JS
- Accessibility: skip link, ARIA labels, keyboard nav, focus states

## Audience presets

The theme is tuned so every toggle is independent. Common starting configurations:

- **Dog walker** — hero + services + testimonials + sticky CTA + newsletter
- **Groomer** — hero + services + gallery + pricing + newsletter
- **Doggy daycare** — hero + pack + services + gallery + hours + newsletter
- **Dog trainer** — hero + services + testimonials + pricing + newsletter
- **Pet blogger** — hero + newsletter (everything else off, feed prominent)

## Development

```bash
npm install --legacy-peer-deps
npm run dev         # rollup watch + livereload
npm run build       # production build
npm test            # run gscan validator
npm run zip         # build + zip for upload to Ghost
```

## Install

1. `npm run zip`
2. Upload `ghost-pawpress-theme.zip` in Ghost admin → Design → Change theme → Upload theme
3. Activate

## Content setup

Create tags named exactly `pack`, `service`, `gallery`, `testimonial`, `pricing`. Then create posts with those tags — they'll auto-populate the corresponding homepage sections. Use:

- **Feature image** for avatars / service art / gallery images
- **Custom excerpt** for roles / amounts / subtitles
- **Excerpt** for bio / description text

## License

MIT. Built by [Elif Digital](https://github.com/Elifterminal).
