import { CanvasPainter } from "./canvas-painter";

export class TeaPainter implements CanvasPainter {
    private lastCanvasWidth = 0;
    private path: Path2D | undefined;
    private gradient: CanvasGradient | undefined;

    private offsetX = 0;
    private lastPaintTime: number;

    constructor(
        private readonly amplitude: number,
        private readonly wavelength: number,
        private readonly wavespeed: number,
        private readonly stepSize: number,
        private readonly pathHeight: number) {
        this.lastPaintTime = Date.now();
    }

    paint(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
        if (!this.path || this.lastCanvasWidth != canvas.width) {
            this.regeneratePath(canvas.width);

            this.gradient = ctx.createLinearGradient(
                canvas.width / 2, 0,
                canvas.width / 2, this.pathHeight);
            this.gradient.addColorStop(0.0, 'rgba(152,109,0,0.5)');
            this.gradient.addColorStop(0.4, 'rgba(140,94,0,0.5)');
            this.gradient.addColorStop(1.0, 'rgba(255,219,164,0.5)');
        }

        const now = Date.now();
        this.offsetX += this.wavespeed * (now - this.lastPaintTime) / 1000;
        this.offsetX %= this.wavelength;
        this.lastPaintTime = now;

        ctx.save();

        ctx.translate(this.offsetX - 2 * this.wavelength + 10, canvas.height - this.pathHeight + 5);
        ctx.fillStyle = this.gradient!;
        ctx.fill(this.path!);

        ctx.restore();
    }

    private regeneratePath(canvasWidth: number) {
        this.path = new Path2D();

        this.path.moveTo(0, 0);

        const pathWidth = canvasWidth + 2 * this.wavelength;
        const frequency = 2 * Math.PI / this.wavelength;
        let x = 0;
        while (x < pathWidth) {
            x += this.stepSize;
            this.path.lineTo(x, -this.amplitude * Math.sin(x * frequency));
        }

        this.path.lineTo(x, this.pathHeight);
        this.path.lineTo(0, this.pathHeight);
        this.path.closePath();

        this.lastCanvasWidth = canvasWidth;
    }
}