import './video_overlay.scss';

import { CanvasManager } from './canvas-manager';
import { TeaPainter } from './tea-painter';
import { Bobum } from './bobum';

const teaPainter = new TeaPainter(
    /*amplitude=*/10,
    /*wavelength=*/200,
    /*wavespeed=*/50,
    /*stepSize=*/3,
    /*pathHeight=*/100);

let boba: Bobum[] = [];

let lastDrawTime = 0;

window.addEventListener('resize', positionBoba);
function positionBoba() {
    if (!canvasManager) return;

    const step = canvasManager.size.width / (boba.length + 1);
    let x = step;

    for (const bobum of boba) {
        bobum.updateTargetCenter(x, canvasManager.size.height - 70);
        x += step;
    }
}

const canvasManager = CanvasManager.tryCreate();
canvasManager?.beginPainting({
    paint: (canvas, ctx) => {

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        teaPainter.paint(canvas, ctx);

        if (boba.length == 0) {
            console.log('Creating new boba');

            boba = [
                Bobum.newAt({x: 100, y: canvas.height - 100}),
                Bobum.newAt({x: 200, y: canvas.height - 90}),
                Bobum.newAt({x: 250, y: canvas.height - 110}),
                Bobum.newAt({x: 400, y: canvas.height - 70}),
            ];

            positionBoba();

            for (const bobum of boba) {
                bobum.start();
            }

            lastDrawTime = Date.now();
        }

        const now = Date.now();
        const msDelta = now - lastDrawTime;
        lastDrawTime = now;

        for (const bobum of boba) {
            bobum.updatePosition(msDelta);

            ctx.beginPath();
            ctx.arc(
                bobum.position.x,
                bobum.position.y,
                bobum.radius,
                0, 2 * Math.PI);

            ctx.fillStyle = '#B28137';
            ctx.fill();
            ctx.stroke();
        }
    }
});
