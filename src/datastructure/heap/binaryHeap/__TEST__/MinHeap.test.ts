import { MinHeap } from '../MinHeap';

let minHeap: MinHeap;

describe('MinHeap test', () => {
  beforeAll(() => {
    minHeap = new MinHeap();
    const list = [5, 3, 1, 6, 3, 7, 2, 0, 7];
    for (const value of list) {
      minHeap.insert(value);
    }
  });

  test('find test', () => {
    expect(minHeap.findMinimum()).toBe(0);
    console.log(minHeap.heap);
  });

  test('extract test', () => {
    expect(minHeap.extract()).toBe(0);
    expect(minHeap.extract()).toBe(1);
    expect(minHeap.extract()).toBe(2);
    expect(minHeap.extract()).toBe(3);
    expect(minHeap.extract()).toBe(3);
  });

  test('size test', () => {
    expect(minHeap.size()).toBe(9);
    expect(minHeap.extract()).toBe(0);
    expect(minHeap.size()).toBe(8);
  });
});
