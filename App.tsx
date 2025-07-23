
import './global.css' // Import global styles for Nativewind
import React from 'react';
import { Image, ImageSourcePropType, StyleProp, ImageStyle } from 'react-native'; // Import Image and related types
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from './src/screens/HomeScreen'
import LibraryScreen from './src/screens/LibraryScreen'
import SearchScreen from './src/screens/SearchScreen'
// import Icon from 'react-native-vector-icons/FontAwesome5'; // REMOVE THIS LINE
// import Icon1 from 'react-native-vector-icons/Lucide';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import NowPlayingScreen from './src/screens/NowPlayingScreen'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// --- Import your custom icon assets ---
// IMPORTANT: Adjust these paths to your actual file locations and names.
// Assuming you have 'home_active.png', 'home_inactive.png', etc., in 'assets/icons/'
import HomeActiveIcon from './src/assests/icons/home_active.png';
import HomeInactiveIcon from './src/assests/icons/home_inactive.png';
import LibraryActiveIcon from './src/assests/icons/library_active.png';
import LibraryInactiveIcon from './src/assests/icons/library_inactive.png';
import SearchActiveIcon from './src/assests/icons/search_active.png';
import SearchInactiveIcon from './src/assests/icons/search_inactive.png';

// --- Generic Custom Tab Bar Icon Component ---
// This component will handle rendering the correct image based on the 'focused' state
type CustomIconProps = {
  focused: boolean;
  _color: string; // This color might be used for tinting if your images are single-color
  size: number;
  activeIconSource: ImageSourcePropType;
  inactiveIconSource: ImageSourcePropType;
};

const CustomTabBarImage = ({
  focused,
  _color, // Prefix with underscore to indicate it's intentionally unused
  size,
  activeIconSource,
  inactiveIconSource,
}: CustomIconProps) => {
  const iconSource = focused ? activeIconSource : inactiveIconSource;

  // You can apply tintColor if your image assets are single-color (e.g., SVG or grayscale PNGs)
  // and you want them to be colored by the 'color' prop from React Navigation.
  // If your image assets are already colored PNGs/JPGs, remove or comment out tintColor.
  const imageStyle: StyleProp<ImageStyle> = {
    width: size,
    height: size,
    // tintColor: color, // Uncomment this line if you want to tint your icons dynamically
  };

  return <Image source={iconSource} style={imageStyle} resizeMode="contain" />;
};


// --- Specific Tab Bar Icon Components using CustomTabBarImage ---
// These components now use your image assets instead of FontAwesome icons
const HomeTabBarIcon = ({ color, size, focused }: { color: string; size: number; focused: boolean }) => (
  <CustomTabBarImage
    focused={focused}
    _color={color}
    size={size}
    activeIconSource={HomeActiveIcon}
    inactiveIconSource={HomeInactiveIcon}
  />
);

const LibraryTabBarIcon = ({ color, size, focused }: { color: string; size: number; focused: boolean }) => (
  <CustomTabBarImage
    focused={focused}
    _color={color}
    size={size}
    activeIconSource={LibraryActiveIcon}
    inactiveIconSource={LibraryInactiveIcon}
  />
);

const SearchTabBarIcon = ({ color, size, focused }: { color: string; size: number; focused: boolean }) => (
  <CustomTabBarImage
    focused={focused}
    _color={color}
    size={size}
    activeIconSource={SearchActiveIcon}
    inactiveIconSource={SearchInactiveIcon}
  />
);

// Tab icon renderer function
const getTabBarIcon = (route: any, focused: boolean, color: string, size: number) => {
  if (route.name === 'Home') {
    return <HomeTabBarIcon focused={focused} color={color} size={size} />;
  } else if (route.name === 'Search') {
    return <SearchTabBarIcon focused={focused} color={color} size={size} />;
  } else if (route.name === 'Library') {
    return <LibraryTabBarIcon focused={focused} color={color} size={size} />;
  }
  return null;
};

function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // Hide the header for all screens
        tabBarStyle: {
          backgroundColor: '#151312', // Dark background color for the tab bar (secondary color)
          borderTopWidth: 0, // Remove the top border
        },
        tabBarActiveTintColor: '#AB8BFF', // Active tab color (accent)
        tabBarInactiveTintColor: '#9CA4AB', // Inactive tab color (light-300)
        tabBarLabelStyle: {
          fontFamily: 'SpaceMono-Regular',
          fontSize: 12,
        },
        // Use the external function for tab bar icons
        tabBarIcon: ({ focused, color, size }) => 
          getTabBarIcon(route, focused, color, size),
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          // tabBarIcon is now handled by screenOptions above
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: 'Search',
          // tabBarIcon is now handled by screenOptions above
        }}
      />
      <Tab.Screen
        name="Library"
        component={LibraryScreen}
        options={{
          tabBarLabel: 'Your Library',
          // tabBarIcon is now handled by screenOptions above
        }}
      />
    </Tab.Navigator>
  );
}


const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="TabNavigation" component={TabNavigation} />
          <Stack.Screen name="NowPlaying" component={NowPlayingScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default App;