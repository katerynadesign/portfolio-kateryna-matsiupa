// Mobile nav toggle
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// Site header: slides away while scrolling down, returns on scroll up
const siteHeader = document.querySelector(".site-header");

if (siteHeader) {
  let lastScrollY = window.scrollY;

  window.addEventListener(
    "scroll",
    () => {
      const y = window.scrollY;
      const delta = y - lastScrollY;
      if (Math.abs(delta) < 6) return; // ignore jitter
      lastScrollY = y;

      const menuOpen = navLinks.classList.contains("open");
      const nearTop = y < siteHeader.offsetHeight;
      siteHeader.classList.toggle("is-hidden", delta > 0 && !nearTop && !menuOpen);
    },
    { passive: true }
  );
}

// Nav active state: underline the link for the current page (persistently, the same look
// hover already has — see .nav-links a.is-active in css/components.css). "work" covers
// work.html and every case study page, since they all live under Work; "about"/"contact" only
// apply on the home page, and between the two follow scroll position (the Hero counts as
// neither).
const navLinksForActive = document.querySelectorAll(".nav-links a[data-nav]");

if (navLinksForActive.length) {
  const setActiveNav = (name) => {
    navLinksForActive.forEach((link) => {
      link.classList.toggle("is-active", link.dataset.nav === name);
    });
  };

  const page = location.pathname.split("/").pop() || "index.html";
  const caseStudyPages = [
    "ai-assistant-platform.html",
    "case-study-2.html",
    "case-study-3.html",
    "case-study-4.html",
    "case-study-template.html",
  ];

  if (page === "work.html" || caseStudyPages.includes(page)) {
    setActiveNav("work");
  } else if (page === "index.html" || page === "") {
    const about = document.getElementById("about");
    const contact = document.getElementById("contact");

    if (about && contact && "IntersectionObserver" in window) {
      const sectionObserver = new IntersectionObserver(
        (entries) => {
          const mostVisible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
          if (mostVisible) setActiveNav(mostVisible.target.id);
        },
        { rootMargin: "-40% 0px -40% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
      );
      sectionObserver.observe(about);
      sectionObserver.observe(contact);
    }
  }
}

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Contact form
// NOTE: static hosting (GitHub Pages) can't process form submissions server-side.
// Wire the `action`/fetch target to a form backend (e.g. Formspree) before launch.
// The contact form and the carousel only exist on index.html; this script is
// shared with the case study pages, so each block runs only if its markup exists.
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formStatus.textContent = "Message form isn't connected to a backend yet.";
  });
}

// Work carousel — prev/next controls. Currently unused: the carousel moved off index.html to
// work.html (a stacked list, no scrolling), so no page has a #carousel element any more. Kept,
// guarded by the check below, in case a carousel is wanted again somewhere.
const carousel = document.getElementById("carousel");

if (carousel) {
  const carouselTrack = carousel.querySelector(".carousel-track");
  const prevBtn = document.getElementById("carouselPrev");
  const nextBtn = document.getElementById("carouselNext");

  function scrollCarousel(direction) {
    const item = carouselTrack.querySelector(".case-item");
    const gap = parseFloat(getComputedStyle(carouselTrack).gap) || 0;
    const amount = (item.getBoundingClientRect().width + gap) * direction;
    carousel.scrollBy({ left: amount, behavior: "smooth" });
  }

  function updateCarouselButtons() {
    // The CSS gives the carousel a scroll-padding equal to its left padding, so
    // the first card rests on grid column 1 at scrollLeft 0.
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    prevBtn.disabled = carousel.scrollLeft <= 4;
    nextBtn.disabled = carousel.scrollLeft >= maxScroll - 4;
  }

  prevBtn.addEventListener("click", () => scrollCarousel(-1));
  nextBtn.addEventListener("click", () => scrollCarousel(1));
  carousel.addEventListener("scroll", updateCarouselButtons, { passive: true });
  window.addEventListener("resize", updateCarouselButtons);
  updateCarouselButtons();
}
