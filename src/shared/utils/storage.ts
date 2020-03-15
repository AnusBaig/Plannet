import { Maybe } from "@dimelo/global";

const storage = window.localStorage;

type Value = object | number | string | Date;

function set(key: string, value: Value): void {
  const data = JSON.stringify(value);
  storage.setItem(key, data);
}

function get<T extends Value>(key: string): Maybe<T> {
  let value = null;

  try {
    const savedItem = storage.getItem(key);

    if (!savedItem) return null;

    value = JSON.parse(savedItem);
  } catch (error) {
    return null;
  }

  return value;
}

function remove(key: string) {
  storage.removeItem(key);
}

export default { get, set, remove, clear: storage.clear.bind(storage) };
