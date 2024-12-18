import { Node } from './node';

export const COMPARE_FLAG = {
  LESS_HTEN: -1,
  GREATER_THEN: 1,
  EQUAL: 0,
};

export interface ComapreFn<T> {
  (n1: T, n2: T): -1 | 1 | 0;
}

interface RemoveV2ReturnType<T> { root: Node<T> | null;removeValue: T | null }

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

  remove(value: T): T | null {
    if (this.root === null) return null;
    return this._removeNode(this.root, value, null, 'left')?.value;
  }

  removeV2(value: T): RemoveV2ReturnType<T> {
    return this._removeV2(this.root, value);
  }

  /**
   * 删除方法（待优化）(穷举实现)
   * @param currentNode 当前节点
   * @param value 要删除的值
   * @param preNode 当前节点的前一个节点
   * @param nodeFlag 当前节点在前一个节点的左边还是右边
   * @returns
   */
  _removeNode(currentNode: Node<T> | null, value: T, preNode: Node<T> | null, nodeFlag: 'left' | 'right') {
    if (currentNode === null) {
      return null;
    }
    if (this.compareFn(currentNode.value, value) === COMPARE_FLAG.LESS_HTEN) {
      return this._removeNode(currentNode.right, value, currentNode, 'right');
    }
    else if (this.compareFn(currentNode.value, value) === COMPARE_FLAG.GREATER_THEN) {
      return this._removeNode(currentNode.left, value, currentNode, 'left');
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
        this._removeNode(currentNode, rightMinNode.value, preNode, 'right');
        currentNode.value = rightMinNode.value;
        return returnNode;
      }

      // 删除节点的任意一边有子节点
      if (currentNode.left === null) {
        const rightMinNode = this.getMinNode(currentNode.right!);
        this._removeNode(currentNode, rightMinNode.value, preNode, 'right');
        currentNode.value = rightMinNode.value;
        return returnNode;
      }
      else {
        const leftMaxNode = this.getMaxNode(currentNode.left!);
        this._removeNode(currentNode, leftMaxNode.value, preNode, 'left');
        currentNode.value = leftMaxNode.value;
        return returnNode;
      }
    }
  }

  /**
   * 递归删除节点，第二种实现
   * @param node 被删除树(子树)的根节点
   * @param value 要删除的值
   * @returns root：表示更新后被删除树的根节点，removeValue：删除的值
   */
  _removeV2(node: Node<T> | null, value: T): RemoveV2ReturnType<T> {
    const returnValue: RemoveV2ReturnType<T> = {
      root: node,
      removeValue: null,
    };
    if (node === null) return returnValue;
    if (this.compareFn(node.value, value) === COMPARE_FLAG.LESS_HTEN) {
      const result = this._removeV2(node.right, value);
      node.right = result.root;
      returnValue.removeValue = result.removeValue;
      return returnValue;
    }
    else if (this.compareFn(node.value, value) === COMPARE_FLAG.GREATER_THEN) {
      const result = this._removeV2(node.left, value);
      node.left = result.root;
      returnValue.removeValue = result.removeValue;
      return returnValue;
    }
    else {
      returnValue.removeValue = node.value;
      if (node.left === null && node.right === null) {
        returnValue.root = null;
        return returnValue;
      }
      if (node.left === null) {
        returnValue.root = node.right;
        return returnValue;
      }
      else if (node.right === null) {
        returnValue.root = node.left;
        return returnValue;
      }

      // 这里没有给returnValue.root赋值是因为，直接把node的值替换为后继节点的值，相当于删除了当前节点
      // todo: 可以优化，在找后继节点的过程中，必定经过其父节点，拿到其父节点将链接值赋值为null即可
      const rightMinNode = this.getMaxNode(node.right);
      node.value = rightMinNode.value;
      const result = this._removeV2(node.right, rightMinNode.value);
      node.right = result.root;
      return returnValue;
    }
  }
}
