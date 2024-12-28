import { Graph } from '../graph';
import { Vertex } from '../vertex';

describe('graph test', () => {
  test('graph test 01', () => {
    const graph = new Graph();
    const a = new Vertex('A');
    const b = new Vertex('B');
    const c = new Vertex('C');
    const d = new Vertex('D');
    const e = new Vertex('E');
    const f = new Vertex('F');
    const _nodeList = [a, b, c, d, e, f];
    _nodeList.forEach(node => graph.addVertex(node));
    graph.addEdge(a, b);
    graph.addEdge(a, c);
    graph.addEdge(a, e);
    graph.addEdge(b, d);
    graph.addEdge(b, f);
    graph.addEdge(e, f);
    console.log(graph.toString());
  });
});
