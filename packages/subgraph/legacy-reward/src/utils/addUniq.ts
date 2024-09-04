export function addUniq(values: Array<string>, s: string): Array<string> {
  let new_array = ([] as string[]).concat(values);

  if (!new_array.includes(s)) {
    new_array.push(s);
  }

  return new_array;
}
