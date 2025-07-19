import {
    View,
    Text,
    TextInput,
  // FlatList,
  // Image,
  // TouchableOpacity,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import RecentSongsList from '../components/RecentSongsSection';
import FlatCards from '../components/FlatCards';
import { recentSongs } from '../data/musicData';

const HomeScreen = () => {
    console.log('HomeScreen rendered');
    return (
        <SafeAreaView className="flex-1 bg-primary">
            <View className="h-20 items-start justify-center px-4">
                <Text className="text-2xl font-bold text-accent font-space-mono-bold">
                    Musify
                </Text>
            </View>

            <View className="ml-4 mt-2 mb-3">
                <Text className="text-yellow-300 text-2xl font-bold font-space-mono-bold">
                    Hi There,{' '}
                </Text>
                <Text className="text-white text-xl font-semibold font-space-mono-bold">
                    Aashish{' '}
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
            <RecentSongsList songs={recentSongs} />
        </SafeAreaView>
    );
};

export default HomeScreen;
