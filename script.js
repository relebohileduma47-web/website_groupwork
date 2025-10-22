/* ---------- CONTACT FORM ---------- */
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form");
  const messageBox = document.getElementById("message-box");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("cName").value.trim();
      const email = document.getElementById("cEmail").value.trim();
      const message = document.getElementById("cMessage").value.trim();

      if (!name || !email || !message) {
        messageBox.innerHTML = `<p style="color:red;">Please fill in all fields.</p>`;
        return;
      }

      messageBox.innerHTML = `<p style="color:green;">Thank you, ${name}! Your inquiry has been sent.</p>`;
      this.reset();
    });
  }

  /* ---------- SLIDESHOW (for events page) ---------- */
  let slideIndex = 0;
  const slides = document.querySelectorAll(".slide");

  if (slides.length > 0) {
    function showSlides() {
      slides.forEach(s => s.style.display = "none");
      slideIndex++;
      if (slideIndex > slides.length) slideIndex = 1;
      slides[slideIndex - 1].style.display = "block";
      setTimeout(showSlides, 4000);
    }
    showSlides();
  }
});
