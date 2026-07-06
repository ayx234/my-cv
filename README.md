# Ali Al Yahya's CV Webpage

This project is a responsive, single-page CV website for Ali Al Yahya.

Built with semantic HTML, modular SCSS, and JavaScript. It uses a progressive enhancement approach: it remains presentable with HTML alone, improves styling and layout when CSS loads, and adds enhanced interactivity once JavaScript is available. The design is mobile-first, with fluid spacing and type scales to adapt smoothly across screen sizes. It also includes breakpoint-based layout upgrades for larger devices and print screens.

## Table of Contents

- [Overview](#overview)
- [Requirements and Setup](#requirements-and-setup)
- [Author](#author)

## Overview

- [Features](#features)
- [Screeshots](#screenshots)
- [Links](#links)

### Features

- Responsive layout that stacks content on smaller screens and switches to a two-column sidebar/main layout at wider viewport sizes.
- Accessible navigation with a mobile menu toggle, keyboard support, focus management, and reduced-motion-aware scrolling.
- Semantic structure with section anchors, metadata for SEO/social sharing, and JSON-LD person schema.
- Print-optimized styles for A4 output, including layout, hidden interactive elements, page-break handling, and a downloadable PDF-friendly presentation.
- A downloadable PDF link from the hero section.

## Screenshots

### Mobile - Smaller Screens (375px)

![Mobile - Smaller Screens](./assets/images/screenshots/iPhone.jpeg)

### Tablets - Medium Screens (768px)

![Tablets - Medium Screens](./assets/images/screenshots/iPad.jpeg)

### Desktop - Larger Screens (1600px)

![Desktop - Larger Screens](./assets/images/screenshots/Surface-Laptop-Studio-1.jpeg)

### Print (A4)

![Print](./assets/images/screenshots/Print.jpg)

### Links

- [GitHub Repository](https://github.com/ayx234/my-cv)
- [Live Site](https://ayx234.github.io/my-cv)

## Requirements and Setup

- [Resquirements](#requirements)
- [Local Development](#local-development)
- [Project Structure](#project-structure)
- [Customization Points](#customization-points)
- [Deployment and Hosting](#deployment-and-hosting)

### Requirements

- A modern web browser
- Node.js and npm if you want to rebuild the stylesheet from SCSS

### Local development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the SCSS watcher:

   ```bash
   npm run sass:watch
   ```

3. Open the project in a browser, for example by serving the root folder with a static server or opening [index.html](./index.html) directly.

The compiled CSS is already included at [assets/styles/css/styles.css](./assets/styles/css/styles.css), so the site can be viewed without a build step. The watcher regenerates that file when SCSS changes.

### Project Structure

- [index.html](./index.html): Main document structure, content, metadata, and section IDs used by the JavaScript navigation and layout logic.
- [assets/styles/scss/main.scss](./assets/styles/scss/main.scss): Entry point that imports the modular SCSS partials.
- [assets/styles/scss/_settings.scss](./assets/styles/scss/_settings.scss): Font setup and root CSS variables.
- [assets/styles/scss/_mixins.scss](./assets/styles/scss/_mixins.scss): SASS mixins.
- [assets/styles/scss/_reset.scss](./assets/styles/scss/_reset.scss): CSS reset.
- [assets/styles/scss/_general.scss](./assets/styles/scss/_general.scss): Base typography and element styling.
- [assets/styles/scss/_layout.scss](./assets/styles/scss/_layout.scss): Page composition, spacing, and layout primitives.
- [assets/styles/scss/_components.scss](./assets/styles/scss/_components.scss): Component-level styles for the navigation, hero, contact links, and other UI elements.
- [assets/styles/scss/_utilities.scss](./assets/styles/scss/_utilities.scss): Utility styles applied on top of component styles.
- [assets/styles/scss/_larger-screens.scss](./assets/styles/scss/_larger-screens.scss): Styles applied for wider layouts.
- [assets/styles/scss/_print.scss](./assets/styles/scss/_print.scss): Print-specific styles and A4 layout rules.
- [assets/js/main.js](./assets/js/main.js): Navigation behavior, responsive layout adjustments, anchor scrolling, focus handling, and print-mode behavior.
- [assets/pdf](./assets/pdf): PDF resume assets.
- [assets/images](./assets/images): Profile images, screenshots, and page images.

### Customization Points

- Update the CV content directly in [index.html](./index.html).
- Change the visual design in the SCSS partials under [assets/styles/scss](./assets/styles/scss).
- If you change section IDs, update the selectors in [assets/js/main.js](./assets/js/main.js) so navigation and layout behavior continue to work.
- Replace the PDF file in [assets/pdf](./assets/pdf) if you want to update the downloadable resume.

### Deployment and Hosting

This is a static website, so it can be deployed to any static hosting service such as GitHub Pages, Netlify, Vercel, or a simple web server.

For GitHub Pages, publish the repository root or the relevant branch containing the site files. Because the project uses relative asset paths, it should work without additional configuration as long as the files are served from the same directory structure.

## Author

GitHub: [Ali Al Yahya](https://github.com/ayx234/)
