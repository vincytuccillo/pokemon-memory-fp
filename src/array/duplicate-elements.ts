export const duplicateElements = <T>(array: readonly T[]) => [
  ...array,
  ...array,
];
