import { CanvasPainter } from "../canvas-painter";
import { SceneCoordinatesConverter } from "../scene-coordinates-converter";
import { Bobum } from "./bobum";

/** Object that paints a {@link Bobum} on a canvas. */
export class BobumPainter implements CanvasPainter {
    constructor(
        private readonly _bobum: Bobum,
        private readonly _sceneCoords: SceneCoordinatesConverter) { }

    paint(_canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();

        const position = this._sceneCoords.toPixels(this._bobum.position);

        ctx.arc(
            position.x,
            position.y,
            this._sceneCoords.pixelsPerUnit * this._bobum.radius,
            0, 2 * Math.PI);

        ctx.fillStyle = '#B28137';
        ctx.fill();
        ctx.stroke();
    }
}