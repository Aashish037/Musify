import { View, Text, TextInput } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import RecentSongsList from '../components/RecentSongsSection';
import FlatCards from '../components/FlatCards';
import { recentSongs } from '../data/musicData';
import MusicControl from '../components/MusicControl';

const HomeScreen = () => {
  const navigation = useNavigation();
  // State for mini player
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, _setProgress] = useState(0.3); // 30% progress
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(
    null,
  );

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
  const handleSongPress = (song: { id: string }) => {
    const idx = recentSongs.findIndex(s => s.id === song.id);
    setCurrentTrackIndex(idx);
    setIsPlaying(true);
    (navigation as any).navigate('NowPlaying', { song });
  };
  const currentTrack =
    currentTrackIndex !== null ? recentSongs[currentTrackIndex] : null;

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
      <RecentSongsList songs={recentSongs} onSongPress={handleSongPress} />

      {/* Mini Player Floating Above Tab Bar */}
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
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
