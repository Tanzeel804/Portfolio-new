// Theme Toggle Functionality
document.addEventListener("DOMContentLoaded", function () {
  initializeTheme();
});

function initializeTheme() {
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = themeToggle?.querySelector("i");

  // Load saved theme or default to dark
  const savedTheme = localStorage.getItem("theme") || "dark";
  setTheme(savedTheme);

  // Toggle theme on button click
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const currentTheme =
        document.documentElement.getAttribute("data-bs-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      setTheme(newTheme);
      localStorage.setItem("theme", newTheme);
    });
  }

  // Update icon based on current theme
  function updateThemeIcon(theme) {
    if (!themeIcon) return;

    if (theme === "dark") {
      themeIcon.className = "bi bi-sun-fill";
      if (themeToggle)
        themeToggle.setAttribute("title", "Switch to light theme");
    } else {
      themeIcon.className = "bi bi-moon-fill";
      if (themeToggle)
        themeToggle.setAttribute("title", "Switch to dark theme");
    }
  }

  // Set theme function
  function setTheme(theme) {
    document.documentElement.setAttribute("data-bs-theme", theme);
    updateThemeIcon(theme);

    // Dispatch custom event for theme change
    window.dispatchEvent(new CustomEvent("themeChange", { detail: { theme } }));
  }

  // Expose setTheme function globally for debugging
  window.setTheme = setTheme;
}

// Theme transition effects
function enableSmoothThemeTransitions() {
  const style = document.createElement("style");
  style.textContent = `
        * {
            transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease !important;
        }
    `;
  document.head.appendChild(style);
}

// Initialize smooth transitions after a short delay
setTimeout(() => {
  enableSmoothThemeTransitions();
}, 1000);

// Theme change event listeners
window.addEventListener("themeChange", function (event) {
  const theme = event.detail.theme;

  // Update any theme-dependent elements
  updateThemeDependentElements(theme);

  // Log theme change for debugging
  console.log(`Theme changed to: ${theme}`);
});

function updateThemeDependentElements(theme) {
  // Update meta theme-color for mobile browsers
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute(
      "content",
      theme === "dark" ? "#121212" : "#ffffff"
    );
  }

  // Update any canvas or Three.js elements if needed
  const canvases = document.querySelectorAll("canvas");
  canvases.forEach((canvas) => {
    // Add any canvas-specific theme updates here
  });
}

// Theme utility functions
const themeUtils = {
  // Get current theme
  getCurrentTheme: function () {
    return document.documentElement.getAttribute("data-bs-theme") || "dark";
  },

  // Check if dark theme is active
  isDarkTheme: function () {
    return this.getCurrentTheme() === "dark";
  },

  // Check if light theme is active
  isLightTheme: function () {
    return this.getCurrentTheme() === "light";
  },

  // Toggle theme programmatically
  toggleTheme: function () {
    const currentTheme = this.getCurrentTheme();
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    this.setTheme(newTheme);
  },

  // Set theme programmatically
  setTheme: function (theme) {
    document.documentElement.setAttribute("data-bs-theme", theme);
    localStorage.setItem("theme", theme);
    window.dispatchEvent(new CustomEvent("themeChange", { detail: { theme } }));

    // Update theme toggle button if exists
    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = themeToggle?.querySelector("i");
    if (themeIcon) {
      if (theme === "dark") {
        themeIcon.className = "bi bi-sun-fill";
      } else {
        themeIcon.className = "bi bi-moon-fill";
      }
    }
  },

  // Reset to system preference
  resetToSystemTheme: function () {
    localStorage.removeItem("theme");
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    this.setTheme(systemTheme);
  },

  // Watch for system theme changes
  watchSystemTheme: function () {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    // Check if addEventListener is available (for older browsers)
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", (e) => {
        // Only change if user hasn't set a preference
        if (!localStorage.getItem("theme")) {
          this.setTheme(e.matches ? "dark" : "light");
        }
      });
    } else {
      // Fallback for older browsers
      mediaQuery.addListener((e) => {
        if (!localStorage.getItem("theme")) {
          this.setTheme(e.matches ? "dark" : "light");
        }
      });
    }
  },
};

// Initialize system theme watching
themeUtils.watchSystemTheme();

// Safe initialization with error handling
function safeThemeInit() {
  try {
    initializeTheme();
    console.log("Theme system initialized successfully");
  } catch (error) {
    console.error("Error initializing theme system:", error);
    // Fallback: set dark theme
    document.documentElement.setAttribute("data-bs-theme", "dark");
  }
}

// Re-initialize with safe method
document.addEventListener("DOMContentLoaded", safeThemeInit);

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    initializeTheme: safeThemeInit,
    themeUtils,
  };
}
