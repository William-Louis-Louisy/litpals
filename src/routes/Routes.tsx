import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "../screens/Profile";
import SignIn from "../screens/SignIn";
import PersonalInfo from "../screens/PersonalInfo";
import MeetingProfile from "../screens/MeetingProfile";
import ReadingProfile2 from "../screens/ReadingProfile2";
import Bookshelf from "../screens/InitialBookshelf";
import ReadingProfile1 from "../screens/ReadingProfile1";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import LitPal from "../screens/LitPal";
import MyBookshelves from "../screens/MyBookshelves";
import { Ionicons } from "@expo/vector-icons";
import Browse from "../screens/Browse";
import ReadingJournal from "../screens/ReadingJournal";
import BookDetails from "../screens/BookDetails";
import BookChallengeDuration from "../screens/BookChallengeDuration";
import BookChallengeName from "../screens/BookChallengeName";
import BookChallengeGoal from "../screens/BookChallengeGoal";
import BookChallenge from "../screens/BookChallenge";

const AuthStack = createNativeStackNavigator();

const SignUpStack = createNativeStackNavigator();

const AppStack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const TabScreens = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#543757",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          padding: 20,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <FontAwesome name="user-circle" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="LitPal"
        component={LitPal}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <FontAwesome6 name="comments" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="MyBookshelves"
        component={MyBookshelves}
        options={{
          headerShown: false,
          tabBarIcon: () => <Ionicons name="library" size={24} color="black" />,
        }}
      />
      <Tab.Screen
        name="Browse"
        component={Browse}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <FontAwesome6 name="magnifying-glass" size={24} color="black" />
          ),
        }}
      />
      {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
    </Tab.Navigator>
  );
};

const Routes = () => {
  const { isLoggedIn, isSignedUp } = useAuth();

  if (isLoggedIn)
    return (
      <AppStack.Navigator>
        <AppStack.Screen
          name="Profile"
          component={TabScreens}
          options={{ headerShown: false }}
        />
        <AppStack.Screen
          name="ReadingJournal"
          component={ReadingJournal}
          options={{ headerShown: false }}
        />
        <AppStack.Screen
          name="BookDetails"
          component={BookDetails}
          options={{ headerShown: false }}
        />
        <AppStack.Screen
          name="BookChallenge"
          component={BookChallenge}
          options={{ headerShown: false }}
        />
        <AppStack.Screen
          name="BookChallengeDuration"
          component={BookChallengeDuration}
          options={{ headerShown: false }}
        />
        <AppStack.Screen
          name="BookChallengeName"
          component={BookChallengeName}
          options={{ headerShown: false }}
        />
        <AppStack.Screen
          name="BookChallengeGoal"
          component={BookChallengeGoal}
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
          name="ReadingProfile1"
          component={ReadingProfile1}
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
