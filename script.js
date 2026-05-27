// Pink matrix rain on a solid black background
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

const matrix = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const matrixArray = matrix.split('');
const fontSize = 14;
const trailLength = 10;

let columns = 0;
const drops = [];
const trails = [];

function randomChar() {
    return matrixArray[Math.floor(Math.random() * matrixArray.length)];
}

function initColumns() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = Math.floor(canvas.width / fontSize);

    drops.length = 0;
    trails.length = 0;

    for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * (canvas.height / fontSize));
        trails[i] = Array.from({ length: trailLength }, randomChar);
    }

    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

initColumns();

function draw() {
    // Reset to solid black each frame — pink chars only, no pink wash
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < columns; i++) {
        const x = i * fontSize;
        const headY = drops[i] * fontSize;

        for (let j = 0; j < trailLength; j++) {
            const y = headY - j * fontSize;
            if (y < 0 || y > canvas.height) continue;

            if (j === 0) {
                ctx.fillStyle = '#ff69b4';
            } else {
                const alpha = (1 - j / trailLength) * 0.45;
                ctx.fillStyle = `rgba(255, 105, 180, ${alpha})`;
            }

            ctx.fillText(trails[i][j], x, y);
        }

        if (headY > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        drops[i]++;
        trails[i].unshift(randomChar());
        trails[i].pop();
    }
}

setInterval(draw, 45);

window.addEventListener('resize', initColumns);
