import './video_overlay.scss';

import { AnimationManager } from './animation-manager';
import { Bobum } from './boba/bobum';
import { BobumAnimator } from './boba/bobum-animator';
import { BobumPainter } from './boba/bobum-painter';
import { CanvasManager } from './canvas-manager';
import { SceneCoordinatesConverter } from './scene-coordinates-converter';
import { SceneManager } from './scene-manager';
import { Tea } from './tea/tea';
import { TeaAnimator } from './tea/tea-animator';
import { TeaPainter } from './tea/tea-painter';

const canvasManager = CanvasManager.tryCreate();
const sceneCoords = new SceneCoordinatesConverter(canvasManager!);
const animationManager = new AnimationManager({
    maxFrameDeltaSeconds: 0.2
});

const sceneManager = new SceneManager(animationManager);

const tea = new Tea({
    amplitude: 2,
    waveLength: 30,
    waveSpeed: 10,
    teaHeight: 10,
});

sceneManager.addObject({
    animator: new TeaAnimator(tea),
    painter: new TeaPainter(tea, sceneCoords, /*stepSize=*/3),
})

function addBobum(x: number, y: number) {
    const bobum = Bobum.newAt({ x, y });
    sceneManager.addObject({
        animator: new BobumAnimator(bobum),
        painter: new BobumPainter(bobum, sceneCoords),
    });
}

addBobum(20, 5);
addBobum(40, 5);
addBobum(60, 5);
addBobum(80, 5);

canvasManager?.beginPainting({
    paint: (canvas, ctx) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        sceneManager.updateFrame();
        sceneManager.paint(canvas, ctx);
    }
});
