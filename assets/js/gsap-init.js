// GSAP Animation Initialization
document.addEventListener("DOMContentLoaded", function () {
  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Initialize GSAP animations
  initGSAPAnimations();
});

function initGSAPAnimations() {
  // Hero section animations
  animateHeroSection();

  // Skills section animations
  animateSkillsSection();

  // Project cards animations
  animateProjectCards();

  // Timeline animations
  animateTimeline();

  // General scroll animations
  initScrollAnimations();
}

function animateHeroSection() {
  const heroTitle = document.querySelector(".hero-title");
  const heroSubtitle = document.querySelector(".hero-subtitle");
  const heroDescription = document.querySelector(".hero-description");
  const heroButtons = document.querySelector(".hero-buttons");
  const socialLinks = document.querySelector(".social-links");

  if (heroTitle) {
    gsap.fromTo(
      heroTitle,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
  }

  if (heroSubtitle) {
    gsap.fromTo(
      heroSubtitle,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "power3.out" }
    );
  }

  if (heroDescription) {
    gsap.fromTo(
      heroDescription,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 0.6, ease: "power3.out" }
    );
  }

  if (heroButtons) {
    gsap.fromTo(
      heroButtons,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 0.9, ease: "power3.out" }
    );
  }

  if (socialLinks) {
    gsap.fromTo(
      socialLinks.children,
      { opacity: 0, scale: 0 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        delay: 1.2,
        stagger: 0.1,
        ease: "back.out(1.7)",
      }
    );
  }
}

function animateSkillsSection() {
  const skillItems = document.querySelectorAll(".skill-item");

  skillItems.forEach((item, index) => {
    gsap.fromTo(
      item,
      { opacity: 0, y: 50, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        delay: index * 0.1,
        scrollTrigger: {
          trigger: item,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });
}

function animateProjectCards() {
  const projectCards = document.querySelectorAll(
    ".project-card, .project-card-tilt"
  );

  projectCards.forEach((card, index) => {
    gsap.fromTo(
      card,
      { opacity: 0, y: 60, rotationY: 10 },
      {
        opacity: 1,
        y: 0,
        rotationY: 0,
        duration: 0.8,
        delay: index * 0.1,
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });
}

function animateTimeline() {
  const timelineItems = document.querySelectorAll(".timeline-item");

  timelineItems.forEach((item, index) => {
    const direction = index % 2 === 0 ? -50 : 50;

    gsap.fromTo(
      item,
      { opacity: 0, x: direction },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        delay: index * 0.2,
        scrollTrigger: {
          trigger: item,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });
}

function initScrollAnimations() {
  // Animate elements on scroll
  const animateElements = document.querySelectorAll(".scroll-animate");

  animateElements.forEach((element) => {
    gsap.fromTo(
      element,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  // Parallax effects
  const parallaxElements = document.querySelectorAll(".parallax");

  parallaxElements.forEach((element) => {
    gsap.to(element, {
      yPercent: -30,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });

  // Text reveal animations
  const textRevealElements = document.querySelectorAll(".text-reveal");

  textRevealElements.forEach((element) => {
    gsap.fromTo(
      element,
      { backgroundPosition: "0% 0%" },
      {
        backgroundPosition: "100% 0%",
        duration: 1.5,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });
}

// Advanced GSAP animations
const advancedAnimations = {
  // Magnetic button effect
  initMagneticButtons: function () {
    const magneticButtons = document.querySelectorAll(".magnetic");

    magneticButtons.forEach((button) => {
      button.addEventListener("mousemove", function (e) {
        const position = this.getBoundingClientRect();
        const x = e.pageX - position.left - position.width / 2;
        const y = e.pageY - position.top - position.height / 2;

        gsap.to(this, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.5,
          ease: "power2.out",
        });
      });

      button.addEventListener("mouseleave", function () {
        gsap.to(this, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.5)",
        });
      });
    });
  },

  // Hover lift animation
  initHoverLift: function () {
    const hoverElements = document.querySelectorAll(".hover-lift");

    hoverElements.forEach((element) => {
      element.addEventListener("mouseenter", function () {
        gsap.to(this, {
          y: -10,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      element.addEventListener("mouseleave", function () {
        gsap.to(this, {
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    });
  },

  // Counter animation
  animateCounter: function (element, targetValue, duration = 2) {
    const obj = { value: 0 };
    gsap.to(obj, {
      value: targetValue,
      duration: duration,
      onUpdate: function () {
        element.textContent = Math.round(obj.value);
      },
      ease: "power2.out",
    });
  },

  // Staggered animation for lists
  staggerList: function (selector, delay = 0.1) {
    const items = document.querySelectorAll(selector);
    gsap.fromTo(
      items,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: delay,
        ease: "power2.out",
      }
    );
  },
};

// Initialize advanced animations when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  advancedAnimations.initMagneticButtons();
  advancedAnimations.initHoverLift();
});

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    initGSAPAnimations,
    advancedAnimations,
  };
}
