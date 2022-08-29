import { AnimationManager } from './animation-manager';
import { SceneCanvasPainter } from './scene-canvas-painter';
import { SceneObject } from './scene-object';

/** An object that manages multiple {@link SceneObject} instances. */
export class SceneManager {
    private readonly _painters = new Set<SceneCanvasPainter>();

    constructor(private readonly _animationManager: AnimationManager) { }

    updateFrame(): void {
        this._animationManager.updateFrame();
    }

    paint(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
        for (const painter of this._painters) {
            if (painter.paintTeaBack) {
                painter.paintTeaBack(canvas, ctx);
            }
        }
        for (const painter of this._painters) {
            if (painter.paintBoba) {
                painter.paintBoba(canvas, ctx);
            }
        }
        for (const painter of this._painters) {
            if (painter.paintTeaFront) {
                painter.paintTeaFront(canvas, ctx);
            }
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