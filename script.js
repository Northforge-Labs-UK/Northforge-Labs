document.body.classList.add("js");

const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const currentYear = document.querySelectorAll("#current-year");

if (navToggle && siteNav && navToggle.dataset.navInitialized !== "true") {
  navToggle.dataset.navInitialized = "true";
  const mobileNavQuery = window.matchMedia("(max-width: 700px)");

  const syncNavState = () => {
    const isMobile = mobileNavQuery.matches;
    const isExpanded = navToggle.getAttribute("aria-expanded") === "true";

    if (isMobile) {
      siteNav.hidden = !isExpanded;
      siteNav.classList.toggle("is-open", isExpanded);
      return;
    }

    navToggle.setAttribute("aria-expanded", "false");
    siteNav.hidden = false;
    siteNav.classList.remove("is-open");
  };

  navToggle.addEventListener("click", () => {
    const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isExpanded));
    syncNavState();
  });

  if (typeof mobileNavQuery.addEventListener === "function") {
    mobileNavQuery.addEventListener("change", syncNavState);
  } else if (typeof mobileNavQuery.addListener === "function") {
    mobileNavQuery.addListener(syncNavState);
  }

  syncNavState();
}

for (const element of currentYear) {
  element.textContent = new Date().getFullYear();
}
