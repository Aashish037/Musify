import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Animated,
  Easing,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Slider from '@react-native-community/slider';

// Icon imports
import heart from '../assests/icons/heart.png';
import heartInactive from '../assests/icons/heart_inactive.png';
import shuffleIcon from '../assests/icons/shuffle.png';
import repeatIcon from '../assests/icons/repeat.png';
import previousIcon from '../assests/icons/previous-button.png';
import nextIcon from '../assests/icons/next-button.png';
import playIcon from '../assests/icons/play.png';
import pauseIcon from '../assests/icons/pause.png';
import shrinkIcon from '../assests/icons/shrink.png';

const NowPlayingScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  // @ts-ignore
  const song = route.params?.song;
  const rotation = useRef(new Animated.Value(0)).current;
  const [isPlaying, setIsPlaying] = useState(true);
  const [duration] = useState(song?.duration || 220);
  const [isFavorite, setIsFavorite] = useState(song?.isFavorite || false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0);
  const [progress, setProgress] = useState(0.3); // 0 to 1

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 8000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    if (isPlaying) {
      animation.start();
    } else {
      animation.stop();
    }
    return () => animation.stop();
  }, [rotation, isPlaying]);

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Fallback if no song is passed
  if (!song) {
    return (
      <LinearGradient
        colors={['#23243a', '#18181c', '#0a0a0f']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{ flex: 1 }}
      >
        <SafeAreaView className="flex-1 items-center justify-center">
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
          />
          <Text className="text-white text-lg">No song selected</Text>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={['#18122B', '#3A2C60', '#FFE066']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={{ flex: 1 }}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <SafeAreaView className="flex-1">
        {/* Top Bar */}
        <View className="flex-row items-center justify-between px-6 pt-4">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="p-2 rounded-full bg-black/20"
            activeOpacity={0.7}
          >
            <Image
              source={shrinkIcon}
              className="w-7 h-7 tint-white"
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text className="text-white text-lg font-space-mono-bold opacity-90">
            Now Playing
          </Text>
          <TouchableOpacity
            onPress={() => setIsFavorite(!isFavorite)}
            className="p-2 rounded-full bg-black/20"
            activeOpacity={0.7}
          >
            <Image
              source={isFavorite ? heart : heartInactive}
              className="w-7 h-7 tint-white"
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* CD (Album Art) */}
        <View className="flex-1 items-center justify-center">
          <View className="shadow-lg shadow-black/25">
            <Animated.Image
              source={song?.icon}
              className="w-72 h-72 rounded-full"
              style={{ transform: [{ rotate: spin }] }}
              resizeMode="cover"
            />
          </View>
        </View>

        {/* Song Info and Controls (no card) */}
        <View className="px-6 pb-10">
          {/* Song Info */}
          <Text className="text-white text-2xl font-bold font-space-mono-bold text-center mb-1">
            {song?.title || 'No Song'}
          </Text>
          <Text className="text-gray-200 text-lg font-space-mono text-center mb-1">
            {song?.artist || 'Unknown Artist'}
          </Text>
          <Text className="text-gray-300 text-sm font-space-mono text-center mb-4">
            {song?.album || 'Unknown Album'}
          </Text>

          {/* Progress Bar */}
          <View className="mb-2">
            <View className="flex-row justify-between mb-1">
              <Text className="text-gray-200 text-xs font-space-mono">
                {formatTime(Math.floor(progress * duration))}
              </Text>
              <Text className="text-gray-200 text-xs font-space-mono">
                {formatTime(duration)}
              </Text>
            </View>
            <Slider
              className="w-full h-5 bg-white/30 rounded-full"
              minimumValue={0}
              maximumValue={1}
              value={progress}
              onValueChange={setProgress}
              minimumTrackTintColor="#f87171"
              maximumTrackTintColor="#888"
              thumbTintColor="#fff"
            />
          </View>

          {/* Controls */}
          <View className="flex-row justify-between items-center mt-6">
            <TouchableOpacity
              onPress={() => setIsShuffled(!isShuffled)}
              className="bg-transparent"
            >
              <Image
                source={shuffleIcon}
                className="w-7 h-7"
                resizeMode="contain"
                style={{
                  tintColor: isShuffled ? '#fff' : '#fff',
                  opacity: isShuffled ? 1 : 0.7,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}} className="bg-transparent">
              <Image
                source={previousIcon}
                className="w-10 h-10 tint-white"
                resizeMode="contain"
                style={{ opacity: 0.85 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsPlaying(!isPlaying)}
              className="mx-4 bg-white rounded-full p-6 shadow-lg shadow-white/25"
            >
              <Image
                source={isPlaying ? pauseIcon : playIcon}
                className="w-8 h-8 tint-[#23243a]"
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}} className="bg-transparent">
              <Image
                source={nextIcon}
                className="w-10 h-10 tint-white"
                resizeMode="contain"
                style={{ opacity: 0.85 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setRepeatMode((repeatMode + 1) % 3)}
              className="bg-transparent"
            >
              <Image
                source={repeatIcon}
                className="w-7 h-7"
                resizeMode="contain"
                style={{
                  tintColor: repeatMode > 0 ? '#fff' : '#fff',
                  opacity: repeatMode > 0 ? 1 : 0.7,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default NowPlayingScreen;
