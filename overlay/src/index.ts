import './video_overlay.scss';

import { AnimationManager } from './animation-manager';
import { BobaManager } from './boba/boba-manager';
import { CanvasManager } from './canvas-manager';
import { SceneCoordinatesConverter } from './scene-coordinates-converter';
import { SceneManager } from './scene-manager';
import { Tea } from './tea/tea';
import { TeaAnimator } from './tea/tea-animator';
import { TeaPainter } from './tea/tea-painter';

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

canvasManager.beginPainting({
    paint: (canvas, ctx) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        sceneManager.updateFrame();
        sceneManager.paint(canvas, ctx);
    }
});

const ws = new WebSocket('ws://localhost:8081');
ws.onmessage = (evt) => {
    const { usernames } = JSON.parse(evt.data);
    console.log(`New viewers: ${usernames}`);
    for (const username of usernames) {
        bobaManager.addViewer();
    }
};