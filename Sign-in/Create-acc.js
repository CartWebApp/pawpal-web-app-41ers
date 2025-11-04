document.addEventListener("DOMContentLoaded", () => {
  // Replace placeholder <p> with input boxes dynamically
  const placeholders = [
    { selector: ".Type1", type: "text", id: "lastName" },
    { selector: ".Type2", type: "text", id: "firstName" },
    { selector: ".Type3", type: "email", id: "email" },
    { selector: ".Type4", type: "text", id: "zip" },
    { selector: ".Type5", type: "password", id: "password" },
    { selector: ".Type6", type: "password", id: "confirm" }
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

  // Add validation logic for the "Next" button
  const nextLink = document.querySelector(".Next");
  nextLink.style.cursor = "pointer";

  nextLink.addEventListener("click", (e) => {
    e.preventDefault();

    const lastName = document.getElementById("lastName").value.trim();
    const firstName = document.getElementById("firstName").value.trim();
    const email = document.getElementById("email").value.trim();
    const zip = document.getElementById("zip").value.trim();
    const password = document.getElementById("password").value;
    const confirm = document.getElementById("confirm").value;

    // 1️⃣ Check for empty fields
    if (!lastName || !firstName || !email || !zip || !password || !confirm) {
      alert("Please fill in all fields before continuing.");
      return;
    }

    // 2️⃣ Check ZIP code (5 digits only)
    const zipPattern = /^[0-9]{5}$/;
    if (!zipPattern.test(zip)) {
      alert("Please enter a valid 5-digit ZIP code.");
      return;
    }

    // 3️⃣ Password length
    if (password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    // 4️⃣ Confirm password match
    if (password !== confirm) {
      alert("Passwords do not match.");
      return;
    }

    // ✅ If everything is valid, go to next page
    window.location.href = "/Home-pages/Pawpal-Homepage.Html";
  });
});
