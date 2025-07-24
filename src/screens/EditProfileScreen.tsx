import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import storage from '@react-native-firebase/storage';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { updateProfilePictureUrl } from '../services/firebaseService';

const EditProfileScreen = () => {
  const { user } = useAuth();
  const guestImage = require('../assests/icons/guest.jpeg');
  const [uploading, setUploading] = useState(false);
  const [profilePic, setProfilePic] = useState(user?.profilePictureUrl || '');

  const handleImagePick = async () => {
    Alert.alert('Change Profile Picture', 'Choose an option', [
      {
        text: 'Camera',
        onPress: async () => {
          const result = await launchCamera({
            mediaType: 'photo',
            quality: 0.7,
          });
          if (result.assets && result.assets[0]?.uri) {
            uploadImage(result.assets[0].uri);
          }
        },
      },
      {
        text: 'Gallery',
        onPress: async () => {
          const result = await launchImageLibrary({
            mediaType: 'photo',
            quality: 0.7,
          });
          if (result.assets && result.assets[0]?.uri) {
            uploadImage(result.assets[0].uri);
          }
        },
      },
      {
        text: 'Remove',
        onPress: () => handleRemoveImage(),
        style: 'destructive',
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const uploadImage = async (uri: string) => {
    if (!user?.uid) return;
    setUploading(true);
    try {
      const reference = storage().ref(`profilePictures/${user.uid}.jpg`);
      await reference.putFile(uri);
      const url = await reference.getDownloadURL();
      setProfilePic(url);
      await updateProfilePictureUrl(user.uid, url);
    } catch (e) {
      Alert.alert('Upload failed', 'Could not upload image.');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = async () => {
    if (!user?.uid) return;
    setUploading(true);
    try {
      const reference = storage().ref(`profilePictures/${user.uid}.jpg`);
      await reference.delete();
      setProfilePic('');
      await updateProfilePictureUrl(user.uid, '');
    } catch (e) {
      Alert.alert('Remove failed', 'Could not remove image.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-primary px-6 pt-10">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-8">
        <Text className="text-3xl font-bold text-white font-space-mono-bold">
          Edit Profile
        </Text>
        <TouchableOpacity disabled={uploading}>
          <Text className="text-3xl text-accent">✔️</Text>
        </TouchableOpacity>
      </View>
      {/* Profile Image */}
      <View className="items-center mb-8">
        <TouchableOpacity onPress={handleImagePick} disabled={uploading}>
          <Image
            source={profilePic ? { uri: profilePic } : guestImage}
            className="w-32 h-32 rounded-full border-4 border-accent mb-2 bg-accent"
          />
          <View className="absolute bottom-2 right-8 bg-accent p-2 rounded-full border-2 border-primary">
            <Text className="text-white text-lg">✎</Text>
          </View>
        </TouchableOpacity>
        {uploading && <Text className="text-accent mt-2">Uploading...</Text>}
      </View>
      {/* Editable Fields */}
      <Text className="mb-2 text-lg text-accent font-bold">Name</Text>
      <TextInput
        className="border border-accent bg-primary text-white rounded-lg px-4 py-3 mb-6 text-lg"
        placeholder="Your name"
        placeholderTextColor="#9CA4AB"
        defaultValue={user?.name}
      />
      <Text className="mb-2 text-lg text-accent font-bold">E-mail Address</Text>
      <TextInput
        className="border border-accent bg-primary text-white rounded-lg px-4 py-3 mb-6 text-lg"
        placeholder="Email"
        placeholderTextColor="#9CA4AB"
        keyboardType="email-address"
        defaultValue={user?.email}
      />
      <Text className="mb-2 text-lg text-accent font-bold">User Name</Text>
      <TextInput
        className="border border-accent bg-primary text-white rounded-lg px-4 py-3 mb-6 text-lg"
        placeholder="Username"
        placeholderTextColor="#9CA4AB"
        defaultValue={user?.name?.toLowerCase().replace(/\s/g, '')}
      />
      <Text className="mb-2 text-lg text-accent font-bold">Password</Text>
      <TextInput
        className="border border-accent bg-primary text-white rounded-lg px-4 py-3 mb-8 text-lg"
        placeholder="Password"
        placeholderTextColor="#9CA4AB"
        secureTextEntry
      />
      <TouchableOpacity className="bg-accent py-4 rounded-lg mt-4 mb-10">
        <Text className="text-white text-center text-xl font-bold">Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditProfileScreen;
