import { useAuth } from "../contexts/AuthContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "../screens/Profile";
import SignIn from "../screens/SignIn";
import PersonalInfo from "../screens/PersonalInfo";
import MeetingProfile from "../screens/MeetingProfile";
import ReadingProfile from "../screens/ReadingProfile2";
import ReadingProfile2 from "../screens/ReadingProfile1";
import Bookshelf from "../screens/Bookshelf";

const AuthStack = createNativeStackNavigator();

const SignUpStack = createNativeStackNavigator();

const AppStack = createNativeStackNavigator();

const Routes = () => {
  const { isLoggedIn, isSignedUp } = useAuth();

  {
    /* {isLoggedIn ? (
            <AppStack.Navigator />
          ) : isSignedUp ? (
            <SignUpStack.Navigator />
          ) : (
            <AuthStack.Navigator />
          )} */
  }

  if (isLoggedIn)
    return (
      <AppStack.Navigator>
        <AppStack.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: false }}
        />
      </AppStack.Navigator>
    );
  else if (isSignedUp)
    return (
      <SignUpStack.Navigator>
        <SignUpStack.Screen
          name="PersonalInfo"
          component={PersonalInfo}
          options={{ headerShown: false }}
        />
        <SignUpStack.Screen
          name="MeetingProfile"
          component={MeetingProfile}
          options={{ headerShown: false }}
        />
        <SignUpStack.Screen
          name="ReadingProfile"
          component={ReadingProfile}
          options={{ headerShown: false }}
        />
        <SignUpStack.Screen
          name="ReadingProfile2"
          component={ReadingProfile2}
          options={{ headerShown: false }}
        />
        <SignUpStack.Screen
          name="Bookshelf"
          component={Bookshelf}
          options={{ headerShown: false }}
        />
      </SignUpStack.Navigator>
    );
  else
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          name="SignIn"
          component={SignIn}
          options={{ headerShown: false }}
        />
      </AuthStack.Navigator>
    );
};

export default Routes;
