export class Node<T = any> {
  key: T;
  left: Node | null;
  right: Node | null;

  constructor(key: T) {
    this.key = key; // 节点的值
    this.left = null; // 左边节点的值
    this.right = null; // 右边节点的值
  }
}
