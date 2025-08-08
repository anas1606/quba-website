document.addEventListener('DOMContentLoaded', () => {
    const rows = 10;
    const cols = 17;
    const images = [
        "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ];

    const grid = document.getElementById("grid");
    let currentImageIndex = 0;
    let direction = 1;
    let isFlipped = false;

    function createGrid() {
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const cell = document.createElement("div");
                cell.classList.add("grid-cell");
                cell.dataset.row = row;
                cell.dataset.col = col;

                const front = document.createElement("div");
                front.classList.add("face", "front");

                const back = document.createElement("div");
                back.classList.add("face", "back");

                cell.appendChild(front);
                cell.appendChild(back);
                grid.appendChild(cell);
            }
        }
    }

    function setImageToGrid(frontImg, backImg) {
        const cells = document.querySelectorAll(".grid-cell");

        cells.forEach((cell) => {
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            const pos = `${(col / (cols - 1)) * 100}% ${(row / (rows - 1)) * 100
                }%`;

            const front = cell.querySelector(".front");
            const back = cell.querySelector(".back");

            front.style.backgroundImage = `url('${frontImg}')`;
            back.style.backgroundImage = `url('${backImg}')`;
            front.style.backgroundPosition = pos;
            back.style.backgroundPosition = pos;
        });
    }

    function getDiagonalOrder(cells) {
        const diagonals = [];

        for (let d = 0; d < rows + cols - 1; d++) {
            const group = [];
            for (let row = 0; row < rows; row++) {
                let col = d - row;
                if (col >= 0 && col < cols) {
                    const cell = Array.from(cells).find(
                        (c) => +c.dataset.row === row && +c.dataset.col === col
                    );
                    if (cell) group.push(cell);
                }
            }
            diagonals.push(group);
        }

        return direction === 1 ? diagonals : diagonals.reverse();
    }

    //   Animation Types
    function flipDiagonally() {
        const cells = document.querySelectorAll(".grid-cell");
        const diagonals = getDiagonalOrder(cells);
        const flipDuration = 1000;
        const delayBetweenSteps = 150;
        const totalTime = diagonals.length * delayBetweenSteps + flipDuration;

        // Compute safe next index
        let nextIndex = currentImageIndex + direction;
        if (nextIndex >= images.length || nextIndex < 0) {
            direction *= -1;
            nextIndex = currentImageIndex + direction;
        }

        // Preload image refs based on flip direction
        const frontImg = isFlipped
            ? images[nextIndex]
            : images[currentImageIndex];
        const backImg = isFlipped
            ? images[currentImageIndex]
            : images[nextIndex];

        setImageToGrid(frontImg, backImg);

        diagonals.forEach((group, index) => {
            setTimeout(() => {
                group.forEach((cell) => cell.classList.toggle("flip"));
            }, index * delayBetweenSteps);
        });

        // Wait for flip to finish + hold
        setTimeout(() => {
            isFlipped = !isFlipped;
            currentImageIndex = nextIndex;

            // Wait 2 sec showing full image before next flip
            setTimeout(() => {
                flipDiagonally();
            }, 2000);
        }, totalTime);
    }

    function flipLeftToRight() {
        const cells = document.querySelectorAll(".grid-cell");
        const flipDuration = 600;
        const delayBetweenSteps = 100;
        const totalTime = cols * delayBetweenSteps + flipDuration;

        let nextIndex = currentImageIndex + direction;
        if (nextIndex >= images.length || nextIndex < 0) {
            direction *= -1;
            nextIndex = currentImageIndex + direction;
        }

        const frontImg = isFlipped
            ? images[nextIndex]
            : images[currentImageIndex];
        const backImg = isFlipped
            ? images[currentImageIndex]
            : images[nextIndex];

        setImageToGrid(frontImg, backImg);

        for (let col = 0; col < cols; col++) {
            setTimeout(() => {
                cells.forEach((cell) => {
                    if (parseInt(cell.dataset.col) === col) {
                        cell.classList.toggle("flip");
                    }
                });
            }, col * delayBetweenSteps);
        }

        setTimeout(() => {
            isFlipped = !isFlipped;
            currentImageIndex = nextIndex;

            setTimeout(() => {
                flipLeftToRight(); // repeat or remove if you want one-time
            }, 2000);
        }, totalTime);
    }

    function flipTopToBottom() {
        const cells = document.querySelectorAll(".grid-cell");
        const flipDuration = 600;
        const delayBetweenSteps = 100;
        const totalTime = rows * delayBetweenSteps + flipDuration;

        let nextIndex = currentImageIndex + direction;
        if (nextIndex >= images.length || nextIndex < 0) {
            direction *= -1;
            nextIndex = currentImageIndex + direction;
        }

        const frontImg = isFlipped
            ? images[nextIndex]
            : images[currentImageIndex];
        const backImg = isFlipped
            ? images[currentImageIndex]
            : images[nextIndex];

        setImageToGrid(frontImg, backImg);

        for (let row = 0; row < rows; row++) {
            setTimeout(() => {
                cells.forEach((cell) => {
                    if (parseInt(cell.dataset.row) === row) {
                        cell.classList.toggle("flip");
                    }
                });
            }, row * delayBetweenSteps);
        }

        setTimeout(() => {
            isFlipped = !isFlipped;
            currentImageIndex = nextIndex;

            setTimeout(() => {
                flipTopToBottom(); // repeat or remove if you want one-time
            }, 2000);
        }, totalTime);
    }

    function flipRandomOrder() {
        const cells = Array.from(document.querySelectorAll(".grid-cell"));
        const flipDuration = 600;
        const delayBetweenSteps = 50;
        const totalTime = cells.length * delayBetweenSteps + flipDuration;

        // Safe image index progression
        let nextIndex = currentImageIndex + direction;
        if (nextIndex >= images.length || nextIndex < 0) {
            direction *= -1;
            nextIndex = currentImageIndex + direction;
        }

        const frontImg = isFlipped
            ? images[nextIndex]
            : images[currentImageIndex];
        const backImg = isFlipped
            ? images[currentImageIndex]
            : images[nextIndex];

        setImageToGrid(frontImg, backImg);

        // Fisher-Yates Shuffle for randomness
        for (let i = cells.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cells[i], cells[j]] = [cells[j], cells[i]];
        }

        // Animate flip in randomized order
        cells.forEach((cell, index) => {
            setTimeout(() => {
                cell.classList.toggle("flip");
            }, index * delayBetweenSteps);
        });

        // Update state & optionally auto-repeat
        setTimeout(() => {
            isFlipped = !isFlipped;
            currentImageIndex = nextIndex;

            setTimeout(() => {
                flipRandomOrder(); // Remove if you want one-time only
            }, 2000);
        }, totalTime);
    }

    createGrid();
    setImageToGrid(images[0], images[1]);

    setTimeout(() => {
        // flipLeftToRight();
        // flipTopToBottom();
        flipDiagonally();
        // flipRandomOrder();
    }, 1000);

})