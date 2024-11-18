function updateButton({ themeToggleButton, isDark }) {
    themeToggleButton.classList = isDark 
        ? "header__themeToggle" 
        : "header__themeToggle header__themeToggle--light";
    
    const themeAriaLabel = isDark
        ? "Use the light theme?"
        : "Use the dark theme?"

    themeToggleButton.setAttribute("aria-label", themeAriaLabel);
}

function calculateTheme({ localStorageTheme, systemSettingDark }) {
    if (localStorageTheme) {
        return localStorageTheme;
    }
    return systemSettingDark.matches ? "dark" : "light";
}
        
function applyThemeToHtml(theme) {
    const htmlTheme = document.documentElement;
    htmlTheme.setAttribute("colour-mode", theme);
}

function setTheme(theme, themeToggleButton) {
    const htmlTheme = document.documentElement;
    htmlTheme.setAttribute("colour-mode", theme);
    localStorage.setItem("theme", theme);
    updateButton({ themeToggleButton, isDark: theme === "dark" });

    const themeChangeEvent = new CustomEvent("themeChange", { detail: { theme } });
    document.dispatchEvent(themeChangeEvent);
}

function initThemeToggler() {
    const themeToggleButton = document.querySelector("[data-theme-toggle]");
    const localStorageTheme = localStorage.getItem("theme");
    const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");
    let currentTheme = calculateTheme({ localStorageTheme, systemSettingDark });

    setTheme(currentTheme, themeToggleButton);

    themeToggleButton.addEventListener("click", () => {
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        setTheme(newTheme, themeToggleButton);
        currentTheme = newTheme;
    });

    systemSettingDark.addEventListener("change", (e) => {
        if (!localStorage.getItem("theme")) {
            const newTheme = e.matches ? "dark" : "light";
            setTheme(newTheme, themeToggleButton);
            currentTheme = newTheme;
        }
    });
}

document.addEventListener("themeChange", (event) => {
    console.log("The theme has been changed to:", event.detail.theme);
});

document.addEventListener("DOMContentLoaded", initThemeToggler);
