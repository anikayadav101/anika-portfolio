// Matrix rain effect
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
const matrixArray = matrix.split("");

const fontSize = 14;
const columns = canvas.width / fontSize;

const drops = [];
for (let x = 0; x < columns; x++) {
    drops[x] = 1;
}

// Moving character animation
const character = {
    x: 0,
    y: canvas.height / 2,
    speed: 2,
    size: 20,
    frames: ['(>_<)', '(^_^)', '(-_-)', '(o_o)'],
    currentFrame: 0,
    frameCounter: 0
};

function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#ff1493';
    ctx.shadowColor = '#ff1493';
    ctx.shadowBlur = 10;
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
        // Make some characters brighter for variation
        const brightness = Math.random() > 0.7 ? 1.0 : 0.8;
        ctx.globalAlpha = brightness;
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
    ctx.globalAlpha = 1.0; // Reset alpha

    // Draw moving character (more visible)
    ctx.save();
    ctx.globalAlpha = 0.8; // Make character more visible
    ctx.fillStyle = '#ff1493';
    ctx.font = character.size + 'px monospace';
    ctx.fillText(character.frames[character.currentFrame], character.x, character.y);
    ctx.restore();
    
    // Update character position
    character.x += character.speed;
    if (character.x > canvas.width) {
        character.x = -50;
        character.y = Math.random() * canvas.height;
    }
    
    // Animate character frame
    character.frameCounter++;
    if (character.frameCounter >= 10) {
        character.currentFrame = (character.currentFrame + 1) % character.frames.length;
        character.frameCounter = 0;
    }
}

setInterval(draw, 35);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const newColumns = canvas.width / fontSize;
    while (drops.length < newColumns) {
        drops.push(1);
    }
    drops.splice(newColumns);
    // Reset character position on resize
    if (character.x > canvas.width) {
        character.x = 0;
    }
});
