import type { CompareFn } from '@/utils/compareUtils';
import { defaultCompare } from '@/utils/compareUtils';

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

  insert() {}

  findMaximum() {}

  extract() {}
}
