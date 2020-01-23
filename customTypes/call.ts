const result = Array.prototype.map.call<
  number[],
  [(item: number) => string],
  string[]
>([1, 2, 3], item => item.toFixed(1));

// [1, 2, 3].map(item => item.toFixed(1));
