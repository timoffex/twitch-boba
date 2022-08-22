import './video_overlay.scss';

import { CanvasManager } from './canvas-manager';
import { TeaPainter } from './tea-painter';

const circle = {
    x: 400,
    y: 400,
    vx: 0,
    vy: 0,
    radius: 20
};

const target = {
    x: 400,
    y: 400,
};

const teaPainter = new TeaPainter(
    /*amplitude=*/10,
    /*wavelength=*/200,
    /*wavespeed=*/50,
    /*stepSize=*/3,
    /*pathHeight=*/100);

const canvasManager = CanvasManager.tryCreate();
canvasManager?.beginPainting({
    paint: (canvas, ctx) => {
        moveTowardTarget();

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        teaPainter.paint(canvas, ctx);

        ctx.beginPath();
        ctx.arc(
            circle.x,
            circle.y,
            circle.radius,
            0, 2 * Math.PI);

        ctx.fillStyle = '#B28137';
        ctx.fill();
        ctx.stroke();
    }
});

function updateTargetAndRepeat() {
    const size = canvasManager?.size;
    if (size) {
        target.x = size.width / 2 + (Math.random() * 2 - 1) * 100;
        target.y = size.height / 2 + (Math.random() * 2 - 1) * 100;
    }

    setTimeout(updateTargetAndRepeat, 500 + 1000 * Math.random());
}
updateTargetAndRepeat();

function moveTowardTarget() {
    const rate = 0.04;

    let dirX = target.x - circle.x;
    let dirY = target.y - circle.y;
    const dirMagnitude = Math.sqrt(dirX * dirX + dirY * dirY);
    if (dirMagnitude > 0) {
        dirX /= dirMagnitude;
        dirY /= dirMagnitude;
    }

    circle.vx += dirX * rate;
    circle.vy += dirY * rate;

    const speed2 = circle.vx * circle.vx + circle.vy * circle.vy;
    if (speed2 > 4) {
        const speed = Math.sqrt(speed2);
        circle.vx /= speed;
        circle.vy /= speed;
    }

    circle.x += circle.vx;
    circle.y += circle.vy;
}