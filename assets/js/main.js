// Main JavaScript file for portfolio website

// DOM Ready
document.addEventListener("DOMContentLoaded", function () {
  initializeAll();
});

// Initialize all functionality
function initializeAll() {
  initializeNavigation();
  initializeSmoothScroll();
  initializeBackToTop();
  initializeProjectFilters();
  initializeProjectModals();
  initializeContactForm();
  initializePerformanceOptimizations();
}

// Navigation functionality
function initializeNavigation() {
  const navbar = document.querySelector(".custom-navbar");
  const navLinks = document.querySelectorAll(".nav-link");

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Active nav link highlighting
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navLinks.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");
    });
  });
}

// Smooth scrolling for anchor links
function initializeSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// Back to top button
function initializeBackToTop() {
  const backToTopButton = document.getElementById("backToTop");

  if (!backToTopButton) return;

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add("show");
    } else {
      backToTopButton.classList.remove("show");
    }
  });

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Project filtering system
function initializeProjectFilters() {
  const filterButtons = document.querySelectorAll(".filter-buttons .btn");
  const projectItems = document.querySelectorAll(".project-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      const filterValue = this.getAttribute("data-filter");

      // Filter projects
      projectItems.forEach((item) => {
        if (
          filterValue === "all" ||
          item.getAttribute("data-category") === filterValue
        ) {
          item.style.display = "block";
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "scale(1)";
          }, 50);
        } else {
          item.style.opacity = "0";
          item.style.transform = "scale(0.8)";
          setTimeout(() => {
            item.style.display = "none";
          }, 300);
        }
      });
    });
  });
}

// Project modal functionality
function initializeProjectModals() {
  const viewDetailButtons = document.querySelectorAll(".view-details");

  viewDetailButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const projectId = this.getAttribute("data-project");
      const modal = new bootstrap.Modal(
        document.getElementById(`projectModal${projectId}`)
      );
      modal.show();
    });
  });
}

// Contact form handling
function initializeContactForm() {
  const contactForm = document.getElementById("contactForm");

  if (!contactForm) return;

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const submitButton = this.querySelector('button[type="submit"]');
    const formMessage = document.getElementById("formMessage");

    // Show loading state
    submitButton.classList.add("btn-loading");

    // Simulate form submission
    setTimeout(() => {
      // Reset loading state
      submitButton.classList.remove("btn-loading");

      // Show success message
      formMessage.textContent =
        "Thank you for your message! I'll get back to you soon.";
      formMessage.classList.remove("d-none", "alert-danger");
      formMessage.classList.add("alert-success");

      // Reset form
      contactForm.reset();

      // Hide message after 5 seconds
      setTimeout(() => {
        formMessage.classList.add("d-none");
      }, 5000);
    }, 2000);
  });

  // Real-time validation
  const inputs = contactForm.querySelectorAll("input, textarea");
  inputs.forEach((input) => {
    input.addEventListener("blur", function () {
      if (!this.value) {
        this.classList.add("is-invalid");
      } else {
        this.classList.remove("is-invalid");
        this.classList.add("is-valid");
      }
    });

    input.addEventListener("input", function () {
      if (this.value) {
        this.classList.remove("is-invalid");
        this.classList.add("is-valid");
      } else {
        this.classList.remove("is-valid");
      }
    });
  });
}

// Performance optimizations
function initializePerformanceOptimizations() {
  // Lazy loading for images
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove("lazy");
          imageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll("img[data-src]").forEach((img) => {
      imageObserver.observe(img);
    });
  }

  // Debounce scroll events
  let scrollTimeout;
  window.addEventListener("scroll", () => {
    if (!scrollTimeout) {
      scrollTimeout = setTimeout(() => {
        scrollTimeout = null;
        // Handle scroll actions
      }, 100);
    }
  });
}

// Utility functions
const utils = {
  // Debounce function
  debounce: function (func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        timeout = null;
        if (!immediate) func(...args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func(...args);
    };
  },

  // Throttle function
  throttle: function (func, limit) {
    let inThrottle;
    return function (...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },

  // Check if element is in viewport
  isInViewport: function (element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },

  // Format file size
  formatFileSize: function (bytes) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  },
};

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = { initializeAll, utils };
}
