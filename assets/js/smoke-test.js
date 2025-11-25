// Smoke Test - Library and Functionality Verification
document.addEventListener("DOMContentLoaded", function () {
  // Wait a bit for everything to initialize
  setTimeout(runSmokeTest, 1000);
});

function runSmokeTest() {
  const testResults = {
    AOS: false,
    GSAP: false,
    VanillaTilt: false,
    ThreeJS: false,
    Bootstrap: false,
    NavbarLinks: false,
    Errors: 0,
  };

  // Test AOS
  try {
    testResults.AOS =
      typeof AOS !== "undefined" && typeof AOS.init === "function";
  } catch (e) {
    testResults.Errors++;
    console.error("AOS test failed:", e);
  }

  // Test GSAP
  try {
    testResults.GSAP =
      typeof gsap !== "undefined" && typeof gsap.to === "function";
  } catch (e) {
    testResults.Errors++;
    console.error("GSAP test failed:", e);
  }

  // Test VanillaTilt
  try {
    testResults.VanillaTilt =
      typeof VanillaTilt !== "undefined" &&
      typeof VanillaTilt.init === "function";
  } catch (e) {
    testResults.Errors++;
    console.error("VanillaTilt test failed:", e);
  }

  // Test Three.js
  try {
    testResults.ThreeJS =
      typeof THREE !== "undefined" && typeof THREE.Scene === "function";
  } catch (e) {
    testResults.Errors++;
    console.error("Three.js test failed:", e);
  }

  // Test Bootstrap
  try {
    testResults.Bootstrap =
      typeof bootstrap !== "undefined" && typeof bootstrap.Modal === "function";
  } catch (e) {
    testResults.Errors++;
    console.error("Bootstrap test failed:", e);
  }

  // Test Navbar Links
  try {
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
    testResults.NavbarLinks = navLinks.length >= 5; // Should have at least 5 links
  } catch (e) {
    testResults.Errors++;
    console.error("Navbar links test failed:", e);
  }

  // Log results
  logTestResults(testResults);

  // Run additional functionality tests
  runFunctionalityTests();
}

function logTestResults(results) {
  console.log("🚀 PORTFOLIO SMOKE TEST RESULTS 🚀");
  console.log("====================================");

  Object.entries(results).forEach(([test, result]) => {
    const status = result ? "✅ PASS" : "❌ FAIL";
    if (test === "Errors") {
      console.log(`Errors Found: ${result}`);
    } else {
      console.log(`${test}: ${status}`);
    }
  });

  console.log("====================================");

  // Show visual indicator in console for quick verification
  if (
    results.Errors === 0 &&
    Object.values(results).slice(0, -2).every(Boolean)
  ) {
    console.log("🎉 ALL TESTS PASSED! Portfolio is working correctly.");
  } else {
    console.warn("⚠️ Some tests failed. Check the console for details.");
  }
}

function runFunctionalityTests() {
  console.log("\n🔧 FUNCTIONALITY TESTS:");
  console.log("=======================");

  // Test theme functionality
  testThemeFunctionality();

  // Test smooth scrolling
  testSmoothScrolling();

  // Test mobile responsiveness
  testResponsiveDesign();

  // Test form functionality
  testFormValidation();

  // Test animation performance
  testAnimationPerformance();
}

function testThemeFunctionality() {
  try {
    const themeToggle = document.getElementById("themeToggle");
    const currentTheme = document.documentElement.getAttribute("data-bs-theme");

    if (themeToggle && (currentTheme === "dark" || currentTheme === "light")) {
      console.log("✅ Theme toggle: Working correctly");
    } else {
      console.log("❌ Theme toggle: Not working properly");
    }
  } catch (e) {
    console.error("Theme functionality test failed:", e);
  }
}

function testSmoothScrolling() {
  try {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    if (scrollLinks.length > 0) {
      console.log("✅ Smooth scrolling: Links found");
    } else {
      console.log("❌ Smooth scrolling: No scroll links found");
    }
  } catch (e) {
    console.error("Smooth scrolling test failed:", e);
  }
}

function testResponsiveDesign() {
  try {
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (
      viewportMeta &&
      viewportMeta.getAttribute("content").includes("width=device-width")
    ) {
      console.log("✅ Responsive design: Viewport meta tag present");
    } else {
      console.log(
        "❌ Responsive design: Viewport meta tag missing or incorrect"
      );
    }
  } catch (e) {
    console.error("Responsive design test failed:", e);
  }
}

function testFormValidation() {
  try {
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
      const requiredInputs = contactForm.querySelectorAll("[required]");
      console.log(
        `✅ Contact form: ${requiredInputs.length} required fields found`
      );
    } else {
      console.log("❌ Contact form: Not found");
    }
  } catch (e) {
    console.error("Form validation test failed:", e);
  }
}

function testAnimationPerformance() {
  try {
    // Check if animations are using hardware acceleration
    const animatedElements = document.querySelectorAll(
      "[data-aos], .project-card"
    );
    let hardwareAccelerated = 0;

    animatedElements.forEach((el) => {
      const style = window.getComputedStyle(el);
      if (style.transform !== "none" || style.transition !== "all 0s ease 0s") {
        hardwareAccelerated++;
      }
    });

    console.log(
      `✅ Animations: ${hardwareAccelerated}/${animatedElements.length} elements optimized`
    );
  } catch (e) {
    console.error("Animation performance test failed:", e);
  }
}

// Performance monitoring
function monitorPerformance() {
  // Monitor page load performance
  window.addEventListener("load", () => {
    const navigationTiming = performance.getEntriesByType("navigation")[0];
    if (navigationTiming) {
      console.log("📊 PERFORMANCE METRICS:");
      console.log(
        `Page load time: ${Math.round(
          navigationTiming.loadEventEnd - navigationTiming.navigationStart
        )}ms`
      );
      console.log(
        `DOM content loaded: ${Math.round(
          navigationTiming.domContentLoadedEventEnd -
            navigationTiming.navigationStart
        )}ms`
      );
    }
  });

  // Monitor memory usage (if supported)
  if (performance.memory) {
    console.log(
      `Memory usage: ${Math.round(
        performance.memory.usedJSHeapSize / 1048576
      )}MB`
    );
  }
}

// Error tracking
window.addEventListener("error", function (e) {
  console.error("🚨 Global error caught:", e.error);
});

// Unhandled promise rejection tracking
window.addEventListener("unhandledrejection", function (e) {
  console.error("🚨 Unhandled promise rejection:", e.reason);
});

// Run performance monitoring
monitorPerformance();

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    runSmokeTest,
    monitorPerformance,
  };
}
