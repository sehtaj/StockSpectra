/**
 * Component Loader
 * Dynamically loads reusable HTML components (navbar, footer)
 * and handles active page highlighting
 */

class ComponentLoader {
    /**
     * Load a component from the components folder
     * @param {string} componentName - Name of the component file (without .html)
     * @param {string} targetSelector - CSS selector where to inject the component
     */
    static async loadComponent(componentName, targetSelector) {
        try {
            const response = await fetch(`components/${componentName}.html`);

            if (!response.ok) {
                throw new Error(`Failed to load ${componentName}: ${response.status}`);
            }

            const html = await response.text();
            const targetElement = document.querySelector(targetSelector);

            if (targetElement) {
                targetElement.innerHTML = html;
                return true;
            } else {
                console.error(`Target element not found: ${targetSelector}`);
                return false;
            }
        } catch (error) {
            console.error(`Error loading component ${componentName}:`, error);
            return false;
        }
    }

    /**
     * Set active page in navbar based on current page
     */
    static setActivePage() {
        // Get current page filename
        const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'index';

        // Find all nav links
        const navLinks = document.querySelectorAll('.nav-links a');

        navLinks.forEach(link => {
            const linkPage = link.getAttribute('data-page');

            if (linkPage === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    /**
     * Initialize all components
     * Call this when DOM is ready
     */
    static async init() {
        // Load navbar
        await this.loadComponent('navbar', '#navbar-placeholder');

        // Load footer
        await this.loadComponent('footer', '#footer-placeholder');

        // Set active page after navbar is loaded
        this.setActivePage();
    }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => ComponentLoader.init());
} else {
    ComponentLoader.init();
}
