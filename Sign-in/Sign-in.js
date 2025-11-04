document.addEventListener("DOMContentLoaded", () => {
  // Convert the "Type here..." <p> elements into real <input> fields
  const placeholders = [
    { selector: ".Type1", type: "email", id: "email" },
    { selector: ".Type2", type: "password", id: "password" },
  ];

  placeholders.forEach(({ selector, type, id }) => {
    const p = document.querySelector(selector);
    const input = document.createElement("input");
    input.type = type;
    input.id = id;
    input.placeholder = "Type here...";
    input.className = p.className;
    p.replaceWith(input);
  });

  // Handle Next button click
  const nextLink = document.querySelector(".Next a");

  nextLink.addEventListener("click", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    // Check if fields are empty
    if (!email || !password) {
      alert("Please fill in both email and password.");
      return;
    }

    // Simple email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Check password length
    if (password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    // If valid, proceed to home page
    window.location.href = "/Home-pages/Pawpal-Homepage.Html";
  });

  // Optional: make the Google/Facebook icons clickable
  const google = document.querySelector(".Google-image");
  const facebook = document.querySelector(".FaceBook-image");

  google.addEventListener("click", () => {
    alert("Google sign-in feature coming soon!");
  });

  facebook.addEventListener("click", () => {
    alert("Facebook sign-in feature coming soon!");
  });
});
