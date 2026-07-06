# Learned Material

This file captures concepts and snippets I learned while working on a personal website project. Kept for reference.

## Table of Contents

- [HTML](#html)
- [CSS](#css)
- [JavaScript](#javascript)
- [Notes](#notes)
  - [Git](#notes---git)
  - [HTML](#notes---html)
  - [CSS](#notes---css)

## HTML

- Open Graph metadata is used so the page is represented clearly when shared on social media.
- Buttons that toggle visibility should use `aria-controls` and `aria-expanded`.
- Media elements benefit from `loading="lazy"` and `decoding="async"` where appropriate.
- Download links should use an anchor with the `download` attribute rather than a button.

### Open Graph

Using Open Graph schema to represent the page when the URL is shared on social media.

```HTML
<!-- Open Graph (if shared on social) -->
  <meta property="og:title" content="Ali Al Yahya – Web Developer" />
  <meta
   property="og:description"
   content="Finance professional transitioning to web development. Front-end specialist. React, JavaScript, responsive design."
  />
  <meta
   property="og:image"
   content="./assets/images/page-images/2025-Dec-14-Profile-Pic-Square-radial-gradient-504x495.png"
  />
```

### JSON-LD Schema

Adds structured data so search engines can better understand the page and sometimes show enhanced results.

```HTML
<script type="application/ld+json">
   {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Ali Al Yahya",
    "jobTitle": "Web Developer",
    "sameAs": [
     "https://github.com/ayx234",
     "https://www.linkedin.com/in/ali-al-yahya-74b9b9155/"
    ]
   }
  </script>
```

The above scheme above tells search engines:

the page is about a Person (@type: "Person")
the person’s name (name: ...)
the person’s job title (jobTitle: ...)
where that person is also found online via profile links (sameAs, e.g., GitHub and LinkedIn)

### ARIA

For buttons that toggle a region' visibility, set aria-controls (the controlled element id) and aria-expanded (current state).

```HTML
<button
 class="nav-button"
 ...
 aria-controls="nav-ul"
 aria-expanded="false"
>
```

### Media Elements

#### Media loading/performance attributes

`loading="lazy"` defers loading media until it's near the viewport. This mproves initial page load time and reduces bandwidth use.

`decoding="async"` lets the browser to decode the media in the background without blocking page rendering as much. This helps improving performance and responsiveness.

Example:

```HTML
<img
  ...
  loading="lazy"
  decoding="async"
/>
```

#### Width/height for graphics

To keep stable layout when CSS doesn’t apply (or loads late), set width (and height when needed) on media elements to insure proper proportions when CSS is not available.

```HTML
<img
  width="<value>"
/>
```

#### Download links

Use an `<a>` with href and the download attribute. `<button>` elements don't have this capability.

```html
<a
  href="file-name.extension"
  download
>Download file-name</a>
```

## CSS

- Print break-* rules are inconsistent across browsers (June 2026).
- A sticky element on top of the page, such as a nav-bar, requires `scroll-margin-top`, set on the destination section, so the sticky element doesn’t hide the target.
- SVG sizing can be tricky. Give SVGs a single class and explicit width/height values.
- Interactive elements need enough touch-friendly sizing for accessibility.

### Print Styles

```CSS
.avoid-breaks-between-pages {
  break-inside: avoid;
  break-after: avoid; /* useful for headings */
  break-before: avoid;
}
```

Important: behavior differs between browsers even when the properties are supported. On this site, the rules worked as intended in desktop Chrome/Chromium, but not in some others (June 2026).

Fallback for older/less-uniform implementations:

```CSS
.avoid-breaks-between-pages {
  page-break-inside: avoid;
  page-break-after: avoid; /* useful for headings */
  page-break-before: avoid;
}
```

Chrome/Chromium-only (June 2026):

```CSS
.avoid-breaks-between-pages {
  widows: <number>; /* lines of text that appear top of the next page */
  orphans: <number>; /* lines of text that appear alone on the previous page */
}
```

### Avoiding Overlap of Sticky Elements when Navigating

```CSS
.nav {
  position: sticky;
  top: 0;
  z-index: 999;
}
```

When the sticky element covers the section you navigate to via #hash, add scroll-margin-top to the target elements.

#### Case 1: Fixed height sticky element

If `height` of the sticky elements is fixed,`scroll-margin-top` can be given with fixed values to the elements navigated to.

```CSS
.nav {
  height: 200px;
}

.section {
  scroll-margin-top: 200px;
}
```

#### Case 2: Sticky height derived from padding/margins + SVG height

If `height` of the sticky elements only depends on `margin`, `padding` and height of `<svg>` elements, the `scroll-margin-top` of the elements navigated to can be calculated based on these values. (if these values use `clamp()`, the same values can be added here to calculate `scroll-margin-top`)

```HTML
<nav>
  <button>
    <svg ...>
  </button>
</nav>
...
<a href="#my-section">...</a>
<section id"my-section"=>...</section>
```

```CSS
nav {
  padding-block: var(--variable-padding-value);
  margin-block: var(--variable-margin-value);
}

svg {
  height: var(--variable-svg-height);
}

section {
  scroll-margin-top: calc(2 * var(--variable-padding-value) + 2 * var(--variable-margin-value) + var(--variable-svg-height))
}
```

#### Case 3: Sticky height depends on variable font sizes (text)

If `height` of the sticky elements contains text, the size would not be predictable and JavaScript needs to be used to calculate the size of the elements covering the destination and the `scroll-margin-top` will also have to be set using JavaScript.

### Horizontally Center an Element That Has a Sibling

If you have two siblings, one of which you want to center horizontally while pushing the other sibling to the side, use this for the parent:

```CSS
.parent {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
}
```

### Sizing of SVG Elements
  
Sizing on browsers is quirky (April 2026).
For correct representation, use the following rules:

- Use only one css class for each `<svg>`
- `font-size` must be set
- `width` must be set for the element to appear
- `height` is also recommended to be used.
- use `1em` so `height` and `width` reflect `font-size`

### Minimum Sizing of Interactable Elements and Text Boxes

Buttons and text inputs should be large enough for touch interaction, especially on small screens. This also applies to text-box patterns like “text + button” composites.

Recommended baseline:

```CSS
.text-box {
 padding: 0.5em 1em; /* approximate values */
 border: .125em solid currentcolor; /* approximate values */
 min-height: 44px; /* This `px` value is the minimum absolute value recommended for accessibility. */
}
```

## JavaScript

- Guard clauses prevent runtime errors by exiting early when required DOM elements/data are missing.
- Use event listeners for navigation (hashchange) and responsiveness (resize).
- Use matchMedia for breakpoint-specific logic.
- Use document.readyState when you need to wait until loading has started.

### Guared Clauses

Defensive programming: return early if required elements are missing.

```JS
function initNav() {
 if (
  !MAIN_NAV ||
  !MAIN_NAV_BUTTON_CONTAINER ||
  !MAIN_NAV_BUTTON ||
  !MAIN_NAV_LINKS_UL ||
  MAIN_NAV_LINKS.length === 0 ||
  !MAIN_NAV_LI_HOME ||
  NAV_LINKS.length === 0
 ) {
  /*  Defensive check in case class names changed later 
  or for network issues etc */
  console.warn("Navigation elements not found");
  return;
 }
 ...
}
```

Guard clauses serve the following purposes:

- **Preconditions up front**: Checks that the reauired DOM elements, or data, are available before running the rest of the function.
- **Prevents runtime errors**: Avoids things like `"Cannot read properties of null/undefined"` or iterating over empty/undefined collections.
- **Reduces nesting**: If conditions are all in one block instead of being nested.
- **Makes failures explicit**: `console.warn(...)` gives you a clear signal where the function failed.

### Event Listener for Back/Forward Navigation

```JS
// Handle browser back/forward navigation
 window.addEventListener("hashchange", () => {
  scrollToAnchor(window.location.hash);
 });
```

#### Event Listener for When Windows Resizes

```JS
window.addEventListener("resize", <function>);
```

#### Checking a Specific Window Width Breakpoint

```JS
window.matchMedia("(min-width: 1500px)");
```

#### Checking if the Document is Loading

Checking if the document's loading has start but not yet completed:

```JS
if (document.readyState === "loading") {...}
```

## Notes

### Notes - Git

- Some earlier commits mixed many unrelated changes. Smaller, focused commits would have been easier to review later.

### Notes - HTML

- "#" hashtags for `<h2>` and `<h3>` inside `<a>`
are inserted manually in html instead of through
using `::before` because vscodes' formatter inserts white spaces when not needed.
  - Solutions such as giving `{display: flex}` to `.h3` mess up the layout at some situations.
- `#nav-button-container` has an inline `display:none;`. This is for progressive enhancement. The element shouldn't appear when only HTML work (no CSS or JS). Adding this element, including
an `<svg>` child, is complicated and prone to errors using plain JS. JS modifies this inline style value when it's available.

### Notes - CSS

#### Notes - CSS - Print Styles

`_print.scss`

- Page breaks using `page-break-inside` `break-inside` `break-after` etc...
  - These styles are applyt as intended on Chrome and Edge
  - They are not applying as intended on Firefox
     or browsers on iOS (June 2026).

#### Font Importing

In `_settings.scss`:

- `@import` is used for faster loading when users have the font
loaded on their machines.
- `@font-face` is a fallback
