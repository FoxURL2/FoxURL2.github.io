// Fade-in cards on scroll
const cards = document.querySelectorAll(".card");

function revealCards() {
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }
  });
}

window.addEventListener("scroll", revealCards);
revealCards();

// Mascot hover wiggle
const fox = document.querySelector(".fox-mascot");

fox.addEventListener("mouseover", () => {
  fox.style.transition = "0.2s";
  fox.style.transform = "rotate(6deg)";
});

fox.addEventListener("mouseout", () => {
  fox.style.transform = "rotate(0deg)";
});
