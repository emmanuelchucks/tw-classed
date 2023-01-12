function deepEqual(a: any, b: any) {
  if (a === b) return true;

  if (
    a === null ||
    typeof a !== "object" ||
    b === null ||
    typeof b !== "object"
  )
    return false;

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) return false;

  let key;
  for (let i = 0; i < keysA.length; i++) {
    key = keysA[i];
    if (
      !Object.prototype.hasOwnProperty.call(b, key) ||
      !deepEqual(a[key], b[key])
    )
      return false;
  }

  return true;
}

export const memoize = <T = any>(fn: (...args: any) => any) => {
  const cache = new Map<any, any>();
  return function (this: any, ...args: T[]) {
    let found = false;
    let result = undefined;
    cache.forEach((v, k) => {
      if (deepEqual(k, args)) {
        found = true;
        result = v;
      }
    });
    if (found) {
      return result;
    }
    result = fn.apply(this, args);
    cache.set(args, result);
    return result;
  };
};
