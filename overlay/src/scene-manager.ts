import { AnimationManager } from './animation-manager';
import { CanvasPainter } from './canvas-painter';
import { SceneObject } from './scene-object';

/** An object that manages multiple {@link SceneObject} instances. */
export class SceneManager {
    private readonly _painters = new Set<CanvasPainter>();

    constructor(private readonly _animationManager: AnimationManager) { }

    updateFrame(): void {
        this._animationManager.updateFrame();
    }

    paint(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
        for (const painter of this._painters) {
            painter.paint(canvas, ctx);
        }
    }

    addObject(obj: SceneObject): void {
        if (obj.animator) {
            this._animationManager.addAnimator(obj.animator);
        }

        if (obj.painter) {
            this._painters.add(obj.painter);
        }
    }

    removeObject(obj: SceneObject): void {
        if (obj.animator) {
            this._animationManager.removeAnimator(obj.animator);
        }

        if (obj.painter) {
            this._painters.delete(obj.painter);
        }
    }
}