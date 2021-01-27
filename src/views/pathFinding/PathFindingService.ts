import { BehaviorSubject } from 'rxjs';
import { pathFindingStore } from './PathFindingStore';

export class PathFindingService {
  gridSubject = new BehaviorSubject<number[][]>(
    pathFindingStore.gridSubject.getValue()
  );
}

export const pathFindingService = new PathFindingService();
