/**
 * 二叉树可以用数组表示
 * 假设一个节点的索引是index则有以下公式：
 * 左侧节点：2 * index + 1
 * 右侧节点：2 * index + 2
 * 父节点：(index - 1) / 2 向下取整
 */
export function getLeftIndex(index: number) {
  return 2 * index + 1;
}

export function getRightIndex(index: number) {
  return 2 * index + 2;
}

export function getParentIndex(index: number) {
  if (index === 0) {
    return undefined;
  }
  return Math.floor((index - 1) / 2);
}
