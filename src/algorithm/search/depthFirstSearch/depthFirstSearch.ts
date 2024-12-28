/**
 * 深度优先算法(depth first search)
 */

import { Graph, Vertex } from '@data/graph/graph';
import { initializeColor, Colors } from '@/utils/graphUtils';

type Ifn = () => any;

export const depthFirstSearch = <T = string>(graph: Graph<T>, startVertex: Vertex<T>, cb: (v: Vertex<T>) => any) => {
  const vertices = graph.getVertices();
  const adjList = graph.getAdjList();

  if (!vertices.has(startVertex)) {
    return {};
  }

  const color = initializeColor(vertices);

  const stack: Ifn[] = []; // 栈实现，也可以使用递归实现(小图可以用递归)
  stack.push(...createDfsStackFn(startVertex, color, adjList, cb, stack));

  while (stack.length > 0) {
    const fn = stack.pop()!;
    fn();
  }
};

/**
 * 生成执行栈需要执行的函数
 * @param v 需要处理的节点
 * @param color 节点访问表
 * @param adjList 节点的关系表
 * @param cb 发现后的回调方法
 * @param stack 执行栈
 * @returns [设置已访问函数，探索（发现）节点函数]
 */
export const createDfsStackFn = <T = string>(v: Vertex<T>,
  color: Map<Vertex<T>, Colors>,
  adjList: Map<Vertex<T>, Set<Vertex<T>>>,
  cb: (v: Vertex<T>) => any,
  stack: Ifn[]): Ifn[] => {
  // 探索完后把节点设置为 已访问
  const setBlack = () => {
    color.set(v, Colors.BLACK);
  };

  // 处理深度探索节点
  const handleVertex = () => {
    if (color.get(v) === Colors.WHITE) {
      color.set(v, Colors.GREY);
      if (cb) {
        cb(v);
      }
      const neighbors = adjList.get(v)!;

      for (const w of neighbors.values()!) {
        if (color.get(w) === Colors.WHITE) {
          stack.push(...createDfsStackFn(w, color, adjList, cb, stack));
        }
      }
    }
  };

  // 因为要处理完节点的后续节点才算访问完成，且深度优先是栈实现，所以要把setBlack放前面
  return [setBlack, handleVertex];
};
