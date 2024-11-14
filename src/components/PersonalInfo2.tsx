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
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import axios from "axios";
import { showToast } from "../utils/Toasts";
import * as ImagePicker from "expo-image-picker";
import colors from "../constants/colors";
import { IUserData } from "../interfaces/user.interface";

interface UserInfo {
  birthdate: {
    day: string;
    month: string;
    year: string;
  };
}

interface IProps {
  userInfo: IUserData;
  setUserInfo: Dispatch<SetStateAction<IUserData>>;
}

const PersonalInfo = ({ userInfo, setUserInfo }: IProps) => {
  //   const [isBirthdatePrivate, setIsBirthdatePrivate] = useState(false);
  const dayRef = useRef<TextInput | null>(null);
  const monthRef = useRef<TextInput | null>(null);
  const yearRef = useRef<TextInput | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null | undefined>(
    ""
  );
  const avatar = selectedImage
    ? "data:image/jpeg;base64," + selectedImage
    : "https://source.unsplash.com/random/?woman";

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
      if (value === "month") dayRef.current?.focus();
      else if (value === "year") monthRef.current?.focus();
    }
  };

  const handleBirthdateChange = (e: any, value: string) => {
    if ((value === "day" || value === "month") && e.length === 2) {
      if (value === "day" && monthRef.current) monthRef.current.focus();
      else if (value === "month") yearRef.current?.focus();
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
        <View style={styles.mb15}>
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
          onPress={() =>
            setUserInfo({
              ...userInfo,
              birthdatePrivate: !userInfo.birthdatePrivate,
            })
          }
          style={styles.checkboxContainer}
        >
          <Checkbox
            style={styles.checkbox}
            value={userInfo.birthdatePrivate}
            onValueChange={() =>
              setUserInfo({
                ...userInfo,
                birthdatePrivate: !userInfo.birthdatePrivate,
              })
            }
            color={"orange"}
          />
          <Text>Private</Text>
        </Pressable>
      </View>

      <Text style={styles.label}>COUNTRY</Text>
      <TextInput
        style={[styles.input, styles.mb15]}
        value={userInfo.country}
        placeholder={"Country"}
        onChangeText={(e) => setUserInfo({ ...userInfo, country: e })}
      />

      <Text style={styles.label}>CITY</Text>
      <TextInput
        style={[styles.input, styles.mb15]}
        value={userInfo.city}
        placeholder={"City"}
        onChangeText={(e) => setUserInfo({ ...userInfo, city: e })}
      />

      <Text style={styles.label}>BIO</Text>
      <TextInput
        editable
        onChangeText={(text) =>
          setUserInfo({
            ...userInfo,
            bio: text,
          })
        }
        value={userInfo.bio}
        placeholder="Tell us more about you..."
        multiline
        numberOfLines={6}
        style={[
          styles.input,
          {
            borderRadius: 10,
            paddingHorizontal: 10,
            paddingVertical: 8,
            fontSize: 16,
            fontFamily: "Nunito-SemiBold",
            textAlignVertical: "top",
          },
        ]}
      />
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
