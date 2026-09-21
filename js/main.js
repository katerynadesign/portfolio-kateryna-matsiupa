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

// Work carousel — prev/next controls
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
