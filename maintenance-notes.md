# Maintenance Notes

This file collects maintenance-oriented context for the project.

## Why the site is structured this way

- The page uses a progressive enhancement approach: it remains usable with HTML alone, gains presentation with CSS, and gains extra behavior with JavaScript.
- The layout is mobile-first and shifts to a wider two-column composition at larger viewport sizes.
- The JavaScript layer performs layout adjustments for larger screens and print behavior. It also controls navigation for smaller screens (<1500px).

## Notes for future maintenance

- The compiled CSS file should stay in sync with the SCSS source when styles change.
- If the HTML structure changes significantly, review the selectors in `assets/js/main.js` so navigation and layout behavior still work.
- Print behavior is most reliable in Chromium-based browsers, though the stylesheet is designed to be as robust as possible.
- Larger-screen and print layouts are adjusted dynamically with JavaScript, which makes the code more flexible but also more complex to maintain.

## Project shortcomings to keep in mind

- Some breakpoints are implemented as magic numbers rather than as fully abstracted design tokens.
- The larger-screen layout and print layout rely on DOM manipulation when JavaScript is available, which makes the code harder to maintain than a fully static layout approach.

## Coming updates

- Update the downloadable PDF.
- Add dark mode support.
- Refactor the JavaScript into modules.
- _utilities.scss should be the last stylesheet referred
  - move referrence to last in main.scss
  - adjust component styles if necessary
- Reorganize and simplify the print stylesheet.
  - re-organize file
  - fine-tune print layout when no js
  - remove non-used styles
  - make all color values variables
  