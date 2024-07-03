// FontContext.js
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import * as Font from "expo-font";

interface IFontProviderProps {
  children: ReactNode;
}

const FontContext = createContext<boolean>(false);

export const useFonts = () => {
  return useContext(FontContext);
};

export const FontProvider = ({ children }: IFontProviderProps) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "Nunito-Regular": require("../../assets/fonts/Nunito-Regular.ttf"),
        "Nunito-Medium": require("../../assets/fonts/Nunito-Medium.ttf"),
        "Nunito-SemiBold": require("../../assets/fonts/Nunito-SemiBold.ttf"),
        "Nunito-Bold": require("../../assets/fonts/Nunito-Bold.ttf"),
        "Nunito-ExtraBold": require("../../assets/fonts/Nunito-ExtraBold.ttf"),
        "Nunito-Black": require("../../assets/fonts/Nunito-Black.ttf"),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  return (
    <FontContext.Provider value={fontsLoaded}>{children}</FontContext.Provider>
  );
};
