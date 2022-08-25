import { CanvasPainter } from '../canvas-painter';
import { SceneCoordinatesConverter } from '../scene-coordinates-converter';
import { Bobum } from './bobum';

/** Object that paints a {@link Bobum} on a canvas. */
export class BobumPainter implements CanvasPainter {
    constructor(
        private readonly _bobum: Bobum,
        private readonly _sceneCoords: SceneCoordinatesConverter) { }

    paint(_canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
        ctx.save();

        ctx.beginPath();

        const position = this._sceneCoords.toPixels(this._bobum.position);
        const radius = this._sceneCoords.pixelsPerUnit * this._bobum.radius;

        ctx.translate(position.x, position.y);
        ctx.scale(radius, radius);
        ctx.rotate(Math.PI);

        ctx.fillStyle = '#B28137';
        ctx.fill(CIRCLE_PATH);

        ctx.lineWidth = 0.1;
        ctx.stroke(CIRCLE_PATH);
        ctx.stroke(SMILE_PATH);

        ctx.restore();
    }
}

// The following paths are in boba-local coordinates. The bobum
// is a circle of radius 1 at (0, 0).

const CIRCLE_PATH = new Path2D();
CIRCLE_PATH.arc(0, 0, 1, 0, 2 * Math.PI);

const SMILE_PATH = new Path2D();

// Eyes
SMILE_PATH.arc(-0.5, 0.1, 0.07, 0, 2 * Math.PI);
SMILE_PATH.moveTo(0.5, 0.1);
SMILE_PATH.arc(0.5, 0.1, 0.07, 0, 2 * Math.PI);

// Smile
SMILE_PATH.moveTo(-0.3, 0);
SMILE_PATH.bezierCurveTo(
    -0.1, -0.1,
    0.1, -0.1,
    0.3, 0,
);