import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../navigation/types';
import { useAuth } from '../context/AuthContext';
import LinearGradient from 'react-native-linear-gradient';
import BackHeader from '../components/BackButton';

const SignUpScreen = ({
  navigation,
}: NativeStackScreenProps<AuthStackParamList, 'SignUp'>) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signUp } = useAuth();

  const handleSignUp = async () => {
    setError(null);
    if (!email || !username || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    try {
      await signUp(email, password, username);
      // Navigation will be handled by auth state change
    } catch (e: any) {
      setError(e.message || 'Failed to sign up.');
    }
  };

  return (
    <LinearGradient
      colors={['#18181c', '#23243a']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-1 justify-center items-center"
    >
      <SafeAreaView className="flex-1 w-full justify-center items-center">
        <BackHeader title="Sign Up" />
        <View className="flex-1 w-full justify-center items-center">
          <Text className="text-4xl font-bold text-white mb-1 font-space-mono-bold text-center">
            Musify
          </Text>
          <Text className="text-gray-300 text-base mb-8 text-center opacity-85">
            Never Lost. Discover New Music.
          </Text>
          <View className="bg-black/60 rounded-3xl px-6 py-8 w-11/12 max-w-md items-center shadow-lg backdrop-blur-md">
            {/* Removed duplicate Sign Up header, BackHeader is now used */}
            {error && (
              <Text className="text-red-600 text-base mb-2 text-center">
                {error}
              </Text>
            )}
            {/* Email */}
            <View className="flex-row items-center bg-gray-800 rounded-xl mb-4 px-3 py-1 w-full">
              <MaterialIcons
                name="email"
                size={20}
                color="#888"
                style={{ marginRight: 8 }}
              />
              <TextInput
                placeholder="Email"
                placeholderTextColor="#888"
                className="flex-1 h-11 text-base text-gray-100 font-space-mono"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            {/* Username */}
            <View className="flex-row items-center bg-gray-800 rounded-xl mb-4 px-3 py-1 w-full">
              <Ionicons
                name="person"
                size={20}
                color="#888"
                style={{ marginRight: 8 }}
              />
              <TextInput
                placeholder="Username"
                placeholderTextColor="#888"
                className="flex-1 h-11 text-base text-gray-100 font-space-mono"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />
            </View>
            {/* Password */}
            <View className="flex-row items-center bg-gray-800 rounded-xl mb-4 px-3 py-1 w-full">
              <MaterialIcons
                name="lock"
                size={20}
                color="#888"
                style={{ marginRight: 8 }}
              />
              <TextInput
                placeholder="Password"
                placeholderTextColor="#888"
                className="flex-1 h-11 text-base text-gray-100 font-space-mono"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <MaterialIcons
                  name={showPassword ? 'visibility-off' : 'visibility'}
                  size={20}
                  color="#888"
                />
              </TouchableOpacity>
            </View>
            {/* Confirm Password */}
            <View className="flex-row items-center bg-gray-800 rounded-xl mb-4 px-3 py-1 w-full">
              <MaterialIcons
                name="lock-outline"
                size={20}
                color="#888"
                style={{ marginRight: 8 }}
              />
              <TextInput
                placeholder="Confirm Password"
                placeholderTextColor="#888"
                className="flex-1 h-11 text-base text-gray-100 font-space-mono"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
            </View>
            {/* Sign Up Button */}
            <TouchableOpacity
              className="bg-blue-600 rounded-xl py-3 w-full mt-2 mb-2 items-center"
              onPress={handleSignUp}
            >
              <Text className="text-white text-lg font-bold">
                Create Account
              </Text>
            </TouchableOpacity>
            {/* Toggle to Sign In */}
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <Text className="text-gray-300 text-base mt-2 text-center">
                Already have an account?{' '}
                <Text className="text-blue-400 font-bold">Sign In</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default SignUpScreen;
