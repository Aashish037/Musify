import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import BackHeader from '../components/BackButton';

const ProfileScreen = () => {
  const { user, logout } = useAuth();
  const navigation = useNavigation();
  const guestImage = require('../assests/icons/guest.jpeg');

  return (
    <View className="flex-1 bg-primary px-6 pt-10">
      <BackHeader title="My Profile" />
      {/* Header right action (optional) */}
      <View style={{ alignItems: 'flex-end', marginBottom: 8 }}>
        <TouchableOpacity>
          <Text style={{ fontSize: 22, color: '#FF6F61' }}>⚙️</Text>
        </TouchableOpacity>
      </View>
      {/* Profile Image and Info */}
      <View className="items-center mb-6">
        <Image
          source={
            user?.profilePictureUrl
              ? { uri: user.profilePictureUrl }
              : guestImage
          }
          className="w-28 h-28 rounded-full border-4 border-accent mb-4 bg-accent"
        />
        <Text className="text-lg font-bold text-white font-space-mono-bold">
          {user?.name || 'No Name'}
        </Text>
        <Text className="text-accent text-base">
          @{user?.name?.toLowerCase().replace(/\s/g, '') || 'username'}
        </Text>
        <Text className="text-gray-400 text-sm mb-2">
          {user?.email || 'No Email'}
        </Text>
        <TouchableOpacity
          className="bg-accent px-8 py-2 rounded-lg mt-2"
          onPress={() => navigation.navigate('EditProfile' as never)}
        >
          <Text className="text-white font-bold">Edit Profile</Text>
        </TouchableOpacity>
      </View>
      {/* Action Buttons */}
      <View className="mt-8 space-y-6">
        <TouchableOpacity className="flex-row items-center space-x-3">
          <Text className="text-xl text-accent">⬇️</Text>
          <Text className="text-base text-white">Downloads</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-row items-center space-x-3 mt-6"
          onPress={logout}
        >
          <Text className="text-xl text-red-400">🚪</Text>
          <Text className="text-base text-red-400">Log out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;
