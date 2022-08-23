import { BobumMover, BobumState } from "./bobum-mover";

/**
 * A mover that accelerates a {@link Bobum} toward a target position until
 * it reaches it.
 */
export class BobumMoverToTarget implements BobumMover {
    constructor(
        /** The position toward which the bobum should move. */
        private readonly _targetPosition: { x: number, y: number },

        /**
         * The distance from the target position in scene units at which
         * this mover should switch over.
         */
        private readonly _tolerance: number,

        /**
         * A function that produces the mover that should be switched to
         * after this one reaches the end.
         */
        private readonly _makeNextMover: () => BobumMover) { }

    moveAndReturnNewMover(state: BobumState, seconds: number): BobumMover {
        const dX = this._targetPosition.x - state.position.x;
        const dY = this._targetPosition.y - state.position.y;

        const dist = Math.sqrt(dX * dX + dY * dY);

        if (dist < this._tolerance) {
            return this._makeNextMover();
        }

        const dirX = dX / dist;
        const dirY = dY / dist;

        // Scene units per second per second.
        const acceleration = 10;

        // The percentage of velocity that remains after 1 second.
        const dragCoefficient = 0.6;
        const drag = 1 - Math.pow(dragCoefficient, seconds);

        const dvX = acceleration * dirX * seconds - drag * state.velocity.x;
        const dvY = acceleration * dirY * seconds - drag * state.velocity.y;

        state.position.x += (state.velocity.x + 0.5 * dvX) * seconds;
        state.position.y += (state.velocity.y + 0.5 * dvY) * seconds;
        state.velocity.x += dvX;
        state.velocity.y += dvY;

        return this;
    }
}