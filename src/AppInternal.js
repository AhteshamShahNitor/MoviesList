
import React, { useState, useEffect } from 'react';
import {View} from 'react-native';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "./translations/i18n";

const checkIfUserIsLoggedIn = () => {
  return AsyncStorage.getItem("isLoggedIn").then(isLoggedIn => {
    return isLoggedIn === "true";
  });
}

const AppInternal = () => {
  const Stack = createStackNavigator();
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    checkIfUserIsLoggedIn().then(loggedIn => {
      console.log("in use effect", loggedIn)
      setIsLoggedIn(loggedIn);
    });
  }, []);

  if (isLoggedIn !== null) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={isLoggedIn ? "DashboardScreen" : "LoginScreen"}>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  } else return <View />
}

export default AppInternal;
