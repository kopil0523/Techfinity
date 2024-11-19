// ===============================
// Scroll Behavior: Header Hide/Show
// ===============================
let lastScrollTop = 0;
let header = document.querySelector('header');

function handleScroll() {
  let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
}

window.addEventListener('scroll', handleScroll);


// =====================
// Hamburger Menu Toggle
// =====================
document.getElementById("hamburger").addEventListener("click", function() {
  const navMenu = document.getElementById("nav-menu");
  const hamburger = document.getElementById("hamburger");
  navMenu.classList.toggle("open");
  hamburger.classList.toggle("open");
});


// =============
// Tab Switching
// =============
function openTab(tabName) {
  const tabs = document.querySelectorAll('.tab');
  const buttons = document.querySelectorAll('.tab-button');

  tabs.forEach(tab => tab.style.opacity = '0');

  buttons.forEach(button => {
    button.classList.remove('active');
    button.setAttribute('aria-selected', 'false');
  });

  const activeTab = document.getElementById(tabName);
  const activeButton = Array.from(buttons).find(button => button.getAttribute('aria-controls') === tabName);

  if (activeTab) {
    setTimeout(() => {
      tabs.forEach(tab => tab.classList.remove('active', 'show'));

      activeTab.classList.add('active', 'show');
      activeTab.style.opacity = '1';

      if (activeButton) {
        activeButton.classList.add('active');
        activeButton.setAttribute('aria-selected', 'true');
      }
    }, 300);
  } else {
    console.error(`No tab found with name: ${tabName}`);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  openTab('tab1');
});


// ===============================
// Intersection Observer for Section Visibility
// ===============================
const sections = document.querySelectorAll('.section');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, { threshold: 0.1 });

sections.forEach(section => {
  observer.observe(section);
});


// ===============================
// Hero Content Visibility on Load
// ===============================
document.addEventListener('DOMContentLoaded', () => {
  const heroContent = document.querySelector('.hero-content');
  heroContent.classList.add('visible');
});

// ===============================
// Services Carousel Functionality
// ===============================
let currentSlide = 0;
let slideInterval;

function moveSlide(direction) {
  const items = document.querySelectorAll('.carousel-item');
  const totalItems = items.length;

  currentSlide += direction;

  if (currentSlide < 0) {
    currentSlide = totalItems - 1;
  } else if (currentSlide >= totalItems) {
    currentSlide = 0;
  }

  const carouselInner = document.querySelector('.carousel-inner');
  carouselInner.style.transform = `translateX(-${currentSlide * 100}%)`;

  // Reset the animations
  const carouselItems = document.querySelectorAll('.carousel-item');
  carouselItems.forEach(item => item.classList.remove('animate'));
  carouselItems[currentSlide].classList.add('animate');
}

function startAutoSlide() {
  slideInterval = setInterval(() => moveSlide(1), 3000);
}

document.querySelector('.carousel-arrow.left').addEventListener('click', () => {
  moveSlide(-1);
  resetAutoSlide();
});

document.querySelector('.carousel-arrow.right').addEventListener('click', () => {
  moveSlide(1);
  resetAutoSlide();
});

function resetAutoSlide() {
  clearInterval(slideInterval);
  startAutoSlide();
}

document.addEventListener('DOMContentLoaded', () => {
  moveSlide(0);
  startAutoSlide();
});

// ===============================
// Partners Carousel Functionality
// ===============================
document.addEventListener("DOMContentLoaded", function () {
    const prevButton = document.querySelector('.carousel-arrow.prev');
    const nextButton = document.querySelector('.carousel-arrow.next');
    const carousel = document.querySelector('.partners-carousel');
    const slides = document.querySelectorAll('.silde');

    const slideCount = slides.length;
    const visibleSlides = 4;
    let currentIndex = 0;

    const moveCarousel = () => {
      const offset = -(currentIndex * (slides[0].offsetWidth + 20));
      carousel.style.transform = `translateX(${offset}px)`;
    };

    prevButton.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
      } else {
        currentIndex = slideCount - visibleSlides;
      }
      moveCarousel();
    });

    nextButton.addEventListener('click', () => {
      if (currentIndex < slideCount - visibleSlides) {
        currentIndex++;
      } else {
        currentIndex = 0;
      }
      moveCarousel();
    });
});

// ===============
// Contact Section
// ===============
document.addEventListener('DOMContentLoaded', function () {
  const inputs = document.querySelectorAll('input, textarea');
  
  inputs.forEach(input => {
    if (input.value) {
      input.classList.add('has-value');
    }
    
    input.addEventListener('focus', () => {
      input.classList.add('has-focus');
    });
    
    input.addEventListener('blur', () => {
      if (!input.value) {
        input.classList.remove('has-value');
      }
      input.classList.remove('has-focus');
    });
  });
});


// ===============
// Developer Info
// ===============
document.getElementById("show-contact-btn").addEventListener("click", function() {
  var contactInfo = document.getElementById("dev-info");
  var currentDisplay = window.getComputedStyle(contactInfo).display;

  if (currentDisplay === "none") {
    contactInfo.style.display = "block";
  } else {
    contactInfo.style.display = "none";
  }
});
