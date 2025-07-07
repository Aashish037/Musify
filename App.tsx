import './global.css' // Import global styles for Nativewind
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from './src/screens/HomeScreen'
import ProfileScreen from './src/screens/ProfileScreen'
import SearchScreen from './src/screens/SearchScreen'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { SafeAreaProvider } from 'react-native-safe-area-context'


const Tab = createBottomTabNavigator();

const HomeTabBarIcon = ({ color, size }: { color: string; size: number }) => (
  <Icon name="home" color={color} size={size} />
);

const ProfileTabBarIcon = ({ color, size }: { color: string; size: number }) => (
  <Icon name="user" color={color} size={size} />
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
          backgroundColor: '#f8f9fa', // Light background color for the tab bar
          borderTopWidth: 0, // Remove the top border
        },
        tabBarActiveTintColor: '#007bff', // Active tab color
        tabBarInactiveTintColor: '#6c757d', // Inactive tab color
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
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ProfileTabBarIcon
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

