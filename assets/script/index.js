// document.addEventListener("DOMContentLoaded", function () {
//   // Mobile menu toggle
//   const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
//   const mobileMenu = document.querySelector(".mobile-menu");

//   mobileMenuToggle.addEventListener("click", function () {
//     mobileMenuToggle.classList.toggle("active");
//     mobileMenu.classList.toggle("active");
//   });

//   // Nav item interactions
//   const navLinks = document.querySelectorAll(".nav-item");

//   navLinks.forEach((link) => {
//     link.addEventListener("mouseenter", function () {
//       this.classList.add("active");
//       this.classList.add("dropdown");
//     });
//     link.addEventListener("mouseleave", function () {
//       this.classList.remove("active");
//       this.classList.add("dropdown");
//     });
//   });

//   // Close mobile menu when clicking outside
//   document.addEventListener("click", function (event) {
//     if (
//       !mobileMenuToggle.contains(event.target) &&
//       !mobileMenu.contains(event.target)
//     ) {
//       mobileMenuToggle.classList.remove("active");
//       mobileMenu.classList.remove("active");
//     }
//   });

//   // Sidebar item interactions
//   const sidebarItems = document.querySelectorAll(".sidebar-item");
//   const grids = document.querySelectorAll(".mega-menu-content .services-grid");

//   sidebarItems.forEach((item) => {
//     item.addEventListener("mouseenter", function () {
//       // Remove active class from all sidebar items
//       sidebarItems.forEach((i) => i.classList.remove("active"));
//       // Add active class to this
//       this.classList.add("active");

//       // Show corresponding grid
//       const target = this.dataset.target;
//       grids.forEach((grid) => {
//         if (grid.dataset.grid === target) {
//           grid.style.display = "grid";
//         } else {
//           grid.style.display = "none";
//         }
//       });
//     });
//   });

//   // Close mega menu when clicking outside
//   document.addEventListener("hover", function (event) {
//     const dropdown = document.querySelector(".dropdown");
//     const megaMenu = document.querySelector(".mega-menu");

//     if (!dropdown.contains(event.target)) {
//       megaMenu.style.opacity = "0";
//       megaMenu.style.visibility = "hidden";
//       megaMenu.style.transform = "translateY(-10px)";
//     }
//   });

//   // Smooth scroll for anchor links
//   document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
//     anchor.addEventListener("click", function (e) {
//       e.preventDefault();
//       const target = document.querySelector(this.getAttribute("href"));
//       if (target) {
//         target.scrollIntoView({
//           behavior: "smooth",
//           block: "start",
//         });
//       }
//     });
//   });

//   // Add scroll effect to navbar
//   let lastScrollTop = 0;
//   const navbar = document.querySelector(".navbar");

//   window.addEventListener("scroll", function () {
//     let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

//     if (scrollTop > lastScrollTop && scrollTop > 100) {
//       // Scrolling down
//       navbar.style.transform = "translateY(-100%)";
//     } else {
//       // Scrolling up
//       navbar.style.transform = "translateY(0)";
//     }

//     lastScrollTop = scrollTop;
//   });

//   // Add transition to navbar
//   navbar.style.transition = "transform 0.3s ease-in-out";
// });

// const industryTabs = document.querySelectorAll(".industry-tab");
// const industryPanels = document.querySelectorAll(".industry-panel");

// industryTabs.forEach((tab) => {
//   tab.addEventListener("mouseenter", () => {
//     const target = tab.dataset.target;

//     // Update active tab
//     industryTabs.forEach((t) => t.classList.remove("active"));
//     tab.classList.add("active");

//     // Update panel
//     industryPanels.forEach((panel) => {
//       if (panel.dataset.panel === target) {
//         panel.classList.add("active");
//       } else {
//         panel.classList.remove("active");
//       }
//     });
//   });
// });

// // click on an industry tab, show the corresponding panel
// document.addEventListener("DOMContentLoaded", function () {
//   // Select all .client-column elements
//   const clientColumns = document.querySelectorAll(".client-column");

//   function animateScroll(element, to, duration) {
//     const start = element.scrollTop;
//     const change = to - start;
//     const startTime = performance.now();

//     function animate(currentTime) {
//       const elapsed = currentTime - startTime;
//       const progress = Math.min(elapsed / duration, 1);
//       element.scrollTop = start + change * easeInOutQuad(progress);

//       if (progress < 1) {
//         requestAnimationFrame(animate);
//       }
//     }

//     // Easing function for smoother feel
//     function easeInOutQuad(t) {
//       return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
//     }

//     requestAnimationFrame(animate);
//   }

//   clientColumns.forEach((column) => {
//     column.addEventListener("mouseenter", () => {
//       const scrollable =
//         column.querySelector(".client-logos") ||
//         column.querySelector(".case-study");
//       if (scrollable) {
//         animateScroll(scrollable, scrollable.scrollHeight, 1500);
//       }
//     });

//     column.addEventListener("mouseleave", () => {
//       const scrollable =
//         column.querySelector(".client-logos") ||
//         column.querySelector(".case-study");
//       if (scrollable) {
//         animateScroll(scrollable, 0, 900);
//       }
//     });
//   });
// });

// insudtry section swiper
const swiper = new Swiper(".industry-cards.swiper-container", {
  slidesPerView: 4,
  slidesPerGroup: 4,
  loop: false,
  navigation: {
    nextEl: ".ind-swiper-next",
    prevEl: ".ind-swiper-prev",
  },
  spaceBetween: 20,
  breakpoints: {
    320: { slidesPerView: 1, slidesPerGroup: 1 },
    640: { slidesPerView: 2, slidesPerGroup: 1 },
    1024: { slidesPerView: 4, slidesPerGroup: 2 },
  },
});

// home page hero section
const panels = document.querySelectorAll(".hero-panel");
let currentIndex = 0;
let progressTimer = null;

function activatePanel(panel) {
  // Remove active from all
  panels.forEach((p) => p.classList.remove("active", "label-move"));

  // Remove active & label-move from all
  panels.forEach((p) => {
    p.classList.remove("active", "label-move");
    const content = p.querySelector(".content-to-show");
    if (content) content.classList.remove("show"); // hide previous content
  });
  // Set current active
  panel.classList.add("active");

  // Animate label and progress bar after DOM settles
  requestAnimationFrame(() => {
    panel.classList.add("label-move");
    restartProgressBar(panel);
  });
}

function restartProgressBar(panel) {
  const sectionLine = panel.querySelector(".section-line");
  const content = panel.querySelector(".content-to-show");
  if (!sectionLine) return;

  const oldBar = sectionLine.querySelector(".progress-bar");
  if (oldBar) oldBar.remove();

  const newBar = document.createElement("div");
  newBar.classList.add("progress-bar");
  sectionLine.appendChild(newBar);

  // Hide text immediately

  requestAnimationFrame(() => {
    newBar.style.animation = "fill-bar 10s linear forwards";
  });

  setTimeout(() => {
    if (content) content.classList.add("show");
  }, 500); // adjust to match visual timing

  newBar.addEventListener(
    "animationend",
    () => {
      // Then proceed to next section
      const currentIndex = [...panels].indexOf(panel);
      const nextPanel = panels[currentIndex + 1] || panels[0];
      const content = panel.querySelector(".content-to-show");
      if (content) content.classList.remove("show");

      activatePanel(nextPanel);
    },
    { once: true }
  );
}

// Setup click
panels.forEach((panel) => {
  panel.addEventListener("click", () => {
    if (!panel.classList.contains("active")) {
      // const content = panel.querySelector('.content-to-show');
      // if (content) content.classList.add('show');
      activatePanel(panel);
    }
  });
});

// Initial activation
const initiallyActive = document.querySelector(".hero-panel.active");
if (initiallyActive) {
  //     const content = initiallyActive.querySelector('.content-to-show');
  //   if (content) content.classList.add('show');
  activatePanel(initiallyActive);
}
