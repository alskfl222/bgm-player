import { createContext, ReactNode, useState } from 'react';

type ToastItem = { name: string; data: any };
type ToastContextType = {
  toasts: ToastItem[];
  addToast: (item: ToastItem) => void;
  removeToast: (item: ToastItem) => void;
};
export const ToastContext = createContext<ToastContextType>({
  toasts: [],
  addToast(item) {},
  removeToast(item) {},
});

export function ToastContextProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = (item: ToastItem) => {
    setToasts((toasts) => [...toasts, item]);
  };
  const removeToast = () => {
    setToasts((toasts) => toasts.slice(1));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
}
