import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import storage from '@react-native-firebase/storage';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import {
  updateProfilePictureUrl,
  updateUserProfile,
} from '../services/firebaseService';
import BackHeader from '../components/BackButton';

// Request Camera Permission
async function requestCameraPermission() {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera Permission',
        message: 'This app needs access to your camera to take photos.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true;
}

// Request Gallery/Storage Permission
async function requestGalleryPermission() {
  if (Platform.OS === 'android') {
    const permission =
      Platform.Version >= 33
        ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
        : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

    const granted = await PermissionsAndroid.request(permission, {
      title: 'Gallery Permission',
      message: 'This app needs access to your gallery to select photos.',
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    });
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true;
}

const EditProfileScreen = () => {
  const { user } = useAuth();
  const guestImage = require('../assests/icons/guest.jpeg');
  const [uploading, setUploading] = useState(false);
  const [profilePic, setProfilePic] = useState(user?.profilePictureUrl || '');
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [username, setUsername] = useState(
    user?.name?.toLowerCase().replace(/\s/g, '') || '',
  );
  const [password, setPassword] = useState('');
  const [saving, setSaving] = useState(false);

  const handleImagePick = async () => {
    Alert.alert('Change Profile Picture', 'Choose an option', [
      {
        text: 'Camera',
        onPress: async () => {
          const cameraGranted = await requestCameraPermission();
          if (!cameraGranted) {
            Alert.alert('Permission denied', 'Camera permission is required.');
            return;
          }
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
          const galleryGranted = await requestGalleryPermission();
          if (!galleryGranted) {
            Alert.alert('Permission denied', 'Gallery permission is required.');
            return;
          }
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
      await updateUserProfile(user.uid, { profilePictureUrl: url });
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
      await updateUserProfile(user.uid, { profilePictureUrl: '' });
    } catch (e) {
      Alert.alert('Remove failed', 'Could not remove image.');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!user?.uid) return;
    setSaving(true);
    try {
      await updateUserProfile(user.uid, {
        name,
        email,
        username,
        profilePictureUrl: profilePic,
      });
      Alert.alert('Success', 'Profile updated successfully!');
    } catch (e) {
      Alert.alert('Error', 'Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-primary px-6 pt-10">
      <BackHeader title="Edit Profile" />
      {/* Header right action (optional) */}
      <View style={{ alignItems: 'flex-end', marginBottom: 8 }}>
        <TouchableOpacity disabled={uploading || saving} onPress={handleSave}>
          <Text style={{ fontSize: 24, color: '#FF6F61' }}>
            {saving ? '...' : '✔️'}
          </Text>
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
        value={name}
        onChangeText={setName}
      />
      <Text className="mb-2 text-lg text-accent font-bold">E-mail Address</Text>
      <TextInput
        className="border border-accent bg-primary text-white rounded-lg px-4 py-3 mb-6 text-lg"
        placeholder="Email"
        placeholderTextColor="#9CA4AB"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <Text className="mb-2 text-lg text-accent font-bold">User Name</Text>
      <TextInput
        className="border border-accent bg-primary text-white rounded-lg px-4 py-3 mb-6 text-lg"
        placeholder="Username"
        placeholderTextColor="#9CA4AB"
        value={username}
        onChangeText={setUsername}
      />
      <Text className="mb-2 text-lg text-accent font-bold">Password</Text>
      <TextInput
        className="border border-accent bg-primary text-white rounded-lg px-4 py-3 mb-8 text-lg"
        placeholder="Password (not implemented)"
        placeholderTextColor="#9CA4AB"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        editable={false} // Not implemented for now
      />
      <TouchableOpacity
        className="bg-accent py-4 rounded-lg mt-4 mb-10"
        onPress={handleSave}
        disabled={saving}
      >
        <Text className="text-white text-center text-xl font-bold">Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditProfileScreen;
