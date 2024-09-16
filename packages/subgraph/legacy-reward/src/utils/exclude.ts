export function exclude(values: Array<string>, s: string): Array<string> {
  let new_array = new Array<string>();

  for (let i = 0; i < values.length; i++) {
    if (values[i] != s) new_array.push(values[i]);
  }

  return new_array;
}
