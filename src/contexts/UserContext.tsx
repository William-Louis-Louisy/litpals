import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  useEffect,
} from "react";

interface IUserData {
  _id: string;
  uid: string;
  personalInfo: {
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
    currentRead: [];
  };
  readingHabits: {
    bookTypes: string[];
    readingLanguages: string;
    format: string;
  };
  readingPreferences: {
    favoriteAuthors: string[];
    favoriteGenres: {
      fiction: string[];
      nonFiction: string[];
    };
  };
  bookshelf: string;
}

const initialState: IUserData = {
  _id: "",
  uid: "",
  personalInfo: {
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
    currentRead: [],
  },
  readingHabits: {
    bookTypes: [],
    readingLanguages: "",
    format: "",
  },
  readingPreferences: {
    favoriteAuthors: [],
    favoriteGenres: {
      fiction: [],
      nonFiction: [],
    },
  },
  bookshelf: "",
};

interface IUserProviderProps {
  children: ReactNode;
}

interface Action {
  type: string;
  payload?: any;
}

interface UserContextType {
  state: IUserData;
  dispatch: React.Dispatch<Action>;
}

const defaultContextValue: UserContextType = {
  state: initialState,
  dispatch: () => {},
};

const UserContext = createContext<UserContextType>(defaultContextValue);

function userReducer(state: IUserData, action: Action) {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.payload.field]: action.payload.value };
    case "RESET":
      return initialState;
    case "SET_USER_DATA":
      return { ...action.payload };
    default:
      return state;
  }
}

export const UserProvider = ({ children }: IUserProviderProps) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  // const { isLoggedIn, setIsSignedUp, setIsLoggedIn } = useAuth();

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
