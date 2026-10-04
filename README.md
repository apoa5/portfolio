# Akwasi's portfolio

A lightweight, responsive software engineering and machine learning portfolio built with HTML, CSS, and JavaScript. The design follows `skills.md`, with dark and light themes, accessible navigation, technical project summaries, and résumé-backed experience.

## Preview locally

```sh
python3 -m http.server 8000
```

Open http://localhost:8000. No build step or runtime dependencies are required.

## Content and assets

- `index.html`: portfolio content, links, and SEO metadata.
- `styles.css`: design tokens, typography, themes, and responsive layouts.
- `script.js`: persisted theme choice and active section navigation.
- `assets/`: résumé, optimized WebP images, favicon, and social preview.

Project and experience details come from the included résumé; SmartCards pipeline details were checked against its repository README. EcoWatch, SmartCards, and KNUST Chess Club use real project screenshots, compressed to responsive WebP assets.

The canonical URL, sitemap, and Open Graph image use `https://apoa5.github.io/portfolio/`. Update these together if the site's public address changes. Google Fonts serves Geist and Geist Mono; system fonts remain available as fallbacks. All portfolio content and navigation work without JavaScript.

Icons are selected, locally installed SVG assets from Bootstrap Icons 1.13.1 (MIT), with the license in `assets/icons/LICENSE`. The HTML uses inline SVGs for theme-aware color and accessible icon-only social links.

## Adding gallery photos

`gallery.html` is linked from the main navigation. Add your photos to `assets/gallery/` and insert a `<figure class="gallery-photo">` inside `.gallery-grid`, following the existing portrait example. Wrap the photo in a `.gallery-open` button following the existing examples, supply descriptive alt text, and set its real width and height. `gallery.js` automatically includes each photo in the full-screen viewer. Use `loading="lazy"` for photos below the first row. The grid automatically adjusts to one, two, or three columns for mobile, tablet, and desktop.
