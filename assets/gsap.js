// Initialize Plyr player
let player;

// Select elements
const openModalBtns = document.querySelectorAll(".open-modal-btn");
const closeModalBtn = document.querySelector(".close-modal-btn");
const modalOverlay = document.querySelector(".modal-overlay");
const modalContent = document.querySelector(".modal-content");
const playerContainer = document.getElementById("player");

// Function to open modal with liquid animation and load video
function openModal(videoId) {
  // Show modal overlay
  gsap.to(modalOverlay, {
    opacity: 1,
    visibility: "visible",
    duration: 0.3,
    ease: "power2.out",
  });

  // Liquid morphing effect on modal content
  gsap.fromTo(
    modalContent,
    { borderRadius: "50%", scale: 0 },
    {
      borderRadius: "20px",
      scale: 1,
      duration: 1,
      ease: "elastic.out(1, 0.5)",
    }
  );

  // Load the YouTube video using Plyr.js
  playerContainer.innerHTML = `
    <div class="plyr__video-embed">
      <iframe
        src="https://www.youtube.com/embed/${videoId}?origin=https://plyr.io&amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1"
        allowfullscreen
        allowtransparency
        allow="autoplay"
      ></iframe>
    </div>
  `;

  // Initialize Plyr player
  player = new Plyr("#player iframe", {
    autoplay: true,
  });
}

// Function to close modal with reverse liquid animation
function closeModal() {
  // Liquid morphing effect on modal content
  gsap.to(modalContent, {
    borderRadius: "50%",
    scale: 0,
    duration: 0.8,
    ease: "elastic.in(1, 0.5)",
    onComplete: () => {
      // Hide modal overlay
      gsap.to(modalOverlay, {
        opacity: 0,
        visibility: "hidden",
        duration: 0.3,
        ease: "power2.out",
      });

      // Destroy Plyr player
      if (player) {
        player.destroy();
      }
    },
  });
}

// Add event listeners to open modal buttons
openModalBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const videoId = btn.getAttribute("data-video-id");
    openModal(videoId);
  });
});

// Add event listener to close modal button
closeModalBtn.addEventListener("click", closeModal);

// Close modal when clicking outside the modal content
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) {
    closeModal();
  }
});
