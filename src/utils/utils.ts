export function getRandomCards<T>(data: readonly T[], count: number): T[] {
  return [...data].sort(() => Math.random() - 0.5).slice(0, count);
}

export function getRandomUniqueInteger(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


