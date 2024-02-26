import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useContext, createContext, FC, ReactNode } from "react";

interface ILanguageContext {
  lang: string;
  getLang: () => void;
  setLang: (lang: string) => void;
  storeLang: (lang: string) => void;
}

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageContext = createContext<ILanguageContext | undefined>(
  undefined
);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const LanguageProvider: FC<LanguageProviderProps> = ({ children }) => {
  const [lang, setLang] = useState<string>("en");

  // GET LANG FROM ASYNC STORAGE
  const getLang = async () => {
    try {
      const savedLang = await AsyncStorage.getItem("lang");
      savedLang && setLang(savedLang);
    } catch (error) {
      console.error("Error while getting language:", error);
    }
  };

  // STORE LANG IN ASYNC STORAGE
  const storeLang = async (lang: string) => {
    try {
      await AsyncStorage.setItem("lang", lang);
    } catch (error) {
      console.error("Error while storing language:", error);
    } finally {
      getLang();
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, getLang, setLang, storeLang }}>
      {children}
    </LanguageContext.Provider>
  );
};
