import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  Platform,
  Dimensions,
  KeyboardAvoidingView,
  Button,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { showToast } from "../utils/Toasts";
import { useAuth } from "../contexts/AuthContext";
import { useUserContext } from "../contexts/UserContext";
import colors from "../constants/colors";

const SignIn = () => {
  const [userMail, setUserMail] = useState("");
  const [userPwd, setUserPwd] = useState("");
  const auth = FIREBASE_AUTH;
  const { setIsLoggedIn, setIsSignedUp } = useAuth();
  const { state, dispatch } = useUserContext();

  const handleLogIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        userMail,
        userPwd
      );
      if (userCredential) {
        dispatch({
          type: "UPDATE_FIELD",
          payload: {
            field: "uid",
            value: userCredential.user.uid,
          },
        });
        setIsLoggedIn(true);
      }
    } catch (error: any) {
      if (error.code === "auth/invalid-credential")
        showToast({
          type: "error",
          headline: "Oops! Invalid Email or Password",
          message: "Please check your credentials and try again.",
        });
    }
  };

  const handleSignIn = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userMail,
        userPwd
      );
      if (userCredential) {
        dispatch({
          type: "UPDATE_FIELD",
          payload: {
            field: "uid",
            value: userCredential.user.uid,
          },
        });
        setIsSignedUp(true);
      }
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use")
        showToast({
          type: "error",
          headline: "Oops! An Account Already Exists",
          message: "Try logging in instead or use a different email address.",
        });
    }
  };

  return (
    <View style={styles.pageLayout}>
      <KeyboardAvoidingView behavior="padding">
        <View>
          <View>
            <Text style={styles.label}>EMAIL</Text>
            <TextInput
              style={styles.input}
              value={userMail}
              inputMode="email"
              placeholder={"john.doe@mail.com"}
              placeholderTextColor={"orange"}
              onChangeText={setUserMail}
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect={false}
            />
          </View>
          <View>
            <Text style={styles.label}>PASSWORD</Text>
            <TextInput
              style={styles.input}
              value={userPwd}
              inputMode="text"
              placeholder={"password"}
              placeholderTextColor={"orange"}
              secureTextEntry={true}
              onChangeText={setUserPwd}
              textContentType="newPassword"
              autoCapitalize="none"
            />
          </View>
        </View>

        <View style={{ gap: 20 }}>
          <Pressable style={styles.btnPrimary} onPress={handleLogIn}>
            <Text style={styles.btnText}>Log in</Text>
          </Pressable>

          <Pressable style={styles.btnPrimaryOutline} onPress={handleSignIn}>
            <Text style={[styles.btnText, styles.colorTeal]}>Sign in</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  thumbnail: {
    height: 150,
    width: 100,
    borderRadius: 5,
  },
  booksDropdownCol: {
    justifyContent: "space-evenly",
    marginBottom: 10,
  },
  booksDropdownContainer: {
    backgroundColor: "lightgray",
    paddingTop: 10,
    height: Dimensions.get("window").height / 3,
  },
  book: {
    height: 150,
    width: 100,
    marginLeft: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 8,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  booksContainer: {
    // backgroundColor: "lightgray",
    marginBottom: -10,
    zIndex: 3,
    maxHeight: 150,
    paddingTop: 0,
    height: 150,
  },
  bookshelfThickness: {
    width: Dimensions.get("window").width,
    marginLeft: -20,
    height: 4,
    backgroundColor: "rgba(255, 222, 173, 1)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  bookshelf: {
    width: Dimensions.get("window").width,
    height: 0,
    marginLeft: -20,
    borderLeftWidth: 20,
    borderLeftColor: "transparent",
    borderRightWidth: 20,
    borderRightColor: "transparent",
    borderBottomWidth: 25,
    borderBottomColor: "rgba(255, 222, 173, 1)",
  },
  bookshelfBg: {
    backgroundColor: "rgba(255, 222, 173, .5)",
    borderRadius: 5,
    height: 250,
  },
  pageLayout: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    display: "flex",
    justifyContent: "space-between",
    height: "100%",
    flex: 1,
    backgroundColor: colors.light.background,
  },
  progressHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  btnOutlineDiscreet: {
    borderWidth: 1,
    borderColor: "lightgray",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  btnOutlineDiscreetText: {
    color: "lightgray",
  },
  flexContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  textIconBtn: {
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 5,
    display: "flex",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    gap: 5,
    flex: 1,
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
  btnPrimary: {
    width: "100%",
    backgroundColor: colors.light.accent,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 50,
    display: "flex",
    alignItems: "center",
  },
  btnPrimaryOutline: {
    width: "100%",
    borderWidth: 2,
    borderColor: colors.light.accent,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 50,
    display: "flex",
    alignItems: "center",
  },
  colorTeal: {
    color: colors.light.accent,
  },
  btnText: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
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
