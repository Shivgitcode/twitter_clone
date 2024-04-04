import { SetStateAction, createContext, useContext, useState } from "react";
import Cookies from "js-cookie"


interface ValueProp {
  loading: boolean;
  setLoading: React.Dispatch<SetStateAction<boolean>>;
  isLoggedIn:string
  setIsLoggedIn:React.Dispatch<SetStateAction<string>>
  
}

export const AppContext = createContext<ValueProp | undefined>(undefined);

export default function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn,setIsLoggedIn]=useState(Cookies.get("jwt") as string)

  const value = {
    loading,
    setLoading,
    isLoggedIn,setIsLoggedIn
    
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
