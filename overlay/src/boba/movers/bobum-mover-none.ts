import { BobumMover, BobumState } from "./bobum-mover";

export class BobumMoverNone implements BobumMover {
    moveAndReturnNewMover(state: BobumState, seconds: number): BobumMover {
        return this;
    }
}