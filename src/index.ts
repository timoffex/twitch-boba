import './video_overlay.scss';

const canvas = document.getElementById('main-overlay') as HTMLCanvasElement;

function resizeCanvas() {
    console.log(`Resizing canvas to ${window.innerWidth} x ${window.innerHeight}`);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);

// Paint on the canvas!
const ctx = canvas.getContext("2d");

if (!ctx) {
    console.log("No context...");
} else {
    function paint() {
        ctx!.fillRect(50, 50, 100, 100);
        window.requestAnimationFrame(paint);
    }

    window.requestAnimationFrame(paint);
}