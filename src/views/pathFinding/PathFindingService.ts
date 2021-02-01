import { BehaviorSubject } from 'rxjs';
import { pathFindingStore } from './PathFindingStore';
import { MATRIX_MARKER } from '../../common/enums';

export class PathFindingService {
  private currentMarker = MATRIX_MARKER.START;
  private lastStartPosition: { x: number; y: number } | null = null;
  private lastEndPosition: { x: number; y: number } | null = null;

  readonly gridSubject = new BehaviorSubject<MATRIX_MARKER[][]>(
    pathFindingStore.gridSubject.getValue()
  );

  constructor() {
    document.addEventListener('keydown', this.updateCurrentMarker);
  }

  updateCell = (newX: number, newY: number) => {
    const grid = this.gridSubject.getValue();
    grid[newX][newY] = this.currentMarker;

    if (this.currentMarker === MATRIX_MARKER.START) {
      if (this.lastStartPosition) {
        const { x: lastX, y: lastY } = this.lastStartPosition;
        grid[lastX][lastY] = MATRIX_MARKER.PATH1;
      }
      this.lastStartPosition = { x: newX, y: newY };
    }

    if (this.currentMarker === MATRIX_MARKER.END) {
      if (this.lastEndPosition) {
        const { x: lastX, y: lastY } = this.lastEndPosition;
        grid[lastX][lastY] = MATRIX_MARKER.PATH1;
      }
      this.lastEndPosition = { x: newX, y: newY };
    }

    this.gridSubject.next(grid);
  };

  updateCurrentMarker = (e: KeyboardEvent) => {
    switch (e.code) {
      case 'Digit0':
        this.currentMarker = MATRIX_MARKER.START;
        break;
      case 'Digit1':
        this.currentMarker = MATRIX_MARKER.PATH1;
        break;
      case 'Digit2':
        this.currentMarker = MATRIX_MARKER.PATH2;
        break;
      case 'Digit3':
        this.currentMarker = MATRIX_MARKER.PATH3;
        break;
      case 'Digit4':
        this.currentMarker = MATRIX_MARKER.END;
        break;
    }
  };
}

export const pathFindingService = new PathFindingService();
