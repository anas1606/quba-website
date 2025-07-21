// insudtry section swiper
const swiper = new Swiper(".industry-cards.swiper-container", {
  slidesPerView: 4,
  slidesPerGroup: 4,
  loop: false,
  navigation: {
    nextEl: ".ind-swiper-next",
    prevEl: ".ind-swiper-prev",
  },
  spaceBetween: 0,
  breakpoints: {
    320: { slidesPerView: 1, slidesPerGroup: 1 },
    640: { slidesPerView: 2, slidesPerGroup: 1 },
    1024: { slidesPerView: 4, slidesPerGroup: 2 },
  },
});



// Industry card hover effect
const industryCards = document.querySelectorAll('.industry-card');
industryCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    // Remove active class from all cards
    industryCards.forEach(c => c.classList.remove('card-expanded'));
    // Add active class to hovered card
    card.classList.add('card-expanded');
  });

  card.addEventListener('mouseleave', () => {
    // Remove active class when mouse leaves
    card.classList.remove('card-expanded');
  });
});

// home page hero section
const panels = document.querySelectorAll(".hero-panel");
let currentIndex = 0;
let progressTimer = null;
let autoCycleEnabled = true; // Flag to control auto-cycling
let userClickedIndex = null; // Track which index user clicked

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

  // Update current index
  currentIndex = [...panels].indexOf(panel);

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

  // Always add the animation end listener, but check the flag inside
  newBar.addEventListener(
    "animationend",
    () => {
      // If user clicked, go to next index after the clicked one
      if (userClickedIndex !== null) {
        const nextIndex = (userClickedIndex + 1) % panels.length;
        const nextPanel = panels[nextIndex];
        userClickedIndex = null; // Reset user click tracking
        activatePanel(nextPanel);
      } else if (autoCycleEnabled) {
        // Normal auto-cycling
        const nextIndex = (currentIndex + 1) % panels.length;
        const nextPanel = panels[nextIndex];
        activatePanel(nextPanel);
      }
    },
    { once: true }
  );
}

// Setup click
panels.forEach((panel, index) => {
  panel.addEventListener("click", () => {
    if (!panel.classList.contains("active")) {
      userClickedIndex = index; // Track which index was clicked
      autoCycleEnabled = false; // Disable auto-cycling when user clicks
      activatePanel(panel);

      // Re-enable auto-cycling after 30 seconds
      setTimeout(() => {
        autoCycleEnabled = true;
      }, 30000);
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


// testimonial-swiper.js
const testimonialswiper = new Swiper('.testimonial-swiper', {
  slidesPerView: 1,
  spaceBetween: 24,
  loop: true,
  speed: 600,
  effect: 'slide',
  fadeEffect: {
    crossFade: true
  },
  navigation: {
    prevEl: '.testimonial-nav .prev',
    nextEl: '.testimonial-nav .next',
  },
});

let testimonialtimerInterval;
const testimonialtimerBar = document.querySelector('.timer-bar');

function testimonialresetTimerBar() {
  testimonialtimerBar.style.transition = 'none';
  testimonialtimerBar.style.width = '0%';

  void testimonialtimerBar.offsetWidth;
  testimonialtimerBar.style.transition = 'width 5s linear';
  testimonialtimerBar.style.width = '100%';
}

function testimonialstartTimer() {
  clearTimeout(testimonialtimerInterval);
  testimonialresetTimerBar();

  testimonialtimerInterval = setTimeout(() => {
    testimonialswiper.slideNext();
  }, 5000);
}

testimonialstartTimer();
testimonialswiper.on('slideChangeTransitionStart', () => {
  testimonialstartTimer();
});


// story animtaio

const cards = document.querySelectorAll(".story-card")
const videos = document.querySelectorAll(".card-video")

// Create placeholder video sources since we don't have actual videos
const videoSources = [
  "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
  "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
  "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
  "https://samplelib.com/lib/preview/mp4/sample-5s.mp4"
]

// Set video sources
videos.forEach((video, index) => {
  const source = video.querySelector("source")
  if (source && videoSources[index]) {
    source.src = videoSources[index]
    video.load()
  }
})

cards.forEach((card, index) => {
  const video = card.querySelector(".card-video")
  let isPlaying = false
  // blow 992 px screen add featured class in al card
  if (window.innerWidth < 992) {
    card.classList.add("featured")
    video.play().catch((e) => {
      console.log("Video play failed:", e)
    })
  }
  // Handle mouse enter
  card.addEventListener("mouseenter", () => {
    cards.forEach((c) => c.classList.remove("featured"))
    card.classList.add("featured")
    // Pause all other videos
    videos.forEach((v, i) => {
      if (i !== index) {
        v.pause()
        v.currentTime = 0
      }
    })

    // Play current video
    if (video) {
      video.play().catch((e) => {
        console.log("Video play failed:", e)
      })
      isPlaying = true
    }
  })
})

// Set initial featured card (middle one)
const initialFeatured = document.querySelector('[data-card="1"]')
if (initialFeatured) {
  initialFeatured.classList.add("featured")
}


// modal
const modal = document.getElementById('videoModal');
const iframe = document.getElementById('modalIframe');
const closeBtn = modal.querySelector('.video-modal__close');

// 1) Open modal on any play-button click
document.querySelectorAll('.play-button').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    const src = btn.dataset.videoSrc;
    if (!src) return;
    iframe.src = src;
    modal.classList.add('video-modal--active');
  });
});

// 2) Close handlers clear the src (to stop playback)
function closeModal() {
  modal.classList.remove('video-modal--active');
  iframe.src = '';
}

closeBtn.addEventListener('click', closeModal);
modal.addEventListener('click', e => {
  if (e.target === modal) closeModal();
});