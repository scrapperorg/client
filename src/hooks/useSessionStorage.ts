import { useCallback } from 'react';

export function useSessionStorage() {
  const getItem = useCallback(
    (key: string) => {
      return sessionStorage.getItem(key) || undefined;
    },
    [sessionStorage],
  );

  const setItem = useCallback(
    (key: string, value: string) => {
      sessionStorage.setItem(key, value);
    },
    [sessionStorage],
  );

  const removeItem = useCallback(
    (key: string) => {
      sessionStorage.removeItem(key);
    },
    [sessionStorage],
  );

  return {
    getItem,
    setItem,
    removeItem,
  };
}
