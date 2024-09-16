import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import WelcomeScreen from './WelcomeScreen';
import ChatScreen from './ChatScreen';

const Stack = createStackNavigator();

export default function App() {
  const [userName, setUserName] = useState('');

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Welcome">
          {(props) => <WelcomeScreen {...props} onNameSubmit={(name) => setUserName(name)} />}
        </Stack.Screen>
        <Stack.Screen name="Chat">
          {(props) => <ChatScreen {...props} userName={userName} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
