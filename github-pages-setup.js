/**
 * GitHub Pages Setup Script
 * Add this script before loading orbitron.core.js when deploying to GitHub Pages
 */

// Auto-configure for GitHub Pages deployment
if (window.location.hostname.includes('github.io')) {
  const pathSegments = window.location.pathname.split('/').filter(segment => segment);
  if (pathSegments.length > 0) {
    // Set the base path to the repository name
    window.ORBITRON_BASE_PATH = `/${pathSegments[0]}/`;
    console.log(`[GitHub Pages] Base path set to: ${window.ORBITRON_BASE_PATH}`);
  }
}

// Alternative manual configuration (uncomment and modify as needed):
// window.ORBITRON_BASE_PATH = '/quba-website/'; 