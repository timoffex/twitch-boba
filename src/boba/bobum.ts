/**  A bobum is the singular of boba. */
export class Bobum {

    /** The boba's position in scene coordinates. */
    private _position = { x: 0, y: 0 };

    /** The boba's velocity in scene coordinates. */
    private _velocity = { x: 0, y: 0 };

    /** The boba's radius in scene coordinates. */
    private _radius = 2.5;

    private _targetCenter = { x: 0, y: 0 };
    private _target = { x: 0, y: 0 };

    private _isDead = false;

    static newAt(position: { x: number, y: number }): Bobum {
        const { x, y } = position;

        const bobum = new Bobum();
        bobum._position = { x, y };
        bobum._targetCenter = { x, y };
        bobum._target = { x, y };
        return bobum;
    }

    get position() {
        return { x: this._position.x, y: this._position.y };
    }

    get radius() {
        return this._radius;
    }

    updateTargetCenter(x: number, y: number): void {
        this._targetCenter.x = x;
        this._targetCenter.y = y;
    }

    updatePosition(seconds: number): void {
        const acceleration = 10;

        let dirX = this._target.x - this._position.x;
        let dirY = this._target.y - this._position.y;
        const dirMagnitude = Math.sqrt(dirX * dirX + dirY * dirY);
        if (dirMagnitude > 0) {
            dirX /= dirMagnitude;
            dirY /= dirMagnitude;

            this._velocity.x += dirX * acceleration * seconds;
            this._velocity.y += dirY * acceleration * seconds;
        }

        this._velocity.x *= 0.99;
        this._velocity.y *= 0.99;

        this._position.x += this._velocity.x * seconds;
        this._position.y += this._velocity.y * seconds;
    }

    start(): void {
        this.updateTargetAndRepeat();
    }

    kill(): void {
        this._isDead = true;
    }

    private updateTargetAndRepeat() {
        this._target.x = this._targetCenter.x + (Math.random() * 2 - 1) * 50;
        this._target.y = this._targetCenter.y + (Math.random() * 2 - 1) * 50;

        if (!this._isDead) {
            setTimeout(() => this.updateTargetAndRepeat(), 500 + 1000 * Math.random());
        }
    }

    private constructor() { }
}