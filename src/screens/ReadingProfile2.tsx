import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  FlatList,
  Pressable,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Config from "react-native-config";
import debounce from "lodash.debounce";
import Checkbox from "expo-checkbox";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { useUserContext } from "../contexts/UserContext";
import colors from "../constants/colors";

const defaultUserInfo = {
  favoriteAuthors: [],
  favoriteGenres: {
    fiction: [],
    nonFiction: [],
  },
};

const ReadingProfile2 = ({ navigation }: any) => {
  const [userInfo, setUserInfo] = useState(defaultUserInfo);
  const [authorsList, setAuthorsList] = useState([] as String[]);
  const [authorQuery, setAuthorQuery] = useState("");
  const [authorsDropdown, setAuthorsDropdown] = useState([]);
  const [genresList, setGenresList] = useState([] as String[]);
  //   const [genreQuery, setGenreQuery] = useState("");
  //   const [genresDropdown, setGenresDropdown] = useState([]);
  const [genreCategory, setGenreCategory] = useState("");
  const genres = {
    fiction: [
      "Fantasy",
      "Romance",
      "Sci-Fi",
      "Dystopia",
      "Mystery",
      "Thriller",
      "Young Adult",
      "New Adult",
      "Graphic Novel",
      "Manga/Comics",
      "Historical Fiction",
      "Action/Adventure",
      "Children's book",
      "Horror",
      "Contemporary Fiction",
      "Other",
    ],
    nonFiction: [
      "Self Help",
      "Memoir/Biography",
      "Food/Drink",
      "Art/Photography",
      "History",
      "Travel",
      "True Crime",
      "DIY/Crafts",
      "Education/Learning",
      "Home/Garden",
      "Religion/Sprituality",
      "Health/Wellness",
      "Science/Technology",
      "Business/Economy",
      "Humor/Entertainment",
      "Other",
    ],
  };
  const { dispatch } = useUserContext();

  const removeDuplicates = (arr: any) => {
    const result = arr.reduce((acc: any, current: any) => {
      const currentNameNormalized = current.name
        .replace(/\./g, "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
      const existingIndex = acc.findIndex((item: any) => item.name);
      if (existingIndex === -1) {
        acc.push(current);
      } else {
        if (current.work_count > acc[existingIndex].work_count) {
          acc[existingIndex] = current;
        }
      }
      return acc;
    }, []);
    return result;
  };

  const getAuthors = async () => {
    try {
      const response = await axios.get(
        `https://openlibrary.org/search/authors.json?q=${authorQuery}&limit=5`
      );

      const authorsFound = removeDuplicates(response.data.docs).map(
        (author: any) => author.name
      );

      setAuthorsDropdown(authorsFound);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAuthorChange = useCallback(debounce(getAuthors, 300), [
    authorQuery,
  ]);

  const handleSelectAuthor = (author: any) => {
    setAuthorsList([...authorsList, author]);
    setAuthorQuery("");
  };

  useEffect(() => {
    handleAuthorChange();
    return () => handleAuthorChange.cancel();
  }, [authorQuery, handleAuthorChange]);

  const toggleGenresDrowdown = (category: string) => {
    if (genreCategory !== category) setGenreCategory(category);
    else setGenreCategory("");
  };

  const handleSelectGenre = (genre: any) => {
    if (!genresList.includes(genre)) setGenresList([...genresList, genre]);
    else
      setGenresList(
        genresList.filter((existingGenre) => existingGenre !== genre)
      );
  };

  const handleClick = async () => {
    try {
      dispatch({
        type: "UPDATE_FIELD",
        payload: {
          field: "readingInfo2",
          value: {
            favoriteAuthors: authorsList,
            favoriteGenres: {
              fiction: genresList,
              nonFiction: [],
            },
          },
        },
      });
      navigateToNext();
    } catch (e) {
      console.error(e);
    }
  };

  const navigateToPrev = () => {
    navigation.goBack();
  };

  const navigateToNext = () => {
    navigation.navigate("Bookshelf");
  };

  return (
    <View style={styles.pageLayout}>
      <View style={styles.progressHeader}>
        <Pressable onPress={navigateToPrev}>
          <FontAwesome6 name="chevron-left" size={24} color="black" />
        </Pressable>
        <Pressable onPress={navigateToNext} style={styles.btnOutlineDiscreet}>
          <Text style={styles.btnOutlineDiscreetText}>Skip</Text>
        </Pressable>
      </View>

      <View style={styles.pageContent}>
        <View style={styles.section}>
          <Text style={styles.label}>FAVORITE AUTHORS</Text>
          <TextInput
            style={styles.input}
            value={authorQuery}
            placeholder={"Search for an author"}
            onChangeText={setAuthorQuery}
          />
          {authorQuery.length > 0 && (
            <ScrollView
              keyboardShouldPersistTaps={"always"}
              // style={styles.booksDropdownStyle}
              contentContainerStyle={styles.dropdownContainer}
            >
              {authorsDropdown.map((author: any) => {
                return (
                  <Text
                    style={styles.dropdownItem}
                    onPress={() => handleSelectAuthor(author)}
                  >
                    {author}
                  </Text>
                );
              })}
            </ScrollView>
          )}
          {authorsList.length > 0 && (
            <FlatList
              contentContainerStyle={styles.chosenItemsContainer}
              style={{ maxHeight: 114 }}
              data={authorsList}
              renderItem={({ item }) => (
                <View style={styles.chosenItem}>
                  <Text style={styles.textMd}>{item}</Text>
                  <FontAwesome
                    onPress={() =>
                      setAuthorsList(
                        authorsList.filter((author) => author != item)
                      )
                    }
                    name="times-circle"
                    size={24}
                    color="black"
                  />
                </View>
              )}
              keyExtractor={(item) => `${item}-selected`}
            />
          )}
        </View>

        <View>
          <Text style={styles.label}>FAVORITE GENRES</Text>
          <View>
            <Pressable
              style={styles.textIcon}
              onPress={() => toggleGenresDrowdown("fiction")}
            >
              <Text style={styles.textMd}>Fiction</Text>
              <FontAwesome6
                name={
                  genreCategory === "fiction" ? "chevron-up" : "chevron-down"
                }
                size={24}
                color="black"
              />
            </Pressable>
            {genreCategory === "fiction" && (
              <FlatList
                horizontal={false}
                numColumns={2}
                contentContainerStyle={styles.dropdownContainer}
                data={genres.fiction}
                renderItem={({ item }) => (
                  <Pressable
                    style={styles.genreItem}
                    onPress={() => handleSelectGenre(item)}
                  >
                    <Checkbox
                      style={styles.checkbox}
                      value={genresList.includes(item)}
                      color={"orange"}
                    />
                    <Text style={styles.textMd}>{item}</Text>
                  </Pressable>
                )}
                keyExtractor={(item) => item}
              />
            )}
          </View>
          <View>
            <Pressable
              style={styles.textIcon}
              onPress={() => toggleGenresDrowdown("non-fiction")}
            >
              <Text>Non-Fiction</Text>
              <FontAwesome6
                name={
                  genreCategory === "non-fiction"
                    ? "chevron-up"
                    : "chevron-down"
                }
                size={24}
                color="black"
              />
            </Pressable>
            {genreCategory === "non-fiction" && (
              <FlatList
                horizontal={false}
                numColumns={2}
                contentContainerStyle={styles.dropdownContainer}
                data={genres.nonFiction}
                renderItem={({ item }) => (
                  <Pressable
                    style={styles.genreItem}
                    onPress={() => handleSelectGenre(item)}
                  >
                    <Checkbox
                      style={styles.checkbox}
                      value={genresList.includes(item)}
                      color={"orange"}
                    />
                    <Text style={styles.textMd}>{item}</Text>
                  </Pressable>
                )}
                keyExtractor={(item) => item}
              />
            )}
          </View>
        </View>
      </View>

      <Pressable onPress={handleClick} style={styles.btnPrimary}>
        <Text style={styles.btnText}>Next</Text>
      </Pressable>
    </View>
  );
};

export default ReadingProfile2;

const styles = StyleSheet.create({
  section: {
    backgroundColor: colors.light.accent,
    borderRadius: 10,
    padding: 10,
  },
  chosenItemsContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
    flexWrap: "wrap",
    overflow: "scroll",
    paddingBottom: 10,
  },
  chosenItem: {
    backgroundColor: "lightgray",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 25,
    gap: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  dropdownContainer: {
    backgroundColor: "lightgray",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  dropdownItem: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 18,
  },
  genreItem: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: "50%",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  checkbox: {
    width: 15,
    height: 15,
    borderRadius: 100,
  },
  textMd: {
    fontSize: 18,
  },
  textIcon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  pageContent: {
    gap: 20,
  },
  pageLayout: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    height: "100%",
    justifyContent: "space-between",
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
    flexWrap: "wrap",
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
    minWidth: "30%",
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
    backgroundColor: colors.light.background,
  },
  btnPrimary: {
    width: "100%",
    backgroundColor: colors.light.secondary,
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
