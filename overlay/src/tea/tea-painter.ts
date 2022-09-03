import { SceneCanvasPainter } from '../scene-canvas-painter';
import { SceneCoordinatesConverter } from '../scene-coordinates-converter';
import { Tea } from './tea';

/**
 * Number of pixels the Path2D extends beyond the canvas in
 * every direction.
 */
const BUFFER = 10;

/** An object that paints a {@link Tea} on an HTML canvas. */
export class TeaPainter implements SceneCanvasPainter {
    private _lastCanvasWidth = 0;
    private _path: Path2D | undefined;

    constructor(
        /** The {@link Tea} object to paint. */
        private readonly _tea: Tea,

        /** Helper to convert between scene coordinates and pixels. */
        private readonly _sceneCoords: SceneCoordinatesConverter,

        /**
         * The resolution of the {@link Path2D}.
         * 
         * This is the horizontal distance in pixels between consecutive
         * points on the {@link Path2D}.
         */
        private readonly _stepSize: number) { }

    paintTeaBack(
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
    ): void {
        const gradient = ctx.createLinearGradient(
            canvas.width / 2, 0,
            canvas.width / 2, this._sceneCoords.pixelsPerUnit * this._tea.teaHeight);
        gradient.addColorStop(0.0, 'hsl(240 80% 70% / 80%)');
        gradient.addColorStop(1.0, 'hsl(180 80% 70% / 80%)');

        this.paintWave(canvas, ctx, {
            gradient: gradient,
            xOffsetUnits: this._tea.backTeaOffset,
            yOffsetUnits: 0,
        });
    }

    paintTeaFront(
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
    ): void {
        const gradient = ctx.createLinearGradient(
            canvas.width / 2, 0,
            canvas.width / 2, this._sceneCoords.pixelsPerUnit * this._tea.teaHeight);
        gradient.addColorStop(0.0, 'hsl(240 80% 70% / 40%)');
        gradient.addColorStop(1.0, 'hsl(180 80% 70% / 40%)');

        this.paintWave(canvas, ctx, {
            gradient: gradient,
            xOffsetUnits: this._tea.frontTeaOffset,
            yOffsetUnits: -this._tea.teaHeight * 0.3,
        });
    }

    private paintWave(
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
        options: {
            gradient: CanvasGradient,
            xOffsetUnits: number,
            yOffsetUnits: number,
        }
    ): void {
        const ppu = this._sceneCoords.pixelsPerUnit;

        // Always remake the path to be at least as wide as the canvas.
        if (!this._path || this._lastCanvasWidth != canvas.width) {
            this.regeneratePath(canvas.width);
        }

        ctx.save();

        // The path is 1 waveLength and 2 BUFFER wider than the canvas, and the
        // teaOffset is between 0 and waveLength. This means the xOffset will be
        // between (-waveLength - BUFFER) and (-BUFFER), making it so that the path
        // always extends at least BUFFER pixels off-screen in each direction.
        const xOffset = ppu * (options.xOffsetUnits - this._tea.waveLength) - BUFFER;
        const yOffset = canvas.height - ppu * (this._tea.teaHeight + options.yOffsetUnits);

        ctx.translate(xOffset, yOffset);
        ctx.fillStyle = options.gradient;
        ctx.fill(this._path!);

        ctx.restore();
    }

    private regeneratePath(canvasWidth: number) {
        const pixelsPerUnit = this._sceneCoords.pixelsPerUnit;
        const amplitude = pixelsPerUnit * this._tea.amplitude;
        const waveLength = pixelsPerUnit * this._tea.waveLength;
        const teaHeight = pixelsPerUnit * this._tea.teaHeight;

        this._path = new Path2D();

        this._path.moveTo(0, 0);

        const pathWidth = canvasWidth + waveLength + BUFFER * 2;
        const frequency = 2 * Math.PI / waveLength;
        let x = 0;
        while (x < pathWidth) {
            x += this._stepSize;
            this._path.lineTo(x, -amplitude * Math.sin(x * frequency));
        }

        // Add 5 px buffer to make sure the path extends a little below the canvas.
        this._path.lineTo(x, teaHeight + BUFFER);
        this._path.lineTo(0, teaHeight + BUFFER);
        this._path.closePath();

        this._lastCanvasWidth = canvasWidth;
    }
}