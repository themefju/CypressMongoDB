export function defaults(options, ...sources) {
  sources.forEach((source) => {
    if (source) {
      for (const key in source) {
        options[key] = source[key];
      }
    }
  });

  return options;
}
