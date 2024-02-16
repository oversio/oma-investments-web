import { useState } from "react";

// Try to parse the item as JSON, if it fails, return the item as is
const parseItem = <T>(item: string): T => {
  try {
    return JSON.parse(item) as T;
  } catch (error) {
    return item as T;
  }
};

/**
 * The useLocalStorage hook is a custom hook that allows you to store a value in the local storage
 * and keep it in sync with the state.
 */
export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    // If there is no window object, return the initial value
    if (typeof window === "undefined") return initialValue;

    const item = window.localStorage.getItem(key);
    return item ? parseItem<T>(item) : initialValue;
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return [storedValue, setValue] as const;
};
