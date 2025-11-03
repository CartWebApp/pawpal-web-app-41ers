const daysContainer = document.createElement("section");
daysContainer.id = "days";
document.querySelector(".calendar").appendChild(daysContainer);

const monthYear = document.getElementById("month-year");
let currentDate = new Date();

// Store comments in an object: { "YYYY-MM-DD": ["Comment1", "Comment2"] }
const commentsData = {};

function renderCalendar(date) {
  const year = date.getFullYear();
  const month = date.getMonth();

  // Update month title
  monthYear.textContent = date.toLocaleString("default", { month: "long", year: "numeric" });

  // Clear old days
  daysContainer.innerHTML = "";

  // First day of the month
  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  // Empty spaces before first day
  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement("p");
    daysContainer.appendChild(empty);
  }

  for (let i = 1; i <= totalDays; i++) {
    const day = document.createElement("p");
    day.classList.add("day");
    day.textContent = i;

    const key = `${year}-${month + 1}-${i}`; // e.g., "2025-11-3"

    // Render existing comments
    if (commentsData[key]) {
      commentsData[key].forEach((text, index) => {
        const comment = createCommentElement(text, key, index);
        day.appendChild(comment);
      });
    }

    // Click to add comment
    day.addEventListener("click", () => {
      const commentText = prompt(`Add a comment for ${i} ${monthYear.textContent}:`);
      if (commentText) {
        if (!commentsData[key]) commentsData[key] = [];
        commentsData[key].push(commentText);

        const comment = createCommentElement(commentText, key, commentsData[key].length - 1);
        day.appendChild(comment);
      }
    });

    daysContainer.appendChild(day);
  }
}

// Helper to create comment element with delete button
function createCommentElement(text, key, index) {
  const comment = document.createElement("p");
  comment.classList.add("comment");
  comment.textContent = text;

  // Add delete button
  const deleteBtn = document.createElement("span");
  deleteBtn.textContent = " ❌";
  deleteBtn.style.cursor = "pointer";
  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // prevent triggering the day's click event
    commentsData[key].splice(index, 1); // remove from data
    renderCalendar(currentDate); // re-render calendar to update comments
  });

  comment.appendChild(deleteBtn);
  return comment;
}

// Month navigation
document.getElementById("prev-month").addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar(currentDate);
});

document.getElementById("next-month").addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar(currentDate);
});

// Initial render
renderCalendar(currentDate);
