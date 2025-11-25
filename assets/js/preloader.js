// Preloader Functionality
document.addEventListener("DOMContentLoaded", function () {
  initializePreloader();
});

function initializePreloader() {
  const preloader = document.getElementById("preloader");

  if (!preloader) return;

  // Minimum display time for preloader (in milliseconds)
  const MIN_DISPLAY_TIME = 1500;
  const startTime = Date.now();

  function hidePreloader() {
    const elapsedTime = Date.now() - startTime;
    const remainingTime = Math.max(0, MIN_DISPLAY_TIME - elapsedTime);

    setTimeout(() => {
      preloader.classList.add("fade-out");

      setTimeout(() => {
        preloader.style.display = "none";

        // Dispatch custom event when preloader is hidden
        window.dispatchEvent(new CustomEvent("preloaderHidden"));
      }, 500);
    }, remainingTime);
  }

  // Hide preloader when everything is loaded
  if (document.readyState === "complete") {
    hidePreloader();
  } else {
    window.addEventListener("load", hidePreloader);
  }

  // Fallback: hide preloader after maximum time
  setTimeout(hidePreloader, 5000);
}

// Preloader animation functions
const preloaderAnimations = {
  // Simple spinner animation
  initSpinner: function () {
    const spinner = document.querySelector(".spinner-border");
    if (spinner) {
      // Add custom animation class
      spinner.classList.add("preloader-spinner");
    }
  },

  // Progress bar animation
  initProgressBar: function () {
    const progressBar = document.createElement("div");
    progressBar.className = "preloader-progress";
    progressBar.innerHTML = `
            <div class="progress" style="height: 4px; background: rgba(255,255,255,0.2);">
                <div class="progress-bar progress-bar-striped progress-bar-animated" 
                     style="width: 0%; height: 100%;"></div>
            </div>
        `;

    const preloaderContent = document.querySelector(".preloader-content");
    if (preloaderContent) {
      preloaderContent.appendChild(progressBar);
      this.animateProgressBar();
    }
  },

  // Animate progress bar
  animateProgressBar: function () {
    const progressBar = document.querySelector(
      ".preloader-progress .progress-bar"
    );
    if (!progressBar) return;

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
      }
      progressBar.style.width = progress + "%";
    }, 200);
  },

  // Text animation
  initTextAnimation: function () {
    const textElement = document.querySelector(".preloader-content p");
    if (textElement) {
      const texts = [
        "Loading portfolio...",
        "Initializing components...",
        "Almost there...",
        "Welcome!",
      ];

      let currentIndex = 0;
      const interval = setInterval(() => {
        textElement.style.opacity = "0";
        setTimeout(() => {
          currentIndex = (currentIndex + 1) % texts.length;
          textElement.textContent = texts[currentIndex];
          textElement.style.opacity = "1";
        }, 300);
      }, 1000);

      // Clear interval when preloader hides
      window.addEventListener("preloaderHidden", () => {
        clearInterval(interval);
      });
    }
  },

  // Particle animation for preloader
  initParticles: function () {
    const preloader = document.getElementById("preloader");
    if (!preloader) return;

    const particleCount = 15;
    for (let i = 0; i < particleCount; i++) {
      createParticle(preloader);
    }
  },
};

// Create individual particles
function createParticle(container) {
  const particle = document.createElement("div");
  particle.className = "preloader-particle";

  // Random properties
  const size = Math.random() * 10 + 5;
  const posX = Math.random() * 100;
  const posY = Math.random() * 100;
  const delay = Math.random() * 2;
  const duration = Math.random() * 3 + 2;

  // Apply styles
  particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: var(--primary-color);
        border-radius: 50%;
        left: ${posX}%;
        top: ${posY}%;
        opacity: 0;
        animation: floatParticle ${duration}s ease-in-out ${delay}s infinite;
    `;

  // Add to container
  container.appendChild(particle);

  // Remove particle when preloader hides
  window.addEventListener("preloaderHidden", () => {
    particle.remove();
  });
}

// Add CSS for particle animation
const particleStyles = `
@keyframes floatParticle {
    0%, 100% {
        transform: translate(0, 0) scale(1);
        opacity: 0;
    }
    25% {
        transform: translate(${Math.random() * 100 - 50}px, ${
  Math.random() * 100 - 50
}px) scale(1.2);
        opacity: 0.7;
    }
    50% {
        transform: translate(${Math.random() * 100 - 50}px, ${
  Math.random() * 100 - 50
}px) scale(0.8);
        opacity: 0.3;
    }
    75% {
        transform: translate(${Math.random() * 100 - 50}px, ${
  Math.random() * 100 - 50
}px) scale(1.1);
        opacity: 0.5;
    }
}

.preloader-particle {
    pointer-events: none;
}
`;

// Inject particle styles
const styleSheet = document.createElement("style");
styleSheet.textContent = particleStyles;
document.head.appendChild(styleSheet);

// Initialize advanced preloader animations
document.addEventListener("DOMContentLoaded", function () {
  // Uncomment the animations you want to use:
  // preloaderAnimations.initSpinner();
  // preloaderAnimations.initProgressBar();
  // preloaderAnimations.initTextAnimation();
  // preloaderAnimations.initParticles();
});

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    initializePreloader,
    preloaderAnimations,
  };
}
