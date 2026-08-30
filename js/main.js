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
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formStatus.textContent = "Message form isn't connected to a backend yet.";
});

// Work carousel — prev/next controls
const carousel = document.getElementById("carousel");
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
  // The carousel's left padding (aligning item one with grid column one) is
  // itself scrollable, so the resting "start" position equals that padding,
  // not 0.
  const minScroll = parseFloat(getComputedStyle(carousel).paddingLeft) || 0;
  const maxScroll = carousel.scrollWidth - carousel.clientWidth;
  prevBtn.disabled = carousel.scrollLeft <= minScroll + 4;
  nextBtn.disabled = carousel.scrollLeft >= maxScroll - 4;
}

prevBtn.addEventListener("click", () => scrollCarousel(-1));
nextBtn.addEventListener("click", () => scrollCarousel(1));
carousel.addEventListener("scroll", updateCarouselButtons, { passive: true });
window.addEventListener("resize", updateCarouselButtons);
updateCarouselButtons();
