import { SceneCoordinatesConverter } from '../scene-coordinates-converter';
import { SceneManager } from '../scene-manager';
import { Bobum } from './bobum';
import { BobumAnimator } from './bobum-animator';
import { BobumPainter } from './bobum-painter';
import { BobumMoverToTarget } from './movers/bobum-mover-to-target';

/** A manager for all the boba shown on screen. */
export class BobaManager {
    constructor(
        private readonly _sceneManager: SceneManager,
        private readonly _sceneCoords: SceneCoordinatesConverter) { }

    /** Adds a bobum for a viewer. */
    addViewer(): void {
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
            position: initialPosition,
            velocity: { x: 0, y: 0 },
            radius: 2,
            mover: new BobumMoverToTarget(
                centerPosition,
                2,
                nextMover
            )
        });

        this._sceneManager.addObject({
            animator: new BobumAnimator(bobum),
            painter: new BobumPainter(bobum, this._sceneCoords),
        });
    }
}