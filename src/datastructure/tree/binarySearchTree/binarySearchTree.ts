import { Node } from './node';

export const COMPARE_FLAG = {
  LESS_HTEN: -1,
  GREATER_THEN: 1,
  EQUAL: 0,
};

export interface ComapreFn<T> {
  (n1: T, n2: T): -1 | 1 | 0;
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

  postOrderTraverse(node: Node<T> | null, cb: (node: Node<T>) => any) {
    if (node !== null) {
      this.postOrderTraverse(node.left, cb);
      this.postOrderTraverse(node.right, cb);
      cb(node);
    }
  }

  preOrderTraverse(node: Node<T> | null, cb: (node: Node<T>) => any) {
    if (node !== null) {
      cb(node);
      this.preOrderTraverse(node.left, cb);
      this.preOrderTraverse(node.right, cb);
    }
  }

  min() {
    if (this.root === null) return null;
    return this.getMinNode(this.root);
  }

  getMinNode(node: Node<T>) {
    let current = node;
    while (current.left !== null) {
      current = current.left;
    }
    return current;
  }

  max() {
    if (this.root === null) return null;
    return this.getMaxNode(this.root);
  }

  getMaxNode(node: Node<T>) {
    let current = node;
    while (current.right !== null) {
      current = current.right;
    }
    return current;
  }

  find(value: T): Node<T> | null {
    if (this.root === null) return null;
    return this.searchNode(this.root, value);
  }

  searchNode(node: Node<T> | null, value: T): Node<T> | null {
    if (node === null) {
      return null;
    }
    if (this.compareFn(node.value, value) === COMPARE_FLAG.LESS_HTEN) {
      return this.searchNode(node.right, value);
    }
    else if (this.compareFn(node.value, value) === COMPARE_FLAG.GREATER_THEN) {
      return this.searchNode(node.left, value);
    }
    else {
      return node;
    }
  }

  remove(value: T): Node<T> | null {
    if (this.root === null) return null;
    return this.removeNode(this.root, value, null, 'left');
  }

  /**
   * 删除方法（待优化）(穷举实现)
   * @param currentNode 当前节点
   * @param value 要删除的值
   * @param preNode 当前节点的前一个节点
   * @param nodeFlag 当前节点在前一个节点的左边还是右边
   * @returns
   */
  removeNode(currentNode: Node<T> | null, value: T, preNode: Node<T> | null, nodeFlag: 'left' | 'right') {
    if (currentNode === null) {
      return null;
    }
    if (this.compareFn(currentNode.value, value) === COMPARE_FLAG.LESS_HTEN) {
      return this.removeNode(currentNode.right, value, currentNode, 'right');
    }
    else if (this.compareFn(currentNode.value, value) === COMPARE_FLAG.GREATER_THEN) {
      return this.removeNode(currentNode.left, value, currentNode, 'left');
    }
    else {
      const returnNode = { ...currentNode };
      // 删除节点的左右皆空
      if (currentNode.left === null && currentNode.right === null) {
        if (preNode === null) {
          currentNode = null;
          return returnNode;
        }
        else {
          currentNode = null;
          preNode[nodeFlag] = null;
          return returnNode;
        }
      }

      // 删除节点的左右都有子节点
      if (currentNode.left !== null && currentNode.right !== null) {
        const rightMinNode = this.getMinNode(currentNode.right);
        this.removeNode(currentNode, rightMinNode.value, preNode, 'right');
        currentNode.value = rightMinNode.value;
        return returnNode;
      }

      // 删除节点的任意一边有子节点
      if (currentNode.left === null) {
        const rightMinNode = this.getMinNode(currentNode.right!);
        this.removeNode(currentNode, rightMinNode.value, preNode, 'right');
        currentNode.value = rightMinNode.value;
        return returnNode;
      }
      else {
        const leftMaxNode = this.getMaxNode(currentNode.left!);
        this.removeNode(currentNode, leftMaxNode.value, preNode, 'left');
        currentNode.value = leftMaxNode.value;
        return returnNode;
      }
    }
  }
}
