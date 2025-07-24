import './global.css'; // Import global styles for Nativewind
import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  ImageStyle,
  ActivityIndicator,
  View,
  StyleSheet,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// --- Import your screens ---
import HomeScreen from './src/screens/HomeScreen';
import LibraryScreen from './src/screens/LibraryScreen';
import SearchScreen from './src/screens/SearchScreen';
import NowPlayingScreen from './src/screens/NowPlayingScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import EditProfileScreen from './src/screens/EditProfileScreen';

// --- Import your Auth related components/hooks ---
import { AuthProvider, useAuth } from './src/context/AuthContext';
import AuthStack from './src/navigation/AuthStack';
import MusicControl from './src/components/MusicControl';
import { recentSongs } from './src/data/musicData'; // or wherever your songs are

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// --- Import your custom icon assets ---
// IMPORTANT: Adjust these paths to your actual file locations and names.
import HomeActiveIcon from './src/assests/icons/home_active.png';
import HomeInactiveIcon from './src/assests/icons/home_inactive.png';
import LibraryActiveIcon from './src/assests/icons/library_active.png';
import LibraryInactiveIcon from './src/assests/icons/library_inactive.png';
import SearchActiveIcon from './src/assests/icons/search_active.png';
import SearchInactiveIcon from './src/assests/icons/search_inactive.png';

// --- Generic Custom Tab Bar Icon Component ---
type CustomIconProps = {
  focused: boolean;
  _color: string;
  size: number;
  activeIconSource: ImageSourcePropType;
  inactiveIconSource: ImageSourcePropType;
};

const CustomTabBarImage = ({
  focused,
  _color,
  size,
  activeIconSource,
  inactiveIconSource,
}: CustomIconProps) => {
  const iconSource = focused ? activeIconSource : inactiveIconSource;
  const imageStyle: StyleProp<ImageStyle> = {
    width: size,
    height: size,
    // tintColor: color, // Uncomment this line if you want to tint your icons dynamically
  };
  return <Image source={iconSource} style={imageStyle} resizeMode="contain" />;
};

// --- Specific Tab Bar Icon Components using CustomTabBarImage ---
const HomeTabBarIcon = ({
  color,
  size,
  focused,
}: {
  color: string;
  size: number;
  focused: boolean;
}) => (
  <CustomTabBarImage
    focused={focused}
    _color={color}
    size={size}
    activeIconSource={HomeActiveIcon}
    inactiveIconSource={HomeInactiveIcon}
  />
);

const LibraryTabBarIcon = ({
  color,
  size,
  focused,
}: {
  color: string;
  size: number;
  focused: boolean;
}) => (
  <CustomTabBarImage
    focused={focused}
    _color={color}
    size={size}
    activeIconSource={LibraryActiveIcon}
    inactiveIconSource={LibraryInactiveIcon}
  />
);

const SearchTabBarIcon = ({
  color,
  size,
  focused,
}: {
  color: string;
  size: number;
  focused: boolean;
}) => (
  <CustomTabBarImage
    focused={focused}
    _color={color}
    size={size}
    activeIconSource={SearchActiveIcon}
    inactiveIconSource={SearchInactiveIcon}
  />
);

// Tab icon renderer function
const getTabBarIcon = (
  route: any,
  focused: boolean,
  color: string,
  size: number,
) => {
  if (route.name === 'Home') {
    return <HomeTabBarIcon focused={focused} color={color} size={size} />;
  } else if (route.name === 'Search') {
    return <SearchTabBarIcon focused={focused} color={color} size={size} />;
  } else if (route.name === 'Library') {
    return <LibraryTabBarIcon focused={focused} color={color} size={size} />;
  }
  return null;
};

// TabNavigation component (representing the "AppStack" content)
function TabNavigation() {
  // Move these states up from HomeScreen
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [progress, setProgress] = React.useState(0.3); // 0 to 1
  const [currentTrackIndex, setCurrentTrackIndex] = React.useState<
    number | null
  >(null);

  // Handlers
  const handlePlayPause = () => setIsPlaying(prev => !prev);
  const handleNext = () => {
    if (currentTrackIndex !== null) {
      const nextIndex = (currentTrackIndex + 1) % recentSongs.length;
      setCurrentTrackIndex(nextIndex);
      setIsPlaying(true);
    }
  };
  const handlePrev = () => {
    if (currentTrackIndex !== null) {
      const prevIndex =
        (currentTrackIndex - 1 + recentSongs.length) % recentSongs.length;
      setCurrentTrackIndex(prevIndex);
      setIsPlaying(true);
    }
  };

  // This function can be passed to RecentSongsList or any component to play a song
  const handleSongPress = (song: { id: string }) => {
    const idx = recentSongs.findIndex(s => s.id === song.id);
    setCurrentTrackIndex(idx);
    setIsPlaying(true);
  };

  const currentTrack =
    currentTrackIndex !== null ? recentSongs[currentTrackIndex] : null;

  return (
    <View className="flex-1">
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#151312',
            borderTopWidth: 0,
          },
          tabBarActiveTintColor: '#AB8BFF',
          tabBarInactiveTintColor: '#9CA4AB',
          tabBarLabelStyle: {
            fontFamily: 'SpaceMono-Regular',
            fontSize: 12,
          },
          tabBarIcon: ({ focused, color, size }) =>
            getTabBarIcon(route, focused, color, size),
        })}
      >
        {/* Pass handleSongPress to HomeScreen as a prop */}
        <Tab.Screen
          name="Home"
          options={{ tabBarLabel: 'Home' }}
          children={() => <HomeScreen onSongPress={handleSongPress} />}
        />
        <Tab.Screen
          name="Search"
          options={{ tabBarLabel: 'Search' }}
          children={() => <SearchScreen onSongPress={handleSongPress} />}
        />
        <Tab.Screen
          name="Library"
          options={{ tabBarLabel: 'Your Library' }}
          children={() => <LibraryScreen onSongPress={handleSongPress} />}
        />
      </Tab.Navigator>
      <MusicControl
        visible={currentTrack !== null}
        track={
          currentTrack
            ? {
                icon: currentTrack.icon,
                title: currentTrack.title,
                artist: currentTrack.artist,
                album: currentTrack.album,
              }
            : undefined
        }
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        onNext={handleNext}
        onPrev={handlePrev}
        progress={progress}
        setProgress={setProgress}
      />
    </View>
  );
}

// --- NEW: RootNavigator Component to handle conditional rendering ---
const RootNavigator = () => {
  const { user, loading } = useAuth(); // Get user and loading state from AuthContext

  // 1. Show a loading indicator while the authentication status is being checked
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#AB8BFF" />{' '}
        {/* Use your accent color */}
      </View>
    );
  }

  // 2. Once loading is complete, conditionally render the appropriate stack
  return (
    <NavigationContainer>
      {/* If a user is logged in, show the main app content (TabNavigation) */}
      {user ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="TabNavigation" component={TabNavigation} />
          <Stack.Screen name="NowPlaying" component={NowPlayingScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
          {/* Add any other screens that are part of the main app but not in the bottom tabs */}
        </Stack.Navigator>
      ) : (
        // If no user is logged in, show the authentication stack
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

// --- Main App Component ---
const App = () => {
  return (
    <SafeAreaProvider>
      {/* Wrap the entire application with AuthProvider */}
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212', // A dark background for the loading screen
  },
});

export default App;
