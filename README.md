# CV Webpage

## Working on

- include this cv project in the cv

### Conventional commit message

## Done

## Next

- add pdf version and download button
- turn JS into modules.
- _print.scss
  - remove non-used styles
  - make all color values variables

## Notes

### WIP

### General

- '.personal-photo' was not given an explicit height attribute. Height and width don't have an exact 1:1 aspect ratios and inlcluding a height attribute, would messup the picture when css and js are activated (probably only css).

### Git

- Git commits are not optimal. Earlier commits have too many changes in too many files.

### HTML

- "#" hashtags for `<h2>` and `<h3>` inside `<a>`
are inserted manually in html instead of through
using `::before` because some `<h3>` elements are parent
elements that have child nodes and this puts white-space
characters between the hashes and the text/element nodes.
  - `<h2>` hashtags are also inserted manually to stay consistent
  - Other solutions such as giving `{display: flex}` to `.h3` mess up
the layout at some situations.
- `#nav-button-container` has an inline `display:none;`.
This is for progressive enhancement so the element
doesn't appear when only HTML work (no CSS or JS) and
adding this element and it's children, including
an `<svg>` from font-awesome is complicated and
prone to errors through plain JS. When JS works,
it modifies this inline style value.

### CSS & SCSS

- Font in _settings.scss
  - `@import` is used for faster loading when users have the font
loaded on their machines.
  - `@font-face` is a fallback
- Sizing `<svg>` elements
  - sizing on browsers is quirky (April 2026)
  - for correct representation:
    - use only one css class for each element
    - font-size must be set
    - height and width must be set for the element to appear
      - use 1em so height and width reflect font-size
- `@mixin text-box` has hardcoded `min-height: 44px`
  - px are used because this is the minimux absolute value recommended for accessibility.
