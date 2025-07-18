// orbitron.config.js
// ----- export your pageConfig as a JS module -----

export const pageConfig = {
  home: [
    ["main", "hero-container", "./components/home/HeroSection.html"],
    ["section", "story-container", "./components/home/StorySection.html"],
    ["section", "highlight-section", "./components/home/HighlightSection.html"],
    ["section", "solution-section", "./components/home/IndustrySection.html"],
    ["section", "update-section", "./components/home/LatestUpdate.html"],
    ["section", "container-fluid contact-section", "./components/home/ContactSection.html"],
  ],
  about: [
    [
      "section",
      "highlight-section",
      "./components/about/HighlightSection.html",
    ],
    ["section", "solution-section", "./components/about/IndustrySection.html"],
  ],
};
