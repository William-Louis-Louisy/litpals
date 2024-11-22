import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  Platform,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import colors from "../constants/colors";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Octicons from "@expo/vector-icons/Octicons";
import axios from "axios";
import { useUserContext } from "../contexts/UserContext";
import Bookshelf from "../components/Bookshelf";

interface IRouterProps {
  navigation: NavigationProp<any, any>;
  route: RouteProp<
    {
      params: {
        id: string;
        title: string;
        subtitle: string;
        authors: string[];
        publisher: string;
        publishedDate: string;
        pageCount: number;
        language: string;
        maturity: string;
        description: string;
        thumbnail: string;
        shelfType: string;
      };
    },
    "params"
  >;
}

const BookDetails = ({ navigation, route }: IRouterProps) => {
  const boook = route.params;
  const [status, setStatus] = useState(boook.shelfType);
  const [seeFullDesc, setSeeFullDesc] = useState(false);
  const { state } = useUserContext();

  useEffect(() => {
    if (!boook.shelfType) {
      checkBookStatus();
    }
  }, []);

  const checkBookStatus = async () => {
    const bookStatus = await axios.get(
      `http://192.168.0.49:5000/user/${state.uid}/check-book-status/${boook.id}`
    );
    if (bookStatus) {
      const shelf = bookStatus.data.shelf.type;
      setStatus(shelf);
    }
  };

  const selectStatus = async (selectedStatus: string) => {
    status !== selectedStatus ? setStatus(selectedStatus) : setStatus("");

    console.log(boook.shelfType, selectedStatus, status);

    try {
      const bookshelfUpdate = await axios.patch(
        `http://192.168.0.49:5000/user/${state.uid}/bookshelf`,
        {
          previousShelf: boook.shelfType,
          shelf: selectedStatus,
          bookId: boook.id,
          thumbnail: boook.thumbnail,
        }
      );

      if (bookshelfUpdate.data) console.log("bookshelfUpdate okay");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.pageLayout}>
      <View
        style={{
          gap: 15,
          backgroundColor: colors.light.primary,
          paddingHorizontal: 20,
          paddingTop: 40,
          paddingBottom: 20,
          borderBottomRightRadius: 15,
          borderBottomLeftRadius: 15,
          elevation: 12,
        }}
      >
        {/* HEADER */}
        <View style={styles.progressHeader}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
          >
            <FontAwesome6 name="chevron-left" size={24} color="black" />
            <Text style={[styles.discreetText, { fontSize: 15 }]}>Back</Text>
          </Pressable>
          <Pressable>
            <Octicons name="share" size={24} color="black" />
          </Pressable>
        </View>

        {/* BOOK INFO */}
        <View style={{ gap: 15 }}>
          {/* title */}
          <View>
            <Text style={styles.mainTitle}>
              {!boook.title.includes(" - ")
                ? boook.title.replace(/\(*\s*e[\s-]*book\s*\)*\s*/gi, "").trim()
                : boook.title
                    .split(" - ")[0]
                    .replace(/\(*\s*e[\s-]*book\s*\)*\s*/gi, "")
                    .trim()}
            </Text>
            {boook.subtitle
              ? // Only render if subtitle is non-empty after replacement
                boook.subtitle
                  .replace(/\(*\s*e[\s-]*book\s*\)*\s*/gi, "")
                  .trim() && (
                  <Text style={[styles.title, styles.subtitle]}>
                    {boook.subtitle
                      .replace(/\(*\s*e[\s-]*book\s*\)*\s*/gi, "")
                      .trim()}
                  </Text>
                )
              : // Check if processed title-based subtitle is non-empty
                boook.title.includes(" - ") &&
                boook.title
                  .split(" - ")[1]
                  .replace(/\(*\s*e[\s-]*book\s*\)*\s*/gi, "")
                  .trim() && (
                  <Text style={[styles.title, styles.subtitle]}>
                    {boook.title
                      .split(" - ")[1]
                      .replace(/\(*\s*e[\s-]*book\s*\)*\s*/gi, "")
                      .trim()}
                  </Text>
                )}
          </View>

          <View style={{ flexDirection: "row", gap: 20 }}>
            {/* book cover */}
            <View>
              <Pressable style={styles.book}>
                <Image
                  style={styles.thumbnail}
                  source={{
                    uri: boook.thumbnail,
                  }}
                />
              </Pressable>
              <Pressable
                style={{
                  backgroundColor: colors.light.secondary,
                  borderRadius: 50,
                  height: 45,
                  width: 45,
                  alignItems: "center",
                  justifyContent: "center",
                  position: "absolute",
                  bottom: -10,
                  left: -10,
                }}
              >
                <Ionicons name="cart-outline" size={24} color="#fff" />
              </Pressable>
            </View>

            {/* data */}
            <View style={{ flex: 1, gap: 10, justifyContent: "center" }}>
              {/* <Text style={{ fontSize: 16, fontFamily: "Nunito-Bold" }}>
                Sarah J Maas
              </Text> */}
              {boook.authors.map((x) => (
                <Text style={{ fontSize: 16, fontFamily: "Nunito-Bold" }}>
                  {x}
                </Text>
              ))}
              {/* <Text style={styles.text}>La Martinière | 2015</Text> */}
              <Text style={styles.text}>
                {boook.publisher} |{" "}
                {new Date(boook.publishedDate).getFullYear()}
              </Text>
              {/* <Text style={styles.text}>346 pages | 16+ | FR</Text> */}
              <Text style={styles.text}>
                {boook.pageCount} pages |{" "}
                {boook.maturity !== "NOT_MATURE" && "16+ |"}{" "}
                {boook.language?.toUpperCase()}
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
                  <Text style={styles.smallText}>(2689 reviews)</Text>
                  {/* <Text>(12k+ reviews)</Text> */}
                </Pressable>
              </View>
              {/* <Text style={styles.text}>Fantasy - Romance - YA</Text> */}
            </View>
          </View>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{
          gap: 15,
          paddingHorizontal: 20,
          paddingTop: 15,
          paddingBottom: 20,
        }}
      >
        {/* shelves categories */}
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Pressable
            style={styles.category}
            onPress={() => selectStatus("wishlist")}
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
          <Pressable
            style={styles.category}
            onPress={() => selectStatus("tbr")}
          >
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
          <Pressable
            style={styles.category}
            onPress={() => selectStatus("reading")}
          >
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
          <Pressable
            style={styles.category}
            onPress={() => selectStatus("read")}
          >
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
            onPress={() => selectStatus("favorites")}
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

        {/* tropes */}
        {/* <View style={{ gap: 5 }}>
          <Text style={styles.title}>Tropes and themes</Text>
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
        </View> */}

        {/* original title */}
        {/* <View style={{ marginTop: -6, gap: 5 }}>
          <Text style={styles.title}>Original title</Text>
          <View style={{ gap: 3 }}>
            <Text style={styles.text}>A Court of Mist and Fury</Text>
            <Text style={[styles.text, styles.subtitle]}>
              A Court of Thorns and Roses #1
            </Text>
          </View>
        </View> */}

        {/* description */}
        <View style={{ gap: 5 }}>
          <Text style={styles.title}>Description</Text>
          <Pressable onPress={() => setSeeFullDesc(!seeFullDesc)}>
            <Text
              // numberOfLines={seeFullDesc ? undefined : 4}
              style={[styles.text, { textAlign: "justify" }]}
            >
              {boook.description}
            </Text>
            {/* <View
              style={{
                alignSelf: "center",
              }}
            >
              {seeFullDesc ? (
                <FontAwesome6 name="chevron-up" size={12} color="black" />
              ) : (
                <FontAwesome6 name="chevron-down" size={12} color="black" />
              )}
            </View> */}
          </Pressable>
        </View>

        {/* action buttons */}
        {(status === "read" ||
          status === "favorites" ||
          status === "reading") && (
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Pressable style={styles.btnOutlinePrimary}>
              <FontAwesome6 name="file-lines" size={20} color="#543757" />
              <Text style={styles.btnTextOutlinePrimary}>See book card</Text>
            </Pressable>

            <Pressable style={styles.btnOutlinePrimary}>
              <FontAwesome6 name="pen-to-square" size={20} color="#543757" />
              <Text style={styles.btnTextOutlinePrimary}>Write review</Text>
            </Pressable>
          </View>
        )}

        {/* <View style={{ gap: 5 }}>
          <Text style={styles.title}>Other books from the same serie</Text>
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
        </View> */}

        {/* <View style={{ gap: 5 }}>
          <Text style={styles.title}>Other books from the same author</Text>
          <FlatList
            horizontal
            data={[1, 2, 3, 4, 5, 6]}
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
        </View> */}
      </ScrollView>
    </View>
  );
};

export default BookDetails;

const styles = StyleSheet.create({
  mainTitle: { fontSize: 22, fontFamily: "Nunito-ExtraBold" },
  title: { fontSize: 18, fontFamily: "Nunito-Bold" },
  text: { fontSize: 15, fontFamily: "Nunito-SemiBold" },
  smallText: { fontSize: 13, fontFamily: "Nunito-SemiBold" },
  discreetText: { fontFamily: "Nunito-Medium" },
  subtitle: { color: "gray" },
  btnOutlinePrimary: {
    flex: 1,
    paddingVertical: 5,
    borderRadius: 50,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#543757",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
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
  },
  categoryIcon: {
    borderWidth: 2,
    borderColor: "#543757",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    width: 45,
    height: 45,
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
  pageLayout: {
    backgroundColor: colors.light.background,
    paddingHorizontal: 20,
    paddingVertical: 30,
    height: "100%",
  },
  tag: {
    borderWidth: 1,
    borderColor: colors.light.secondary,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 50,
    color: colors.light.secondary,
    textAlign: "center",
    fontFamily: "Nunito-Medium",
  },
  ...Platform.select({
    android: {
      pageLayout: {
        flex: 1,
      },
    },
  }),
});
