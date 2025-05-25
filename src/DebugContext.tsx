import React, {createContext, useContext, useState} from 'react';

interface DebugContextType {
  debugRenderHighlight: boolean;
  toggleDebug: () => void;
  setDebug: (value: boolean) => void;
}

const DebugContext = createContext<DebugContextType | undefined>(undefined);

export const DebugProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [debugRenderHighlight, setDebugRenderHighlight] = useState(false);

  const toggleDebug = () => setDebugRenderHighlight(prev => !prev);

  const setDebug = (value: boolean) => setDebugRenderHighlight(value);

  return (
    <DebugContext.Provider
      value={{debugRenderHighlight, toggleDebug, setDebug}}>
      {children}
    </DebugContext.Provider>
  );
};

export const useDebugContext = (): DebugContextType => {
  const context = useContext(DebugContext);

  if (!context) {
    throw new Error('useDebugContext must be used within a DebugProvider');
  }

  return context;
};
