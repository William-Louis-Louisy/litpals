import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  TextInput,
  Platform,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native";
import Checkbox from "expo-checkbox";
import React, { useEffect, useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { showToast } from "../utils/Toasts";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { useUserContext } from "../contexts/UserContext";
import colors from "../constants/colors";
import Config from "react-native-config";
import Bookshelf from "../components/Bookshelf";

interface IRouterProps {
  navigation: NavigationProp<any, any>;
}

const defaultUserInfo = {
  gender: "",
  country: "",
  city: "",
};

const MyBookshelves = ({ navigation }: IRouterProps) => {
  const { state, dispatch } = useUserContext();
  const [userInfo, setUserInfo] = useState(defaultUserInfo);
  const { isLoggedIn, setIsLoggedIn, setIsSignedUp } = useAuth();
  const [uid, setUid] = useState("");
  const [books, setBooks] = useState([]);
  const [unfoldShelf, setUnfoldShelf] = useState(false);
  const [shelves, setShelves] = useState([
    "TBR",
    "Wishlist",
    "Favorites",
    "Read",
  ]);

  // useEffect(() => {
  //   console.log(books);
  // }, [books]);

  useEffect(() => {
    try {
      console.log("BOOKSHELVES INIT", state.bookshelf);
      getBookshelf();

      // onAuthStateChanged(FIREBASE_AUTH, (user) => {
      //   if (user) {
      //     // User is signed in, see docs for a list of available properties
      //     // https://firebase.google.com/docs/reference/js/auth.user
      //     const uid = user.uid;
      //     console.log("UUUUUUIIIIIDDDDD", uid);
      //     setUid(uid);
      //     // ...
      //   } else {
      //     // User is signed out
      //     // ...
      //     console.log("USER IN NOT LOGGED IN");
      //   }
      // });
    } catch (error: any) {
      console.log("bllop", error.code);
    }
  }, []);

  const getBookshelf = async () => {
    try {
      const bookshelf = await axios.get(
        `http://192.168.0.49:5000/bookshelves/${state.bookshelf}`
      );
      if (bookshelf.data) console.log("got bookshel", bookshelf.data);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   getBooks();
  // }, []);

  // const getBooks = async () => {
  //   try {
  //     const books = await axios.get("http://192.168.0.49:5000/books", {
  //       params: { books: state.bookshelf },
  //     });
  //     if (books.data) setBooks(books.data.books);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   if (unfoldShelf) {
  //     const bloop = [];
  //     for (let i = 0; i < books.length; i += 3) {
  //       console.log(books.slice(i, i + 3));

  //       bloop.push(books.slice(i, i + 3));
  //     }
  //     setShelves(bloop);
  //   }
  // }, [unfoldShelf]);

  return (
    <ScrollView contentContainerStyle={styles.pageLayout}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            fontSize: 26,
            fontFamily: "Nunito-ExtraBold",
          }}
        >
          My Bookshelves
        </Text>
        <Pressable style={{}}>
          <FontAwesome5 name="plus" size={30} color="black" />
        </Pressable>
      </View>
      {shelves.map((shelf) => {
        return <Bookshelf navigation={navigation} title={shelf} />;
      })}
      {/* <View style={styles.bookshelfBg}>
        <View style={styles.shelfHeader}>
          <Text style={{ fontSize: 18, padding: 15 }}>All</Text>
          <Pressable
            onPress={() => setUnfoldShelf(!unfoldShelf)}
            style={{ marginRight: 15 }}
          >
            <FontAwesome6 name="chevron-down" size={24} color="black" />
          </Pressable>
        </View>
        {unfoldShelf ? (
          shelves.map((shelf, index) => (
            <React.Fragment key={index}>
              <View style={styles.booksContainer}>
                <FlatList
                  horizontal={true}
                  data={shelf}
                  renderItem={({ item }) => (
                    <Pressable style={styles.book}>
                      <FontAwesome
                        style={styles.deleteBook}
                        name="times-circle"
                        size={24}
                        color="white"
                      />
                      <Image
                        style={styles.thumbnail}
                        source={{
                          uri: item.thumbnail,
                        }}
                      />
                    </Pressable>
                  )}
                  keyExtractor={(item) => item.title}
                  scrollEnabled={false}
                />
              </View>
              <View style={styles.bookshelf}></View>
              <View style={styles.bookshelfThickness}></View>
            </React.Fragment>
          ))
        ) : (
          <>
            <View style={styles.booksContainer}>
              <FlatList
                horizontal={true}
                data={books}
                renderItem={({ item }) => (
                  <Pressable style={styles.book}>
                    <FontAwesome
                      style={styles.deleteBook}
                      name="times-circle"
                      size={24}
                      color="white"
                    />
                    <Image
                      style={styles.thumbnail}
                      source={{
                        uri: item.thumbnail,
                      }}
                    />
                  </Pressable>
                )}
                keyExtractor={(item) => item.title}
              />
            </View>
            <View style={styles.bookshelf}></View>
            <View style={styles.bookshelfThickness}></View>
          </>
        )}
      </View> */}
    </ScrollView>
  );
};

export default MyBookshelves;

const styles = StyleSheet.create({
  shelfHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  deleteBook: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 5,
  },
  thumbnail: {
    height: 150,
    width: 100,
    borderRadius: 5,
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
    position: "relative",
    paddingTop: 10,
  },
  booksContainer: {
    // backgroundColor: "lightgray",
    marginBottom: -10,
    zIndex: 3,
    maxHeight: 160,
    paddingTop: 0,
    height: 160,
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
    paddingBottom: 30,
  },
  pageLayout: {
    backgroundColor: colors.light.background,
    paddingHorizontal: 20,
    paddingVertical: 30,
    // display: "flex",
    // justifyContent: "space-between",
    height: "100%",
    // flex: 1,
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
  profileHeader: {
    backgroundColor: colors.light.accent,
    paddingHorizontal: 20,
    paddingVertical: 30,
    display: "flex",
    alignItems: "center",
    borderEndEndRadius: 30,
    borderEndStartRadius: 30,
  },
  checkbox: {
    borderRadius: 100,
  },
  settingsCheckbox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "rgba(255, 222, 173, .5)",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  tagsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
    marginTop: 5,
  },
  tag: {
    borderWidth: 1,
    borderColor: colors.light.accent,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: colors.light.accent,
    flexGrow: 1,
    maxWidth: "50%",
    textAlign: "center",
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
  btnText: {
    color: "white",
    fontSize: 20,
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
        paddingTop: 50,
      },
    },
  }),
});
