import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  TextInput,
  Platform,
  Keyboard,
} from "react-native";
import Checkbox from "expo-checkbox";
import React, { useRef, useState } from "react";
import axios from "axios";
import { useUserContext } from "../contexts/UserContext";
import { showToast } from "../utils/Toasts";
import * as ImagePicker from "expo-image-picker";
import colors from "../constants/colors";
import PersonalInfo from "./PersonalInfo";
import PersonalInfo2 from "../components/PersonalInfo2";

const defaultUserInfo = {
  avatar: "",
  username: "",
  birthdate: {
    day: "",
    month: "",
    year: "",
  },
  birthdatePrivate: false,
  bio: "",
};

interface UserInfo {
  birthdate: {
    day: string;
    month: string;
    year: string;
  };
}

const SignUpProcess = ({ navigation }: any) => {
  const [step, setStep] = useState(1);
  const [userInfo, setUserInfo] = useState(defaultUserInfo);
  const [isBirthdatePrivate, setIsBirthdatePrivate] = useState(false);
  const [accountType, setAccountType] = useState("reader");
  const { dispatch } = useUserContext();
  const [selectedImage, setSelectedImage] = useState("");
  const avatar = selectedImage
    ? "data:image/jpeg;base64," + selectedImage
    : "https://source.unsplash.com/random/?woman";

  const handleClick = async () => {
    setStep(step + 1);
    try {
      dispatch({
        type: "UPDATE_FIELD",
        payload: {
          field: "personalInfo",
          value: {
            ...userInfo,
            avatar: selectedImage,
            birthdatePrivate: isBirthdatePrivate,
            accountType,
          },
        },
      });
      navigateToNext();
    } catch (e) {
      console.error(e);
    }
  };

  const navigateToNext = () => {
    navigation.navigate("ReadingProfile1");
  };

  return (
    <View style={styles.page}>
      <PersonalInfo2 />
      <Pressable onPress={handleClick} style={styles.btnPrimary}>
        <Text style={styles.btnText}>{step === 5 ? "Done" : "Next"}</Text>
      </Pressable>
    </View>
  );
};

export default SignUpProcess;

const styles = StyleSheet.create({
  slash: {
    fontSize: 20,
    margin: 10,
  },
  page: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    justifyContent: "space-between",
    height: "100%",
    flex: 1,
    backgroundColor: colors.light.primary,
  },
  imgContainer: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    width: "40%",
    aspectRatio: 1 / 1,
    borderRadius: 200,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
    fontSize: 16,
  },
  halfWidth: {
    width: "50%",
  },
  checkboxContainer: {
    // width: "50%",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  checkbox: {
    borderRadius: 100,
  },
  twoColContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 20,
  },
  btnPrimary: {
    width: "100%",
    backgroundColor: "teal",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 50,
    display: "flex",
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontSize: 20,
  },
  litMatchBtn: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bgOrangeLight: {
    backgroundColor: "rgba(255, 222, 173, .5)",
  },
  fs20: {
    fontSize: 20,
  },
  mb15: {
    marginBottom: 15,
  },
  ...Platform.select({
    android: {
      pageLayout: {
        paddingHorizontal: 25,
        paddingVertical: 50,
        display: "flex",
        justifyContent: "space-between",
        height: "100%",
        flex: 1,
      },
    },
  }),
});
