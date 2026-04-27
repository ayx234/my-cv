/** @format */

/*  Handles */
const NAV = document.getElementById("nav");
const NAV_BUTTON = document.getElementById("nav-button");
const NAV_LINKS = document.getElementsByClassName("nav__link");

/* Event handlers */
// toggle nav click
NAV_BUTTON.addEventListener("click", toggleNav);

// hide nav on internal link click
Array.from(NAV_LINKS).forEach(link => {
	link.addEventListener("click", hideNav);
});

// scroll into view on internal link click
Array.from(NAV_LINKS).forEach(link => {
	link.addEventListener("click", _ => {
		console.log("link clicked")
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
window.addEventListener('resize', updateNavHeight);

/* Helper functions */
function toggleNav() {
	const STATUS = NAV.dataset.status;

	if (STATUS === "nav-hidden") {
		NAV.dataset.status = "nav-shown";
	} else {
		NAV.dataset.status = "nav-hidden";
	}
}

function hideNav() {
	NAV.dataset.status = "nav-hidden";
}

function scrollToAnchor(hash) {
	if (!hash) return;
	console.log(hash);
  
	const target = document.querySelector(hash);
	if (!target) return;
	
	const navHeight = NAV.offsetHeight;
  console.log("navHeight =", navHeight);
	const targetPosition = target.offsetTop - navHeight;
	console.log(target.offsetTop);
	console.log(navHeight);
	console.log(targetPosition);

	window.scrollTo({
		top: targetPosition,
		behavior: "smooth",
	});
}

function updateNavHeight() {
  document.documentElement.style.setProperty(
    '--nav-height',
    NAV.offsetHeight + 'px'
  );
}