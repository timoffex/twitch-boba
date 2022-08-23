import './video_overlay.scss';

import { CanvasManager } from './canvas-manager';
import { TeaPainter } from './tea/tea-painter';
import { Bobum } from './boba/bobum';
import { Tea } from './tea/tea';
import { AnimationManager } from './animation-manager';
import { TeaAnimator } from './tea/tea-animator';
import { CanvasPainter } from './canvas-painter';
import { SceneCoordinatesConverter } from './scene-coordinates-converter';
import { BobumPainter } from './boba/bobum-painter';
import { BobumAnimator } from './boba/bobum-animator';

const canvasManager = CanvasManager.tryCreate();
const sceneCoords = new SceneCoordinatesConverter(canvasManager!);

const animationManager = new AnimationManager({
    maxFrameDeltaSeconds: 0.2
});
const painters: CanvasPainter[] = [];

const tea = new Tea({
    amplitude: 2,
    waveLength: 30,
    waveSpeed: 10,
    teaHeight: 10,
});
animationManager.addAnimator(new TeaAnimator(tea));
painters.push(new TeaPainter(tea, sceneCoords, /*stepSize=*/3));

function addBobum(x: number, y: number) {
    const bobum = Bobum.newAt({x, y});
    painters.push(new BobumPainter(bobum, sceneCoords));
    animationManager.addAnimator(new BobumAnimator(bobum));
}

addBobum(20, 5);
addBobum(40, 5);
addBobum(60, 5);
addBobum(80, 5);

canvasManager?.beginPainting({
    paint: (canvas, ctx) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        animationManager.updateFrame();
        for (const painter of painters) {
            painter.paint(canvas, ctx);
        }
    }
});
