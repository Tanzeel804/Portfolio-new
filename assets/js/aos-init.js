// AOS (Animate On Scroll) Initialization
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        offset: 100
    });
    
    // Refresh AOS on page load and resize
    window.addEventListener('load', function() {
        AOS.refresh();
    });
    
    // Custom AOS animations
    const customAOS = {
        init: function() {
            this.addCustomAnimations();
            this.handleAOSEvents();
        },
        
        addCustomAnimations: function() {
            // Add custom data-aos attributes dynamically if needed
            const elementsToAnimate = document.querySelectorAll('.scroll-reveal');
            elementsToAnimate.forEach((el, index) => {
                el.setAttribute('data-aos', 'fade-up');
                el.setAttribute('data-aos-delay', index * 100);
            });
        },
        
        handleAOSEvents: function() {
            // Add event listeners for AOS animations
            document.addEventListener('aos:in', function(e) {
                const element = e.detail;
                
                // Add custom classes when element comes into view
                element.classList.add('aos-animated');
                
                // Special handling for specific elements
                if (element.classList.contains('skill-progress-item')) {
                    const progressBar = element.querySelector('.progress-bar');
                    if (progressBar) {
                        const width = progressBar.style.width;
                        progressBar.style.width = '0%';
                        setTimeout(() => {
                            progressBar.style.width = width;
                        }, 100);
                    }
                }
                
                // Handle timeline items
                if (element.classList.contains('timeline-item')) {
                    element.classList.add('animated');
                }
            });
            
            document.addEventListener('aos:out', function(e) {
                const element = e.detail;
                element.classList.remove('aos-animated');
            });
        }
    };
    
    customAOS.init();
});

// AOS refresh on specific events
function refreshAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { refreshAOS };
}