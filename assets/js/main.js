/** @format */

/* ======== Nav Behavior ======= */

/* States */
navIsOpen = false;

/* === Element Handles === */
/* Nav handles */
const MAIN_NAV = document.getElementById("nav");
const MAIN_NAV_BUTTON = document.getElementById("nav-button");
const MAIN_NAV_LINKS_UL = document.getElementById("nav-ul");
const MAIN_NAV_LINKS = Array.from(
	document.getElementsByClassName("main-nav-link"),
);
const NAV_LINKS = Array.from(document.getElementsByClassName("nav__link"));
/* Layout handles */
const BODY = document.getElementsByTagName("body")[0];
const HEADER = document.getElementsByTagName("header")[0];
const CV_HEADER_ELEMENTS_CONTAINER = document.getElementById(
	"cv-header-elements-container",
);
const PAGE_SECTIONS = $ArrayElementsByClass("page-section");

/**
 * Initialize the main navigation:
 * - Queries required DOM elements.
 * - Attaches event listeners for toggling, hiding, focus handling,
 *   scrolling to anchors, and responsive height updates.
 * - Defines helper functions scoped to the queried elements.
 *
 * If any required navigation element is missing the function logs a
 * warning and returns early (no listeners are attached).
 *
 * Usage:
 *   initNav();
 *
 * @returns {void}
 */
function initNav() {
	if (
		!MAIN_NAV ||
		!MAIN_NAV_BUTTON ||
		!MAIN_NAV_LINKS_UL ||
		MAIN_NAV_LINKS.length === 0 ||
		NAV_LINKS.length === 0
	) {
		/*  Defensive check in case class names changed later 
		or for network issues etc */
		console.warn("Navigation elements not found");
	}

	/* Event handlers */
	// toggle nav click
	MAIN_NAV_BUTTON.addEventListener("click", toggleNav);

	// hide nav on internal link click
	MAIN_NAV_LINKS.forEach(link => {
		link.addEventListener("click", hideNav);
	});

	// hide nav on clicking outside
	document.addEventListener("click", e => {
		if (!MAIN_NAV.contains(e.target)) {
			hideNav();
		}
	});

	// hide nav on tabbing outside

	document.addEventListener("focusin", e => {
		if (!navIsOpen) return;
		// if the newly focused element is not inside nav or the toggle, close nav
		if (!MAIN_NAV.contains(e.target)) {
			hideNav();
		}
	});

	// scroll into view on internal link click
	NAV_LINKS.forEach(link => {
		link.addEventListener("click", _ => {
			const hash = link.getAttribute("href");
			scrollToAnchor(hash);
		});
	});

	// Handle browser back/forward navigation
	window.addEventListener("hashchange", () => {
		scrollToAnchor(window.location.hash);
	});

	// Handle page load with hash (e.g., user bookmarks a section)
	document.addEventListener("DOMContentLoaded", () => {
		scrollToAnchor(window.location.hash);
	});

	// Update --nav-height CSS property on page load
	document.addEventListener("DOMContentLoaded", () => {
		updateNavHeight();
	});

	// Update on window resize (in case nav height changes responsively)
	window.addEventListener("resize", updateNavHeight);

	/* Helper functions */
	function toggleNav() {
		const isHidden = MAIN_NAV.getAttribute("aria-hidden") === "true";

		if (isHidden) {
			showNav();
		} else {
			hideNav();
		}
	}

	function showNav() {
		navIsOpen = true;
		MAIN_NAV.setAttribute("aria-hidden", "false");
		MAIN_NAV_BUTTON.setAttribute("aria-expanded", "true");
		MAIN_NAV_LINKS_UL.removeAttribute("inert");
		MAIN_NAV_LINKS.forEach(link => {
			link.removeAttribute("tabindex");
		});
		document.addEventListener("keydown", closeNavMenu);
	}

	function hideNav() {
		navIsOpen = false;
		MAIN_NAV.setAttribute("aria-hidden", "true");
		MAIN_NAV_BUTTON.setAttribute("aria-expanded", "false");
		MAIN_NAV_LINKS_UL.setAttribute("inert", "");
		MAIN_NAV_LINKS.forEach(link => {
			link.setAttribute("tabindex", "-1");
		});
		document.removeEventListener("keydown", closeNavMenu);
	}

	function closeNavMenu(e) {
		if (e.key === "Escape" || e.key === "Esc") {
			hideNav();
		}
	}

	function scrollToAnchor(hash) {
		if (!hash) return;

		const target = document.querySelector(hash);
		if (!target) return;

		const navHeight = MAIN_NAV.offsetHeight;
		const targetPosition = target.offsetTop - navHeight;

		window.scrollTo({
			top: targetPosition,
			behavior: "smooth",
		});

		// focus on target for screenreaders so they make announciation
		const hadTabindex = target.hasAttribute("tabindex");

		if (!hadTabindex) {
			target.setAttribute("tabindex", "-1");
		}
		target.focus({ preventScroll: true });

		if (!hadTabindex) {
			target.removeAttribute("tabindex"); // remove temporary focusability
		}
	}

	function updateNavHeight() {
		document.documentElement.style.setProperty(
			"--nav-height",
			MAIN_NAV.offsetHeight + "px",
		);
	}
}

initNav();

/* ======== Layout ======= */

// Set up MediaQueryList and listener
const MQ_SCREEN_SIZE = window.matchMedia("(min-width: 1000px)");

// Initialize according to current size
handleLayoutStructure(MQ_SCREEN_SIZE);

// Listen for changes
if (typeof MQ_SCREEN_SIZE.addEventListener === "function") {
	MQ_SCREEN_SIZE.addEventListener("change", handleLayoutStructure);
} else {
	// Safari and older browsers
	MQ_SCREEN_SIZE.addListener(handleLayoutStructure);
}

// Handler called on matchMedia changes
function handleLayoutStructure(e) {
	if (e.matches) {
		// viewport >= 1000px
		// if (!currentEl) {
		//   currentEl = createElement();
		//   container.appendChild(currentEl);
		// }
		/* Create new layout elements */
		const layoutContainerLargerScreens = $createElement(
			"div",
			["layout-container-larger-screens"],
			"layout-container-larger-screens",
		);
		const sideForLargerScreens = $createElement(
			"side",
			["side-larger-screens", "bg-color-secondary"],
			"side-larger-screens",
		);
		const mainForLargerScreens = $createElement(
			"main",
			["main-larger-screens"],
			"main-larger-screens",
		);
		/* Add new layout elements to page */
		layoutContainerLargerScreens.appendChild(sideForLargerScreens);
		layoutContainerLargerScreens.appendChild(mainForLargerScreens);
		MAIN_NAV.insertAdjacentElement(
			"afterend",
			layoutContainerLargerScreens,
		);

		// move page sections to new layout elements
		PAGE_SECTIONS.forEach(section => {
			section.parentElement.removeChild(section);
			const id = section.id;
			if (
				id === "home" ||
				id === "contact" ||
				id === "technical-skills" ||
				id === "soft-skills" ||
				id === "languages"
			) {
				if (!section.classList.contains("bg-color-secondary")) {
					section.classList.add("bg-color-secondary");
				}
				sideForLargerScreens.appendChild(section);
			} else {
				// put section in mainForLargerScreens
				if (section.classList.contains("bg-color-secondary")) {
					section.classList.remove("bg-color-secondary");
				}
				mainForLargerScreens.appendChild(section);
			}
		});

		// Remove elements of older layout
		HEADER.parentElement.removeChild(HEADER);
	} else {
		// viewport < 1000px
		// if (currentEl) {
		//   currentEl.remove();
		//   currentEl = null;
		// }

		// put header section back in layout
		if (!BODY.contains(HEADER)) {
			// Page sections handles
			const LAYOUT_CONTAINER_LARGER_SCREENS = document.getElementById(
				"layout-container-larger-screens",
			);
			const HOME = document.getElementById("home");
			const CONTACT = document.getElementById("contact");
			const PROFILE = document.getElementById("profile");
			const TECHNICAL_SKILLS =
				document.getElementById("technical-skills");
			const GITHUB_PROJECTS = document.getElementById("github-projects");
			const SOFT_SKILLS = document.getElementById("soft-skills");
			const WORK = document.getElementById("work");
			const EDUCATION = document.getElementById("education");
			const LANGUAGES = document.getElementById("languages");
			// HEADER is already there in HTML - without the if statement, it will be moved to the end of <body>
			BODY.appendChild(HEADER);

			// if(!HEADER.contains(HOME)){
			// only a check of one element is needed to know the layout
			CV_HEADER_ELEMENTS_CONTAINER.appendChild(HOME);
			CV_HEADER_ELEMENTS_CONTAINER.appendChild(CONTACT);
			BODY.appendChild(PROFILE);
			BODY.appendChild(TECHNICAL_SKILLS);
			BODY.appendChild(GITHUB_PROJECTS);
			BODY.appendChild(SOFT_SKILLS);
			BODY.appendChild(WORK);
			EDUCATION.classList.add("bg-color-secondary");
			BODY.appendChild(EDUCATION);
			LANGUAGES.classList.remove("bg-color-secondary");
			BODY.appendChild(LANGUAGES);
			// remove large screen layout container
			BODY.removeChild(LAYOUT_CONTAINER_LARGER_SCREENS);
		}
	}
}

function $createElement(type, classes, id) {
	const element = document.createElement(type);
	if (classes) {
		const CLASSES_STR = classes.join(" ");
		element.className = CLASSES_STR;
	}
	if (id) element.id = id;
	return element;
}

/* DOM Helpers */

function $ArrayElementsByClass(className) {
	return Array.from(document.getElementsByClassName(className));
}

function $ElementByID(id) {
	return document.getElementById(id);
}
