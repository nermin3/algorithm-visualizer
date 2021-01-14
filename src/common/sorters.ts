import { onArrayChangeCallBack, sleep, switchElements } from './appUtil';

// Time (in ms) the application should wait after switching array elements
const WAIT_TIME = 5;
const MERGE_WAIT = 20;
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

/**
 * Helper function to merge sub arrays
 * @param array main array
 * @param start start of first sub array
 * @param middle dividing point of sub arrays
 * @param end end of second array
 * @param updateArrayState state update callback
 */
async function mergeSubArrays(
  array: number[],
  start: number,
  middle: number,
  end: number,
  updateArrayState: onArrayChangeCallBack<number>
) {
  const subArrayLeftSize = middle - start + 1;
  const subArrayRightSize = end - middle;

  const leftArray = array.slice(start, start + subArrayLeftSize);
  const rightArray = array.slice(middle + 1, middle + 1 + subArrayRightSize);

  let i = 0,
    j = 0,
    k = start;

  while (i < subArrayLeftSize && j < subArrayRightSize) {
    if (leftArray[i] > rightArray[j]) {
      array[k] = leftArray[i];
      ++i;
    } else {
      array[k] = rightArray[j];
      ++j;
    }
    updateArrayState(array);
    await sleep(MERGE_WAIT);
    ++k;
  }

  while (i < subArrayLeftSize) {
    array[k] = leftArray[i];
    updateArrayState(array);
    await sleep(MERGE_WAIT);
    i++;
    k++;
  }

  while (j < subArrayRightSize) {
    array[k] = rightArray[j];
    updateArrayState(array);
    await sleep(MERGE_WAIT);
    j++;
    k++;
  }
}

/**
 * Function performs an insertion sort on given array
 * @param array array to sort
 * @param start start of array
 * @param end end of array (index excluded)
 * @param updateArrayState state update callback
 */
export async function mergeSort(
  array: number[],
  start: number,
  end: number,
  updateArrayState: onArrayChangeCallBack<number>
) {
  if (start >= end) {
    return;
  }
  const middle = Math.floor((start + end) / 2);
  await mergeSort(array, start, middle, updateArrayState);
  await mergeSort(array, middle + 1, end, updateArrayState);
  await mergeSubArrays(array, start, middle, end, updateArrayState);
}

/**
 * Partition using Lomuto partition
 * @param array array to partition
 * @param start start index of sub array
 * @param end end index of sub array
 * @param updateArrayState updateArrayState state update callback
 */
async function lomutoPartition(
  array: number[],
  start: number,
  end: number,
  updateArrayState: onArrayChangeCallBack<number>
): Promise<number> {
  const pivot = array[end];
  let pivotIndex = start - 1;
  for (let i = start; i < end; ++i) {
    if (array[i] <= pivot) {
      ++pivotIndex;
      switchElements(array, pivotIndex, i);
      updateArrayState(array);
      await sleep(WAIT_TIME);
    }
  }
  ++pivotIndex;
  switchElements(array, pivotIndex, end);
  updateArrayState(array);
  await sleep(WAIT_TIME);

  return pivotIndex;
}

/**
 * Partition using Hoare partition
 * @param array array to partition
 * @param start start index of sub array
 * @param end end index of sub array
 * @param updateArrayState updateArrayState state update callback
 */
async function hoarePartition(
  array: number[],
  start: number,
  end: number,
  updateArrayState: onArrayChangeCallBack<number>
): Promise<number> {
  const pivot = array[start];
  let i = start - 1,
    j = end + 1;

  while (true) {
    do {
      i++;
    } while (array[i] < pivot);

    do {
      j--;
    } while (array[j] > pivot);

    if (i >= j) return j;

    switchElements(array, i, j);
    updateArrayState(array);
    await sleep(WAIT_TIME);
  }
}

/**
 * Function performs an quick sort on given array
 * @param array array to sort
 * @param start start of array
 * @param end end of array (index excluded)
 * @param updateArrayState state update callback
 * @param hoare whether to use {@link hoarePartition} or {@link lomutoPartition}
 */
export async function quickSort(
  array: number[],
  start: number,
  end: number,
  updateArrayState: onArrayChangeCallBack<number>,
  hoare?: boolean
) {
  if (start >= end) {
    return;
  }

  const pivotIndex = (await hoare)
    ? await hoarePartition(array, start, end, updateArrayState)
    : await lomutoPartition(array, start, end, updateArrayState);
  await quickSort(
    array,
    start,
    hoare ? pivotIndex : pivotIndex - 1,
    updateArrayState
  );
  await quickSort(array, pivotIndex + 1, end, updateArrayState);
}
