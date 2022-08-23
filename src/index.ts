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
import { BobaManager } from './boba/boba-manager';

const canvasManager = CanvasManager.tryCreate()!;
const sceneCoords = new SceneCoordinatesConverter(canvasManager);
const animationManager = new AnimationManager({
    maxFrameDeltaSeconds: 0.2
});

const sceneManager = new SceneManager(animationManager);
const bobaManager = new BobaManager(sceneManager, sceneCoords);


// Create Tea object.
const tea = new Tea({
    amplitude: 1,
    waveLength: 30,
    waveSpeed: 10,
    teaHeight: 10,
});
sceneManager.addObject({
    animator: new TeaAnimator(tea),
    painter: new TeaPainter(tea, sceneCoords, /*stepSize=*/3),
})

// Create some initial boba.
for (let i = 0; i < 4; i++) {
    bobaManager.addViewer();
}

window.addEventListener('keyup', (evt) => {
    if (evt.key == 'x') {
        bobaManager.addViewer();
    }
});

canvasManager.beginPainting({
    paint: (canvas, ctx) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        sceneManager.updateFrame();
        sceneManager.paint(canvas, ctx);
    }
});
