/* orbitron.core.js (refactored) */
import { pageConfig } from "./orbitron.config.js";

// Auto-detect GitHub Pages deployment and set correct base path
function getBasePath() {
  // Check if we're on GitHub Pages
  if (window.location.hostname.includes('github.io')) {
    const pathSegments = window.location.pathname.split('/').filter(segment => segment);
    if (pathSegments.length > 0) {
      // For GitHub Pages, the first path segment is usually the repository name
      return `/${pathSegments[0]}/`;
    }
  }
  
  // Use custom base path or default to root
  return window.ORBITRON_BASE_PATH || "/";
}

const basePath = getBasePath();

function wrapper(tagName = "section", className = "") {
  const el = document.createElement(tagName);
  className && className.split(/\s+/).forEach(c => el.classList.add(c));
  document.body.appendChild(el);
  return el;
}

// Returns a Promise that resolves when content is injected
function SectionLoader(fileLocation, target) {
  // Ensure fileLocation starts with ./ for relative paths
  const relativePath = fileLocation.startsWith('./') ? fileLocation : `./${fileLocation}`;
  const cleanPath = relativePath.replace(/^\.\//, "");
  
  // Construct the full URL
  const baseUrl = window.location.origin + basePath;
  const fullUrl = new URL(cleanPath, baseUrl);
  
  console.log(`[Orbitron] Loading: ${fileLocation} -> ${fullUrl.href}`);

  let container;
  if (typeof target === "string") {
    container = document.querySelector(
      "." + target.trim().split(/\s+/).join('.')
    );
  } else if (target instanceof HTMLElement) {
    container = target;
  }
  if (!container) return Promise.reject(new Error(`Container not found: ${target}`));

  return fetch(fullUrl)
    .then(r => { 
      if (!r.ok) {
        console.error(`[Orbitron] Failed to load ${fullUrl.href}: ${r.status} ${r.statusText}`);
        throw new Error(`${r.status} ${r.statusText}`);
      }
      return r.text(); 
    })
    .then(html => { 
      container.innerHTML = html; 
      console.log(`[Orbitron] Successfully loaded: ${fileLocation}`);
    });
}

// PageMaker now returns a Promise
export function PageMaker(pageName, bodyId) {
  return new Promise((resolve, reject) => {
    const [id, ...classes] = bodyId.trim().split(/\s+/);
    document.body.id = id;
    classes.forEach(c => document.body.classList.add(c));

    const sections = pageConfig[pageName];
    if (!Array.isArray(sections)) {
      return reject(new Error(`No config for page: ${pageName}`));
    }

    // map to Promises
    const loaders = sections.map(([tag, cls, file]) => {
      if (tag) {
        const el = wrapper(tag, cls);
        return SectionLoader(file, el);
      }
      return SectionLoader(file, cls);
    });

    Promise.all(loaders)
      .then(() => resolve())
      .catch(err => reject(err));
  });
}

console.log("[Orbitron] core initialized");
console.log(`[Orbitron] Base path detected: ${basePath}`);
console.log(`[Orbitron] Current location: ${window.location.href}`);
