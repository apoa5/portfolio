// Theme Management
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Get the preferred theme from localStorage or system preference
function getPreferredTheme() {
    // Check localStorage first
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
        return storedTheme;
    }

    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }

    // Default to light
    return 'light';
}

// Set the theme
function setTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    // Update button state
    updateThemeToggleButton(theme);
}

// Update the button state
function updateThemeToggleButton(theme) {
    themeToggle.setAttribute('data-theme', theme);
    if (theme === 'dark') {
        themeToggle.setAttribute('aria-label', 'Switch to light mode');
    } else {
        themeToggle.setAttribute('aria-label', 'Switch to dark mode');
    }
}

// Initialize theme on page load
function initTheme() {
    const preferredTheme = getPreferredTheme();
    setTheme(preferredTheme);
}

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
});

// Listen for system theme changes
if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        // Only update if user hasn't set a preference
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });
}

// Initialize theme when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
} else {
    initTheme();
}

// Smooth scroll for links (if needed for future navigation)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Add keyboard shortcut for theme toggle (Shift + T)
document.addEventListener('keydown', (e) => {
    if (e.shiftKey && e.key === 'T') {
        themeToggle.click();
    }
});
