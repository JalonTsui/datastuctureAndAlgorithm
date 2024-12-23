import type { CompareFn } from '@/utils/compareUtils';
import type { TEmpty } from '@/types';
import { BinarySearchTree, COMPARE_FLAG } from '@tree/binarySearchTree';
import { defaultCompare } from '@/utils/compareUtils';
import { Node } from '@tree/common/node';

export const BalanceFactor = {
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
    return (
      Math.max(this.getNodeHight(node.left), this.getNodeHight(node.right)) + 1
    );
  }

  /**
   * 获取节点的平衡因子
   * @param node
   * @returns
   */
  getBalanceFactor(node: Node<T> | TEmpty) {
    const heightDiff
      = this.getNodeHight(node?.left) - this.getNodeHight(node?.right);
    switch (heightDiff) {
      case -2: {
        return BalanceFactor.UNBALANCED_RIGHT;
      }
      case -1: {
        return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT;
      }
      case 1: {
        return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT;
      }
      case 2: {
        return BalanceFactor.UNBALANCED_LEFT;
      }
      default: {
        return BalanceFactor.BALANCED;
      }
    }
  }

  rotationLL(node: Node<T>) {
    const tmp = node.left!;
    node.left = tmp.right;
    tmp.right = node;
    return tmp;
  }

  rotationRR(node: Node<T>) {
    const tmp = node.right!;
    node.right = tmp.left;
    tmp.left = node;
    return tmp;
  }

  rotationLR(node: Node<T>) {
    node.left = this.rotationRR(node.left!);
    return this.rotationLL(node);
  }

  rotationRL(node: Node<T>) {
    node.right = this.rotationLL(node.right!);
    return this.rotationRR(node);
  }

  insert(value: T) {
    this.root = this.insertNode(this.root, value);
  }

  insertNode(node: Node<T> | null, value: T): Node<T> {
    if (node === null) {
      return new Node(value);
    }
    else if (this.compareFn(node.value, value) === COMPARE_FLAG.GREATER_THEN) {
      node.left = this.insertNode(node.left, value);
    }
    else {
      node.right = this.insertNode(node.right, value);
    }
    const balanceFactor = this.getBalanceFactor(node);
    if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
      if (this.compareFn(node.left!.value, value) === COMPARE_FLAG.GREATER_THEN) {
        node = this.rotationLL(node);
      }
      else {
        return this.rotationLR(node);
      }
    }
    if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
      if (this.compareFn(node.right!.value, value) === COMPARE_FLAG.LESS_HTEN) {
        node = this.rotationRR(node);
      }
      else {
        return this.rotationRL(node);
      }
    }
    return node;
  }
}
