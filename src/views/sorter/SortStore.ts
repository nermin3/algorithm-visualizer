import { BehaviorSubject } from 'rxjs';
import { generateShuffledArray } from '../../common/appUtil';
import { SORTER_ALGORITHM } from '../../common/enums/sorterAlgorithm';

class SortStore {
  arraySubject = new BehaviorSubject<number[]>(generateShuffledArray());
  algorithmSubject = new BehaviorSubject<SORTER_ALGORITHM>(
    SORTER_ALGORITHM.BUBBLE_SORT
  );
}

export const sortStore = new SortStore();
