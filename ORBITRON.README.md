# 🪐 Orbitron Layout Engine

**Orbitron** is a lightweight, modular HTML layout engine for static websites. It helps you load and assemble reusable HTML fragments (like `header.html`, `footer.html`, etc.) into the DOM dynamically — no frameworks or bundlers needed.

---

## 🚀 Features

* 🔌 Modular section-based layout loading
* 🧱 Auto wrapper creation (e.g., `<section>`, `<nav>`, `<footer>`, etc.)
* 🎨 Multi-class support for `<body>` and wrappers
* 🔍 Loads raw HTML fragments (no `<head>` or `<body>` required)
* ⚡ Zero dependencies — just vanilla JavaScript

---

## 📦 Getting Started

### 1. Include Orbitron

```html
<script src="orbitron.js" defer></script>
```

### 2. Setup Page Configuration

In your `orbitron.js`, define the layout structure:

```js
const pageConfig = {
  home: [
    ['section', 'highlight-section', './components/Home/HighlightSection.html'],
    ['section', 'industry-section', './components/Home/IndustrySection.html'],
  ],
  about: [
    ['section', 'highlight-section', './components/About/HighlightSection.html'],
    ['section', 'team-section', './components/About/TeamSection.html'],
  ]
};
```

Format:

```js
[tagName, className(s), filePath]
```

Or use `null` as tagName to inject into an existing element:

```js
[null, 'existing-div', './components/OtherSection.html']
```

### 3. Initialize in HTML Page

```html
<body></body>

<script>
  document.addEventListener('DOMContentLoaded', () => {
    PageMaker('home', 'home-page dark-mode');
  });
</script>
```

This sets:

* `<body id="home-page" class="dark-mode">`
* Loads sections into the body

---

## 📘 API Reference

### `PageMaker(pageName, bodyId)`

Builds the page from `pageConfig`. First word in `bodyId` becomes the `<body id>`, the rest become classes.

### `wrapper(tagName, className)`

Creates a new DOM element, applies classes, appends it to the body.

### `SectionLoader(filePath, target)`

Fetches an HTML fragment and injects it into the target DOM node or selector.

---

## 🔍 Example Use Cases

### ✅ Case 1: Modular Home Page

```js
PageMaker('home', 'home-page dark');
```

Results in:

```html
<body id="home-page" class="dark">
  <section class="highlight-section">...</section>
  <section class="industry-section">...</section>
</body>
```

### ✅ Case 2: Injecting into Existing DOM

```html
<div class="contact-wrapper"></div>
```

```js
pageConfig.contact = [
  [null, 'contact-wrapper', './components/ContactForm.html']
];
PageMaker('contact', 'contact-page');
```

---

## 🌌 Why "Orbitron"?

The name **Orbitron** reflects the way sections revolve around a central layout — orbiting into place in a clean, predictable structure.

---

## 📄 License

MIT — Free to use, improve, and share.

---

Made with 💡 by [Faizal Kadiwal].
