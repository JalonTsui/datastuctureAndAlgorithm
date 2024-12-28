/**
 * 广度优先算法 BST(breadth first search)
 */

import { Graph, Vertex } from '@data/graph/graph';

export enum Colors {
  WHITE, // 未访问
  GREY, // 已发现
  BLACK, // 已访问
}

// 初始化访问节点为 未访问
export const initializeColor = <T>(vertices: Set<T> | T[]): Map<T, Colors> => {
  const color: Map<T, Colors> = new Map();
  vertices.forEach((vertex: T) => color.set(vertex, Colors.WHITE));
  return color;
};

export const breadthFirstSearch = <T = string>(graph: Graph<T>, startVertex: Vertex<T>, cb: (v: Vertex<T>) => any) => {
  const vertices = graph.getVertices();
  const adjList = graph.getAdjList();

  if (!adjList.has(startVertex)) {
    return;
  }

  const color = initializeColor(vertices);
  const queue: Vertex<T>[] = [];
  queue.push(startVertex);

  while (queue.length > 0) {
    const u = queue.shift()!;
    const neighbors = adjList.get(u)!;
    color.set(u, Colors.GREY);
    for (const w of neighbors.values()) {
      if (color.get(w) === Colors.WHITE) {
        color.set(w, Colors.GREY);
        queue.push(w);
      }
    }
    color.set(u, Colors.BLACK);
    if (cb) {
      cb(u);
    }
  }
};
