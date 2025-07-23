# GitHub Pages Deployment Guide

## Quick Deployment Steps

1. **Commit and push your changes:**
   ```bash
   git add .
   git commit -m "Fix GitHub Pages deployment issues"
   git push origin master
   ```

2. **Enable GitHub Pages:**
   - Go to your repository settings
   - Navigate to "Pages" section
   - Select "Deploy from a branch"
   - Choose "master" branch and "/ (root)" folder
   - Click "Save"

3. **Your site will be available at:**
   ```
   https://anas1606.github.io/quba-website/
   ```

## What We Fixed

✅ **Orbitron Core**: Auto-detects GitHub Pages and sets correct base path (`/quba-website/`)
✅ **CSS Images**: Changed absolute paths (`/assets/images/`) to relative paths (`../../images/`)
✅ **HTML Components**: All HTML files load correctly with proper path resolution
✅ **Debug Logging**: Added console logs to help track loading issues

## Troubleshooting

If you still see issues:

1. **Check browser console** for error messages
2. **Look for these logs:**
   ```
   [Orbitron] Base path detected: /quba-website/
   [Orbitron] Loading: ./components/home/HeroSection.html -> https://anas1606.github.io/quba-website/components/home/HeroSection.html
   ```
3. **Clear browser cache** and refresh the page

## Local Development

For local development, everything still works with the root path (`/`). The auto-detection only affects GitHub Pages deployment.

## Manual Override

If you need to manually set the base path, add this before loading orbitron.core.js:

```html
<script>
  window.ORBITRON_BASE_PATH = '/your-custom-path/';
</script>
``` 