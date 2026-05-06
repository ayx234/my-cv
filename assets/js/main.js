/** @format */

/* States */
NAV_IS_OPEN = false;

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
	/*  Handles */
	const MAIN_NAV = document.getElementById("nav");
	const MAIN_NAV_BUTTON = document.getElementById("nav-button");
	const MAIN_NAV_LINKS_UL = document.getElementById("nav-ul");
	const MAIN_NAV_LINKS = Array.from(
		document.getElementsByClassName("main-nav-link"),
	);
	const NAV_LINKS = Array.from(document.getElementsByClassName("nav__link"));

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
		if (!NAV_IS_OPEN) return;
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
		NAV_IS_OPEN = true;
		MAIN_NAV.setAttribute("aria-hidden", "false");
		MAIN_NAV_BUTTON.setAttribute("aria-expanded", "true");
		MAIN_NAV_LINKS_UL.removeAttribute("inert");
		MAIN_NAV_LINKS.forEach(link => {
			link.removeAttribute("tabindex");
		});
		document.addEventListener("keydown", closeNavMenu);
	}

	function hideNav() {
		NAV_IS_OPEN = false;
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
