export function swap(arr: unknown[], i1: number, i2: number) {
  const temp = arr[i1];
  arr[i1] = arr[i2];
  arr[i2] = temp;
}
