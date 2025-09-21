function getSecureRandomInt(max: number): number {
  if (max <= 0 || !Number.isInteger(max)) {
    throw new Error("Max value must be a positive integer");
  }

  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return array[0] % max;
  }

  return Math.floor(Math.random() * max);
}

export function shuffleArray<T>(array: readonly T[]): T[] {
  if (!Array.isArray(array)) {
    throw new Error("Input must be an array");
  }

  if (Object.isFrozen(array)) {
    throw new Error("Cannot shuffle a frozen array");
  }

  if (Object.isSealed(array)) {
    throw new Error("Cannot shuffle a sealed array");
  }

  const clone = structuredClone(array);

  if (clone.length <= 1) {
    return clone;
  }
  for (let i = clone.length - 1; i > 0; i--) {
    const j = getSecureRandomInt(i + 1);

    [clone[i], clone[j]] = [clone[j], clone[i]];
  }

  return clone;
}
