// Lotus water stamp — bottom-left, with rippling reflection (picmix-style)
(function () {
    const canvas = document.getElementById('lotus-corner');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = 'lotus.png';

    let t = 0;
    let ready = false;

    img.onload = () => {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ready = true;
        requestAnimationFrame(frame);
    };

    function frame() {
        if (!ready) return;

        const w = canvas.width;
        const h = canvas.height;
        const mid = Math.floor(h * 0.5);

        ctx.clearRect(0, 0, w, h);

        // Top half: flowers + pads (static)
        ctx.drawImage(img, 0, 0, w, mid, 0, 0, w, mid);

        // Bottom half: water reflection with horizontal ripple
        const amp = 4.5;
        const freq = 0.045;
        const speed = 0.09;
        t += speed;

        for (let y = mid; y < h; y++) {
            const depth = (y - mid) / (h - mid);
            const shift = Math.sin(y * freq + t) * amp * (0.35 + depth * 0.9);
            const srcY = Math.min(h - 1, Math.max(mid, y + Math.sin(y * 0.08 - t * 0.7) * 1.2));

            ctx.globalAlpha = 0.92 - depth * 0.15;
            ctx.drawImage(
                img,
                0, srcY, w, 1,
                shift, y, w, 1
            );
        }

        ctx.globalAlpha = 1;
        requestAnimationFrame(frame);
    }
})();
