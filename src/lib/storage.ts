import { useEffect, useState } from 'react';

/**
 * State mirrored into localStorage. Storage can be unavailable (private mode,
 * blocked site data), so every access is guarded and falls back to memory.
 */
export function usePersistentState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage unavailable — keep working from memory */
    }
  }, [key, value]);

  return [value, setValue] as const;
}

export function clearPersistentState(key: string) {
  try {
    window.localStorage.removeItem(key);
  } catch {
    /* nothing to clear */
  }
}
