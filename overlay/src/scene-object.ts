import { Animator } from './animator';
import { SceneCanvasPainter } from './scene-canvas-painter';

/**
 * A collection of components that an object in a scene may have.
 * 
 * Any components must be unique to this SceneObject and not shared
 * with other SceneObjects. For example, you should not reuse a single
 * {@link SceneCanvasPainter} in multiple SceneObjects.
 */
export interface SceneObject {
    /** An optional painter for the object. */
    readonly painter?: SceneCanvasPainter;

    /** An optional animator for the object. */
    readonly animator?: Animator;
}