import { CanvasManager } from "./canvas-manager";

/**
 * A converter between scene coordinates and pixels.
 * 
 * Scene coordinates are used instead of pixel coordinates to allow
 * synchronizing positions and sizes across devices with different
 * viewport sizes.
 * 
 * In scene coordinates, (0, 0) is always at the bottom-left corner and
 * (100, 0) always at the bottom-right corner. Comparing this to the
 * actual canvas size gives the scaling factor between scene units and
 * pixels.
 */
export class SceneCoordinatesConverter {
    constructor(private readonly _canvasManager: CanvasManager) { }

    /**
     * Returns the scaling factor for converting scene units to pixels.
     * 
     * This may change if the canvas is resized.
     */
    get pixelsPerUnit() {
        return this._canvasManager.size.width / 100;
    }

    /** Converts a scene position to canvas (pixel) coordinates. */
    toPixels(scenePosition: {x: number, y: number}): {x: number, y: number} {
        const pixelsPerUnit = this.pixelsPerUnit;
        const canvasHeight = this._canvasManager.size.height;

        return {
            x: pixelsPerUnit * scenePosition.x,
            y: canvasHeight - pixelsPerUnit * scenePosition.y,
        };
    }
}