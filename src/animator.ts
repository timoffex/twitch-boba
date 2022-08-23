/**
 * Interface for classes that animate objects by updating them on
 * every frame.
 */
export interface Animator {
    /**
     * Updates some data, given the amount of time that has passed since
     * the last frame.
     * 
     * Animator implementations should always use {@link seconds} directly
     * and should not assume any relationship to the actual time. It is
     * possible for {@link seconds} to be clipped if too much time passes
     * between frames.
     */
    updateFrame(seconds: number): void;
}