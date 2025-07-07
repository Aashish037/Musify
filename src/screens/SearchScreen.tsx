import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const SearchScreen = () => {
  return (
    <SafeAreaView className='flex-1 items-center justify-center bg-white'>
        <View>
            <Text>SearchScreen</Text>
        </View>
    </SafeAreaView>
  )
}

export default SearchScreen