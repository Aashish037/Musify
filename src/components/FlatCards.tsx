import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { categoryCards } from '../data/musicData';

const FlatCards = () => {
  return (
    <View className="h-44 mb-4">
      <FlatList
        data={categoryCards}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        className="px-4"
        renderItem={({ item }) => (
          <TouchableOpacity className="items-center mr-4" activeOpacity={0.8}>
            <Image
              // source={{ uri: item.uri }}
              source={item.icon} // Use the icon from categoryCards
              className="w-28 h-28 rounded-2xl shadow-lg"
              resizeMode="cover"
            />
            <Text className="text-white text-sm font-semibold text-center font-space-mono-bold mt-2 w-28">
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default FlatCards;
