import { BehaviorSubject } from 'rxjs';
import { sortStore } from './SortStore';
import { onArrayChangeCallBack, onChangeCallBack } from '../../common/appUtil';
import { SORTER_ALGORITHM } from '../../common/enums/sorterAlgorithm';

class SortService {
  arraySubject = new BehaviorSubject<number[]>(
    sortStore.arraySubject.getValue()
  );
  algorithmSubject = new BehaviorSubject<SORTER_ALGORITHM>(
    sortStore.algorithmSubject.getValue()
  );

  constructor() {
    sortStore.arraySubject.subscribe((value) => this.arraySubject.next(value));
    sortStore.algorithmSubject.subscribe((value) =>
      this.algorithmSubject.next(value)
    );
  }

  updateArray: onArrayChangeCallBack<number> = (array: number[]) => {
    sortStore.arraySubject.next(array);
  };

  updateAlgorithm: onChangeCallBack<SORTER_ALGORITHM> = (
    value: SORTER_ALGORITHM
  ) => {
    this.algorithmSubject.next(value);
  };
}

export const sortService = new SortService();
