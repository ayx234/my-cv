/** @format */

/* ======== Nav Behavior ======= */

/* States */
let navIsOpen = false;
let navInitialized = false;

/* === Element Handles === */
/* Nav handles */
const MAIN_NAV = document.getElementById("nav");
const MAIN_NAV_CONTAINER = document.getElementById("container-nav");
const MAIN_NAV_BUTTON_CONTAINER = document.getElementById(
	"nav-button-container",
);
const MAIN_NAV_BUTTON = document.getElementById("nav-button");
const MAIN_NAV_LINKS_UL = document.getElementById("nav-ul");
const MAIN_NAV_LINKS = Array.from(
	document.getElementsByClassName("main-nav-link"),
);
const MAIN_NAV_LI_HOME = document.getElementById("main-nav-li-home");
const NAV_LINKS = Array.from(document.getElementsByClassName("nav-link"));

/* Layout handles */
const BODY = document.getElementsByTagName("body")[0];
const MAIN = document.getElementById("main");
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

	if (navInitialized) return;
	navInitialized = true;

	/* Progressive Enhancement:
			- remove adjustments made for only HTML & CSS version
	 */

	MAIN_NAV_CONTAINER.classList.add("js-active");
	CV_HEADER_ELEMENTS_CONTAINER.classList.add("js-active");

	/* Event handlers */

	// toggle nav click
	MAIN_NAV_BUTTON.addEventListener("click", toggleNav);

	// hide nav on internal link click
	MAIN_NAV_LINKS.forEach(link => {
		link.addEventListener("click", mimicFocusVisible);
	});
	/* hideNav is added separately because it is removed
	or added based on screen size media query  */
	MAIN_NAV_LINKS.forEach(link => {
		link.addEventListener("click", hideNav);
	});

	// hide nav on clicking outside
	document.addEventListener("click", handleClickOutside);

	// hide nav on tabbing outside
	document.addEventListener("focusin", handleFocusIn);

	// scroll into view on internal link click
	NAV_LINKS.forEach(link => {
		link.addEventListener("click", handleScrollToAnchor);
	});

	// Handle browser back/forward navigation
	window.addEventListener("hashchange", () => {
		scrollToAnchor(window.location.hash);
	});

	// Handle page load with hash (e.g., user bookmarks a section)
	// Update --nav-height CSS property on page load
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", onReady);
	} else {
		onReady();
	}

	// Update on window resize (in case nav height changes responsively)
	window.addEventListener("resize", updateNavHeight);

	/* Helper functions */
	function onReady() {
		scrollToAnchor(window.location.hash);
		updateNavHeight();
	}

	function toggleNav() {
		const isHidden = MAIN_NAV.getAttribute("data-visibility") === "hidden";

		if (isHidden) {
			showNav();
		} else {
			hideNav();
		}
	}

	function showNav() {
		navIsOpen = true;
		MAIN_NAV.setAttribute("data-visibility", "shown");
		MAIN_NAV_BUTTON.setAttribute("aria-expanded", "true");
		MAIN_NAV_LINKS_UL.setAttribute("aria-hidden", "false");
		MAIN_NAV_LINKS_UL.removeAttribute("inert");
		MAIN_NAV_LINKS.forEach(link => {
			link.removeAttribute("tabindex");
		});
		document.addEventListener("keydown", closeNavMenu);
	}

	function hideNav() {
		navIsOpen = false;
		MAIN_NAV.setAttribute("data-visibility", "hidden");
		MAIN_NAV_BUTTON.setAttribute("aria-expanded", "false");
		MAIN_NAV_LINKS_UL.setAttribute("aria-hidden", "true");
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
		if (!hash || hash === "#") return;

		const target = document.querySelector(hash);
		if (!target) return;

		const navHeight = MAIN_NAV.offsetHeight;
		const top =
			window.scrollY + target.getBoundingClientRect().top - navHeight;
		const prefersReducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;

		window.scrollTo({
			top: Math.max(top, 0),
			behavior: prefersReducedMotion ? "auto" : "smooth",
		});

		// focus on target for screenreaders so they make announciation
		const hadTabindex = target.hasAttribute("tabindex");

		if (!hadTabindex) target.setAttribute("tabindex", "-1");
		target.focus({ preventScroll: true });
		if (!hadTabindex) target.removeAttribute("tabindex"); // remove temporary focusability
	}

	function updateNavHeight() {
		document.documentElement.style.setProperty(
			"--nav-height",
			MAIN_NAV.offsetHeight + "px",
		);
	}

	function handleClickOutside(e) {
		if (!navIsOpen) return;
		if (!MAIN_NAV.contains(e.target)) hideNav();
	}
	function handleFocusIn(e) {
		if (!navIsOpen) return;
		if (!MAIN_NAV.contains(e.target)) hideNav();
	}

	function handleScrollToAnchor(e) {
		const link = e.currentTarget;
		const hash = link.getAttribute("href");
		if (!hash || hash === "#") return;

		e.preventDefault();
		scrollToAnchor(hash);
		history.pushState(null, "", hash);
	}

	function mimicFocusVisible(e) {
		const link = e.currentTarget;
		const hash = link.getAttribute("href");
		if (!hash || hash === "#") return;
		const target = document.querySelector(hash);
		if (!target) return;
		const anchorElement = target.querySelector(".nav-link");
		if (!anchorElement) return;
		focusTemp(anchorElement, 750, 1000);
	}

	function wait(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	async function focusTemp(el, MSBefore, MSAfter) {
		if (!el) return;
		await wait(MSBefore); // wait before adding
		el.setAttribute("data-focus-temporary", "true");
		await wait(MSAfter); // wait before removing
		el.removeAttribute("data-focus-temporary");
	}

	/* ===== Full Nav ===== */
	// set up MediaQuery for full nav
	const MQ_FULL_NAV_BREAKPOINT = window.matchMedia("(min-width: 1500px)");

	// initialize full nav
	handleFullNav(MQ_FULL_NAV_BREAKPOINT);

	// listen for full nav breakpoint
	if (typeof MQ_FULL_NAV_BREAKPOINT.addEventListener === "function") {
		MQ_FULL_NAV_BREAKPOINT.addEventListener("change", handleFullNav);
	} else {
		// Safari and older browsers
		MQ_FULL_NAV_BREAKPOINT.addListener(handleFullNav);
	}

	function handleFullNav(e) {
		const matches = typeof e === "boolean" ? e : e.matches;

		if (matches) {
			MAIN_NAV_BUTTON_CONTAINER.style.display = "none";
			showNav();
			MAIN_NAV_LI_HOME.style.display = "inline-block";

			MAIN_NAV_LINKS.forEach(link => {
				link.removeEventListener("click", hideNav);
			});

			document.removeEventListener("click", handleClickOutside);
			// hide nav on tabbing outside
			document.removeEventListener("focusin", handleFocusIn);
		} else {
			MAIN_NAV_BUTTON_CONTAINER.style.display = "grid";
			hideNav();
			MAIN_NAV_LI_HOME.style.display = "none";
			// reenable hide nav on internal link click
			MAIN_NAV_LINKS.forEach(link => {
				link.removeEventListener("click", hideNav);
				link.addEventListener("click", hideNav);
			});

			// renable hide nav on clicking outside
			document.removeEventListener("click", handleClickOutside);
			document.addEventListener("click", handleClickOutside);

			// reenable hide nav on tabbing outside

			document.removeEventListener("focusin", handleFocusIn);
			document.addEventListener("focusin", handleFocusIn);
		}
	}
}

initNav();

/* ======== Layout ======= */

// Set up MediaQueryList and listener
const MQ_SPLIT_LAYOUT_BREAKPOINT = window.matchMedia("(min-width: 1000px)");

// Track current layout state to make handleLayoutStructure idempotent
let isLargeScreenLayoutActive = false;

// Track whether media query listener is active (to disable during print)
let isMediaQueryListenerActive = false;

window.addEventListener("load", () => {
	// Initialize according to current size
	handleLayoutStructure(MQ_SPLIT_LAYOUT_BREAKPOINT);

	// Listen for changes
	if (typeof MQ_SPLIT_LAYOUT_BREAKPOINT.addEventListener === "function") {
		MQ_SPLIT_LAYOUT_BREAKPOINT.addEventListener(
			"change",
			handleLayoutStructure,
		);
	} else {
		// Safari and older browsers
		MQ_SPLIT_LAYOUT_BREAKPOINT.addListener(handleLayoutStructure);
	}
	isMediaQueryListenerActive = true;
});

// Handler called on matchMedia changes
function handleLayoutStructure(e) {
	const matches = typeof e === "boolean" ? e : e.matches;

	// Early return if already in the requested state (idempotent check)
	if (matches === isLargeScreenLayoutActive) {
		return;
	}

	if (matches) {
		// viewport >= 1000px
		/* Create new layout elements */
		const layoutContainerLargerScreens = $createElement(
			"div",
			["layout-container-larger-screens"],
			"layout-container-larger-screens",
		);
		const sideForLargerScreens = $createElement(
			"aside",
			["side-larger-screens", "bg-color-secondary"],
			"side-larger-screens",
		);
		MAIN.classList.add("main-larger-screens");
		/* Add new layout elements to page */
		layoutContainerLargerScreens.appendChild(sideForLargerScreens);
		layoutContainerLargerScreens.appendChild(MAIN);
		MAIN_NAV.insertAdjacentElement(
			"afterend",
			layoutContainerLargerScreens,
		);

		// move page sections to new layout elements
		PAGE_SECTIONS.forEach(section => {
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
				if (section.classList.contains("bg-color-secondary")) {
					section.classList.remove("bg-color-secondary");
				}
			}
		});

		// Remove elements of older layout
		HEADER.parentElement.removeChild(HEADER);

		// Update state tracking
		isLargeScreenLayoutActive = true;
	} else {
		// viewport < 1000px

		if (!MAIN.contains(HEADER)) {
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

			// Modify layout
			CV_HEADER_ELEMENTS_CONTAINER.appendChild(HOME);
			CV_HEADER_ELEMENTS_CONTAINER.appendChild(CONTACT);

			MAIN.insertBefore(HEADER, MAIN.firstChild);
			MAIN.insertBefore(TECHNICAL_SKILLS, GITHUB_PROJECTS);
			MAIN.insertBefore(SOFT_SKILLS, WORK);
			MAIN.appendChild(LANGUAGES);
			BODY.appendChild(MAIN);
			BODY.removeChild(LAYOUT_CONTAINER_LARGER_SCREENS);

			MAIN.classList.remove("main-larger-screens");
			EDUCATION.classList.add("bg-color-secondary");
			LANGUAGES.classList.remove("bg-color-secondary");

			// Update state tracking
			isLargeScreenLayoutActive = false;
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

/* ======== Print Support ======= */

/**
 * Ensure large-screen layout is active during print.
 *
 * On beforeprint: Activate the >=1000px layout if not already active.
 * On afterprint: Restore the layout based on current viewport width.
 *
 * This ensures printed output always shows the 2-column sidebar + main layout,
 * and returns to responsive behavior after print preview is closed.
 */

let wasLargeScreenLayoutActiveBefore = false;

window.addEventListener("beforeprint", () => {
	// Disable the media query listener to prevent Chrome's print viewport changes
	// from interfering with the layout during print preview
	if (typeof MQ_SPLIT_LAYOUT_BREAKPOINT.removeEventListener === "function") {
		MQ_SPLIT_LAYOUT_BREAKPOINT.removeEventListener(
			"change",
			handleLayoutStructure,
		);
	} else if (
		typeof MQ_SPLIT_LAYOUT_BREAKPOINT.removeListener === "function"
	) {
		// Safari and older browsers
		MQ_SPLIT_LAYOUT_BREAKPOINT.removeListener(handleLayoutStructure);
	}
	isMediaQueryListenerActive = false;

	// Check if large-screen layout is already active
	const layoutContainerExists = document.getElementById(
		"layout-container-larger-screens",
	);
	wasLargeScreenLayoutActiveBefore = !!layoutContainerExists;

	// If not active, activate it (simulating >=1000px layout)
	if (!wasLargeScreenLayoutActiveBefore) {
		handleLayoutStructure(true); // Force large-screen layout
	} else {
		// 	console.log(document.getElementById(
		// 	"layout-container-larger-screens",
		// ).children);
	}
});

window.addEventListener("afterprint", () => {
	// Re-enable the media query listener
	if (typeof MQ_SPLIT_LAYOUT_BREAKPOINT.addEventListener === "function") {
		MQ_SPLIT_LAYOUT_BREAKPOINT.addEventListener(
			"change",
			handleLayoutStructure,
		);
	} else {
		// Safari and older browsers
		MQ_SPLIT_LAYOUT_BREAKPOINT.addListener(handleLayoutStructure);
	}
	isMediaQueryListenerActive = true;

	// After printing, restore the layout based on actual viewport width
	const shoudLargeScreenLayoutBeActiveLater = window.matchMedia(
		"(min-width: 1000px)",
	).matches;

	// Only restore if the layout state should change
	if (
		!wasLargeScreenLayoutActiveBefore &&
		shoudLargeScreenLayoutBeActiveLater
	) {
		// Layout should stay large-screen; do nothing (handleLayoutStructure(true) was executed in beforeprint event)
	} else if (
		wasLargeScreenLayoutActiveBefore &&
		!shoudLargeScreenLayoutBeActiveLater
	) {
		// Layout was large-screen before but should now be mobile; switch back
		handleLayoutStructure(false); // Force mobile layout
	} else if (
		!wasLargeScreenLayoutActiveBefore &&
		!shoudLargeScreenLayoutBeActiveLater
	) {
		handleLayoutStructure(false); // (handleLayoutStructure(true) was executed in beforeprint event - we need to reverse it)
	}
	// else:
	// wasLargeScreenLayoutActiveBefore && shoudLargeScreenLayoutBeActiveLater
	// layout was large-screen and should stay large-screen; do nothing
});
