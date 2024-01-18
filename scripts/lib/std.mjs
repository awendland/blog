export const Map_filter = (map1, predicate) => {
  const m2 = new Map();
  for (const [k, v] of map1) {
    if (predicate([k, v])) m2.set(k, v);
  }
  return m2;
};
