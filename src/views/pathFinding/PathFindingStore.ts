import { BehaviorSubject } from 'rxjs';
import { COLUMN_SIZE, ROW_SIZE } from './pathFindingUtil';
import { MATRIX_MARKER } from '../../common/enums';

class PathFindingStore {
  gridSubject = new BehaviorSubject<MATRIX_MARKER[][]>(
    new Array(ROW_SIZE)
      .fill(MATRIX_MARKER.PATH1)
      .map(() => new Array(COLUMN_SIZE).fill(MATRIX_MARKER.PATH1))
  );
}

export const pathFindingStore = new PathFindingStore();
