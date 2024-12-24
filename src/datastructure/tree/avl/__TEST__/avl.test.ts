import { AVL, BalanceFactor } from '../avl';

let avl: AVL<number>;
const balancedList = [BalanceFactor.BALANCED, BalanceFactor.SLIGHTLY_UNBALANCED_LEFT, BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT];
const nodeValueList = [4, 6, 7, 3, 1, 3, 5, 7, 89, 1];

describe('avl test', () => {
  beforeAll(() => {
    avl = new AVL();
    for (let i = 0; i < nodeValueList.length; i++) {
      avl.insert(nodeValueList[i]);
    }
  });

  test('balance factor test', () => {
    avl.inOrderTraverse(avl.root, (node) => {
      const balanceFactor = avl.getBalanceFactor(node);
      expect(balancedList).toContain(balanceFactor);
    });
  });

  test('removeV2 test', () => {
    function checkAvl() {
      let flag = true;
      avl.inOrderTraverse(avl.root, (node) => {
        const balanceFactor = avl.getBalanceFactor(node);
        if (balancedList.indexOf(balanceFactor) < 0) {
          flag = false;
        }
      });
      return flag;
    }
    function getAvl() {
      const arr: number[] = [];
      avl.inOrderTraverse(avl.root, (node) => {
        arr.push(node.value);
      });
      return arr;
    }

    console.log(getAvl());
    expect(checkAvl()).toBe(true);

    // 每次删除完判断一次该树是否平衡
    for (let i = 0; i < nodeValueList.length; i++) {
      avl.removeV2(nodeValueList[i]);
      console.log(getAvl());
      expect(checkAvl()).toBe(true);
    }
  });
});
