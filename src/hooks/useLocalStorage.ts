import { useCallback } from 'react';

export function useLocalStorage() {
  const getItem = useCallback(
    (key: string) => {
      return localStorage.getItem(key) || undefined;
    },
    [localStorage],
  );

  const setItem = useCallback(
    (key: string, value: string) => {
      localStorage.setItem(key, value);
    },
    [localStorage],
  );

  const removeItem = useCallback(
    (key: string) => {
      localStorage.removeItem(key);
    },
    [localStorage],
  );

  return {
    getItem,
    setItem,
    removeItem,
  };
}
