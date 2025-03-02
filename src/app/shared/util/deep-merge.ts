/**
 * Simple is object check.
 */
export function isObject(item: unknown) {
  return item !== null && typeof item === 'object' && !Array.isArray(item);
}

/**
 * Deep merge two objects.
 * @param target
 * @param source
 */
export function deepMerge<T>(target: T, source: T): T {
  const cloneTarget = structuredClone(target);
  const cloneSource = structuredClone(source);

  for (const key in cloneSource) {
    if (isObject(cloneSource[key]) && isObject(cloneTarget[key])) {
      cloneTarget[key] = deepMerge(cloneTarget[key], cloneSource[key]);
      continue;
    }

    cloneTarget[key] = cloneSource[key];
  }

  return cloneTarget;
}
