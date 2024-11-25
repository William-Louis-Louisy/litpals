import { View, Text, Pressable, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import colors from "../constants/colors";
import PersonalInfo2 from "../components/PersonalInfo2";
import { FontAwesome6 } from "@expo/vector-icons";
import ReadingHabits from "../components/ReadingHabits";
import ReadingPreferences from "../components/ReadingPreferences";
import InitialBookshelf2 from "../components/InitialBookshelf2";
import { useAuth } from "../contexts/AuthContext";
import { useUserContext } from "../contexts/UserContext";
import { IInitialBookshelf, IShelf } from "../interfaces/bookshelf.interface";

const defaultUserInfo = {
  uid: "",
  avatar: "",
  username: "",
  birthdate: {
    day: "",
    month: "",
    year: "",
  },
  birthdatePrivate: false,
  country: "",
  city: "",
  bio: "",
  readingHabits: {
    bookTypes: [] as string[],
    readingLanguages: "",
    format: "",
  },
  readingPreferences: {
    favoriteGenres: [] as string[],
    favoriteTropes: [] as string[],
    favoriteAuthors: [] as string[],
  },
  bookshelf: [] as IShelf[],
};

const defaultBookshelf: IInitialBookshelf = {
  tbr: [],
  wishlist: [],
  reading: [],
  read: [],
  favorites: [],
};

const SignUpProcess = ({ navigation }: any) => {
  const { state, dispatch } = useUserContext();
  const { setIsSignedUp, setIsLoggedIn } = useAuth();
  const [step, setStep] = useState(1);
  const [userInfo, setUserInfo] = useState(defaultUserInfo);
  const [bookshelf, setBookshelf] = useState(defaultBookshelf);

  useEffect(() => {
    setUserInfo({ ...userInfo, uid: state.uid });
  }, []);

  const handleClick = async () => {
    if (step === 4) submitUserData();
    else setStep(step + 1);
  };

  const submitUserData = async () => {
    try {
      const data = await axios.post(`http://192.168.0.49:5000/user`, {
        user: userInfo,
        bookshelf: bookshelf,
      });

      if (data.status === 201) {
        dispatch({
          type: "UPDATE_FIELD",
          payload: {
            field: "personalInfo",
            value: {
              avatar: userInfo.avatar,
              username: userInfo.username,
              birthdate: userInfo.birthdate,
              birthdatePrivate: userInfo.birthdatePrivate,
              country: userInfo.country,
              city: userInfo.city,
            },
          },
        });
        dispatch({
          type: "UPDATE_FIELD",
          payload: {
            field: "_id",
            value: data.data.user,
          },
        });
        setIsSignedUp(false);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Error submitting user data:", error);
    }
  };

  return (
    <View style={styles.page}>
      {/* PROGRESS HEADER */}
      {step !== 1 && (
        <View style={styles.progressHeader}>
          <Pressable
            onPress={() => setStep(step - 1)}
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
            }}
          >
            <FontAwesome6
              name="chevron-left"
              size={24}
              color={colors.light.secondary}
            />
            <Text
              style={{
                fontFamily: "Nunito-Medium",
                fontSize: 15,
                color: colors.light.secondary,
              }}
            >
              Back
            </Text>
          </Pressable>
          {step !== 4 && (
            <Pressable
              onPress={() => setStep(step + 1)}
              style={styles.btnOutlineDiscreet}
            >
              <Text style={styles.btnOutlineDiscreetText}>Skip</Text>
            </Pressable>
          )}
        </View>
      )}

      {/* CONTENT */}
      {step === 1 && (
        <PersonalInfo2 userInfo={userInfo} setUserInfo={setUserInfo} />
      )}
      {step === 2 && (
        <ReadingHabits userInfo={userInfo} setUserInfo={setUserInfo} />
      )}
      {step === 3 && (
        <ReadingPreferences userInfo={userInfo} setUserInfo={setUserInfo} />
      )}
      {step === 4 && (
        <InitialBookshelf2 bookshelf={bookshelf} setBookshelf={setBookshelf} />
      )}

      {/* BUTTON */}
      <Pressable onPress={handleClick} style={styles.btnPrimary}>
        <Text style={styles.btnText}>{step === 4 ? "Done" : "Next"}</Text>
      </Pressable>
    </View>
  );
};

export default SignUpProcess;

const styles = StyleSheet.create({
  progressHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  btnOutlineDiscreet: {
    borderWidth: 1,
    borderColor: colors.light.secondary,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  btnOutlineDiscreetText: {
    color: colors.light.secondary,
  },
  page: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    justifyContent: "space-between",
    height: "100%",
    flex: 1,
    backgroundColor: colors.light.background,
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
});
