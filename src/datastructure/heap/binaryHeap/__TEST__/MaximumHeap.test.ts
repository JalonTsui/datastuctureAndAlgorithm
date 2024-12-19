import { MaximumHeap } from '../MaximumHeap';
let maxHeap: MaximumHeap;
const list = [3, 6, 2, 7, 4, 5, 10, 23, 12];

describe('MaximumHeap test', () => {
  beforeAll(() => {
    maxHeap = new MaximumHeap();
    for (const value of list) {
      maxHeap.insert(value);
    }
  });

  test('insert test', () => {
    expect(maxHeap.size()).toBe(list.length);
  });

  test('findMaximum test', () => {
    expect(maxHeap.findMaximum()).toBe(23);
  });

  test('extract test', () => {
    expect(maxHeap.extract()).toBe(23);
    expect(maxHeap.extract()).toBe(12);
    expect(maxHeap.extract()).toBe(10);
  });
});
