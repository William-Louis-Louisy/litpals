import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  Platform,
  Dimensions,
  FlatList,
  Modal,
} from "react-native";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import colors from "../constants/colors";
import BookSearch from "./BookSearch";
import { IInitialBookshelf } from "../interfaces/bookshelf.interface";

interface IProps {
  bookshelf: IInitialBookshelf;
  setBookshelf: Dispatch<SetStateAction<IInitialBookshelf>>;
}

const InitialBookshelf = ({ bookshelf, setBookshelf }: IProps) => {
  const [openBookSearch, setOpenBookSearch] = useState(false);
  const [currentlyChoosing, setCurrentlyChoosing] = useState("nothing");
  const [currentRead, setCurrentRead] = useState([] as any[]);
  const [favoriteBooks, setFavoriteBooks] = useState([] as any[]);

  useEffect(() => {
    setBookshelf({ ...bookshelf, reading: currentRead });
  }, [currentRead]);

  useEffect(() => {
    setBookshelf({ ...bookshelf, favorites: favoriteBooks });
  }, [favoriteBooks]);

  return (
    <View style={styles.pageLayout}>
      <View
        style={{
          height: "100%",
          justifyContent: "space-evenly",
        }}
      >
        {/* FAVORITE BOOKS */}
        <View>
          <Text
            style={{
              fontSize: 18,
              fontFamily: "Nunito-Bold",
              paddingBottom: 10,
            }}
          >
            Add some of your favorite books
          </Text>
          <View style={styles.bookshelfBg}>
            <Text style={{ fontSize: 16, padding: 15, paddingBottom: 0 }}>
              Favorites
            </Text>
            <View style={styles.booksContainer}>
              <FlatList
                horizontal={true}
                data={bookshelf.favorites}
                renderItem={({ item }) => (
                  <Pressable style={styles.book}>
                    <FontAwesome
                      style={styles.deleteBook}
                      onPress={() =>
                        setFavoriteBooks(
                          favoriteBooks.filter((book) => book != item)
                        )
                      }
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
                keyExtractor={(item) => item.id}
                ListHeaderComponent={
                  // Render the additional Pressable as the first component in the list
                  <Pressable
                    onPress={() => [
                      setOpenBookSearch(true),
                      setCurrentlyChoosing("favorites"),
                    ]}
                    style={{
                      height: 150,
                      width: 100,
                      marginLeft: 15,
                      backgroundColor: colors.light.background,
                      borderRadius: 5,
                      borderColor: colors.light.secondary,
                      borderWidth: 2,
                      borderStyle: "dashed",
                      opacity: 0.8,
                      justifyContent: "center",
                      alignItems: "center",
                      elevation: 10,
                      marginTop: 10,
                    }}
                  >
                    <FontAwesome6
                      name="circle-plus"
                      size={35}
                      color={colors.light.secondary}
                    />
                  </Pressable>
                }
              />
            </View>
            <View style={styles.bookshelf}></View>
            <View style={styles.bookshelfThickness}></View>
          </View>
        </View>

        {/* CURRENT READ */}
        <View>
          <Text
            style={{
              fontSize: 18,
              fontFamily: "Nunito-Bold",
              paddingBottom: 10,
            }}
          >
            What are you currently reading ?
          </Text>
          <View style={styles.bookshelfBg}>
            <Text style={{ fontSize: 16, padding: 15, paddingBottom: 0 }}>
              Reading
            </Text>
            <View style={styles.booksContainer}>
              <FlatList
                horizontal={true}
                data={bookshelf.reading}
                renderItem={({ item }) => (
                  <Pressable style={styles.book}>
                    <FontAwesome
                      style={styles.deleteBook}
                      onPress={() =>
                        setCurrentRead(
                          currentRead.filter((book) => book != item)
                        )
                      }
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
                keyExtractor={(item) => item.id}
                ListHeaderComponent={
                  // Render the additional Pressable as the first component in the list
                  <Pressable
                    onPress={() => [
                      setOpenBookSearch(true),
                      setCurrentlyChoosing("currentRead"),
                    ]}
                    style={{
                      height: 150,
                      width: 100,
                      marginLeft: 15,
                      backgroundColor: colors.light.background,
                      borderRadius: 5,
                      borderColor: colors.light.secondary,
                      borderWidth: 2,
                      borderStyle: "dashed",
                      opacity: 0.8,
                      justifyContent: "center",
                      alignItems: "center",
                      elevation: 10,
                      marginTop: 10,
                    }}
                  >
                    <FontAwesome6
                      name="circle-plus"
                      size={35}
                      color={colors.light.secondary}
                    />
                  </Pressable>
                }
              />
            </View>
            <View style={styles.bookshelf}></View>
            <View style={styles.bookshelfThickness}></View>
          </View>
        </View>
      </View>

      {/* SEARCH BOOKS MODAL */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={openBookSearch}
        onRequestClose={() => setOpenBookSearch(false)}
      >
        <BookSearch
          origin={"signup"}
          setOpenBookSearch={setOpenBookSearch}
          selectedBooks={
            currentlyChoosing === "currentRead" ? currentRead : favoriteBooks
          }
          setSelectedBooks={
            currentlyChoosing === "currentRead"
              ? setCurrentRead
              : setFavoriteBooks
          }
        />
      </Modal>
    </View>
  );
};

export default InitialBookshelf;

const styles = StyleSheet.create({
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
    height: 250,
  },
  pageLayout: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    display: "flex",
    justifyContent: "space-between",
    height: "100%",
    flex: 1,
  },
  progressHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ...Platform.select({
    android: {
      pageLayout: {
        height: "100%",
        flex: 1,
      },
    },
  }),
});
