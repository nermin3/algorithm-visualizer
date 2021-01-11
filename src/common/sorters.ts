import { onArrayChangeCallBack, sleep, switchElements } from './appUtil';

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
      }
      await sleep(5);
    }

    for (let i = array.length - 1 - alreadySorted; i > alreadySorted; --i) {
      if (array[i] > array[i - 1]) {
        switchOccurred = true;
        switchElements(array, i, i - 1);
        updateArrayState(array);
      }
      await sleep(5);
    }
    ++alreadySorted;
  } while (switchOccurred);
}
