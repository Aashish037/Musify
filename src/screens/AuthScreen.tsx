import { View, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../navigation/types';

const AuthScreen = ({
  navigation,
}: NativeStackScreenProps<AuthStackParamList, 'Auth'>) => (
  <LinearGradient
    colors={['#18181c', '#23243a']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    className="flex-1 justify-center items-center"
  >
    <View className="w-11/12 max-w-md rounded-3xl px-8 py-10 items-center bg-black/60 shadow-lg backdrop-blur-md">
      <Text className="text-4xl font-bold text-white mb-3 tracking-wide">
        Musify
      </Text>
      <Text className="text-gray-300 text-base mb-8 text-center opacity-85">
        Never Lost. Discover New Music.
      </Text>
      <TouchableOpacity
        className="w-full mb-4 py-3 rounded-xl items-center bg-slate-800/80"
        onPress={() => navigation.navigate('SignIn')}
      >
        <Text className="text-white text-lg font-bold">Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="w-full py-3 rounded-xl items-center bg-slate-800/80"
        onPress={() => navigation.navigate('SignUp')}
      >
        <Text className="text-white text-lg font-bold">Sign Up</Text>
      </TouchableOpacity>
    </View>
  </LinearGradient>
);

export default AuthScreen;
