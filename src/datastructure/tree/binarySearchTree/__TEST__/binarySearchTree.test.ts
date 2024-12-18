import { BinarySearchTree } from '../binarySearchTree';

const bst = new BinarySearchTree<number>((n1, n2) => {
  return n1 > n2 ? 1 : n1 < n2 ? -1 : 0;
});

describe('binary search tree test', () => {
  beforeAll(() => {
    const valueList = [3, 6, 5, 8, 10, 9, 7, 12, 14, 13, 18, 25, 20, 15, 11];
    for (const value of valueList) {
      bst.insert(value);
    }
  });

  test('binary seach tree create', () => {
    console.log(bst);
    expect(bst.root!.value).toBe(3);
  });

  test('inOrderTraserve', () => {
    const list: number[] = [];
    let index = 0;
    // 中序遍历bst得到的结果为应该从小到大
    bst.inOrderTraverse(bst.root, (node) => {
      if (list.length > 0) {
        expect(node.value).toBeGreaterThan(list[index - 1]);
      }
      list[index++] = node.value;
    });
    console.log(list);
  });

  test('findNode', () => {
    console.log(bst.find(20));
    expect(bst.find(20)?.value).toBe(20);
    expect(bst.find(1)).toBeNull();
  });

  test('removeNode', () => {
    const list: number[] = [];
    bst.remove(0);
    bst.remove(6);
    expect(bst.find(6)).toBeNull();

    bst.remove(5);
    expect(bst.find(5)).toBeNull();

    bst.remove(10);
    expect(bst.find(10)).toBeNull();

    bst.remove(15);
    expect(bst.find(15)).toBeNull();

    bst.inOrderTraverse(bst.root, (node) => {
      list.push(node.value);
    });
    console.log(list);
  });

  test('removeV2', () => {
    const list: number[] = [];
    bst.removeV2(0);
    bst.removeV2(6);
    expect(bst.find(6)).toBeNull();

    bst.removeV2(5);
    expect(bst.find(5)).toBeNull();

    bst.removeV2(10);
    expect(bst.find(10)).toBeNull();

    bst.removeV2(15);
    expect(bst.find(15)).toBeNull();

    bst.inOrderTraverse(bst.root, (node) => {
      list.push(node.value);
    });
    console.log(list);
  });
});
