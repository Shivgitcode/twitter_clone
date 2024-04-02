import { SetStateAction, createContext, useContext, useState } from "react";

interface ValueProp {
  loading: boolean;
  setLoading: React.Dispatch<SetStateAction<boolean>>;
}

export const AppContext = createContext<ValueProp | undefined>(undefined);

export default function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  const value = {
    loading,
    setLoading,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (typeof context === "undefined") {
    throw new Error("this is undefined");
  }

  return context;
};
