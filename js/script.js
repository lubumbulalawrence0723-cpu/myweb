// The photo list keeps each image, caption, and alternative description together.
const photos = [
  {
    src: "images/photo1.jpg.jpg",
    alt: "Lawrence looking at the camera in a blue and red shirt",
    caption: "Looking at the camera"
  },
  {
    src: "images/photo2.jpg.jpg",
    alt: "Lawrence covering his mouth with one hand",
    caption: "Covering my mouth"
  },
  {
    src: "images/photo3.jpg.jpg",
    alt: "Lawrence smiling with one finger resting on his chin",
    caption: "Finger on my chin"
  }
];

const galleryImage = document.querySelector("#gallery-image");
const galleryCaption = document.querySelector("#gallery-caption");
const galleryStatus = document.querySelector("#gallery-status");
let currentPhotoIndex = 0;

// Updates the featured photo, its caption, and the position announcement.
function showPhoto(index) {
  currentPhotoIndex = (index + photos.length) % photos.length;
  const photo = photos[currentPhotoIndex];
  galleryImage.src = photo.src;
  galleryImage.alt = photo.alt;
  galleryCaption.textContent = photo.caption;
  galleryStatus.textContent = `Photo ${currentPhotoIndex + 1} of ${photos.length}`;
}

document.querySelector("#previous-photo").addEventListener("click", () => {
  showPhoto(currentPhotoIndex - 1);
});

document.querySelector("#next-photo").addEventListener("click", () => {
  showPhoto(currentPhotoIndex + 1);
});

const projectSearch = document.querySelector("#project-search");
const projectCards = [...document.querySelectorAll(".project-card")];
const filterStatus = document.querySelector("#filter-status");

// Filters the project cards and tells visitors how many results remain.
function filterProjects() {
  const query = projectSearch.value.trim().toLocaleLowerCase();
  let visibleCount = 0;

  projectCards.forEach((card) => {
    const matches = card.textContent.toLocaleLowerCase().includes(query)
      || card.dataset.search.toLocaleLowerCase().includes(query);
    card.hidden = !matches;
    if (matches) visibleCount += 1;
  });

  if (visibleCount === 0) {
    filterStatus.textContent = "No projects or skills match your search. Try another word or use Reset.";
  } else {
    filterStatus.textContent = `Showing ${visibleCount} of ${projectCards.length} projects and skills.`;
  }
}

projectSearch.addEventListener("input", filterProjects);

document.querySelector("#reset-filter").addEventListener("click", () => {
  projectSearch.value = "";
  filterProjects();
  projectSearch.focus();
});

const contactForm = document.querySelector("#contact-form");
const formFeedback = document.querySelector("#form-feedback");
const formPreview = document.querySelector("#form-preview");
const nameField = document.querySelector("#name");
const emailField = document.querySelector("#email");
const topicField = document.querySelector("#topic");
const messageField = document.querySelector("#message");

function reportFormError(message, field) {
  formFeedback.textContent = message;
  formFeedback.className = "form-feedback error";
  formPreview.hidden = true;
  field.focus();
}

// Validates the demo form and builds a safe on-page preview without sending it.
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = nameField.value.trim();
  const email = emailField.value.trim();
  const topic = topicField.value.trim();
  const message = messageField.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name) {
    reportFormError("Please enter your name. Spaces alone are not valid.", nameField);
    return;
  }

  if (!email || !emailPattern.test(email)) {
    reportFormError("Please enter a valid email address, for example name@example.com.", emailField);
    return;
  }

  if (!message) {
    reportFormError("Please enter a message. Spaces alone are not valid.", messageField);
    return;
  }

  document.querySelector("#preview-name").textContent = name;
  document.querySelector("#preview-email").textContent = email;
  document.querySelector("#preview-topic").textContent = topic || "Not provided";
  document.querySelector("#preview-message").textContent = message;
  formPreview.hidden = false;
  formFeedback.textContent = "Your information was validated in this browser. No message was sent.";
  formFeedback.className = "form-feedback success";
});

const themeToggle = document.querySelector("#theme-toggle");

// Switches the page palette and announces which theme the button will activate.
themeToggle.addEventListener("click", () => {
  const darkThemeIsActive = document.body.classList.toggle("dark-theme");
  themeToggle.setAttribute("aria-pressed", String(darkThemeIsActive));
  themeToggle.textContent = darkThemeIsActive
    ? "Switch to light theme"
    : "Switch to dark theme";
});
