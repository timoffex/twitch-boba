import './video_overlay.scss';

import { CanvasManager } from './canvas-manager';

const canvasManager = CanvasManager.tryCreate();

canvasManager?.beginPainting({
    paint: (canvas, ctx) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.arc(
            canvas.width / 2,
            canvas.height / 2,
            Math.min(canvas.width, canvas.height) / 4,
            0, 2 * Math.PI);
        ctx.fill();
    }
});
