import { Vertex } from './vertex';

export class Graph<T = string> {
  isDirected: boolean;
  vertices: Set<Vertex<T>> = new Set(); // 节点
  adjList: Map<Vertex<T>, Set<Vertex<T>>> = new Map(); // 节点的连接表

  constructor(isDirected: boolean = false) {
    this.isDirected = isDirected;
  }

  addVertex(node: Vertex<T>) {
    if (!this.vertices.has(node)) {
      this.vertices.add(node);
      this.adjList.set(node, new Set());
    }
  }

  addEdge(n1: Vertex<T>, n2: Vertex<T>) {
    if (!this.adjList.get(n1)) {
      this.addVertex(n1);
    }
    if (!this.adjList.get(n2)) {
      this.addVertex(n2);
    }
    this.adjList.get(n1)!.add(n2);
    if (!this.isDirected) {
      this.adjList.get(n2)!.add(n1);
    }
  }

  getVertices(): Set<Vertex<T>> {
    return this.vertices;
  }

  getAdjList(): Map<Vertex<T>, Set<Vertex<T>>> {
    return this.adjList;
  }

  toString() {
    let str = '';
    str += 'Graph[\n';
    this.vertices.forEach((key) => {
      const vertexRelation = this.adjList.get(key);
      if (vertexRelation) {
        str += `  ${key.toString()} -> `;
        vertexRelation.forEach((rKey) => {
          str += rKey.toString() + ' ';
        });
        str += '\n';
      }
    });
    str += ']';
    return str;
  }
}
