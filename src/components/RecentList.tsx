import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'


const RecentList = () => {
    return (
        <View>
            
                <TouchableOpacity>
                    <View className='w-full h-'>
                        <Image
                            source={{ uri: 'https://i.pinimg.com/736x/6b/44/3d/6b443d716d06f5c1c7d068b9dad6460b.jpg' }}
                            className='w-24 h-24 rounded-2xl shadow-lg'
                            resizeMode='cover'
                        />
                        <Text className='text-white text-sm font-semibold text-center font-space-mono mt-2'>
                            Bin Tere - Vishal & Shekhar
                        </Text>
                    </View>
                </TouchableOpacity>
            
        </View>
    )
    }

export default RecentList