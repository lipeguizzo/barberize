import { toast } from 'react-toastify';
import { formatErrorForNotification } from '../utils/error';

export function useLocalStorage<T>(key: string, defaultValue: T) {
  function setItem(value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      toast.error(formatErrorForNotification(error));
    }
  }

  function getItem(): T {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : '';
    } catch (error) {
      toast.error(formatErrorForNotification(error));
      return defaultValue;
    }
  }

  function removeItem(): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      toast.error(formatErrorForNotification(error));
    }
  }

  function clear(): void {
    localStorage.clear();
  }

  return { setItem, getItem, removeItem, clear };
}
