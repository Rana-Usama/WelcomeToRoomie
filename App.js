import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

//screens
import LoginScreen from './app/screens/auth/Index';
import MyPageScreen from './app/screens/MyPageScreen';
import AnnounceScreen from './app/screens/AnnounceScreen';
import SearchScreen from './app/screens/SearchScreen';
import MapScreen from './app/screens/MapScreen';
import Colors from './app/config/Colors';
import { RFPercentage } from 'react-native-responsive-fontsize';

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator();

export default function App() {

  function HomeTabs() {
    return (
      <Tab.Navigator initialRouteName="MyPageScreen" tabBarOptions={{
        style: { height: 60 },
        labelStyle: { fontSize: RFPercentage(1.4), fontWeight: '500', marginBottom: RFPercentage(1.2) },
        activeTintColor: Colors.primary, inactiveTintColor: Colors.grey, tabStyle: { backgroundColor: Colors.white, fontSize: 30 }
      }} >
        <Tab.Screen
          name="MyPageScreen"
          component={MyPageScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons
                name="home"
                style={{ marginTop: 13 }}
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={{
            tabBarLabel: 'Barcode Scan',
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="search"
                style={{ marginTop: 13 }}
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="MapScreen"
          component={MapScreen}
          options={{
            tabBarLabel: 'Categories',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons
                name="map"
                style={{ marginTop: 13 }}
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="AnnounceScreen"
          component={AnnounceScreen}
          options={{
            tabBarLabel: 'Expire Soon',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons
                name="map"
                style={{ marginTop: 13 }}
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName="AnnounceScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="HomeTabs" component={HomeTabs} />
        {/* <Stack.Screen name="MyPageScreen" component={MyPageScreen} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
        <Stack.Screen name="MapScreen" component={MapScreen} />
        <Stack.Screen name="AnnounceScreen" component={AnnounceScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

