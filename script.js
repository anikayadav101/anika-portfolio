// Hot-pink matrix rain over the highlight region
const canvas = document.getElementById('pink-rain');
const ctx = canvas.getContext('2d');

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');
const fontSize = 15;
const trailLength = 12;

let columns = 0;
const drops = [];
const trails = [];

function randomChar() {
    return chars[Math.floor(Math.random() * chars.length)];
}

function resize() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.floor(rect.width);
    canvas.height = Math.floor(rect.height);

    columns = Math.max(1, Math.floor(canvas.width / fontSize));
    drops.length = 0;
    trails.length = 0;

    for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * (canvas.height / fontSize));
        trails[i] = Array.from({ length: trailLength }, randomChar);
    }

    // Clear to transparent so beige + soft pink wash show through
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function draw() {
    // Fade trails — clear toward transparent (not black), keeps beige readable
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.12)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.globalCompositeOperation = 'source-over';
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < columns; i++) {
        const x = i * fontSize;
        const headY = drops[i] * fontSize;

        for (let j = 0; j < trailLength; j++) {
            const y = headY - j * fontSize;
            if (y < -fontSize || y > canvas.height) continue;

            if (j === 0) {
                ctx.fillStyle = '#ff69b4'; // bright hot-pink head
            } else {
                const alpha = (1 - j / trailLength) * 0.7;
                ctx.fillStyle = `rgba(255, 20, 147, ${alpha})`; // hot pink #ff1493
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

resize();
setInterval(draw, 40);
window.addEventListener('resize', resize);
