import { onArrayChangeCallBack, sleep, switchElements } from './appUtil';

// Time (in ms) the application should wait after switching array elements
const WAIT_TIME = 5;
/**
 * Function performs a bubble sort on given array
 * @param array array to sort
 * @param updateArrayState state update callback
 */
export async function bubbleSort(
  array: number[],
  updateArrayState: onArrayChangeCallBack<number>
) {
  let switchOccurred;
  let alreadySorted = 0;
  do {
    switchOccurred = false;
    for (let i = alreadySorted; i < array.length; ++i) {
      if (array[i] < array[i + 1]) {
        switchOccurred = true;
        switchElements(array, i, i + 1);
        updateArrayState(array);
        await sleep(WAIT_TIME);
      }
    }

    for (let i = array.length - 1 - alreadySorted; i > alreadySorted; --i) {
      if (array[i] > array[i - 1]) {
        switchOccurred = true;
        switchElements(array, i, i - 1);
        updateArrayState(array);
        await sleep(WAIT_TIME);
      }
    }
    ++alreadySorted;
  } while (switchOccurred);
}

/**
 * Function performs an insertion sort on given array
 * @param array array to sort
 * @param updateArrayState state update callback
 */
export async function insertionSort(
  array: number[],
  updateArrayState: onArrayChangeCallBack<number>
) {
  for (let i = 1; i < array.length; ++i) {
    for (let j = i; j > 0; --j) {
      if (array[j - 1] < array[j]) {
        switchElements(array, j, j - 1);
        updateArrayState(array);
        await sleep(WAIT_TIME);
      } else {
        break;
      }
    }
  }
}

/**
 * Function performs an selection sort on given array
 * @param array array to sort
 * @param updateArrayState state update callback
 */
export async function selectionSort(
  array: number[],
  updateArrayState: onArrayChangeCallBack<number>
) {
  for (let i = 0; i < array.length - 1; ++i) {
    let biggestIndex = i;
    for (let j = i; j < array.length - 1; ++j) {
      if (array[j + 1] > array[biggestIndex]) {
        biggestIndex = j + 1;
      }
    }
    switchElements(array, biggestIndex, i);
    updateArrayState(array);
    await sleep(WAIT_TIME);
  }
}
