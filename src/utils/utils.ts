export function getRandomCards<T>(data: T[], count: number): T[] {
  return [...data].sort(() => Math.random() - 0.5).slice(0, count);
}

