const body = document.body;
const header = document.querySelector(".site-header");
const navLinks = document.getElementById("nav-links");
const menuToggle = document.getElementById("menu-toggle");
const themeToggle = document.getElementById("theme-toggle");
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

function setHeaderState() {
  if (!header) {
    return;
  }

  if (window.scrollY > 8) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

function closeMobileMenu() {
  if (!navLinks || !menuToggle) {
    return;
  }

  navLinks.classList.remove("open");
  menuToggle.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    menuToggle.classList.toggle("open");
    navLinks.classList.toggle("open");
  });

  document.addEventListener("click", (event) => {
    if (!navLinks.classList.contains("open")) {
      return;
    }

    const clickedInsideMenu = navLinks.contains(event.target);
    const clickedToggle = menuToggle.contains(event.target);
    if (!clickedInsideMenu && !clickedToggle) {
      closeMobileMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 820) {
      closeMobileMenu();
    }
  });
}

// Highlight active page in the navbar.
const currentPage = window.location.pathname.split("/").pop() || "index.html";

document.querySelectorAll(".nav-links a[data-page]").forEach((link) => {
  if (link.dataset.page === currentPage) {
    link.classList.add("active");
    link.setAttribute("aria-current", "page");
  }
});

// Smooth scroll for same-page anchor links.
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    const target = targetId ? document.querySelector(targetId) : null;
    if (!target) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    closeMobileMenu();
  });
});

window.addEventListener(
  "scroll",
  () => {
    setHeaderState();
  },
  { passive: true }
);
setHeaderState();

// Reveal elements when they enter the viewport.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -34px 0px",
    }
  );

  revealItems.forEach((item, index) => {
    const delayMs = Math.min(index * 40, 220);
    item.style.transitionDelay = `${delayMs}ms`;
    revealObserver.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

function syncThemeLabel() {
  if (!themeToggle) {
    return;
  }

  const isDark = body.classList.contains("dark");
  themeToggle.textContent = isDark ? "Light Mode" : "Dark Mode";
  themeToggle.setAttribute("aria-pressed", String(isDark));
}

function getStoredTheme() {
  try {
    return localStorage.getItem("theme");
  } catch (error) {
    return null;
  }
}

function setStoredTheme(themeValue) {
  try {
    localStorage.setItem("theme", themeValue);
  } catch (error) {
    // Ignore storage restrictions and keep UI functional.
  }
}

if (getStoredTheme() === "dark") {
  body.classList.add("dark");
}
syncThemeLabel();

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark");
    const isDark = body.classList.contains("dark");
    setStoredTheme(isDark ? "dark" : "light");
    syncThemeLabel();
  });
}

if (contactForm && formStatus) {
  const submitButton =
    document.getElementById("contact-submit") || contactForm.querySelector('button[type="submit"]');
  const submitLabel = submitButton ? submitButton.textContent : "Send Message";

  const setSubmittingState = (isSubmitting) => {
    contactForm.setAttribute("aria-busy", String(isSubmitting));
    if (submitButton) {
      submitButton.disabled = isSubmitting;
      submitButton.textContent = isSubmitting ? "Sending..." : submitLabel;
    }
  };

  const setFormStatus = (message, state) => {
    formStatus.textContent = message;
    formStatus.classList.remove("is-info", "is-success", "is-error");
    if (state) {
      formStatus.classList.add(state);
    }
  };

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    const formData = new FormData(contactForm);
    const honeypot = String(formData.get("_honey") || "").trim();
    if (honeypot) {
      setFormStatus("Unable to send the message. Please try again.", "is-error");
      return;
    }

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (message.length < 10) {
      setFormStatus("Please enter at least 10 characters in your message.", "is-error");
      return;
    }

    const payload = {
      name,
      email,
      message,
      _subject: String(formData.get("_subject") || "New Portfolio Message"),
      _template: String(formData.get("_template") || "table"),
      _captcha: String(formData.get("_captcha") || "false"),
    };

    const endpoint = contactForm.dataset.ajaxEndpoint || contactForm.action;
    setSubmittingState(true);
    setFormStatus("Sending your message...", "is-info");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      let responseBody = null;
      try {
        responseBody = await response.json();
      } catch (error) {
        responseBody = null;
      }

      const hasSuccessFlag = responseBody && Object.prototype.hasOwnProperty.call(responseBody, "success");
      if (!response.ok || (hasSuccessFlag && !responseBody.success)) {
        throw new Error("Submission failed");
      }

      setFormStatus("Message sent successfully. Thank you. I will get back to you soon.", "is-success");
      contactForm.reset();
    } catch (error) {
      setFormStatus(
        "Could not send your message right now. Please email ashbinsanthosh2@gmail.com directly.",
        "is-error"
      );
    } finally {
      setSubmittingState(false);
    }
  });
}

const projectsGrid = document.getElementById("projects-grid");
const projectBackButton = document.getElementById("project-back-btn");

if (projectsGrid && projectBackButton) {
  const projectCards = Array.from(projectsGrid.querySelectorAll(".project-card"));
  const focusButtons = Array.from(projectsGrid.querySelectorAll(".project-focus-btn"));
  let lastFocusTrigger = null;

  const clearFocusedProject = () => {
    projectsGrid.classList.remove("project-focus-mode");
    body.classList.remove("projects-focus-active");
    projectCards.forEach((card) => card.classList.remove("is-focused"));
    projectBackButton.hidden = true;
  };

  if (projectCards.length > 0 && focusButtons.length > 0) {
    projectsGrid.classList.add("project-grid-enhanced");

    focusButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const targetCard = button.closest(".project-card");
        if (!targetCard) {
          return;
        }

        lastFocusTrigger = button;
        projectsGrid.classList.add("project-focus-mode");
        body.classList.add("projects-focus-active");
        projectCards.forEach((card) => card.classList.toggle("is-focused", card === targetCard));
        projectBackButton.hidden = false;

        targetCard.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });

    projectBackButton.addEventListener("click", () => {
      clearFocusedProject();
      if (lastFocusTrigger) {
        lastFocusTrigger.focus();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && projectsGrid.classList.contains("project-focus-mode")) {
        clearFocusedProject();
        if (lastFocusTrigger) {
          lastFocusTrigger.focus();
        }
      }
    });
  }
}
