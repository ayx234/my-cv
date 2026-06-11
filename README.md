# CV Webpage

## Working on

### Issues

- Javascript dependency for mobile navigation
  - This is because the navigation menu is too large to be displayed all the time on mobile screens and the toggle button would only work with js

## Done

## Next

- Review AI assisted
  - first pass of ai review
    - PRIORITIZED ACTIONABLE LIST
      - MEDIUM
- Work on the print version of the webpage
- update picture for shared links to yellow background
- include this cv project in the cv

## Notes

- [HIGH] index.html:274 - Profile image lacks height attribute (has width="168" but missing height); implicit aspect ratio not enforced
  - including a height attribute would messup the dimensions when css and js are activated (probably only css) and including property aspect-ratio would probably not be percise for this picture.
- [HIGH] index.html:1250-1350 - Experience section icons are <svg> with aria-hidden="true" but no text labels provided; dates/locations rely on icon context
  - the line references are messed up in copilot's response, and I didn't find the mentioned issue reviewing manually

### Git

- Git commits are not optimal. Most commits have to many changes in too many files.

### HTML

- "#" hashtags for `<h2>` and `<h3>` inside `<a>`
are inserted manually in html instead of through
using ::before because some `<h3>` elements are parent
elements that have child nodes and this puts white-space
characters between the hashes and the text/element nodes.
  - `<h2>` hashtags are also inserted manually to stay consistent
  - Other solutions such as giving `{display: flex}` to `.h3` mess up
the layout at some situations.
- #nav-button-container has an inline display:none;.
This is for progressive enhancement so the element
doesn't appear when only HTML work (no CSS or JS) and
adding this element and it's children, including
an `<svg>` from font-awesome is complicated and
prone to errors through plain JS. When JS works,
it modifies this inline style value.
