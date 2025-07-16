// orbitron.core.js
// ----- import the config and turn this into an ES module -----
import { pageConfig } from "./orbitron.config.js";

// Your “root” base path.
// If your site lives at https://example.com/, use '/'
const basePath = window.ORBITRON_BASE_PATH || "/";

/** wrapper, SectionLoader unchanged... **/
function wrapper(tagName = "section", className = "") {
  const el = document.createElement(tagName);
  if (className) className.split(/\s+/).forEach((c) => el.classList.add(c));
  document.body.appendChild(el);
  return el;
}

function SectionLoader(fileLocation, target) {
  // automatically prepend the basePath
  const url = new URL(
    fileLocation.replace(/^\.\//, ""),
    window.location.origin + basePath
  );

  let container;
  if (typeof target === "string") {
    container = document.querySelector(
      "." + target.trim().split(/\s+/).join(".")
    );
  } else if (target instanceof HTMLElement) {
    container = target;
  }

  if (!container) {
    console.warn("Container not found:", target);
    return;
  }

  fetch(url)
    .then((r) => {
      if (!r.ok) throw new Error(r.statusText);
      return r.text();
    })
    .then((html) => {
      container.innerHTML = html;
    })
    .catch((err) => {
      console.error(`Failed to load ${url}:`, err);
    });
}

/**
 * pageConfig is now imported above.
 */

function PageMaker(pageName, bodyId, onComplete) {
  const [id, ...classes] = bodyId.trim().split(/\s+/);
  document.body.id = id;
  classes.forEach((c) => document.body.classList.add(c));

  const sections = pageConfig[pageName];
  if (!sections) {
    console.error(`No config for page: ${pageName}`);
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

  if (typeof onComplete === "function") {
    onComplete();
  }
}
console.log("core file");
// Export if you want to call from other modules:
export { wrapper, SectionLoader, PageMaker };
