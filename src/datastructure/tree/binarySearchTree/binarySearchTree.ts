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

  insert(value: T) {
    if (this.root === null) {
      this.root = new Node(value);
    }
    else {
      this.insertNode(this.root, value);
    }
  }

  insertNode(node: Node<T>, value: T) {
    if (this.compareFn(node.value, value) === COMPARE_FLAG.GREATER_THEN) {
      if (node.left === null) {
        node.left = new Node(value);
      }
      else {
        this.insertNode(node.left, value);
      }
    }
    else {
      if (node.right === null) {
        node.right = new Node(value);
      }
      else {
        this.insertNode(node.right, value);
      }
    }
  }

  // 中序遍历
  inOrderTraverse(node: Node<T> | null, cb: (node: Node<T>) => any) {
    if (node !== null) {
      this.inOrderTraverse(node.left, cb);
      cb(node);
      this.inOrderTraverse(node.right, cb);
    }
  }
}
