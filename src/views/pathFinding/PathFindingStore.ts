import { BehaviorSubject } from 'rxjs';
import { MATRIX_SIZE } from './pathFindingUtil';
import { MATRIX_MARKER } from '../../common/enums';

class PathFindingStore {
  gridSubject = new BehaviorSubject<number[][]>(
    new Array(MATRIX_SIZE)
      .fill(MATRIX_MARKER.PATH)
      .map(() => new Array(MATRIX_SIZE).fill(MATRIX_MARKER.PATH))
  );
}

export const pathFindingStore = new PathFindingStore();
