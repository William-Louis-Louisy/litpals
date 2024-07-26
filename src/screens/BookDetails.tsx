import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  TextInput,
  Platform,
  Button,
  FlatList,
  Dimensions,
  ScrollView,
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

interface IRouterProps {
  navigation: NavigationProp<any, any>;
}

const defaultUserInfo = {
  gender: "",
  country: "",
  city: "",
};

const BookDetails = ({ navigation }: IRouterProps) => {
  const { state, dispatch } = useUserContext();
  const { isLoggedIn, setIsLoggedIn, setIsSignedUp } = useAuth();
  const [uid, setUid] = useState("");
  const [books, setBooks] = useState([]);
  const [unfoldShelf, setUnfoldShelf] = useState(false);
  const [shelves, setShelves] = useState([]);

  return (
    <View style={{ height: "100%" }}>
      <View style={{ flexDirection: "row", padding: 10 }}>
        <Text>Book details</Text>
        <Pressable>
          <FontAwesome name="star-o" size={20} color="black" />
        </Pressable>
        <Pressable>
          <FontAwesome name="heart-o" size={20} color="black" />
        </Pressable>
        <Pressable>
          <FontAwesome name="plus" size={20} color="black" />
        </Pressable>
      </View>
      <View style={{ flexDirection: "row", gap: 20, padding: 20 }}>
        <Pressable style={styles.book}>
          <Image
            style={styles.thumbnail}
            source={{
              uri: "https://m.media-amazon.com/images/I/81ThRaHZbFL._SY466_.jpg",
            }}
          />
        </Pressable>
        <View style={{ gap: 10, flex: 1 }}>
          {/* BOOK INFO */}
          <Text style={{ fontSize: 20 }}>Un Palais d'Épines et de Roses</Text>
          <Text style={{ fontSize: 15 }}>Sarah J Maas</Text>
          <Text style={{ fontSize: 15 }}>De Saxus | 2015</Text>
          <Text style={{ fontSize: 15 }}>346 pages | 16+ | FR</Text>
        </View>
      </View>
      <ScrollView
        style={{
          gap: 10,
          backgroundColor: colors.light.secondaryLight,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          padding: 20,
          flex: 1,
        }}
      >
        {/* BOOK INFO */}
        <Text style={{ fontSize: 15 }}>hardcover</Text>
        <Text style={styles.tag}>Fantasy</Text>
        <Text style={styles.tag}>Romance</Text>
        <Text style={{ fontSize: 15 }}>Tropes ?</Text>
        <Text style={{ fontSize: 15 }}>Synopsis</Text>

        {/* IF NOT IN BOOKSHELF */}
        <Text style={{ fontSize: 15 }}>
          status: read, tbr, wishlist, stopped, current read
        </Text>
        <Text style={{ fontSize: 15 }}>Other users notes and reviews</Text>
        <View style={{ flexDirection: "row" }}>
          {[1, 2, 3, 4, 5].map((star) => {
            return (
              <Pressable key={star}>
                {4.5 >= star ? (
                  <FontAwesome name="star" size={25} color="black" />
                ) : 4.5 === star - 0.5 ? (
                  <FontAwesome name="star-half-full" size={25} color="black" />
                ) : (
                  <FontAwesome name="star-o" size={25} color="blac  k" />
                )}
              </Pressable>
            );
          })}
        </View>
        <Pressable>
          <Text>(2689 reviews)</Text>
        </Pressable>
        <Text style={{ fontSize: 20, fontWeight: 700 }}>
          Other books from the serie
        </Text>
        <View style={{ flexDirection: "row", gap: 20 }}>
          <Pressable style={styles.book}>
            <Image
              style={styles.thumbnail}
              source={{
                uri: "https://m.media-amazon.com/images/I/81ThRaHZbFL._SY466_.jpg",
              }}
            />
          </Pressable>
          <Pressable style={styles.book}>
            <Image
              style={styles.thumbnail}
              source={{
                uri: "https://m.media-amazon.com/images/I/81ThRaHZbFL._SY466_.jpg",
              }}
            />
          </Pressable>
          <Pressable style={styles.book}>
            <Image
              style={styles.thumbnail}
              source={{
                uri: "https://m.media-amazon.com/images/I/81ThRaHZbFL._SY466_.jpg",
              }}
            />
          </Pressable>
        </View>
        <Text style={{ fontSize: 15 }}>buy this book ?</Text>
        <Text style={{ fontSize: 15 }}>similar books ?</Text>

        {/* GO FURTHER */}
        <Text style={{ fontSize: 15 }}>See your book card</Text>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 50,
              backgroundColor: "lightgray",
            }}
          ></View>
          <Text>Username56</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default BookDetails;

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
    height: 180,
    width: 120,
    borderRadius: 5,
  },
  book: {
    height: 180,
    width: 120,
    shadowColor: "#000",
    shadowOffset: {
      width: 8,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    position: "relative",
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
        paddingVertical: 50,
        display: "flex",
        justifyContent: "space-between",
        height: "100%",
        flex: 1,
      },
    },
  }),
});
