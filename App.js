import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

//screens
import LoginScreen from './app/screens/auth/Index';
import MyPageScreen from './app/screens/MyPageScreen';
import AnnounceScreen from './app/screens/AnnounceScreen';
import SearchScreen from './app/screens/SearchScreen';
import MapScreen from './app/screens/MapScreen';

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="MyPageScreen" component={MyPageScreen} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
        <Stack.Screen name="MapScreen" component={MapScreen} />
        <Stack.Screen name="AnnounceScreen" component={AnnounceScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

