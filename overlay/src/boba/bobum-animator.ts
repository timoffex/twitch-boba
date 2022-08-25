import { Animator } from '../animator';
import { Bobum } from './bobum';

/** Object that animates a {@link Bobum} frame-by-frame. */
export class BobumAnimator implements Animator {
    constructor(private readonly _bobum: Bobum) {}

    updateFrame(seconds: number): void {
        this._bobum.move(seconds);
    }
}