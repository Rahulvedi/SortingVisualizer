export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, i]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, i]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([j, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([j, j]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}
export function getBubbleSortAnimation(arr) {
  // These are the values that we're comparing; we push them once
  // to change their color.
  const animations = [];
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr.length - i - 1; j++) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([j, j + 1]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([j, j + 1]);
      if (arr[j] > arr[j + 1]) {
        var temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
      animations.push([j, arr[j]]);
      animations.push([j + 1, arr[j + 1]]);
    }
  }
  return animations;
}
export function getSelectionSortAnimation(arr) {
  const animations = [];
  for (var i = 0; i < arr.length; i++) {
    let min = i;
    for (var j = i + 1; j < arr.length; j++) {
      if (arr[min] > arr[j]) {
        min = j;
      }
    }
    if (i !== min) {
      [arr[i], arr[min]] = [arr[min], arr[i]];
      animations.push([i, arr[i]]);
      animations.push([min, arr[min]]);
    }
  }
  return animations;
}
export function getInsertionSortAnimation(arr) {
  let animation = [];
  let n = arr.length;
  let i, key, j;
  for (i = 1; i < n; i++) {
    let subanimation = [];
    subanimation.push([i, arr[i]]);
    key = arr[i];
    j = i - 1;

    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      subanimation.push([j, arr[j]]);
      j = j - 1;
    }
    animation.push(subanimation);
    arr[j + 1] = key;
  }
  return animation;
}
export function getQuickSortAnimation(array, start, end) {
  if (start === undefined) {
    start = 0;
    end = array.length - 1;
  } else if (start >= end) {
    return array;
  }
  var rStart = start,
    rEnd = end;
  var pivot = array[Math.floor(Math.random() * (end - start + 1) + start)];
  while (start < end) {
    while (array[start] <= pivot) start++;
    while (array[end] > pivot) end--;
    if (start < end) {
      var temp = array[start];
      array[start] = array[end];
      array[end] = temp;
    }
  }
  getQuickSortAnimation(array, rStart, start - 1);
  getQuickSortAnimation(array, start, rEnd);
}
