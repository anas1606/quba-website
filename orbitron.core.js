/* orbitron.core.js (refactored) */
import { pageConfig } from "./orbitron.config.js";

const basePath = window.ORBITRON_BASE_PATH || "https://anas1606.github.io/quba-website/";
function wrapper(tagName = "section", className = "") {
  const el = document.createElement(tagName);
  className && className.split(/\s+/).forEach(c => el.classList.add(c));
  document.body.appendChild(el);
  return el;
}

// Returns a Promise that resolves when content is injected
function SectionLoader(fileLocation, target) {
  const url = new URL(
    fileLocation.replace(/^\.\//, ""),
    window.location.origin + basePath
  );

  let container;
  if (typeof target === "string") {
    container = document.querySelector(
      "." + target.trim().split(/\s+/).join('.')
    );
  } else if (target instanceof HTMLElement) {
    container = target;
  }
  if (!container) return Promise.reject(new Error(`Container not found: ${target}`));

  return fetch(url)
    .then(r => { if (!r.ok) throw new Error(r.statusText); return r.text(); })
    .then(html => { container.innerHTML = html; });
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
