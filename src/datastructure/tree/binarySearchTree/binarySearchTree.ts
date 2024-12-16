import { Node } from './node';

export const COMPARE_FLAG = {
  LESS_HTEN: -1,
  GREATER_THEN: 1,
};

export interface ComapreFn<T> {
  (n1: T, n2: T): -1 | 1;
}

export class BinarySearchTree<T = any> {
  root: Node<T> | null;
  compareFn: ComapreFn<T>;

  constructor(compareFn: ComapreFn<T>) {
    this.root = null;
    this.compareFn = compareFn;
  }

  insert(key: T) {
    if (this.root === null) {
      this.root = new Node(key);
    }
    else {
      this.insertNode(this.root, key);
    }
  }

  insertNode(node: Node<T>, key: T) {
    if (this.compareFn(node.key, key) === COMPARE_FLAG.GREATER_THEN) {
      if (node.left === null) {
        node.left = new Node(key);
      }
      else {
        this.insertNode(node.left, key);
      }
    }
    else {
      if (node.right === null) {
        node.right = new Node(key);
      }
      else {
        this.insertNode(node.right, key);
      }
    }
  }
}
