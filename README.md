# CV Webpage

## Working on

## Next

- recheck progressive enhancement:
  - hide #nav-button-container when no js
  - website only html
    - HTML
      - add inline display:none to #nav-button-container (remove with js)
    - JS
      - add style.display="" to #nav-button-container

    - REACHED POINT ABOVE
  - website without js
- Review - manual and AI
- Work on the print version of the webpage
- update picture for shared links to yellow background

## Notes

- "#" hashtags for `<h2>` and `<h3>` inside `<a>`
are inserted manually in html instead of through
using ::before because some `<h3>` elements are parent
elements that have child nodes and this puts white-space
characters between the hashes and the text/element nodes.
  - `<h2>` hashtags are also inserted manually to stay consistent
  - Other solutions such as giving `{display: flex}` to `.h3` mess up
the layout at some situations.
- Git commits are not optimal. Most commits have to many changes in too many files.