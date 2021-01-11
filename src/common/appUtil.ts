export type onChangeCallBack<T> = (value: T) => void;
export type onArrayChangeCallBack<T> = (array: T[]) => void;

/**
 * Util function used to switch two elements in an array
 * @param array array in which to switch elements
 * @param firstIndex first index to switch
 * @param secondIndex second index to switch
 */
export function switchElements<T>(
  array: T[],
  firstIndex: number,
  secondIndex: number
) {
  const temp = array[firstIndex];
  array[firstIndex] = array[secondIndex];
  array[secondIndex] = temp;
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Generates array of length n with values same as index
 */
export function generateArray() {
  return Array.from(Array(100).keys());
}

/**
 * Performs a simple Fisher–Yates shuffle
 * @param array array to shuffle
 */
export function shuffleArray<T>(array: T[]) {
  let index = array.length - 1;
  while (index) {
    const randIndex = Math.floor(Math.random() * index--);

    switchElements(array, randIndex, index);
  }

  return array;
}

/**
 * Helper function which generates a shuffled array
 */
export function generateShuffledArray() {
  return shuffleArray(generateArray());
}
