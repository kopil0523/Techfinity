let lastScrollTop = 0; // Keep track of the last scroll position
let header = document.querySelector('header');

// Only apply the scroll behavior on larger screens
function handleScroll() {
  let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (window.innerWidth >= 768) { // Apply the scroll effect only for larger screens
    if (currentScroll > lastScrollTop) {
      // Scroll Down: hide header
      header.classList.add('hidden');
    } else {
      // Scroll Up: show header
      header.classList.remove('hidden');
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Prevent negative scroll
  }
}

// Listen to the scroll event
window.addEventListener('scroll', handleScroll);

// Hamburger Menu Toggle
document.getElementById("hamburger").addEventListener("click", function() {
    const navMenu = document.getElementById("nav-menu");
    const hamburger = document.getElementById("hamburger");
    navMenu.classList.toggle("open"); // Slide the menu in/out
    hamburger.classList.toggle("open"); // Change the hamburger to 'X'
});

// Tab Switching Function
function openTab(tabName) {
    const tabs = document.querySelectorAll('.tab');
    const buttons = document.querySelectorAll('.tab-button');

    // Fade out all tabs
    tabs.forEach(tab => {
        tab.style.opacity = '0'; // Start fading out
    });

    // Remove active state from all buttons
    buttons.forEach(button => {
        button.classList.remove('active');
        button.setAttribute('aria-selected', 'false'); // Update ARIA attribute
    });

    // Get the active tab and button
    const activeTab = document.getElementById(tabName);
    const activeButton = Array.from(buttons).find(button => button.getAttribute('aria-controls') === tabName);

    // Start the loading effect
    if (activeTab) {
        // After a delay, switch to the active tab
        setTimeout(() => {
            // Hide all tabs first
            tabs.forEach(tab => {
                tab.classList.remove('active', 'show'); // Ensure all tabs are hidden
            });

            // Show the active tab and set its opacity
            activeTab.classList.add('active', 'show');
            activeTab.style.opacity = '1'; // Fade in the new content

            // Set active button state
            if (activeButton) {
                activeButton.classList.add('active');
                activeButton.setAttribute('aria-selected', 'true'); // Update ARIA attribute
            }
        }, 500); // Wait for 0.5 seconds before showing the active tab
    } else {
        console.error(`No tab found with name: ${tabName}`); // Log error if tab not found
        return; // Exit if no valid tab found
    }
}

// Initialize to open the first tab by default
document.addEventListener('DOMContentLoaded', () => {
    openTab('tab1'); // Open the first tab
});

// Intersection Observer for sections
const sections = document.querySelectorAll('.section');

const options = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible');
        }
    });
}, options);

sections.forEach(section => {
    observer.observe(section);
});

// Hero Content
document.addEventListener('DOMContentLoaded', () => {
    const heroContent = document.querySelector('.hero-content');
    heroContent.classList.add('visible'); // Add class to trigger transition
});

//Partners Carousel
document.addEventListener("DOMContentLoaded", function () {
    const prevButton = document.querySelector('.carousel-arrow.prev');
    const nextButton = document.querySelector('.carousel-arrow.next');
    const carousel = document.querySelector('.partners-carousel');
    const slides = document.querySelectorAll('.silde');
    
    const slideCount = slides.length;
    const visibleSlides = 4; // Number of slides visible at once
    let currentIndex = 0;
  
    // Calculate how much to move the carousel based on the index
    const moveCarousel = () => {
      const offset = -(currentIndex * (slides[0].offsetWidth + 20)); // 20px for padding/margin
      carousel.style.transform = `translateX(${offset}px)`;
    };
  
    // Go to the previous slide
    prevButton.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
      } else {
        currentIndex = slideCount - visibleSlides;
      }
      moveCarousel();
    });
  
    // Go to the next slide
    nextButton.addEventListener('click', () => {
      if (currentIndex < slideCount - visibleSlides) {
        currentIndex++;
      } else {
        currentIndex = 0;
      }
      moveCarousel();
    });
  });
  
// Carousel functionality for automatic and manual slide transitions
let currentSlide = 0;
let slideInterval;

function moveSlide(direction) {
    const items = document.querySelectorAll('.carousel-item');
    const totalItems = items.length;

    // Update the current slide index
    currentSlide += direction;

    // Loop around when reaching the end or beginning
    if (currentSlide < 0) {
        currentSlide = totalItems - 1; // Go to the last item
    } else if (currentSlide >= totalItems) {
        currentSlide = 0; // Go to the first item
    }

    // Apply the transform to move to the correct slide
    const carouselInner = document.querySelector('.carousel-inner');
    carouselInner.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Reset the animations by reloading the page
    const carouselItems = document.querySelectorAll('.carousel-item');
    carouselItems.forEach(item => item.classList.remove('animate'));
    carouselItems[currentSlide].classList.add('animate');
}

// Start automatic carousel movement every 3 seconds
function startAutoSlide() {
    slideInterval = setInterval(() => moveSlide(1), 8000); // Change every 3 seconds
}

// Event listeners for the carousel arrows
document.querySelector('.carousel-arrow.left').addEventListener('click', () => {
    moveSlide(-1);  // Left arrow
    resetAutoSlide();  // Reset auto-slide on manual interaction
});

document.querySelector('.carousel-arrow.right').addEventListener('click', () => {
    moveSlide(1);  // Right arrow
    resetAutoSlide();  // Reset auto-slide on manual interaction
});

// Reset auto slide after user interaction
function resetAutoSlide() {
    clearInterval(slideInterval);
    startAutoSlide();
}

// Initialize carousel (start auto slide and show first slide)
document.addEventListener('DOMContentLoaded', () => {
    moveSlide(0); // Initially show the first slide
    startAutoSlide(); // Start auto slide
});

//Contact Section
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


