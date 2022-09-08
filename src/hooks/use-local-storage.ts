import { useState } from 'react';

type UseLocalStorageResponse<T> = {
  storedValue: T | null;
  setLocalStorage: (value: T | null) => void;
};

export const useLocalStorage = <T>(
  key: string,
  initialValue?: T | null,
): UseLocalStorageResponse<T> => {
  const [storedValue, setStoredValue] = useState((): T | null => {
    try {
      const item = window.localStorage.getItem(key);
      return item !== null ? JSON.parse(item) : initialValue;
    } catch (e) {
      if (initialValue === undefined) {
        return null;
      }
      return null;
    }
  });

  const setLocalStorage = (value: T | null) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      setStoredValue(value);
    } catch (e) {
      console.error(e);
    }
  };

  return { storedValue, setLocalStorage };
};
