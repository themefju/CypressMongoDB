export function defaults(args: any, ...sources: object[]) {
  const result = structuredClone(args);
  sources.forEach((source) => {
    if (source) {
      for (const key in source) {
        result[key] = source[key];
      }
    }
  });

  return result;
}
