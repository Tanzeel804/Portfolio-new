// VanillaTilt.js Initialization
document.addEventListener("DOMContentLoaded", function () {
  initializeTiltEffects();
});

function initializeTiltEffects() {
  // Initialize tilt on project cards
  const projectCards = document.querySelectorAll(".project-card-tilt");

  projectCards.forEach((card) => {
    VanillaTilt.init(card, {
      max: 15,
      speed: 400,
      glare: true,
      "max-glare": 0.2,
      scale: 1.05,
      gyroscope: false,
    });
  });

  // Initialize tilt on 404 page floating object
  const floatingObject = document.querySelector(".floating-object");
  if (floatingObject) {
    VanillaTilt.init(floatingObject, {
      max: 25,
      speed: 500,
      glare: true,
      "max-glare": 0.3,
      scale: 1.1,
    });
  }

  // Initialize tilt on skill items
  const skillItems = document.querySelectorAll(".skill-item");
  skillItems.forEach((item) => {
    VanillaTilt.init(item, {
      max: 10,
      speed: 300,
      glare: true,
      "max-glare": 0.1,
      scale: 1.02,
    });
  });

  // Initialize tilt on philosophy cards
  const philosophyCards = document.querySelectorAll(".philosophy-card");
  philosophyCards.forEach((card) => {
    VanillaTilt.init(card, {
      max: 8,
      speed: 350,
      glare: true,
      "max-glare": 0.15,
      scale: 1.03,
    });
  });
}

// Advanced tilt configurations
const tiltConfigs = {
  subtle: {
    max: 8,
    speed: 300,
    glare: true,
    "max-glare": 0.1,
    scale: 1.02,
  },
  medium: {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.2,
    scale: 1.05,
  },
  intense: {
    max: 25,
    speed: 500,
    glare: true,
    "max-glare": 0.3,
    scale: 1.1,
  },
};

// Function to apply tilt with specific configuration
function applyTilt(selector, config = "medium") {
  const elements = document.querySelectorAll(selector);
  const tiltConfig = tiltConfigs[config] || tiltConfigs.medium;

  elements.forEach((element) => {
    // Destroy existing tilt instance if any
    if (element.vanillaTilt) {
      element.vanillaTilt.destroy();
    }

    VanillaTilt.init(element, tiltConfig);
  });
}

// Function to destroy tilt effects
function destroyTilt(selector) {
  const elements = document.querySelectorAll(selector);

  elements.forEach((element) => {
    if (element.vanillaTilt) {
      element.vanillaTilt.destroy();
    }
  });
}

// Enable/disable tilt effects based on device
function handleTiltForDevice() {
  const isMobile = window.innerWidth <= 768;

  if (isMobile) {
    // Reduce tilt effect on mobile for better performance
    destroyTilt(".project-card-tilt");
    applyTilt(".project-card-tilt", "subtle");
  } else {
    // Full tilt effect on desktop
    destroyTilt(".project-card-tilt");
    applyTilt(".project-card-tilt", "medium");
  }
}

// Reinitialize tilt on window resize
window.addEventListener("resize", function () {
  handleTiltForDevice();
});

// Initialize device-appropriate tilt effects
handleTiltForDevice();

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    initializeTiltEffects,
    applyTilt,
    destroyTilt,
    handleTiltForDevice,
  };
}
