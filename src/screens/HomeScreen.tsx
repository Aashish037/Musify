import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const HomeScreen = () => {
    return (
        <SafeAreaView className='flex-1 bg-primary'>
            <View className='h-20 items-start justify-center px-4'>
                <Text className='text-2xl font-bold text-accent font-space-mono'>Musify</Text>
            </View>

            <View className='m-4'>
                <Text className='text-white font-space-mono'>card</Text>
            </View>

        </SafeAreaView>
    )
}

export default HomeScreen

