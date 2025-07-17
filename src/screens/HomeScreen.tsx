import {
View,
Text,
TextInput,
FlatList,
Image,
TouchableOpacity,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const CardIcons = [
    {
        id: 1,
        title: 'favouite',
        uri: 'https://i.pinimg.com/736x/6b/44/3d/6b443d716d06f5c1c7d068b9dad6460b.jpg',
    },

    {
        id: 2,
        title: 'travel',
        uri: 'https://i.pinimg.com/736x/22/f4/28/22f4285d816b01de00ebfd1dcc99fa72.jpg',
    },
    {
        id: 3,
        title: 'Smooth',
        uri: 'https://i.pinimg.com/736x/b3/b1/29/b3b129b50d8afd380983a0c9216f4079.jpg',
    },
    {
        id: 4,
        title: 'Playlist',
        uri: 'https://i.pinimg.com/736x/ae/97/c4/ae97c4b86c679700671bd8a772911444.jpg',
    },
];

const HomeScreen = () => {
    return (
        <SafeAreaView className="flex-1 bg-primary">
        <View className="h-20 items-start justify-center px-4">
            <Text className="text-2xl font-bold text-accent font-space-mono">
            Musify
            </Text>
        </View>

        <View className="ml-4 mt-3 mb-4">
            <Text className="text-yellow-300 text-2xl font-bold font-space-mono">
            Hi There,{' '}
            </Text>
            <Text className="text-white text-xl font-semibold font-space-mono">
            Aashish{' '}
            </Text>
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center  px-4 mb-5">
            <TextInput
            className="bg-accent rounded-lg p-4 min-h-15 w-full flex-1 "
            placeholder="Search for a song"
            />
        </View>

        {/* Card */}
        <FlatList
            data={CardIcons}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
            <TouchableOpacity className="items-center m-3" activeOpacity={0.8}>
                <Image
                source={{ uri: item.uri }}
                className="w-32 h-32 rounded-2xl shadow-lg"
                resizeMode="cover"
                />
                <Text className="text-white text-sm font-semibold text-center font-space-mono mt-2">
                {item.title}
                </Text>
            </TouchableOpacity>
            )}
        />

        {/* Recent Songs Section */}
            <View className="ml-4 mt-2">
                <Text className="text-white text-2xl font-bold font-space-mono mb-2">
                Recent Songs
                </Text>
                <View className="mb-2">
                <Text className="text-white text-base font-space-mono">
                    • Bin Tere - Vishal & Shekhar
                </Text>
                <Text className="text-white text-base font-space-mono">
                    • Saasein - Prateek Kuhad
                </Text>
                <Text className="text-white text-base font-space-mono">
                    • Kaun Hain Voh - Kailash Kher
                </Text>
                </View>
            </View>
            
        </SafeAreaView>
    );
};

export default HomeScreen;
