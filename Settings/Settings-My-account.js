// Wait for page to fully load
document.addEventListener("DOMContentLoaded", () => {
  const editProfileBtn = document.querySelector(".Edit");
  const editDescriptionBtn = document.querySelector(".Edit-Description");
  const profileName = document.querySelector(".Text");
  const profileImage = document.querySelector(".Jarl-Kettlebox-image");
  const profileDescription = document.querySelector(".Description");

  // Function to create a reusable modal
  function createModal(title, content, onSave) {
    // Overlay
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0,0,0,0.5)";
    overlay.style.display = "flex";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.zIndex = "1000";

    // Modal box
    const modal = document.createElement("div");
    modal.style.background = "#fff";
    modal.style.padding = "30px";
    modal.style.borderRadius = "10px";
    modal.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
    modal.style.width = "350px";
    modal.style.textAlign = "center";

    // Title
    const heading = document.createElement("h2");
    heading.textContent = title;
    heading.style.marginBottom = "20px";

    // Content
    modal.appendChild(heading);
    modal.appendChild(content);

    // Buttons
    const buttonContainer = document.createElement("div");
    buttonContainer.style.marginTop = "20px";
    buttonContainer.style.display = "flex";
    buttonContainer.style.justifyContent = "space-around";

    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";
    saveBtn.style.padding = "10px 20px";
    saveBtn.style.background = "#4caf50";
    saveBtn.style.color = "#fff";
    saveBtn.style.border = "none";
    saveBtn.style.borderRadius = "5px";
    saveBtn.style.cursor = "pointer";

    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = "Cancel";
    cancelBtn.style.padding = "10px 20px";
    cancelBtn.style.background = "#ccc";
    cancelBtn.style.border = "none";
    cancelBtn.style.borderRadius = "5px";
    cancelBtn.style.cursor = "pointer";

    buttonContainer.appendChild(saveBtn);
    buttonContainer.appendChild(cancelBtn);
    modal.appendChild(buttonContainer);

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // Event listeners
    cancelBtn.addEventListener("click", () => document.body.removeChild(overlay));
    saveBtn.addEventListener("click", () => {
      onSave();
      document.body.removeChild(overlay);
    });
  }

  // ---------- Edit Profile ----------
  editProfileBtn.addEventListener("click", () => {
    const content = document.createElement("div");

    const nameLabel = document.createElement("label");
    nameLabel.textContent = "Name:";
    nameLabel.style.display = "block";
    nameLabel.style.marginBottom = "5px";

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.value = profileName.textContent;
    nameInput.style.width = "90%";
    nameInput.style.padding = "8px";
    nameInput.style.border = "1px solid #ccc";
    nameInput.style.borderRadius = "5px";
    nameInput.style.marginBottom = "15px";

    const imageLabel = document.createElement("label");
    imageLabel.textContent = "Profile image:";
    imageLabel.style.display = "block";
    imageLabel.style.marginBottom = "5px";

    const imageInput = document.createElement("input");
    imageInput.type = "file";
    imageInput.accept = "image/*";

    content.appendChild(nameLabel);
    content.appendChild(nameInput);
    content.appendChild(imageLabel);
    content.appendChild(imageInput);

    createModal("Edit Profile", content, () => {
      profileName.textContent = nameInput.value || "Unnamed User";

      // Change image if new file selected
      if (imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => (profileImage.src = e.target.result);
        reader.readAsDataURL(imageInput.files[0]);
      }
    });
  });

  // ---------- Edit Description ----------
  editDescriptionBtn.addEventListener("click", () => {
    const content = document.createElement("div");

    const label = document.createElement("label");
    label.textContent = "Description:";
    label.style.display = "block";
    label.style.marginBottom = "5px";

    const textarea = document.createElement("textarea");
    textarea.value = profileDescription.textContent.trim();
    textarea.style.width = "90%";
    textarea.style.height = "100px";
    textarea.style.padding = "8px";
    textarea.style.border = "1px solid #ccc";
    textarea.style.borderRadius = "5px";

    content.appendChild(label);
    content.appendChild(textarea);

    createModal("Edit Description", content, () => {
      profileDescription.textContent = textarea.value || "No description provided.";
    });
  });
});
