import { COMPARE_FLAG, defaultCompare } from '@/utils/compareUtils';
import type { CompareFn } from '@/utils/compareUtils';
import { getLeftIndex, getParentIndex, getRightIndex } from '@/utils/treeUtils';
import { swap } from '@/utils/commonUtils';

export class MinHeap<T = number> {
  compareFn: CompareFn<T>;
  heap: T[];

  constructor(fn: CompareFn<T> = defaultCompare) {
    this.compareFn = fn;
    this.heap = [];
  }

  /**
   *
   * @param value 插入值
   */
  insert(value: T) {
    if (value !== null) {
      this.heap.push(value);
      this.siftUp(this.heap.length - 1);
      return true;
    }
    return false;
  }

  /**
   * 节点向上冒泡对比方法
   * @param index 需要冒泡的节点索引
   */
  siftUp(index: number) {
    let parentIndex = getParentIndex(index);
    while (this.isIndexExist(parentIndex)
      && this.compareFn(this.heap[parentIndex!], this.heap[index]) === COMPARE_FLAG.GREATER_THAN) {
      swap(this.heap, parentIndex!, index);
      index = parentIndex!;
      parentIndex = getParentIndex(index);
    }
  }

  /**
   * 移除最小值
   */
  extract() {
    if (this.size() === 0) {
      return undefined;
    }
    if (this.size() === 1) {
      return this.heap.shift();
    }
    const returnValue = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.siftDown(0);
    return returnValue;
  }

  /**
   * 下沉比较
   * @param index 开始的索引
   */
  siftDown(index: number) {
    let current = index;
    const leftIndex = getLeftIndex(index);
    const rightIndex = getRightIndex(index);
    if (this.isIndexExist(leftIndex)
      && this.compareFn(this.heap[index], this.heap[leftIndex]) === COMPARE_FLAG.GREATER_THAN) {
      current = leftIndex;
    }
    if (this.isIndexExist(rightIndex)
      && this.compareFn(this.heap[current], this.heap[rightIndex]) === COMPARE_FLAG.GREATER_THAN) {
      current = rightIndex;
    }
    if (index !== current) {
      swap(this.heap, current, index);
      this.siftDown(current);
    }
  }

  /**
   * 返回最小值
   */
  findMinimum() {
    return this.heap[0];
  }

  /**
   * 判断索引是否存在
   * @param index
   * @returns
   */
  isIndexExist(index: number | undefined) {
    return typeof index === 'number' && index <= (this.size() - 1);
  }

  size() {
    return this.heap.length;
  }
}
