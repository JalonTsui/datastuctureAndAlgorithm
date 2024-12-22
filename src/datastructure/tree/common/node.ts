export class Node<T = any> {
  value: T;
  left: Node<T> | null;
  right: Node<T> | null;

  constructor(value: T) {
    this.value = value; // 节点的值
    this.left = null; // 左边节点的值
    this.right = null; // 右边节点的值
  }
}
