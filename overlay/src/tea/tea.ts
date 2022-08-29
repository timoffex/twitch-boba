/** The "milk tea" overlay. */
export class Tea {
    /** The height of the tea wave in scene units. */
    readonly amplitude: number;

    /** The distance between peaks of the tea wave, in scene units. */
    readonly waveLength: number;

    /** The number of scene units the tea wave slides per second to the right.  */
    readonly waveSpeed: number;

    /** The amount of vertical space the "tea" area takes up, in scene units. */
    readonly teaHeight: number;

    private _backTeaOffset: number = 0;
    private _frontTeaOffset: number = 0;

    /** 
     * The X position of the tea wave rendered in front of boba.
     * 
     * This is guaranteed to be in range [0, {@link #waveLength}].
     */
    get frontTeaOffset() { return this._frontTeaOffset; }

    /** 
     * The X position of the tea wave rendered behind boba.
     * 
     * This is guaranteed to be in range [0, {@link #waveLength}].
     */
    get backTeaOffset() { return this._backTeaOffset; }

    constructor(params: TeaConfig) {
        this.amplitude = params.amplitude;
        this.waveLength = params.waveLength;
        this.waveSpeed = params.waveSpeed;
        this.teaHeight = params.teaHeight;
    }

    /**
     * Slides the tea horizontally, changing the tea offset.
     * 
     * The amount the tea slides is based on how much time passed,
     * specified by {@link seconds}. The tea offset wraps
     * around to stay in the valid range.
     */
    slide(seconds: number): void {
        this._backTeaOffset += this.waveSpeed * seconds;
        this._backTeaOffset %= this.waveLength;

        this._frontTeaOffset += this.waveLength * seconds * 1.2;
        this._frontTeaOffset %= this.waveLength;
    }
}

/** Parameters for the {@link Tea} constructor. */
export interface TeaConfig {
    amplitude: number;
    waveLength: number;
    waveSpeed: number;
    teaHeight: number;
}