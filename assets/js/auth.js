/**
 * RoadNest Owner Portal authentication interactions.
 * This is intentionally frontend demo behavior; no passwords are persisted.
 */
(function initRoadNestAuth() {
  const ready = () => {
    const menuToggle = document.querySelector('.auth-menu-toggle');
    const authMenu = document.getElementById('authQuickMenu');
    const closeAuthMenu = () => {
      if (!menuToggle || !authMenu) return;
      authMenu.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    };

    if (menuToggle && authMenu) {
      menuToggle.addEventListener('click', event => {
        event.preventDefault();
        const open = !authMenu.classList.contains('is-open');
        authMenu.classList.toggle('is-open', open);
        menuToggle.setAttribute('aria-expanded', String(open));
      });

      authMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeAuthMenu));
      document.addEventListener('click', event => {
        if (!authMenu.contains(event.target) && !menuToggle.contains(event.target)) closeAuthMenu();
      });
      document.addEventListener('keydown', event => {
        if (event.key === 'Escape') closeAuthMenu();
      });
    }

    document.querySelectorAll('[data-password-toggle]').forEach(toggle => {
      toggle.addEventListener('click', () => {
        const input = document.getElementById(toggle.dataset.passwordToggle);
        const icon = toggle.querySelector('i');
        if (!input) return;

        const showing = input.type === 'text';
        input.type = showing ? 'password' : 'text';
        toggle.setAttribute('aria-label', showing ? 'Show password' : 'Hide password');
        if (icon) icon.className = showing ? 'fas fa-eye' : 'fas fa-eye-slash';
      });
    });

    const password = document.getElementById('regPass');
    const strength = document.getElementById('passwordStrength');
    const updateStrength = () => {
      if (!password || !strength) return;
      const value = password.value;
      if (!value) {
        strength.textContent = '';
        strength.className = 'auth-password-strength';
        return;
      }

      let score = 0;
      if (value.length >= 8) score += 1;
      if (/[a-z]/.test(value) && /[A-Z]/.test(value)) score += 1;
      if (/\d/.test(value) || /[^A-Za-z0-9]/.test(value)) score += 1;
      const level = score >= 3 ? 'strong' : score === 2 ? 'good' : 'weak';
      strength.textContent = `Password strength: ${level[0].toUpperCase()}${level.slice(1)}`;
      strength.className = `auth-password-strength ${level}`;
    };
    password?.addEventListener('input', updateStrength);

    const showStatus = (element, message, type = 'error') => {
      if (!element) return;
      element.className = `auth-status is-${type}`;
      element.innerHTML = `<i class="fas ${type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'}" aria-hidden="true"></i><span>${message}</span>`;
    };

    const getErrorElement = field => document.getElementById(`${field.id}Error`);
    const getFieldContainer = field => field.closest('.auth-field, .auth-terms');

    const validateField = field => {
      const container = getFieldContainer(field);
      const error = getErrorElement(field);
      let message = '';

      if (field.type === 'checkbox' && field.required && !field.checked) {
        message = 'Please accept this agreement to continue.';
      } else if (field.required && !field.value.trim()) {
        message = 'This field is required.';
      } else if (field.type === 'email' && field.validity.typeMismatch) {
        message = 'Enter a valid email address.';
      } else if (field.type === 'tel' && field.value.replace(/\D/g, '').length < 7) {
        message = 'Enter a valid phone number.';
      } else if (field.id === 'regPass' && field.value.length < 8) {
        message = 'Use at least 8 characters.';
      } else if (field.id === 'regConfirmPass' && field.value !== document.getElementById('regPass')?.value) {
        message = 'Passwords do not match.';
      }

      const invalid = Boolean(message);
      container?.classList.toggle('has-error', invalid);
      container?.classList.toggle('has-success', !invalid && Boolean(field.value || field.checked));
      field.setAttribute('aria-invalid', String(invalid));
      if (error) error.textContent = message;
      return invalid;
    };

    const validateForm = form => {
      form.classList.add('auth-form-validated');
      const fields = [...form.querySelectorAll('input, select')].filter(field => field.type !== 'hidden');
      let firstInvalid = null;
      fields.forEach(field => {
        if (validateField(field) && !firstInvalid) firstInvalid = field;
      });
      return firstInvalid;
    };

    const resetAuthForm = form => {
      form.reset();
      form.classList.remove('auth-form-validated');
      form.querySelectorAll('.auth-field, .auth-terms').forEach(container => {
        container.classList.remove('has-error', 'has-success');
      });
      form.querySelectorAll('.auth-error').forEach(error => {
        error.textContent = '';
      });
      form.querySelectorAll('[aria-invalid]').forEach(field => {
        field.setAttribute('aria-invalid', 'false');
      });

      form.querySelectorAll('[data-password-toggle]').forEach(toggle => {
        const input = document.getElementById(toggle.dataset.passwordToggle);
        const icon = toggle.querySelector('i');
        if (input) input.type = 'password';
        toggle.setAttribute('aria-label', 'Show password');
        if (icon) icon.className = 'fas fa-eye';
      });
    };

    document.querySelectorAll('.auth-form input, .auth-form select').forEach(field => {
      const update = () => {
        const form = field.form;
        if (form?.classList.contains('auth-form-validated') || getFieldContainer(field)?.classList.contains('has-error')) validateField(field);
      };
      field.addEventListener('input', update);
      field.addEventListener('change', update);
    });

    const loginForm = document.getElementById('loginForm');
    const loginStatus = document.getElementById('loginStatus');
    if (loginForm) {
      const params = new URLSearchParams(window.location.search);
      if (params.get('registered') === '1') {
        showStatus(loginStatus, 'Registration successful. Please sign in to continue.', 'success');
      }

      loginForm.addEventListener('submit', event => {
        event.preventDefault();
        const firstInvalid = validateForm(loginForm);
        if (firstInvalid) {
          showStatus(loginStatus, 'Please check the highlighted fields and try again.');
          firstInvalid.focus();
          return;
        }

        const submit = loginForm.querySelector('[type="submit"]');
        if (submit) {
          submit.disabled = true;
          submit.innerHTML = '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i><span>Signing In...</span>';
        }
        sessionStorage.setItem('roadnest_demo_session', 'active');
        window.setTimeout(() => {
          resetAuthForm(loginForm);
          if (submit) {
            submit.disabled = false;
            submit.innerHTML = '<span>Sign In to Owner Portal</span><i class="fas fa-arrow-right" aria-hidden="true"></i>';
          }
          showStatus(loginStatus, 'Login successful.', 'success');
        }, 350);
      });

      document.querySelectorAll('[data-auth-provider]').forEach(button => {
        button.addEventListener('click', event => {
          event.preventDefault();
          const provider = button.dataset.authProvider || 'Social';
          showStatus(loginStatus, `${provider} sign-in successful.`, 'success');
        });
      });
    }

    const registerForm = document.getElementById('registerForm');
    const registerStatus = document.getElementById('registerStatus');
    if (registerForm) {
      registerForm.addEventListener('submit', event => {
        event.preventDefault();
        const firstInvalid = validateForm(registerForm);
        if (firstInvalid) {
          showStatus(registerStatus, 'Please complete the required fields before creating your profile.');
          firstInvalid.focus();
          return;
        }

        const profile = {
          name: document.getElementById('regName').value.trim(),
          email: document.getElementById('regEmail').value.trim(),
          phone: document.getElementById('regPhone').value.trim(),
          rvCategory: document.getElementById('regRvType').value,
          modelYear: document.getElementById('regYear').value,
          manufacturer: document.getElementById('regMake').value.trim(),
          model: document.getElementById('regModel').value.trim()
        };
        sessionStorage.setItem('roadnest_demo_profile', JSON.stringify(profile));

        const submit = registerForm.querySelector('[type="submit"]');
        if (submit) {
          submit.disabled = true;
          submit.innerHTML = '<i class="fas fa-circle-check" aria-hidden="true"></i><span>Profile Created</span>';
        }
        showStatus(registerStatus, 'Profile created successfully. Taking you to sign in...', 'success');
        window.setTimeout(() => { window.location.href = 'login.html?registered=1'; }, 900);
      });
    }
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready, { once: true });
  else ready();
})();
