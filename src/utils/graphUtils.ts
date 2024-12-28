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

export const initializeDistances = <T>(vertices: Set<T> | T[]): Map<T, number> => {
  const distances: Map<T, number> = new Map();
  vertices.forEach((vertex: T) => distances.set(vertex, 0));
  return distances;
};

export const initializePrecessor = <T>(vertices: Set<T> | T[]): Map<T, T | null> => {
  const precessor: Map<T, T | null> = new Map();
  vertices.forEach((vertex: T) => precessor.set(vertex, null));
  return precessor;
};
