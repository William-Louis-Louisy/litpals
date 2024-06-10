import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "../screens/Profile";
import SignIn from "../screens/SignIn";
import PersonalInfo from "../screens/PersonalInfo";
import MeetingProfile from "../screens/MeetingProfile";
import ReadingProfile2 from "../screens/ReadingProfile2";
import Bookshelf from "../screens/Bookshelf";
import ReadingProfile1 from "../screens/ReadingProfile1";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import LitPal from "../screens/LitPal";
import MyBookshelves from "../screens/MyBookshelves";
import { Ionicons } from "@expo/vector-icons";
import Browse from "../screens/Browse";
import ReadingJournal from "../screens/ReadingJournal";

const AuthStack = createNativeStackNavigator();

const SignUpStack = createNativeStackNavigator();

const ProfileStack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="ReadingJournal"
        component={ReadingJournal}
        options={{ headerShown: false }}
      />
    </ProfileStack.Navigator>
  );
};

const Routes = () => {
  const { isLoggedIn, isSignedUp } = useAuth();

  if (isLoggedIn)
    return (
      <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
        <Tab.Screen
          name="ProfileStack"
          component={ProfileStackScreen}
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
            tabBarIcon: () => (
              <Ionicons name="library" size={24} color="black" />
            ),
          }}
        />
        <Tab.Screen
          name="Browse"
          component={Browse}
          options={{
            tabBarIcon: () => (
              <FontAwesome6 name="magnifying-glass" size={24} color="black" />
            ),
          }}
        />
        {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
      </Tab.Navigator>
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
