export function getPersistedJSON<T>(key: string, fallback: T): T {
  const savedData = localStorage.getItem(key);
  if (!savedData) return fallback;

  try {
    return JSON.parse(savedData) as T;
  } catch {
    // remove corrupted/stale JSON — don't let a bad cached value keep failing forever
    localStorage.removeItem(key);
    return fallback;
  }
}

export function setPersistedJSON<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function setPersistedString(key: string, value: string) {
  localStorage.setItem(key, value);
}
