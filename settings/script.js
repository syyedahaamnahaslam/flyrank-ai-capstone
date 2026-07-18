(function () {
  "use strict";

  var form = document.getElementById("settings-form");
  var successMessage = document.getElementById("form-success");

  var fields = {
    name: {
      input: document.getElementById("name"),
      error: document.getElementById("name-error"),
      validate: validateName,
    },
    email: {
      input: document.getElementById("email"),
      error: document.getElementById("email-error"),
      validate: validateEmail,
    },
    password: {
      input: document.getElementById("password"),
      error: document.getElementById("password-error"),
      validate: validatePassword,
    },
    confirmPassword: {
      input: document.getElementById("confirm-password"),
      error: document.getElementById("confirm-password-error"),
      validate: validateConfirmPassword,
    },
  };

  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validateName(value) {
    if (!value.trim()) {
      return "Name is required.";
    }
    return "";
  }

  function validateEmail(value) {
    if (!value.trim()) {
      return "Email is required.";
    }
    if (!emailPattern.test(value.trim())) {
      return "Please enter a valid email address.";
    }
    return "";
  }

  function validatePassword(value) {
    if (!value) {
      return "Password is required.";
    }
    if (value.length < 8) {
      return "Password must be at least 8 characters.";
    }
    return "";
  }

  function validateConfirmPassword(value) {
    if (!value) {
      return "Please confirm your password.";
    }
    if (value !== fields.password.input.value) {
      return "Passwords do not match.";
    }
    return "";
  }

  function showError(field, message) {
    field.error.textContent = message;
    field.input.setAttribute("aria-invalid", message ? "true" : "false");
  }

  function clearError(field) {
    showError(field, "");
  }

  function validateField(fieldKey) {
    var field = fields[fieldKey];
    var message = field.validate(field.input.value);
    showError(field, message);
    return message === "";
  }

  function validateForm() {
    var isValid = true;

    Object.keys(fields).forEach(function (key) {
      if (!validateField(key)) {
        isValid = false;
      }
    });

    return isValid;
  }

  function clearSuccessMessage() {
    successMessage.textContent = "";
  }

  Object.keys(fields).forEach(function (key) {
    var field = fields[key];

    field.input.addEventListener("blur", function () {
      validateField(key);
    });

    field.input.addEventListener("input", function () {
      if (field.input.getAttribute("aria-invalid") === "true") {
        validateField(key);
      }

      if (key === "password" && fields.confirmPassword.input.value) {
        validateField("confirmPassword");
      }

      clearSuccessMessage();
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    clearSuccessMessage();

    if (validateForm()) {
      form.reset();
      Object.keys(fields).forEach(function (key) {
        clearError(fields[key]);
      });
      successMessage.textContent = "Settings saved successfully!";
    } else {
      var firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid) {
        firstInvalid.focus();
      }
    }
  });

  form.addEventListener("reset", function (event) {
    if (event.submitter && event.submitter.type === "reset") {
      clearSuccessMessage();
    }
    Object.keys(fields).forEach(function (key) {
      clearError(fields[key]);
    });
  });
})();
