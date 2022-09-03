import { SceneCoordinatesConverter } from '../scene-coordinates-converter';
import { SceneManager } from '../scene-manager';
import { SceneObject } from '../scene-object';
import { Bobum } from './bobum';
import { BobumAnimator } from './bobum-animator';
import { BobumPainter } from './bobum-painter';
import { BobumMoverNone } from './movers/bobum-mover-none';
import { BobumMoverToTarget } from './movers/bobum-mover-to-target';

/** A manager for all the boba shown on screen. */
export class BobaManager {
    private readonly _usernameToBobum = new Map<string, BobumSceneObject>();

    constructor(
        private readonly _sceneManager: SceneManager,
        private readonly _sceneCoords: SceneCoordinatesConverter) { }

    /** Adds a bobum for a viewer. */
    addViewer(username: string): void {
        if (this._usernameToBobum.has(username)) return;

        const centerPosition = { x: 10 + Math.random() * 80, y: 8 };
        const initialPosition = {
            x: centerPosition.x + (2 * Math.random() - 1) * 10,
            y: -2,
        };

        const nextMover = () => {
            const offCenter = {
                x: centerPosition.x + (2 * Math.random() - 1) * 5,
                y: centerPosition.y + (2 * Math.random() - 1) * 5,
            };

            return new BobumMoverToTarget(offCenter, 2, nextMover);
        };

        const bobum = new Bobum({
            name: username,
            color: `hsl(${Math.round(Math.random() * 360)} 80% 90%)`,
            position: initialPosition,
            velocity: { x: 0, y: 0 },
            radius: 2,
            mover: new BobumMoverToTarget(
                centerPosition,
                2,
                nextMover
            )
        });

        const sceneObject = {
            bobum,
            animator: new BobumAnimator(bobum),
            painter: new BobumPainter(bobum, this._sceneCoords),
        };

        this._usernameToBobum.set(username, sceneObject);
        this._sceneManager.addObject(sceneObject);
    }

    removeViewer(username: string): void {
        const object = this._usernameToBobum.get(username);
        this._usernameToBobum.delete(username);

        if (object) {
            object.bobum.changeMover(
                new BobumMoverToTarget(
                    { x: object.bobum.position.x, y: -10 },
                    1,
                    () => new BobumMoverNone()));
            
            setTimeout(() => this._sceneManager.removeObject(object), 5000);
        }
    }
}

interface BobumSceneObject extends SceneObject {
    bobum: Bobum;
}
