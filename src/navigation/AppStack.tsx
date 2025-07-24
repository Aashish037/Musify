// src/navigation/AppStack.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LibraryScreen from '../screens/LibraryScreen';
import SearchScreen from '../screens/SearchScreen';
import NowPlayingScreen from '../screens/NowPlayingScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* HomeScreen is the first screen in this stack */}
      <Stack.Screen
        name="Home"
        // Pass required props to HomeScreen using a render function
        children={props => (
          <HomeScreen
            {...props}
            // You may need to provide a real onSongPress handler here
            onSongPress={() => {}}
          />
        )}
      />
      <Stack.Screen
        name="Library"
        children={props => <LibraryScreen {...props} onSongPress={() => {}} />}
      />
      <Stack.Screen
        name="Search"
        children={props => <SearchScreen {...props} onSongPress={() => {}} />}
      />
      <Stack.Screen name="NowPlaying" component={NowPlayingScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      {/* Add other main app screens here */}
    </Stack.Navigator>
  );
};

export default AppStack;
