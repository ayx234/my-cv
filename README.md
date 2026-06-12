# CV Webpage

## Working on

### Issues

- Javascript dependency for mobile navigation
  - This is because the navigation menu is too large to be displayed all the time on mobile screens and the toggle button would only work with js

## Done

## Next

- Review AI assisted
  - PASS 2:
    - start of pass 2
- Work on the print version of the webpage
- include this cv project in the cv

## Notes

### WIP

- [HIGH] index.html:1250-1350 - Experience section icons are `<svg>` with `aria-hidden="true"` but no text labels provided; dates/locations rely on icon context
  - the line references are messed up in copilot's response, and I didn't find the mentioned issue reviewing manually

### General

- '.personal-photo' was not given an explicit height attribute. Height and width don't have an exact 1:1 aspect ratios and inlcluding a height attribute, would messup the picture when css and js are activated (probably only css).


### Git

- Git commits are not optimal. Earlier commits have too many changes in too many files.

### HTML

- "#" hashtags for `<h2>` and `<h3>` inside `<a>`
are inserted manually in html instead of through
using ::before because some `<h3>` elements are parent
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
