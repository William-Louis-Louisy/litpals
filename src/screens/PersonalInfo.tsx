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
import React, { useEffect, useRef, useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import DatePicker from "react-native-date-picker";
import axios from "axios";
import Config from "react-native-config";
import { useUserContext } from "../contexts/UserContext";
import { showToast } from "../utils/Toasts";
import * as ImagePicker from "expo-image-picker";
import { any } from "prop-types";
import colors from "../constants/colors";

const defaultUserInfo = {
  avatar: "",
  username: "",
  birthdate: {
    day: "",
    month: "",
    year: "",
  },
  birthdatePrivate: false,
  accountType: "reader",
  litMatchEnabled: false,
};

interface UserInfo {
  birthdate: {
    day: string;
    month: string;
    year: string;
  };
}

const PersonalInfo = ({ navigation }: any) => {
  const [userInfo, setUserInfo] = useState(defaultUserInfo);
  const [isBirthdatePrivate, setIsBirthdatePrivate] = useState(false);
  const [isLitMatchEnabled, setIsLitMatchEnabled] = useState(false);
  const [accountType, setAccountType] = useState("reader");
  const { dispatch } = useUserContext();
  const dayRef = useRef(null);
  const monthRef = useRef(null);
  const yearRef = useRef(null);
  const accountTypes = [
    { label: "Reader", value: "reader" },
    { label: "Author", value: "author" },
    { label: "Content creator", value: "content-creator" },
    { label: "Book merch maker", value: "merch-maker" },
  ];
  const [selectedImage, setSelectedImage] = useState("");
  const avatar = selectedImage
    ? "data:image/jpeg;base64," + selectedImage
    : "https://source.unsplash.com/random/?woman";

  const handleClick = async () => {
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
            litMatchEnabled: isLitMatchEnabled,
          },
        },
      });
      navigateToNext();
    } catch (e) {
      console.error(e);
    }
  };

  const navigateToNext = () => {
    if (isLitMatchEnabled) navigation.navigate("MeetingProfile");
    else navigation.navigate("ReadingProfile1");
  };

  const validateUsername = async () => {
    if (userInfo.username.length < 1) {
      showToast({
        type: "error",
        headline: "Please choose a username",
        message: "This is a required field, please enter a value.",
      });
    }
    try {
      const usernameAlreadyExists = await axios.get(
        "http://192.168.0.49:5000/check-username",
        { params: { username: userInfo.username } }
      );
      if (!usernameAlreadyExists.data.isAvailable) {
        showToast({
          type: "error",
          headline: "This username is already taken",
          message: "Please choose another one.",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBackspace = (e: any, value: keyof UserInfo["birthdate"]) => {
    if (!userInfo.birthdate[value] && e.nativeEvent.key === "Backspace") {
      if (value === "month") dayRef.current.focus();
      else if (value === "year") monthRef.current.focus();
    }
  };

  const handleBirthdateChange = (e: any, value: string) => {
    if ((value === "day" || value === "month") && e.length === 2) {
      if (value === "day") monthRef.current.focus();
      else if (value === "month") yearRef.current.focus();
    } else if (value === "year" && e.length === 4) Keyboard.dismiss();
  };

  const validateBirthdate = () => {
    const year = Number(userInfo.birthdate.year);
    const month = Number(userInfo.birthdate.month) - 1;
    const day = Number(userInfo.birthdate.day);
    const date: Date = new Date(Date.UTC(year, month, day));
    if (
      date.getUTCFullYear() !== year ||
      date.getUTCMonth() !== month ||
      date.getUTCDate() !== day
    ) {
      showToast({
        type: "error",
        headline: "This date doesn't seem right",
        message: "Please verify your birthdate.",
      });
    }
  };

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].base64);
    } else {
      alert("You did not select any image.");
    }
  };

  return (
    <View style={styles.page}>
      <View>
        <Pressable style={styles.imgContainer} onPress={pickImageAsync}>
          <Image
            style={styles.avatar}
            source={{
              uri: avatar,
            }}
          />
        </Pressable>
        <Text style={styles.label}>USERNAME</Text>
        <TextInput
          style={[styles.input, styles.mb15]}
          value={userInfo.username}
          placeholder={"Username"}
          onChangeText={(e) => setUserInfo({ ...userInfo, username: e })}
          onBlur={validateUsername}
          // autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
        />
        <View style={styles.twoColContainer}>
          <View>
            <Text style={styles.label}>BIRTHDATE</Text>
            <View style={{ flexDirection: "row" }}>
              <TextInput
                ref={dayRef}
                style={styles.input}
                value={userInfo.birthdate.day}
                placeholder={"jj"}
                keyboardType="number-pad"
                maxLength={2}
                returnKeyType="next"
                onChangeText={(e) => [
                  handleBirthdateChange(e, "day"),
                  setUserInfo({
                    ...userInfo,
                    birthdate: { ...userInfo.birthdate, day: e },
                  }),
                ]}
              />
              <Text style={styles.slash}>/</Text>
              <TextInput
                ref={monthRef}
                style={styles.input}
                value={userInfo.birthdate.month}
                placeholder={"mm"}
                keyboardType="number-pad"
                maxLength={2}
                returnKeyType="next"
                onKeyPress={(e) => handleBackspace(e, "month")}
                onChangeText={(e) => [
                  handleBirthdateChange(e, "month"),
                  setUserInfo({
                    ...userInfo,
                    birthdate: { ...userInfo.birthdate, month: e },
                  }),
                ]}
              />
              <Text style={styles.slash}>/</Text>
              <TextInput
                ref={yearRef}
                style={styles.input}
                value={userInfo.birthdate.year}
                placeholder={"aaaa"}
                keyboardType="number-pad"
                maxLength={4}
                onBlur={validateBirthdate}
                onKeyPress={(e) => handleBackspace(e, "year")}
                onChangeText={(e) => [
                  handleBirthdateChange(e, "year"),
                  setUserInfo({
                    ...userInfo,
                    birthdate: { ...userInfo.birthdate, year: e },
                  }),
                ]}
              />
            </View>
          </View>
          <Pressable
            onPress={() => setIsBirthdatePrivate(!isBirthdatePrivate)}
            style={styles.checkboxContainer}
          >
            <Checkbox
              style={styles.checkbox}
              value={isBirthdatePrivate}
              onValueChange={setIsBirthdatePrivate}
              color={"orange"}
            />
            <Text>Private</Text>
          </Pressable>
        </View>
        <Text style={styles.mb15}>
          Please note that if you enable LitMatch, your age will be displayed on
          your profile for compatibility purposes.
        </Text>

        <Dropdown
          data={accountTypes}
          labelField="label"
          valueField="value"
          placeholder="Choose your account type:"
          onChange={(e) => setAccountType(e.value)}
          style={[styles.input, styles.mb15]}
          value={accountType}
        />

        <Pressable
          onPress={() => setIsLitMatchEnabled(!isLitMatchEnabled)}
          style={[
            styles.input,
            styles.mb15,
            isLitMatchEnabled && styles.bgOrangeLight,
          ]}
        >
          <View style={styles.litMatchBtn}>
            <Text style={{ fontSize: 20, marginBottom: 5 }}>
              Enable LitMatch
            </Text>
            <Checkbox
              style={styles.checkbox}
              value={isLitMatchEnabled}
              onValueChange={setIsLitMatchEnabled}
              color={"orange"}
            />
          </View>
          <Text>
            LitMatch is a feature that allow you to be matched with other book
            lovers and start a discussion.
          </Text>
        </Pressable>
      </View>

      <Pressable onPress={handleClick} style={styles.btnPrimary}>
        <Text style={styles.btnText}>Next</Text>
      </Pressable>
    </View>
  );
};

export default PersonalInfo;

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
    fontSize: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    fontSize: 20,
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
