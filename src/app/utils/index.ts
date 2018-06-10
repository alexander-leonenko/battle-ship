export function omit<T extends object, K extends keyof T>(target: T, ...omitKeys: K[]): Omit<T, K> {
  return (Object.keys(target) as K[]).reduce(
    (res, key) => {
      if (!omitKeys.includes(key)) {
        res[key] = target[key];
      }
      return res;
    },
    {} as Omit<T, K>
  );
}

export function copyArray(source: any[], array: any[] = Array(source.length)) {
  let index = -1;
  const length = source.length;
  while (++index < length) {
      array[index] = source[index];
  }
  return array;
}

export function shuffleArray(array: any[], inPlace?: boolean) {
  const length = array.length;
  let index = -1;
  const lastIndex = length - 1;
  const result = inPlace ? array : copyArray(array);
  while (++index < length) {
      const rand = index + Math.floor(Math.random() * (lastIndex - index + 1));
      const value = result[rand];
      result[rand] = result[index];
      result[index] = value;
  }
  return result;
}

export function getRandomItem(items: any[]): any {
  return items[(Math.random() * items.length) << 0];
}
