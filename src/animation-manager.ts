import { Animator } from "./animator";

/** Object that runs all animations. */
export class AnimationManager {
    private readonly _animators: Animator[] = [];

    private _lastUpdateTime: number = 0;
    private _drewFirstFrame: boolean = false;

    private readonly _maxFrameDeltaSeconds: number;

    constructor(params: AnimationManagerParams) {
        this._maxFrameDeltaSeconds = params.maxFrameDeltaSeconds;
    }
    
    /** Adds the {@link animator} to the list of animators to run. */
    addAnimator(animator: Animator): void {
        this._animators.push(animator);
    }

    /** Runs all added animators. */
    updateFrame(): void {
        let timeDelta = (Date.now() - this._lastUpdateTime) / 1000.0;

        if (!this._drewFirstFrame) {
            // Use a 0 delta on first draw because the timeDelta didn't
            // have a good frame of reference.
            timeDelta = 0;
            this._drewFirstFrame = true;
        }

        timeDelta = Math.min(timeDelta, this._maxFrameDeltaSeconds);

        for (const animator of this._animators) {
            animator.updateFrame(timeDelta);
        }
    }
}

export interface AnimationManagerParams {
    /**
     * The maximum number of seconds to pass between two consecutive
     * animation frames.
     * 
     * This is used to prevent large animation jumps if the user leaves
     * the browser tab or animation stops for any reason.
     */
    maxFrameDeltaSeconds: number;
}