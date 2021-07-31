// Not the best algorithm, but enough for the project

export const shuffleElements = <T>(array: readonly T[]) =>
  array.slice().sort(() => Math.random() - 0.5);
