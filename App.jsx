import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import LoginPage from './src/screens/LoginPage';
import HomeScreen from './src/screens/HomeScreen';
import { initializeApp } from '@react-native-firebase/app';
import firebaseConfig from './src/firebaseConfig';

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    initializeApp(firebaseConfig, "loginapp");
  }, []);

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginPage}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerTitle: 'Home',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
