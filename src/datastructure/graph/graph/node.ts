export class Vertex<T = string> {
  value: T;

  constructor(value: T) {
    this.value = value;
  }

  toString() {
    return `${this.value}`;
  }
}
