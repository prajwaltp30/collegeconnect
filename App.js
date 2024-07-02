import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/home';
import SignUpScreen from './screens/signup';
import LoginScreen from './screens/login';
import Oops from './screens/oops'
import { StatusBar } from 'react-native';

const Stack = createStackNavigator();

// Define the stack navigator for the main screens
function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Hide the header for all routes by default
      }}
      initialRouteName="Home" // Set the initial route
    >
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Oops" component={Oops} />


    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <>
    <StatusBar backgroundColor="purple" /> 
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
    </>
  );
}
