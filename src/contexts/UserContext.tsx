import axios from "axios";
import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { useAuth } from "./AuthContext";

interface IUserData {
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
    accountType: "reader" | "author" | "content-creator";
    litMatchEnabled: boolean;
  };
  meetingInfo: {
    gender: string;
    country: string;
    city: string;
    litMatchPreferences: {
      relationshipType: string;
      communicationType: string;
      genderPreference: string;
    };
  };
  readingInfo1: {
    bookTypes: string[];
    readingLanguages: string;
    format: string;
  };
  readingInfo2: {
    favoriteAuthors: string[];
    favoriteGenres: {
      fiction: string[];
      nonFiction: string[];
    };
  };
  bookshelf: any[];
}

const initialState: IUserData = {
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
    accountType: "reader",
    litMatchEnabled: false,
  },
  meetingInfo: {
    gender: "",
    country: "",
    city: "",
    litMatchPreferences: {
      relationshipType: "",
      communicationType: "",
      genderPreference: "",
    },
  },
  readingInfo1: {
    bookTypes: [],
    readingLanguages: "",
    format: "",
  },
  readingInfo2: {
    favoriteAuthors: [],
    favoriteGenres: {
      fiction: [],
      nonFiction: [],
    },
  },
  bookshelf: [],
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
  submitUserData: () => void;
}

const defaultContextValue: UserContextType = {
  state: initialState,
  dispatch: () => {},
  submitUserData: () => {},
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
  const { isLoggedIn, setIsSignedUp, setIsLoggedIn } = useAuth();

  const submitUserData = async () => {
    try {
      console.log("stoute", state);

      const userData = state;
      const data = await axios.post(`http://192.168.0.49:5000/users`, userData);

      if (data.data) {
        setIsSignedUp(false);
        setIsLoggedIn(true);
      }

      // Set dataSubmitted to true after successful submission
      //   setDataSubmitted(true);

      dispatch({ type: "RESET" });
    } catch (error) {
      console.error("Error submitting user data:", error);
    }
  };

  useEffect(() => {
    if (!isLoggedIn && state.personalInfo.username) submitUserData();
  }, [state.bookshelf]);

  return (
    <UserContext.Provider value={{ state, dispatch, submitUserData }}>
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
