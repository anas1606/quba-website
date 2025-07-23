/**
 * GitHub Pages Setup Script
 * Add this script before loading orbitron.core.js when deploying to GitHub Pages
 */

// Auto-configure for GitHub Pages deployment
(function() {
  // Check if we're on GitHub Pages
  if (window.location.hostname.includes('github.io')) {
    const pathSegments = window.location.pathname.split('/').filter(segment => segment);
    
    if (pathSegments.length > 0) {
      // Set the base path to the repository name
      const repoName = pathSegments[0];
      window.ORBITRON_BASE_PATH = `/${repoName}/`;
      console.log(`[GitHub Pages] Auto-detected repository: ${repoName}`);
      console.log(`[GitHub Pages] Base path set to: ${window.ORBITRON_BASE_PATH}`);
    } else {
      // Fallback for root GitHub Pages deployment
      console.warn('[GitHub Pages] Could not detect repository name from path');
      window.ORBITRON_BASE_PATH = '/';
    }
  } else {
    // Not on GitHub Pages, use default local development setup
    console.log('[Local Development] Using default base path: /');
  }
})();

// Alternative manual configuration (uncomment and modify as needed):
// window.ORBITRON_BASE_PATH = '/quba-website/'; 