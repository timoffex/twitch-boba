import { CanvasPainter } from "../canvas-painter";
import { Tea } from "./tea";

/** An object that paints a {@link Tea} on an HTML canvas. */
export class TeaPainter implements CanvasPainter {
    private _lastCanvasWidth = 0;
    private _path: Path2D | undefined;
    private _gradient: CanvasGradient | undefined;

    constructor(
        /** The {@link Tea} object to paint. */
        private readonly _tea: Tea,

        /**
         * The resolution of the {@link Path2D}.
         * 
         * This is the horizontal distance in pixels between consecutive
         * points on the {@link Path2D}.
         */
        private readonly _stepSize: number) {}

    paint(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
        // Always remake the path to be at least as wide as the canvas.
        if (!this._path || this._lastCanvasWidth != canvas.width) {
            this.regeneratePath(canvas.width);

            this._gradient = ctx.createLinearGradient(
                canvas.width / 2, 0,
                canvas.width / 2, this._tea.teaHeight);
            this._gradient.addColorStop(0.0, 'rgba(152,109,0,0.5)');
            this._gradient.addColorStop(0.4, 'rgba(140,94,0,0.5)');
            this._gradient.addColorStop(1.0, 'rgba(255,219,164,0.5)');
        }

        ctx.save();

        // Since teaOffset is in [0, waveLength], and since we make the path
        // 2 wavelengths longer than the canvas, this ensures that the path
        // always extends at least half a waveLength off-screen in both
        // directions.
        const xOffset = this._tea.teaOffset - 1.5 * this._tea.waveLength;
        ctx.translate(xOffset, canvas.height - this._tea.teaHeight);
        ctx.fillStyle = this._gradient!;
        ctx.fill(this._path!);

        ctx.restore();
    }

    private regeneratePath(canvasWidth: number) {
        this._path = new Path2D();

        this._path.moveTo(0, 0);

        const pathWidth = canvasWidth + 2 * this._tea.waveLength;
        const frequency = 2 * Math.PI / this._tea.waveLength;
        let x = 0;
        while (x < pathWidth) {
            x += this._stepSize;
            this._path.lineTo(x, -this._tea.amplitude * Math.sin(x * frequency));
        }

        // Add 5 px buffer to make sure the path extends a little below the canvas.
        this._path.lineTo(x, this._tea.teaHeight + 5);
        this._path.lineTo(0, this._tea.teaHeight + 5);
        this._path.closePath();

        this._lastCanvasWidth = canvasWidth;
    }
}