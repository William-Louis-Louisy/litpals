import { IShelf } from "./bookshelf.interface";

export interface IUserData {
  uid: string;
  avatar: string;
  username: string;
  birthdate: {
    day: string;
    month: string;
    year: string;
  };
  birthdatePrivate: boolean;
  country: string;
  city: string;
  bio: string;
  readingHabits: {
    bookTypes: string[];
    readingLanguages: string;
    format: string;
  };
  readingPreferences: {
    favoriteGenres: string[];
    favoriteTropes: string[];
    favoriteAuthors: string[];
  };
  bookshelf: IShelf[];
}
