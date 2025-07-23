import { View, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const SearchScreen = () => {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-primary">
      <View>
        <Text className="text-white text-lg font-space-mono-bold">
          SearchScreen
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;
