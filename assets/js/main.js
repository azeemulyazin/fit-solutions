// 1. Swiper Carousel
var swiper = new Swiper(".my-carousel__swiper", {
  loop: true,
  grabCursor: true,
  centeredSlides: true,
  spaceBetween: 20,
  effect: "creative",
  creativeEffect: {
    perspective: true,
    limitProgress: 3,
    prev: {
      translate: ["-100%", "30%", -100],
      rotate: [0, 0, -30],
      origin: "bottom"
    },
    next: {
      translate: ["100%", "30%", -100],
      rotate: [0, 0, 30],
      origin: "bottom"
    }
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false
  },
  breakpoints: {
    0: { slidesPerView: 1 },
    640: { slidesPerView: 2 },
    1024: { slidesPerView: 3 }
  }
});

// 2. Rhombus Icon Placement
function placeRhombus(selector, count, widthPercent, heightPercent) {
  const wrapper = document.querySelector('.icon-wrapper');
  const icons = document.querySelectorAll(selector);
  const centerX = wrapper.offsetWidth / 2;
  const centerY = wrapper.offsetHeight / 2;
  const radiusX = (wrapper.offsetWidth / 2) * widthPercent;
  const radiusY = (wrapper.offsetHeight / 2) * heightPercent;

  icons.forEach((icon, i) => {
    const angle = (i / count) * (2 * Math.PI);
    const x = centerX + radiusX * Math.cos(angle) - icon.offsetWidth / 2;
    const y = centerY + radiusY * Math.sin(angle) - icon.offsetHeight / 2;
    icon.style.left = `${x}px`;
    icon.style.top = `${y}px`;
  });
}

function updateRhombusLayout() {
  let smallWidth = 0.7, smallHeight = 0.4, bigWidth = 1.1, bigHeight = 0.8;
  const screenWidth = window.innerWidth;

  if (screenWidth < 576) {
    smallWidth = 0.6; smallHeight = 0.4; bigWidth = 1; bigHeight = 0.7;
  } else if (screenWidth < 768) {
    smallWidth = 0.8; smallHeight = 0.45; bigWidth = 0.8; bigHeight = 0.6;
  }

  placeRhombus(".rhombus-small", 8, smallWidth, smallHeight);
  placeRhombus(".rhombus-big", 12, bigWidth, bigHeight);
}

window.addEventListener("DOMContentLoaded", () => {
  updateRhombusLayout();
  AOS.init({ duration: 1000, once: true }); // 3. AOS Animation
});

window.addEventListener("resize", updateRhombusLayout);

// 4. Back to Top Button + WhatsApp Button
const backToTopBtn = document.getElementById('backToTop');
const whatsappBtn = document.getElementById('whatsappBtn'); // Optional visibility control

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add('show');
    // whatsappBtn.classList.add('show'); // If WhatsApp was hidden initially
  } else {
    backToTopBtn.classList.remove('show');
    // whatsappBtn.classList.remove('show');
  }
});

backToTopBtn?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// 5. Counter Animation
function animateCounter(el, target, duration = 2000) {
  let start = 0, startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = timestamp - startTime;
    const value = Math.min(Math.floor(progress / duration * target), target);
    el.innerText = value;
    if (value < target) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

function runCounters() {
  const counters = document.querySelectorAll('.count');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-count'), 10);
    animateCounter(counter, target);
  });
}

let triggered = false;
window.addEventListener('scroll', () => {
  const section = document.querySelector('.counter-section');
  if (!section) return;
  const sectionTop = section.getBoundingClientRect().top;
  const screenHeight = window.innerHeight;

  if (!triggered && sectionTop < screenHeight - 100) {
    triggered = true;
    runCounters();
  }
});
