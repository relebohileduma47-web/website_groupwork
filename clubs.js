/* ---------- CONTACT FORM WITH DUPLICATE CHECK ---------- */
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form");
  const messageBox = document.getElementById("message-box");

  // Simulated "database" using localStorage
  let submissions = JSON.parse(localStorage.getItem("submissions")) || [];

  // Utility: show message with color
  function showMessage(text, color = "black") {
    messageBox.innerHTML = `<p style="color:${color};">${text}</p>`;
    // Clear message after 5 seconds
    setTimeout(() => (messageBox.innerHTML = ""), 5000);
  }

  // Utility: validate email format
  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("cName").value.trim();
      const email = document.getElementById("cEmail").value.trim();
      const message = document.getElementById("cMessage").value.trim();

      // Validation: all fields required
      if (!name || !email || !message) {
        showMessage("Please fill in all fields.", "red");
        return;
      }

      // Validation: email format
      if (!isValidEmail(email)) {
        showMessage("Please enter a valid email address.", "red");
        return;
      }

      // Check if name already exists
      const nameExists = submissions.some(
        (entry) => entry.name.toLowerCase() === name.toLowerCase()
      );

      // Check if email already exists
      const emailExists = submissions.some(
        (entry) => entry.email.toLowerCase() === email.toLowerCase()
      );

      if (nameExists || emailExists) {
        showMessage(
          `This ${nameExists ? "name" : "email"} is already registered. Please use a different one.`,
          "orange"
        );
        return;
      }

      // If not duplicate, save new submission
      submissions.push({ name, email, message });
      localStorage.setItem("submissions", JSON.stringify(submissions));

      showMessage(`Thank you, ${name}! Your inquiry has been sent.`, "green");
      this.reset();
    });
  }

  /* ---------- OPTIONAL: CLEAR SUBMISSIONS (for testing) ---------- */
  const clearBtn = document.getElementById("clear-submissions");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      localStorage.removeItem("submissions");
      submissions = [];
      showMessage("All stored submissions have been cleared.", "blue");
    });
  }
});