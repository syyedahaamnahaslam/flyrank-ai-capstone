const STORAGE_KEY = "flyrank-settings";

const DEFAULT_SETTINGS = {
  displayName: "",
  email: "",
  language: "en",
  theme: "light",
  emailNotifications: true,
  marketingEmails: false,
};

const form = document.getElementById("settings-form");
const resetBtn = document.getElementById("reset-btn");
const statusMessage = document.getElementById("status-message");

function getFormData() {
  return {
    displayName: form.displayName.value.trim(),
    email: form.email.value.trim(),
    language: form.language.value,
    theme: form.theme.value,
    emailNotifications: form.emailNotifications.checked,
    marketingEmails: form.marketingEmails.checked,
  };
}

function applySettings(settings) {
  form.displayName.value = settings.displayName;
  form.email.value = settings.email;
  form.language.value = settings.language;
  form.theme.value = settings.theme;
  form.emailNotifications.checked = settings.emailNotifications;
  form.marketingEmails.checked = settings.marketingEmails;
  applyTheme(settings.theme);
}

function applyTheme(theme) {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const useDark = theme === "dark" || (theme === "system" && prefersDark);

  document.body.classList.toggle("theme-dark", useDark);
}

function loadSettings() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      applySettings(DEFAULT_SETTINGS);
      return;
    }

    applySettings({ ...DEFAULT_SETTINGS, ...JSON.parse(saved) });
  } catch {
    applySettings(DEFAULT_SETTINGS);
    showStatus("Could not load saved settings. Using defaults.", "error");
  }
}

function saveSettings(settings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

function clearErrors() {
  form.querySelectorAll(".error-message").forEach((el) => {
    el.textContent = "";
  });
  form.querySelectorAll(".invalid").forEach((el) => {
    el.classList.remove("invalid");
  });
}

function setFieldError(fieldName, message) {
  const input = form.elements[fieldName];
  const errorEl = form.querySelector(`.error-message[data-for="${fieldName}"]`);

  if (input) {
    input.classList.add("invalid");
  }

  if (errorEl) {
    errorEl.textContent = message;
  }
}

function validateSettings(settings) {
  clearErrors();
  let isValid = true;

  if (!settings.displayName) {
    setFieldError("displayName", "Display name is required.");
    isValid = false;
  }

  if (!settings.email) {
    setFieldError("email", "Email is required.");
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(settings.email)) {
    setFieldError("email", "Enter a valid email address.");
    isValid = false;
  }

  return isValid;
}

function showStatus(message, type = "success") {
  statusMessage.textContent = message;
  statusMessage.className = `status-message ${type}`;

  if (type === "success") {
    window.setTimeout(() => {
      statusMessage.textContent = "";
      statusMessage.className = "status-message";
    }, 3000);
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const settings = getFormData();

  if (!validateSettings(settings)) {
    showStatus("Please fix the errors above.", "error");
    return;
  }

  saveSettings(settings);
  applyTheme(settings.theme);
  showStatus("Settings saved successfully.");
});

resetBtn.addEventListener("click", () => {
  applySettings(DEFAULT_SETTINGS);
  localStorage.removeItem(STORAGE_KEY);
  clearErrors();
  showStatus("Settings reset to defaults.");
});

form.theme.addEventListener("change", () => {
  applyTheme(form.theme.value);
});

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
  if (form.theme.value === "system") {
    applyTheme("system");
  }
});

loadSettings();
