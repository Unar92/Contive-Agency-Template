// Select elements
const hamburgerMenu = document.getElementById("hamburger-menu");
const navMenu = document.getElementById("nav-menu");
const lines = document.querySelectorAll(".hamburger-menu .line");

// GSAP timeline for hamburger animation
const tl = gsap.timeline({ paused: true });

// Hamburger to close icon animation
tl.to(lines[0], { y: 13, rotation: 45, duration: 0.3 }, 0)
  .to(lines[1], { opacity: 0, duration: 0.2 }, 0)
  .to(lines[2], { y: -13, rotation: -45, duration: 0.3 }, 0);

// Toggle menu function
function toggleMenu() {
  if (hamburgerMenu.classList.contains("active")) {
    // Close menu
    gsap.to(navMenu, { right: "-100%", duration: 0.5, ease: "power2.out" });
    tl.reverse(); // Reverse the hamburger animation
  } else {
    // Open menu
    gsap.to(navMenu, { right: 0, duration: 0.5, ease: "power2.out" });
    tl.play(); // Play the hamburger animation
  }
  hamburgerMenu.classList.toggle("active");
}

// Add event listener to hamburger menu
hamburgerMenu.addEventListener("click", toggleMenu);


// Select elements
const cursor = document.querySelector(".cursor");
const rippleContainer = document.querySelector(".ripple-container");

// Track mouse movement
document.addEventListener("mousemove", (e) => {
  const { clientX: x, clientY: y } = e;

  // Move cursor
  gsap.to(cursor, {
    x: x,
    y: y,
    duration: 0.1,
    ease: "power2.out",
  });

  // Create ripple effect
  const ripple = document.createElement("div");
  ripple.classList.add("ripple");
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;
  rippleContainer.appendChild(ripple);

  // Animate ripple
  gsap.to(ripple, {
    scale: 3,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
    onComplete: () => {
      ripple.remove(); // Remove ripple after animation
    },
  });
});