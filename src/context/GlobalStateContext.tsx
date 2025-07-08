// LoadingContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface GlobalContextType {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const GlobalContext = createContext<GlobalContextType>({
  isOpen: true,
  setOpen: () => {},
});

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setOpen] = useState<boolean>(true);

  const setLoading: GlobalContextType['setOpen'] = (value) => {
    setOpen(value);
  };

  return (
    <GlobalContext.Provider value={{ isOpen, setOpen: setLoading }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => useContext(GlobalContext);