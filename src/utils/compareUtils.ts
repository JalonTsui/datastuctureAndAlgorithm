type CompareResultType = 1 | -1 | 0;

export const COMPARE_FLAG = {
  LESS_THAN: -1,
  GREATER_THAN: 1,
  EAUQL: 0,
};

export function defaultCompare<T = number>(o1: T, o2: T): CompareResultType {
  return o1 > o2 ? 1 : o1 < o2 ? -1 : 0;
}

export interface CompareFn<T> {
  (o1: T, o2: T): CompareResultType;
}
