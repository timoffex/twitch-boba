import { BobumMover } from './movers/bobum-mover';

/**  A bobum is the singular of boba. */
export class Bobum {

    /** The name for this bobum. */
    readonly name: string;

    /** The boba's position in scene coordinates. */
    private _position = { x: 0, y: 0 };

    /** The boba's velocity in scene coordinates. */
    private _velocity = { x: 0, y: 0 };

    /** The boba's radius in scene coordinates. */
    private _radius = 2.5;

    /** The object controlling this bobum right now. */
    private _mover: BobumMover;

    constructor(params: BobumParams) {
        this.name = params.name;
        this._position = { x: params.position.x, y: params.position.y };
        this._velocity = { x: params.velocity.x, y: params.velocity.y };
        this._radius = params.radius;
        this._mover = params.mover;
    }

    get position() {
        return { x: this._position.x, y: this._position.y };
    }

    get radius() {
        return this._radius;
    }

    changeMover(newMover: BobumMover): void {
        this._mover = newMover;
    }

    move(seconds: number): void {
        const state = {
            position: this._position,
            velocity: this._velocity,
        };

        this._mover = this._mover.moveAndReturnNewMover(state, seconds);

        this._position = state.position;
        this._velocity = state.velocity;
    }
}

export interface BobumParams {
    name: string;
    position: { x: number, y: number };
    velocity: { x: number, y: number };
    radius: number;
    mover: BobumMover;
}