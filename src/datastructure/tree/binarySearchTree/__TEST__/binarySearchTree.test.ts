import { BinarySearchTree } from '../binarySearchTree';

const bst = new BinarySearchTree<number>((n1, n2) => {
  return n1 > n2 ? 1 : -1;
});

describe('binary search tree test', () => {
  beforeAll(() => {
    const valueList = [11, 7, 15, 5, 3, 9, 8, 10, 13, 12, 14, 20, 18, 25];
    for (const value of valueList) {
      bst.insert(value);
    }
  });

  test('binary seach tree create', () => {
    console.log(bst);
    expect(bst.root!.value).toBe(11);
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
});
