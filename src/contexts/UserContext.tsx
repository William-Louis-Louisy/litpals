import axios from "axios";
import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  useEffect,
} from "react";

interface IUserData {
  personalInfo: {
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
  personalInfo: {
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
    default:
      return state;
  }
}

export const UserProvider = ({ children }: IUserProviderProps) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const submitUserData = async () => {
    try {
      const userData = state;
      console.log("userrr", userData);

      const data = await axios.post(`http://192.168.0.49:5000/users`, userData);
      if (data) console.log("DATAAAA");
      if (data.data) {
        console.log(data.data);
      }

      // Set dataSubmitted to true after successful submission
      //   setDataSubmitted(true);

      //   dispatch({ type: "RESET" });
    } catch (error) {
      console.error("Error submitting user data:", error);
    }
  };

  //   useEffect(() => {
  //     console.log("state", state);
  //     submitUserData();
  //   }, [state.bookshelf]);

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
