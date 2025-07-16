// Orbitron Layout Engine
// A lightweight modular section loader for static HTML projects
/**
 * Creates an element of given tag, assigns multiple class names, appends to body, and returns it.
 * @param {string} tagName - Tag name to create (e.g., 'section', 'nav', 'div', 'footer').
 * @param {string} className - Space-separated class names to assign to the element.
 * @returns {HTMLElement} The newly created element.
 */
function wrapper(tagName = 'section', className = '') {
  const el = document.createElement(tagName);
  if (className) {
    className.split(/\s+/).forEach(cls => el.classList.add(cls));
  }
  document.body.appendChild(el);
  return el;
}

/**
 * Fetches an HTML fragment and injects it into a target container.
 * @param {string} fileLocation - Path to the HTML file.
 * @param {string|HTMLElement} target - A space-separated class name string or HTMLElement.
 */
function SectionLoader(fileLocation, target) {
  console.log(`Loading section from ${fileLocation} into`, target);

  let container;
  if (typeof target === 'string') {
    const selector = '.' + target.trim().split(/\s+/).join('.');
    container = document.querySelector(selector);
  } else if (target instanceof HTMLElement) {
    container = target;
  }

  if (!container) {
    console.warn('Container not found:', target);
    return;
  }

  fetch(fileLocation)
    .then((response) => {
      if (!response.ok) throw new Error(response.statusText);
      return response.text();
    })
    .then((html) => {
      container.innerHTML = html;
    })
    .catch((err) => {
      console.error(`Failed to load ${fileLocation}:`, err);
    });
}

/**
 * Configuration: define pages and their sections.
 * Each key is a pageName, mapping to an array of [ tagName|null, className(s), fileLocation ]
 */
const pageConfig = {
  home: [
    ['section', 'highlight-section', './components/Home/HighlightSection.html'],
    ['section', 'industry-section', './components/Home/IndustrySection.html'],
  ],
  about: [
    ['section', 'highlight-section', '../../components/Home/HighlightSection.html'],
    ['section', 'industry-section', '../../components/Home/IndustrySection.html'],
  ]
};

/**
 * Builds a page: sets <body> ID, optionally creates wrappers, and loads each section.
 * @param {string} pageName - Key in pageConfig
 * @param {string} bodyId - id (and optional classes) to assign to <body>
 */
function PageMaker(pageName, bodyId) {
  // Handle multiple class names in bodyId (e.g. 'home-page dark-mode')
  const [id, ...classes] = bodyId.trim().split(/\s+/);
  document.body.id = id;
  classes.forEach(cls => document.body.classList.add(cls));

  const sections = pageConfig[pageName];
  if (!sections) {
    console.error(`No pageConfig found for page: ${pageName}`);
    return;
  }

  sections.forEach(([tag, cls, file]) => {
    if (tag) {
      const el = wrapper(tag, cls);
      SectionLoader(file, el);
    } else {
      SectionLoader(file, cls);
    }
  });
}
