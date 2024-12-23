import { AVL, BalanceFactor } from '../avl';

let avl: AVL<number>;
const balancedList = [BalanceFactor.BALANCED, BalanceFactor.SLIGHTLY_UNBALANCED_LEFT, BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT];

describe('avl test', () => {
  beforeAll(() => {
    avl = new AVL();
    const nodeValueList = [4, 6, 7, 3, 1, 3, 5, 7, 89, 1];
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

  test('aaa', () => {

  });
});
