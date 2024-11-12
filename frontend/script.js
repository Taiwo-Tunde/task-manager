// Open modal function
function openModal() {
  document.getElementById("auth-modal").style.display = "flex";
  toggleModal("signin"); // Default to sign-in form
}

// Close modal function
function closeModal() {
  document.getElementById("auth-modal").style.display = "none";
}

// Toggle between Sign In and Sign Up forms
function toggleModal(mode) {
  const signInForm = document.getElementById("signin-form");
  const signUpForm = document.getElementById("signup-form");
  const modalTitle = document.getElementById("modal-title");

  if (mode === "signin") {
    signInForm.style.display = "block";
    signUpForm.style.display = "none";
    modalTitle.textContent = "Sign In";
  } else if (mode === "signup") {
    signInForm.style.display = "none";
    signUpForm.style.display = "block";
    modalTitle.textContent = "Sign Up";
  }
}

// Handle sign-in form submission
async function handleSignIn(event) {
  event.preventDefault();
  const email = document.getElementById("signin-email").value;
  const password = document.getElementById("signin-password").value;

  try {
    const response = await fetch("/api/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();
    const messageElement = document.getElementById("signin-message");

    if (response.ok) {
      messageElement.textContent = "Sign in successful!";
      messageElement.style.color = "green";
      closeModal();
      // Redirect or load user dashboard
    } else {
      messageElement.textContent = result.message || "Sign in failed.";
      messageElement.style.color = "red";
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Handle sign-up form submission
async function handleSignUp(event) {
  event.preventDefault();
  const name = document.getElementById("signup-name").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  try {
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const result = await response.json();
    const messageElement = document.getElementById("signup-message");

    if (response.ok) {
      messageElement.textContent = "Sign up successful!";
      messageElement.style.color = "green";
      toggleModal("signin"); // Redirect to sign-in form
    } else {
      messageElement.textContent = result.message || "Sign up failed.";
      messageElement.style.color = "red";
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Close modal when clicking outside of modal content
window.onclick = function (event) {
  const modal = document.getElementById("auth-modal");
  if (event.target === modal) {
    closeModal();
  }
};
