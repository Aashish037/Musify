import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import React from 'react';

// Inline Music type for this file to avoid import error
type Music = {
  id: string;
  title: string;
  artist: string;
  album: string;
  playCount: number;
  likes: number;
  releaseYear: number;
  isFavorite: boolean;
  movieName?: string;
  duration: number;
  icon?: any;
  audioUrl: string;
  genre?: string;
  releaseDate?: string;
};

interface RecentSongsListProps {
  songs: Music[];
  title?: string;
  onSongPress?: (music: Music) => void;
}

const RecentSongsList = ({
  songs,
  title = 'Recent Songs',
  onSongPress,
}: RecentSongsListProps) => {
  // Render a single grid cell (image on top, then song name, then artist)
  const renderSong = ({ item: song }: { item: Music }) => (
    <TouchableOpacity
      key={song.id}
      className="flex-1 m-2 items-center"
      activeOpacity={0.8}
      onPress={() => onSongPress && onSongPress(song)}
    >
      <Image
        source={song.icon}
        className="w-20 h-20 rounded-lg mb-2"
        resizeMode="cover"
      />
      <Text className="text-white text-base font-bold font-space-mono-bold text-center w-full">
        {song.title}
      </Text>
      <Text className="text-gray-400 text-xs font-space-mono-bold text-center w-full mt-1">
        {song.artist}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View className="mx-4 mt-1 flex-1">
      <Text className="text-white text-xl font-bold font-space-mono-bold mb-2">
        {title}
      </Text>
      <FlatList
        data={songs}
        keyExtractor={item => item.id}
        renderItem={renderSong}
        numColumns={2}
        columnWrapperClassName="justify-between"
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default RecentSongsList;
