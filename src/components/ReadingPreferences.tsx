import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Pressable,
  ScrollView,
} from "react-native";
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import Checkbox from "expo-checkbox";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import colors from "../constants/colors";
import { genres } from "../utils/Genres";
import { tropes } from "../utils/Tropes";
import { IUserData } from "../interfaces/user.interface";

interface IProps {
  userInfo: IUserData;
  setUserInfo: Dispatch<SetStateAction<IUserData>>;
}

const ReadingPreferences = ({ userInfo, setUserInfo }: IProps) => {
  const [genresDropdown, setGenresDropdown] = useState(false);
  const [tropeQuery, setTropeQuery] = useState("");
  const [tropesDropdown, setTropesDropdown] = useState([] as String[]);
  const [authorQuery, setAuthorQuery] = useState("");
  const [authorsDropdown, setAuthorsDropdown] = useState([]);

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

  const getTropes = async () => {
    setTropesDropdown(
      tropes.filter((trope) =>
        trope.toLowerCase().includes(tropeQuery.toLowerCase())
      )
    );
  };

  const handleAuthorChange = useCallback(debounce(getAuthors, 300), [
    authorQuery,
  ]);

  const handleTropeChange = useCallback(debounce(getTropes, 300), [tropeQuery]);

  const handleSelectAuthor = (author: any) => {
    setUserInfo({
      ...userInfo,
      readingPreferences: {
        ...userInfo.readingPreferences,
        favoriteAuthors: [
          ...userInfo.readingPreferences.favoriteAuthors,
          author,
        ],
      },
    });
    setAuthorQuery("");
  };

  const handleSelectTrope = (trope: any) => {
    setUserInfo({
      ...userInfo,
      readingPreferences: {
        ...userInfo.readingPreferences,
        favoriteTropes: [...userInfo.readingPreferences.favoriteTropes, trope],
      },
    });
    setTropeQuery("");
  };

  useEffect(() => {
    handleAuthorChange();
    return () => handleAuthorChange.cancel();
  }, [authorQuery, handleAuthorChange]);

  useEffect(() => {
    handleTropeChange();
    return () => handleTropeChange.cancel();
  }, [tropeQuery, handleTropeChange]);

  const handleSelectGenre = (genre: any) => {
    if (!userInfo.readingPreferences.favoriteGenres.includes(genre))
      setUserInfo({
        ...userInfo,
        readingPreferences: {
          ...userInfo.readingPreferences,
          favoriteGenres: [
            ...userInfo.readingPreferences.favoriteGenres,
            genre,
          ],
        },
      });
    else
      setUserInfo({
        ...userInfo,
        readingPreferences: {
          ...userInfo.readingPreferences,
          favoriteGenres: [
            ...userInfo.readingPreferences.favoriteGenres.filter(
              (existingGenre) => existingGenre !== genre
            ),
          ],
        },
      });
  };

  return (
    <View style={styles.pageContent}>
      {/* GENRES */}
      <View>
        <Text style={styles.label}>FAVORITE GENRES</Text>
        <Pressable
          onPress={() => setGenresDropdown(!genresDropdown)}
          style={[
            styles.input,
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            },
          ]}
        >
          <Text>Select your favorite genres</Text>
          <FontAwesome6
            name={genresDropdown ? "chevron-up" : "chevron-down"}
            size={24}
            color="black"
          />
        </Pressable>
        {genresDropdown && (
          <FlatList
            horizontal={false}
            numColumns={2}
            contentContainerStyle={styles.dropdownContainer}
            data={genres}
            renderItem={({ item }) => (
              <Pressable
                style={styles.genreItem}
                onPress={() => handleSelectGenre(item)}
              >
                <Checkbox
                  style={styles.checkbox}
                  value={userInfo.readingPreferences.favoriteGenres.includes(
                    item
                  )}
                  color={"orange"}
                />
                <Text style={styles.textMd}>{item}</Text>
              </Pressable>
            )}
            keyExtractor={(item) => item}
          />
        )}
        {userInfo.readingPreferences.favoriteGenres.length > 0 && (
          <FlatList
            horizontal
            contentContainerStyle={styles.chosenItemsContainer}
            style={{ maxHeight: 114 }}
            data={userInfo.readingPreferences.favoriteGenres}
            renderItem={({ item }) => (
              <View style={styles.chosenItem}>
                <Text style={styles.textMd}>{item}</Text>
                <FontAwesome
                  onPress={() =>
                    setUserInfo({
                      ...userInfo,
                      readingPreferences: {
                        ...userInfo.readingPreferences,
                        favoriteGenres: [
                          ...userInfo.readingPreferences.favoriteGenres.filter(
                            (existingGenre) => existingGenre !== item
                          ),
                        ],
                      },
                    })
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

      {/* TROPES & THEMES */}
      <View>
        <Text style={styles.label}>FAVORITE TROPES AND THEMES</Text>
        <TextInput
          style={styles.input}
          value={tropeQuery}
          placeholder={"Search for a trope or theme..."}
          onChangeText={setTropeQuery}
        />
        {tropeQuery.length > 0 && (
          <ScrollView
            keyboardShouldPersistTaps={"always"}
            contentContainerStyle={styles.dropdownContainer}
          >
            {tropesDropdown.map((trope: any) => {
              return (
                <Text
                  style={styles.dropdownItem}
                  onPress={() => handleSelectTrope(trope)}
                >
                  {trope}
                </Text>
              );
            })}
          </ScrollView>
        )}
        {userInfo.readingPreferences.favoriteTropes.length > 0 && (
          <FlatList
            horizontal
            contentContainerStyle={styles.chosenItemsContainer}
            style={{ maxHeight: 114 }}
            data={userInfo.readingPreferences.favoriteTropes}
            renderItem={({ item }) => (
              <View style={styles.chosenItem}>
                <Text style={styles.textMd}>{item}</Text>
                <FontAwesome
                  onPress={() =>
                    setUserInfo({
                      ...userInfo,
                      readingPreferences: {
                        ...userInfo.readingPreferences,
                        favoriteTropes: [
                          ...userInfo.readingPreferences.favoriteTropes.filter(
                            (trope) => trope != item
                          ),
                        ],
                      },
                    })
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

      {/* AUTHORS */}
      <View>
        <Text style={styles.label}>FAVORITE AUTHORS</Text>
        <TextInput
          style={styles.input}
          value={authorQuery}
          placeholder={"Search for an author..."}
          onChangeText={setAuthorQuery}
        />
        {authorQuery.length > 0 && (
          <ScrollView
            keyboardShouldPersistTaps={"always"}
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
        {userInfo.readingPreferences.favoriteAuthors.length > 0 && (
          <FlatList
            horizontal
            contentContainerStyle={styles.chosenItemsContainer}
            style={{ maxHeight: 114 }}
            data={userInfo.readingPreferences.favoriteAuthors}
            renderItem={({ item }) => (
              <View style={styles.chosenItem}>
                <Text style={styles.textMd}>{item}</Text>
                <FontAwesome
                  onPress={() =>
                    // setSelectedAuthors(
                    //   selectedAuthors.filter((author) => author != item)
                    // )
                    setUserInfo({
                      ...userInfo,
                      readingPreferences: {
                        ...userInfo.readingPreferences,
                        favoriteAuthors: [
                          ...userInfo.readingPreferences.favoriteAuthors.filter(
                            (author) => author != item
                          ),
                        ],
                      },
                    })
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
    </View>
  );
};

export default ReadingPreferences;

const styles = StyleSheet.create({
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
    fontSize: 16,
  },
  pageContent: {
    gap: 20,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    fontSize: 16,
    backgroundColor: colors.light.background,
  },
});
