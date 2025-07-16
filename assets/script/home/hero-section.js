const panels = document.querySelectorAll('.hero-panel');
let currentIndex = 0;
let progressTimer = null;

function activatePanel(panel) {
    // Remove active from all
    panels.forEach(p => p.classList.remove('active', 'label-move'));

    // Remove active & label-move from all
    panels.forEach(p => {
        p.classList.remove('active', 'label-move');
        const content = p.querySelector('.content-to-show');
        if (content) content.classList.remove('show'); // hide previous content
    });
    // Set current active
    panel.classList.add('active');
    
    // Animate label and progress bar after DOM settles
    requestAnimationFrame(() => {
        panel.classList.add('label-move');
        restartProgressBar(panel);
    });
}

function restartProgressBar(panel) {
    const sectionLine = panel.querySelector('.section-line');
    const content = panel.querySelector('.content-to-show');
    if (!sectionLine) return;

    const oldBar = sectionLine.querySelector('.progress-bar');
    if (oldBar) oldBar.remove();

    const newBar = document.createElement('div');
    newBar.classList.add('progress-bar');
    sectionLine.appendChild(newBar);

    // Hide text immediately
    

    requestAnimationFrame(() => {
        newBar.style.animation = 'fill-bar 10s linear forwards';
    });

    setTimeout(() => {
        if (content) content.classList.add('show');
    }, 500); // adjust to match visual timing

    newBar.addEventListener('animationend', () => {
        // Then proceed to next section
        const currentIndex = [...panels].indexOf(panel);
        const nextPanel = panels[currentIndex + 1] || panels[0];
        const content = panel.querySelector('.content-to-show');
        if (content) content.classList.remove('show');

        activatePanel(nextPanel);
    }, { once: true });
}


// Setup click
panels.forEach(panel => {
    panel.addEventListener('click', () => {
        if (!panel.classList.contains('active')) {
            // const content = panel.querySelector('.content-to-show');
            // if (content) content.classList.add('show');
            activatePanel(panel);
        }
    });
});

// Initial activation
const initiallyActive = document.querySelector('.hero-panel.active');
if (initiallyActive) {
//     const content = initiallyActive.querySelector('.content-to-show');
//   if (content) content.classList.add('show');
    activatePanel(initiallyActive);
}
