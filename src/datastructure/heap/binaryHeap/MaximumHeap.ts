import { swap } from '@/utils/commonUtils';
import type { CompareFn } from '@/utils/compareUtils';
import { COMPARE_FLAG, defaultCompare } from '@/utils/compareUtils';
import { getLeftIndex, getParentIndex, getRightIndex } from '@/utils/treeUtils';

export class MaximumHeap<T = number> {
  compareFn: CompareFn<T>;
  heap: T[];

  constructor(fn: CompareFn<T> = defaultCompare) {
    this.compareFn = fn;
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  isEmpty() {
    return this.size() === 0;
  }

  insert(value: T) {
    if (value !== null) {
      this.heap.push(value);
      this.siftUp(this.heap.length - 1);
    }
    return false;
  }

  siftUp(index: number) {
    let parentIndex = getParentIndex(index);
    while (this.isIndexExist(parentIndex)
      && this.compareFn(this.heap[parentIndex!], this.heap[index]) === COMPARE_FLAG.LESS_THAN) {
      swap(this.heap, parentIndex!, index);
      index = parentIndex!;
      parentIndex = getParentIndex(index);
    }
  }

  isIndexExist(index: number | undefined) {
    return typeof index === 'number' && index < this.size() - 1;
  }

  findMaximum() {
    return this.heap[0];
  }

  extract() {
    if (this.size() === 0) {
      return undefined;
    }
    if (this.size() === 0) {
      return this.heap.shift();
    }
    const returnValue = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.siftDown(0);
    return returnValue;
  }

  siftDown(index: number) {
    let current = index;
    const leftIndex = getLeftIndex(current);
    const rightIndex = getRightIndex(current);
    if (this.isIndexExist(leftIndex)
      && this.compareFn(this.heap[current], this.heap[leftIndex]) === COMPARE_FLAG.LESS_THAN) {
      current = leftIndex;
    }
    if (this.isIndexExist(rightIndex)
      && this.compareFn(this.heap[current], this.heap[rightIndex]) === COMPARE_FLAG.LESS_THAN) {
      current = rightIndex;
    }
    if (current !== index) {
      swap(this.heap, current, index);
      this.siftDown(current);
    }
  }
}
