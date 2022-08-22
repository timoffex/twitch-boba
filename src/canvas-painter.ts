export interface CanvasPainter {
    paint(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void;
}