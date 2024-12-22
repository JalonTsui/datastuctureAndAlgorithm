import { AVL } from '../avl';

let avl: AVL<number>;

describe('avl test', () => {
  beforeAll(() => {
    avl = new AVL();
    const nodeValueList = [4, 6, 7, 3, 1, 3, 5, 7, 89, 1];
    for (let i = 0; i < nodeValueList.length; i++) {
      avl.insert(nodeValueList[i]);
    }
  });

  test('getNodeHeight test', () => {
    const treeHeight = avl.getNodeHight(avl.root);
    expect(treeHeight).toBe(4);
    console.log(treeHeight);
  });
});
