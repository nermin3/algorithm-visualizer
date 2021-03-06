import { BehaviorSubject } from 'rxjs';
import { sortStore } from './SortStore';
import {
  generateShuffledArray,
  onArrayChangeCallBack,
  onChangeCallBack,
} from '../../common/appUtil';
import { SORTER_ALGORITHM } from '../../common/enums';
import {
  bubbleSort,
  heapSort,
  insertionSort,
  mergeSort,
  quickSort,
  selectionSort,
} from '../../common/sorters';

class SortService {
  readonly arraySubject = new BehaviorSubject<number[]>(
    sortStore.arraySubject.getValue()
  );
  readonly algorithmSubject = new BehaviorSubject<SORTER_ALGORITHM>(
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
    sortStore.algorithmSubject.next(value);
    const newArray = generateShuffledArray();
    sortStore.arraySubject.next(newArray);

    switch (value) {
      case SORTER_ALGORITHM.BUBBLE_SORT:
        bubbleSort(newArray, this.updateArray);
        break;
      case SORTER_ALGORITHM.INSERTION_SORT:
        insertionSort(newArray, this.updateArray);
        break;
      case SORTER_ALGORITHM.MERGE_SORT:
        mergeSort(newArray, this.updateArray);
        break;
      case SORTER_ALGORITHM.SELECTION_SORT:
        selectionSort(newArray, this.updateArray);
        break;
      case SORTER_ALGORITHM.QUICK_SORT:
        quickSort(newArray, this.updateArray);
        break;
      case SORTER_ALGORITHM.HEAP_SORT:
        heapSort(newArray, this.updateArray);
        break;
    }
  };
}

export const sortService = new SortService();
