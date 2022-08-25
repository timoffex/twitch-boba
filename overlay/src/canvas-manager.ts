import { assert } from 'console';

import { CanvasPainter } from './canvas-painter';

/** Object that configures and draws to an HTML canvas. */
export class CanvasManager {
    /** Attempts to create the CanvasManager for the main canvas. */
    static tryCreate(): CanvasManager | undefined {
        const canvas = document.getElementById('main-overlay') as HTMLCanvasElement;
        if (!canvas) {
            console.log('Canvas not supported by browser.');
            return undefined;
        }

        const context = canvas.getContext('2d');
        if (!context) {
            console.log('Canvas does not support 2D context.');
            return undefined;
        }

        return new CanvasManager(canvas, context);
    }

    beginPainting(painter: CanvasPainter) {
        if (this.beganPainting) {
            console.log('Tried to change CanvasPainter, which is unsupported');
            return;
        }

        this.beganPainting = true;

        const paint = () => {
            painter.paint(this.canvas, this.context);
            window.requestAnimationFrame(paint);
        };

        window.requestAnimationFrame(paint);
    }

    get size(): {width: number, height: number} {
        return {
            width: this.canvas.width,
            height: this.canvas.height,
        };
    }

    private beganPainting = false;

    private constructor(
        private readonly canvas: HTMLCanvasElement,
        private readonly context: CanvasRenderingContext2D) {
        window.addEventListener('resize', () => this.resizeCanvasToFillWindow());

        // Set a good size even if the 'resize' event doesn't fire,
        // which happens in the Twitch Developer Rig.
        this.resizeCanvasToFillWindow();
    }

    private resizeCanvasToFillWindow() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
}