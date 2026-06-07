document.addEventListener("DOMContentLoaded", function () {
  const currentPage = window.location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll(".site-nav a");

  navLinks.forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });

  const typeTarget = document.querySelector(".hero-title");
  if (typeTarget) {
    const text = typeTarget.textContent.trim();
    typeTarget.textContent = "";
    let index = 0;
    const typeInterval = setInterval(() => {
      typeTarget.textContent += text[index] || "";
      index += 1;
      if (index > text.length) {
        clearInterval(typeInterval);
      }
    }, 40);
  }

  const galleryImages = document.querySelectorAll(".gallery-grid img, .portfolio-grid img");
  if (galleryImages.length) {
    const overlay = document.createElement("div");
    overlay.className = "image-overlay";
    overlay.innerHTML = `<div class="image-lightbox"><button class="close-lightbox" type="button">×</button><img alt="Preview image"><p class="caption"></p></div>`;
    document.body.appendChild(overlay);

    const lightboxImage = overlay.querySelector("img");
    const caption = overlay.querySelector(".caption");
    const closeButton = overlay.querySelector(".close-lightbox");

    galleryImages.forEach((image) => {
      image.addEventListener("click", () => {
        lightboxImage.src = image.src;
        caption.textContent = image.alt || "Creative Eye Production";
        overlay.classList.add("visible");
      });
    });

    const closeOverlay = () => overlay.classList.remove("visible");
    closeButton.addEventListener("click", closeOverlay);
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) {
        closeOverlay();
      }
    });
  }

  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const nameField = document.getElementById("fullname");
      const emailField = document.getElementById("email");
      const messageField = document.getElementById("comment");
      const status = document.getElementById("formStatus");
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      status.textContent = "";
      status.classList.remove("form-error");

      if (!nameField.value.trim()) {
        status.textContent = "Please enter your full name.";
        status.classList.add("form-error");
        nameField.focus();
        return;
      }
      if (!emailPattern.test(emailField.value.trim())) {
        status.textContent = "Please enter a valid email address.";
        status.classList.add("form-error");
        emailField.focus();
        return;
      }
      if (!messageField.value.trim()) {
        status.textContent = "Please write a short message so we can respond.";
        status.classList.add("form-error");
        messageField.focus();
        return;
      }

      status.textContent = "Thank you! Your message has been received. We will contact you shortly.";
      status.classList.remove("form-error");
      contactForm.reset();
    });
  }
});

/* Lightbox styles appended dynamically to prevent CSS conflicts */
const overlayStyles = document.createElement("style");
overlayStyles.textContent = `
.image-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.75);
  display: none;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  z-index: 50;
}
.image-overlay.visible {
  display: flex;
}
.image-lightbox {
  position: relative;
  max-width: min(90vw, 920px);
  width: 100%;
  border-radius: 1.5rem;
  overflow: hidden;
  background: white;
}
.image-lightbox img {
  width: 100%;
  height: auto;
  display: block;
}
.image-lightbox .caption {
  margin: 0;
  padding: 1rem 1.25rem 1.5rem;
  font-size: 0.95rem;
  color: #4b5563;
}
.close-lightbox {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  border-radius: 50%;
  background: rgba(15, 23, 42, 0.85);
  color: white;
  font-size: 1.35rem;
  cursor: pointer;
}
`;
document.head.appendChild(overlayStyles);
