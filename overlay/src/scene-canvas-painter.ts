export interface SceneCanvasPainter {
    paintBoba?(
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
    ): void;

    paintTeaBack?(
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
    ): void;

    paintTeaFront?(
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
    ): void;
}