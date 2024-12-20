import { heapSort } from '../heapSort';

describe('heapSort test', () => {
  test('heapSort test', () => {
    const arr = [8, 1, 5, 3, 7, 0, 9, 4, 3, 1, 4];
    heapSort(arr);
    console.log(arr);
  });
});
