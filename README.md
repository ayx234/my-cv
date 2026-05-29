# CV Webpage

## Working on
    

## Done


## Next

- work on progressive enhancement:
  - JS included version
  - add scrollToAnchor on click event for `.page-subsection`
  along with `.page-section`

- Review - manual and AI
- Work on the print version of the webpage
- update picture for shared links to yellow background

## Notes

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
