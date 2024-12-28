/**
 * 广度优先算法 BST(breadth first search)
 *
 * 应用：计算某个点到其他每个点的最短距离
 */

import { Graph, Vertex } from '@data/graph/graph';
import { initializeColor, initializeDistances, initializePrecessor, Colors } from '@/utils/graphUtils';

export const breadthFirstSearch = <T = string>(graph: Graph<T>, startVertex: Vertex<T>, cb: (v: Vertex<T>) => any) => {
  const vertices = graph.getVertices();
  const adjList = graph.getAdjList();

  if (!adjList.has(startVertex)) {
    return {};
  }

  const color = initializeColor(vertices);
  const distances = initializeDistances(vertices); // startVertex节点到指定节点的边数
  const predecessors = initializePrecessor(vertices); // 记录某个节点的前一个节点

  const queue: Vertex<T>[] = [];
  queue.push(startVertex);

  while (queue.length > 0) {
    const u = queue.shift()!;
    const neighbors = adjList.get(u)!;
    color.set(u, Colors.GREY);
    for (const w of neighbors.values()) {
      if (color.get(w) === Colors.WHITE) {
        color.set(w, Colors.GREY);
        predecessors.set(w, u);
        distances.set(w, distances.get(u)! + 1);
        queue.push(w);
      }
    }
    color.set(u, Colors.BLACK);
    if (cb) {
      cb(u);
    }
  }

  return {
    distances,
    predecessors,
  };
};
