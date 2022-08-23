/** The "milk tea" overlay. */
export class Tea {
    /** The height of the tea wave in pixels. */
    readonly amplitude: number;

    /** The distance between peaks of the tea wave, in pixels. */
    readonly waveLength: number;

    /** The number of pixels the tea wave slides per second to the right.  */
    readonly waveSpeed: number;

    /** The amount of vertical space the "tea" area takes up, in pixels. */
    readonly teaHeight: number;

    private _teaOffset: number = 0;

    /** 
     * The X position of the tea wave.
     * 
     * This is guaranteed to be in range [0, {@link #waveLength}].
     */
    get teaOffset() { return this._teaOffset; }

    constructor(params: TeaConfig) {
        this.amplitude = params.amplitude;
        this.waveLength = params.waveLength;
        this.waveSpeed = params.waveSpeed;
        this.teaHeight = params.teaHeight;
    }

    /**
     * Slides the tea horizontally, changing the {@link #teaOffset}.
     * 
     * The amount the tea slides is based on how much time passed,
     * specified by {@link seconds}. The {@link #teaOffset} wraps
     * around to stay in the valid range.
     */
    slide(seconds: number): void {
        this._teaOffset += this.waveSpeed * seconds;
        this._teaOffset %= this.waveLength;
    }
}

/** Parameters for the {@link Tea} constructor. */
export interface TeaConfig {
    amplitude: number;
    waveLength: number;
    waveSpeed: number;
    teaHeight: number;
}