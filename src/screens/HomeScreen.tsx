import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const HomeScreen = () => {
    return (
        <SafeAreaView className='flex-1 bg-white'>
            <View className='h-20 items-start justify-center px-4'>
                <Text className='text-2xl font-bold text-yellow-700'>Musify</Text>
            </View>

            <View>
                <Text>card</Text>
            </View>

        </SafeAreaView>
    )
}

export default HomeScreen

