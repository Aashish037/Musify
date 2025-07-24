import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

interface LibraryScreenProps {
  onSongPress: (song: { id: string }) => void;
}

const LibraryScreen: React.FC<LibraryScreenProps> = ({ onSongPress }) => {
  // Placeholder song
  const dummySong = { id: '1' };
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-primary">
      <View>
        <Text className="text-white text-lg font-space-mono-bold">
          LibraryScreen
        </Text>
        <TouchableOpacity
          className="mt-4 px-4 py-2 bg-blue-600 rounded"
          onPress={() => onSongPress(dummySong)}
        >
          <Text className="text-white">Play Dummy Song</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LibraryScreen;
