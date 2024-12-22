import type { CompareFn } from '@/utils/compareUtils';
import type { TEmpty } from '@/types';
import { BinarySearchTree } from '@tree/binarySearchTree';
import { defaultCompare } from '@/utils/compareUtils';
import { Node } from '@tree/common/node';

const BalanceFactor = {
  UNBALANCED_RIGHT: 1,
  SLIGHTLY_UNBALANCED_RIGHT: 2,
  BALANCED: 3,
  SLIGHTLY_UNBALANCED_LEFT: 4,
  UNBALANCED_LEFT: 5,
};

// Adelson-Velskii-Landi Tree
export class AVL<T = number> extends BinarySearchTree<T> {
  constructor(compareFn: CompareFn<T> = defaultCompare) {
    super(compareFn);
  }

  getNodeHight(node: Node<T> | TEmpty) {
    if (!node) {
      return -1;
    }
    return Math.max(this.getNodeHight(node.left), this.getNodeHight(node.right)) + 1;
  }

  /**
   * 获取节点的平衡因子
   * @param node
   * @returns
   */
  getBalanceFactor(node: Node<T> | TEmpty) {
    const heightDiff = this.getNodeHight(node?.left) - this.getNodeHight(node?.right);
    switch (heightDiff) {
      case -2: {
        return BalanceFactor.UNBALANCED_RIGHT;
      };
      case -1: {
        return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT;
      };
      case 1: {
        return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT;
      };
      case 2: {
        return BalanceFactor.UNBALANCED_LEFT;
      };
      default: {
        return BalanceFactor.BALANCED;
      };
    }
  }
}
