import Toast from "react-native-toast-message";

interface IToastProps {
  type: "success" | "error" | "info";
  headline: string;
  message?: string;
}

export const showToast = ({ type, headline, message }: IToastProps) => {
  Toast.show({
    type: type,
    text1: headline,
    text2: message,
    swipeable: true,
    visibilityTime: 5000,
    topOffset: 100,
  });
};
