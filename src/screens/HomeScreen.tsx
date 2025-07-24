import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';
import RecentSongsList from '../components/RecentSongsSection';
import FlatCards from '../components/FlatCards';
import { recentSongs } from '../data/musicData';
import { useNavigation } from '@react-navigation/native';

interface HomeScreenProps {
  onSongPress: (song: { id: string }) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onSongPress }) => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const guestImage = require('../assests/icons/guest.jpeg');

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <View className="flex-row items-center justify-between h-20 px-4">
        <View>
          <Text className="text-2xl font-bold text-accent font-space-mono-bold">
            Musify
          </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Profile' as never)}>
          <Image
            source={user?.profilePictureUrl ? { uri: user.profilePictureUrl } : guestImage}
            className="w-12 h-12 rounded-full border-2 border-yellow-300"
          />
        </TouchableOpacity>
      </View>

      <View className="ml-4 mt-2 mb-3">
        <Text className="text-yellow-300 text-2xl font-bold font-space-mono-bold">
          Halo,{' '}
        </Text>
        <Text className="text-white text-xl font-semibold font-space-mono-bold">
          {user?.name || user?.email?.split('@')[0] || 'Guest'}{' '}
        </Text>
      </View>

      {/* Search Bar */}
      <View className="flex-row items-center px-4 mb-4">
        <TextInput
          className="bg-accent rounded-lg p-4 min-h-15 w-full flex-1 "
          placeholder="Search for a song"
        />
      </View>

      {/* Category Cards */}
      <FlatCards />

      {/* Featured Section */}
      {/* Recent Songs Section */}
      <RecentSongsList songs={recentSongs} onSongPress={onSongPress} />
    </SafeAreaView>
  );
};

export default HomeScreen;
