import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import type { Music } from '../interfaces/interface';

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
  const renderItem = ({ item }: { item: Music }) => (
    <TouchableOpacity
      className="flex-row items-center py-2 px-2"
      activeOpacity={0.8}
      onPress={() => onSongPress && onSongPress(item)}
    >
      <Image
        source={item.icon}
        className="w-14 h-14 rounded-lg shadow-lg"
        resizeMode="cover"
      />
      <View className="ml-3 flex-1">
        <Text className="text-white text-sm font-semibold font-space-mono-bold">
          {item.title}
        </Text>
        <Text className="text-gray-300 text-xs font-space-mono-bold mt-1">
          {item.artist}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="mx-4 mt-1">
      <Text className="text-white text-xl font-bold font-space-mono-bold mb-2">
        {title}
      </Text>
      <FlatList
        numColumns={2}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={songs}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        renderItem={renderItem}
      />
    </View>
  );
};

export default RecentSongsList;
