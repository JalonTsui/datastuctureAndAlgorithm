import type { CompareFn } from '@/utils/compareUtils';
import { BinarySearchTree } from '@tree/binarySearchTree';
import { defaultCompare } from '@/utils/compareUtils';
import { Node } from '@tree/common/node';

// Adelson-Velskii-Landi Tree
export class AVL<T = number> extends BinarySearchTree<T> {
  constructor(compareFn: CompareFn<T> = defaultCompare) {
    super(compareFn);
  }

  getNodeHight(node: Node<T> | null) {
    if (node === null) {
      return -1;
    }
    return Math.max(this.getNodeHight(node.left), this.getNodeHight(node.right)) + 1;
  }
}
