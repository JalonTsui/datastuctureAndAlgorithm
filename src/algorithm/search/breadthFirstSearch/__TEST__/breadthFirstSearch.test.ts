import { Graph, Vertex } from '@data/graph/graph';
import { breadthFirstSearch as bst } from '../breadthFirstSearch';

describe('bst test', () => {
  test('bse test 01', () => {
    const graph = new Graph();
    const a = new Vertex('A');
    const b = new Vertex('B');
    const c = new Vertex('C');
    const d = new Vertex('D');
    const e = new Vertex('E');
    const f = new Vertex('F');
    const g = new Vertex('G');
    const h = new Vertex('H');
    const i = new Vertex('I');
    const list = [a, b, c, d, e, f, g, h, i];
    list.forEach(v => graph.addVertex(v));
    graph.addEdge(a, b);
    graph.addEdge(a, c);
    graph.addEdge(a, d);
    graph.addEdge(b, e);
    graph.addEdge(b, f);
    graph.addEdge(e, i);
    graph.addEdge(c, d);
    graph.addEdge(c, g);
    graph.addEdge(d, g);
    graph.addEdge(d, h);

    bst(graph, a, (v) => {
      console.log(v.toString());
    });
  });
});
