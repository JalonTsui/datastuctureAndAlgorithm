import { defaultCompare, COMPARE_FLAG } from '@/utils/compareUtils';
import type { CompareFn } from '@/utils/compareUtils';
import { swap } from '@/utils/commonUtils';
import { getLeftIndex, getRightIndex } from '@/utils/treeUtils';

/**
 * 堆排序
 * @param array
 * @param compareFn
 * @returns
 */
export function heapSort<T = number>(array: T[], compareFn: CompareFn<T> = defaultCompare) {
  let heapSize = array.length;
  buildMaxHeap(array, compareFn);
  while (heapSize > 1) {
    swap(array, 0, --heapSize);
    heapify(array, 0, heapSize, compareFn);
  }
  return array;
}

/**
 * 构造最大堆方法
 * @param array
 * @param compareFn
 * @returns
 */
function buildMaxHeap<T = number>(array: T[], compareFn: CompareFn<T>) {
  // 因为后半的节点都没有左右节点，所以范围可以缩小一半
  for (let i = Math.floor(array.length / 2); i >= 0; i--) {
    heapify(array, i, array.length, compareFn);
  }
  return array;
}

/**
 * 下沉节点操作
 * @param array 需要构造成大顶堆的数组
 * @param index 构造的索引
 * @param length 下沉的边界(相当于把传入数组的length设置为传入的length)
 * @param compareFn 对比方法
 */
function heapify<T = number>(array: T[], index: number, length: number, compareFn: CompareFn<T>) {
  let current = index;
  const leftIndex = getLeftIndex(index);
  const rightIndex = getRightIndex(index);
  if (leftIndex < length
    && compareFn(array[current], array[leftIndex]) === COMPARE_FLAG.LESS_THAN
  ) {
    current = leftIndex;
  }
  if (rightIndex < length
    && compareFn(array[current], array[rightIndex]) == COMPARE_FLAG.LESS_THAN
  ) {
    current = rightIndex;
  }
  if (current !== index) {
    swap(array, current, index);
    heapify(array, current, length, compareFn);
  }
}
