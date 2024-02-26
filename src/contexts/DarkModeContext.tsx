import {
  FC,
  useState,
  ReactNode,
  useEffect,
  useContext,
  createContext,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface IDarkModeContext {
  isDarkMode: boolean;
  storeDarkMode: (value: boolean) => void;
}

interface DarkModeProviderProps {
  children: ReactNode;
}

const DarkModeContext = createContext<IDarkModeContext | undefined>(undefined);

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }
  return context;
};

export const DarkModeProvider: FC<DarkModeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // GET DARK MODE FROM ASYNC STORAGE
  const getDarkMode = async () => {
    try {
      const savedMode = await AsyncStorage.getItem("darkMode");
      savedMode && setIsDarkMode(JSON.parse(savedMode));
    } catch (error) {
      console.error("Error while getting dark mode:", error);
    }
  };

  useEffect(() => {
    getDarkMode();
  }, []);

  // STORE DARK MODE IN ASYNC STORAGE
  const storeDarkMode = async (value: boolean) => {
    try {
      await AsyncStorage.setItem("darkMode", JSON.stringify(value));
      setIsDarkMode(value);
    } catch (error) {
      console.error("Error while storing dark mode:", error);
    }
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, storeDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
