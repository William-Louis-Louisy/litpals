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
  Animated,
} from "react-native";
import Checkbox from "expo-checkbox";
import React, { useEffect, useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
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
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Octicons from "@expo/vector-icons/Octicons";

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
  const [status, setStatus] = useState("");

  return (
    <View style={styles.pageLayout}>
      <View
        style={{
          gap: 15,
          marginTop: 10,
          backgroundColor: colors.light.primary,
          paddingHorizontal: 20,
          paddingTop: 30,
          paddingBottom: 20,
          borderBottomRightRadius: 15,
          borderBottomLeftRadius: 15,
          elevation: 12,
        }}
      >
        {/* HEADER */}
        <View style={styles.progressHeader}>
          <Pressable
            // onPress={() => setOpenNoteModal(!openNoteModal)}
            style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
          >
            <FontAwesome6 name="chevron-left" size={24} color="black" />
            <Text style={{ fontFamily: "Nunito-Medium", fontSize: 15 }}>
              Back
            </Text>
          </Pressable>
          {/* <Pressable style={{}}>
          <FontAwesome5 name="plus" size={24} color="black" />
        </Pressable> */}
          <Pressable>
            <Octicons name="share" size={24} color="black" />
          </Pressable>
        </View>

        {/* TOP CONTENT */}
        <View style={{ gap: 15 }}>
          <View>
            <Text
              style={{
                fontSize: 22,
                fontFamily: "Nunito-Bold",
              }}
            >
              Un Palais d'Épines et de Roses
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Nunito-Bold",
                color: "gray",
              }}
            >
              Un Palais d'Épines et de Roses #1
            </Text>
          </View>
          <View style={{ flexDirection: "row", gap: 20 }}>
            <Pressable style={styles.book}>
              <Image
                style={styles.thumbnail}
                source={{
                  uri: "https://m.media-amazon.com/images/I/81ThRaHZbFL._SY466_.jpg",
                }}
              />
            </Pressable>
            <View style={{ flex: 1, gap: 10, justifyContent: "center" }}>
              {/* BOOK INFO */}
              <Text style={{ fontSize: 16, fontFamily: "Nunito-Bold" }}>
                Sarah J Maas
              </Text>
              <Text style={{ fontSize: 15, fontFamily: "Nunito-SemiBold" }}>
                La Martinière | 2015
              </Text>
              <Text style={{ fontSize: 15, fontFamily: "Nunito-SemiBold" }}>
                346 pages | 16+ | FR
              </Text>
              {/* ratings */}
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <View style={{ flexDirection: "row" }}>
                  {[1, 2, 3, 4, 5].map((star) => {
                    return (
                      <Pressable key={star}>
                        {4.5 >= star ? (
                          <FontAwesome
                            name="star"
                            size={22}
                            color={colors.light.secondary}
                          />
                        ) : 4.5 === star - 0.5 ? (
                          <FontAwesome
                            name="star-half-full"
                            size={22}
                            color={colors.light.secondary}
                          />
                        ) : (
                          <FontAwesome
                            name="star-o"
                            size={22}
                            color={colors.light.secondary}
                          />
                        )}
                      </Pressable>
                    );
                  })}
                </View>
                <Pressable>
                  <Text style={{ fontSize: 13, fontFamily: "Nunito-SemiBold" }}>
                    (2689 reviews)
                  </Text>
                  {/* <Text>(12k+ reviews)</Text> */}
                </Pressable>
              </View>
              <Text style={{ fontSize: 15, fontFamily: "Nunito-SemiBold" }}>
                Fantasy - Romance - YA
              </Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{
          gap: 10,
          paddingHorizontal: 20,
          marginTop: 20,
        }}
      >
        {/* tropes */}
        <View style={{ gap: 5 }}>
          <Text style={{ fontSize: 16, fontFamily: "Nunito-Bold" }}>
            Tropes and themes
          </Text>
          <FlatList
            horizontal
            data={[
              "Enemies to lovers",
              "Found family",
              "Forced proximity",
              "Slow burn",
              "Fae",
            ]}
            contentContainerStyle={{ columnGap: 5, marginBottom: 8 }}
            renderItem={({ item }) => <Text style={styles.tag}>{item}</Text>}
            keyExtractor={(item) => item.toString()}
          />
        </View>

        {/* original title */}
        <View style={{ marginTop: -6 }}>
          <Text
            style={{ fontSize: 16, fontFamily: "Nunito-Bold", marginBottom: 5 }}
          >
            Original title
          </Text>
          <Text style={{ fontFamily: "Nunito-SemiBold", marginBottom: 3 }}>
            A Court of Mist and Fury
          </Text>
          <Text style={{ color: "gray", fontFamily: "Nunito-SemiBold" }}>
            A Court of Thorns and Roses #1
          </Text>
        </View>

        {/* description */}
        <View style={{ gap: 5 }}>
          <Text style={{ fontSize: 16, fontFamily: "Nunito-Bold" }}>
            Description
          </Text>
          <Text
            numberOfLines={5}
            style={{
              marginBottom: 15,
              fontSize: 15,
              fontFamily: "Nunito-SemiBold",
              textAlign: "justify",
            }}
          >
            En chassant dans les bois enneigés, Feyre voulait seulement nourrir
            sa famille. Mais elle a commis l'irréparable en tuant un Fae, et la
            voici emmenée de force à Prythian, royaume des immortels. Là-bas,
            pourtant, sa prison est un palais magnifique et son geôlier n'a rien
            d'un monstre. Tamlin, un Grand Seigneur Fae, la traite comme une
            princesse. Et quel est ce mal qui ronge le royaume et risque de
            s'étendre à celui des mortels ? A l'évidence, Feyre n'est pas une
            simple prisonnière. Mais comment une jeune humaine d'origine aussi
            modeste pourrait-elle venir en aide à de si puissants seigneurs ? Sa
            liberté, en tout cas, semble être à ce prix.
          </Text>
        </View>

        <View style={{ flexDirection: "row", gap: 10 }}>
          {/* <Pressable style={styles.btnOutlinePrimary}>
            <Ionicons name="cart-outline" size={25} color="#543757" />
            <Text style={styles.btnTextOutlinePrimary}>Buy this book</Text>
          </Pressable> */}

          <Pressable style={styles.btnOutlinePrimary}>
            <FontAwesome6 name="file-lines" size={22} color="#543757" />
            <Text style={styles.btnTextOutlinePrimary}>See book card</Text>
          </Pressable>

          <Pressable style={styles.btnOutlinePrimary}>
            <FontAwesome6 name="pen-to-square" size={22} color="#543757" />
            <Text style={styles.btnTextOutlinePrimary}>Write review</Text>
          </Pressable>
        </View>

        <Text style={{ fontSize: 20, fontWeight: 700 }}>
          Other books from the serie
        </Text>
        <FlatList
          horizontal
          data={[1, 2, 3]}
          contentContainerStyle={{ gap: 10 }}
          renderItem={({ item }) => (
            <Pressable style={styles.bookSmall}>
              <Image
                style={styles.thumbnailSmall}
                source={{
                  uri: "https://m.media-amazon.com/images/I/81ThRaHZbFL._SY466_.jpg",
                }}
              />
            </Pressable>
          )}
          keyExtractor={(item) => item.toString()}
        />
        <Text style={{ fontSize: 20, fontWeight: 700 }}>
          Other books from the same author
        </Text>
        <FlatList
          horizontal
          data={[1, 2, 3, 4, 5, 6]}
          contentContainerStyle={{ gap: 10, marginBottom: 40 }}
          renderItem={({ item }) => (
            <Pressable style={styles.bookSmall}>
              <Image
                style={styles.thumbnailSmall}
                source={{
                  uri: "https://m.media-amazon.com/images/I/81ThRaHZbFL._SY466_.jpg",
                }}
              />
            </Pressable>
          )}
          keyExtractor={(item) => item.toString()}
        />

        {/* GO FURTHER */}
        {/* <Text style={{ fontSize: 15 }}>similar books ?</Text> */}
      </ScrollView>

      {/* shelves categories */}
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          backgroundColor: colors.light.secondary,
          paddingHorizontal: 20,
          borderTopRightRadius: 15,
          borderTopLeftRadius: 15,
        }}
      >
        <Pressable
          style={styles.category}
          onPress={() => setStatus("wishlist")}
        >
          <View
            style={[
              styles.categoryIcon,
              status === "wishlist" && styles.categorySelected,
            ]}
          >
            <FontAwesome
              name="star-o"
              size={20}
              color={status === "wishlist" ? "#EFE6EF" : "#543757"}
            />
          </View>
          <Text
            style={{
              color: "#543757",
              fontFamily:
                status === "wishlist" ? "Nunito-Bold" : "Nunito-Medium",
            }}
          >
            Wishlist
          </Text>
        </Pressable>
        <Pressable style={styles.category} onPress={() => setStatus("tbr")}>
          <View
            style={[
              styles.categoryIcon,
              status === "tbr" && styles.categorySelected,
            ]}
          >
            <Ionicons
              name="library-outline"
              size={20}
              color={status === "tbr" ? "#EFE6EF" : "#543757"}
            />
          </View>
          <Text
            style={{
              color: "#543757",
              fontFamily: status === "tbr" ? "Nunito-Bold" : "Nunito-Medium",
            }}
          >
            TBR
          </Text>
        </Pressable>
        <Pressable style={styles.category} onPress={() => setStatus("reading")}>
          <View
            style={[
              styles.categoryIcon,
              status === "reading" && styles.categorySelected,
            ]}
          >
            <FontAwesome6
              name="bookmark"
              size={17}
              color={status === "reading" ? "#EFE6EF" : "#543757"}
            />
          </View>
          <Text
            style={{
              color: "#543757",
              fontFamily:
                status === "reading" ? "Nunito-Bold" : "Nunito-Medium",
            }}
          >
            Reading
          </Text>
        </Pressable>
        <Pressable style={styles.category} onPress={() => setStatus("read")}>
          <View
            style={[
              styles.categoryIcon,
              status === "read" && styles.categorySelected,
            ]}
          >
            <MaterialCommunityIcons
              name="book-check-outline"
              size={21}
              color={status === "read" ? "#EFE6EF" : "#543757"}
            />
          </View>
          <Text
            style={{
              color: "#543757",
              fontFamily: status === "read" ? "Nunito-Bold" : "Nunito-Medium",
            }}
          >
            Read
          </Text>
        </Pressable>
        <Pressable
          style={styles.category}
          onPress={() => setStatus("favorites")}
        >
          <View
            style={[
              styles.categoryIcon,
              status === "favorites" && styles.categorySelected,
            ]}
          >
            <FontAwesome
              name="heart-o"
              size={20}
              color={status === "favorites" ? "#EFE6EF" : "#543757"}
            />
          </View>
          <Text
            style={{
              color: "#543757",
              fontFamily:
                status === "favorites" ? "Nunito-Bold" : "Nunito-Medium",
            }}
          >
            Favorites
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default BookDetails;

const styles = StyleSheet.create({
  btnOutlinePrimary: {
    // width: "100%",
    flex: 1,
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 50,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#543757",
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
  },
  btnTextOutlinePrimary: {
    color: "#543757",
    fontSize: 15,
    fontFamily: "Nunito-SemiBold",
  },
  progressHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  categorySelected: {
    backgroundColor: "#543757",
  },
  category: {
    flex: 1,
    alignItems: "center",
    gap: 5,
    paddingTop: 10,
    // transform: [{ translateY: -32 }],
    paddingBottom: 5,
  },
  categoryIcon: {
    borderWidth: 2,
    borderColor: "#543757",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    width: 45,
    height: 45,
    // backgroundColor: "white",
  },
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
  thumbnailSmall: {
    height: 120,
    width: 80,
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
  bookSmall: {
    height: 120,
    width: 80,
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
    borderColor: colors.light.secondary,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 50,
    color: colors.light.secondary,
    // flexGrow: 1,
    // maxWidth: "50%",
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
        // paddingHorizontal: 25,
        // paddingTop: 40,
        flex: 1,
        // gap: 20,
      },
    },
  }),
});
