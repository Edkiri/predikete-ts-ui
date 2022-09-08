import { useState } from 'react';

type UseLocalStorageResponse<T> = {
  storedValue: T | undefined;
  setLocalStorage: (value: T | undefined) => void;
};

export const useLocalStorage = <T>(
  key: string,
  initialValue?: T | undefined,
): UseLocalStorageResponse<T> => {
  const [storedValue, setStoredValue] = useState((): T | undefined => {
    try {
      const item = window.localStorage.getItem(key);
      return item !== null ? JSON.parse(item) : initialValue;
    } catch (e) {
      return initialValue;
    }
  });

  const setLocalStorage = (value: T | undefined) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      setStoredValue(value);
    } catch (e) {
      console.error(e);
    }
  };

  return { storedValue, setLocalStorage };
};
