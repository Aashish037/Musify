import './global.css' // Import global styles for Nativewind
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from './src/screens/HomeScreen'
import LibraryScreen from './src/screens/LibraryScreen'
import SearchScreen from './src/screens/SearchScreen'
import Icon from 'react-native-vector-icons/FontAwesome5';
// import Icon1 from 'react-native-vector-icons/Lucide';
import { SafeAreaProvider } from 'react-native-safe-area-context'


const Tab = createBottomTabNavigator();

const HomeTabBarIcon = ({ color, size }: { color: string; size: number }) => (
  <Icon name="home" color={color} size={size} />
);

const LibraryTabBarIcon = ({ color, size }: { color: string; size: number }) => (
  <Icon name="book" color={color} size={size} />
);

const SearchTabBarIcon = ({ color, size }: { color: string; size: number }) => (
  <Icon name="search" color={color} size={size} />
);

function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
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
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: HomeTabBarIcon
        }}
      />
        <Tab.Screen 
          name="Search" 
          component={SearchScreen}
          options={{
            tabBarLabel: 'Search',
            tabBarIcon: SearchTabBarIcon
          }}
        />
      <Tab.Screen 
        name="Library" 
        component={LibraryScreen}
        options={{
          tabBarLabel: 'Library',
          tabBarIcon: LibraryTabBarIcon
        }}
      />
    </Tab.Navigator>
  );
}


const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <TabNavigation />
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default App

