import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

//screens
import Login from './app/screens/auth/Login';
import SignUp from './app/screens/auth/SignUp';
import LoginScreen from './app/screens/auth/Index';
import MyPageScreen from './app/screens/MyPageScreen';

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName="MyPageScreen">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="MyPageScreen" component={MyPageScreen} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

