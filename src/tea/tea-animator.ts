import { Animator } from "../animator";
import { Tea } from "./tea";

/** An object that animates a {@link Tea}. */
export class TeaAnimator implements Animator {
    constructor(private readonly _tea: Tea) {}

    updateFrame(seconds: number): void {
        this._tea.slide(seconds);
    }
}