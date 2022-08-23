/** An object that controls the movement behavior of a {@link Bobum}. */
export interface BobumMover {
    /** Updates the {@link state} and returns the mover to use next time. */
    moveAndReturnNewMover(state: BobumState, seconds: number): BobumMover;
}

/** The state that a {@link BobumMover} modifies. */
export interface BobumState {
    position: { x: number, y: number };
    velocity: { x: number, y: number };
}