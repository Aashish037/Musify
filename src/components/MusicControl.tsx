import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider';

const TAB_BAR_HEIGHT = 56; // adjust if your tab bar is taller/shorter

interface MusicControlProps {
  visible: boolean;
  track?: {
    icon: any;
    title: string;
    artist: string;
    album?: string;
  };
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  progress?: number;
  setProgress?: (value: number) => void;
}

const MusicControl: React.FC<MusicControlProps> = ({
  visible,
  track,
  isPlaying,
  onPlayPause,
  onNext,
  onPrev,
  progress = 0,
  setProgress,
}) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  if (!visible || !track) return null;

  return (
    <View
      className="absolute left-0 right-0 z-50 px-2"
      style={{
        bottom: insets.bottom + TAB_BAR_HEIGHT + 8, // 8px gap above tab bar
      }}
    >
      <View className="flex-row items-center bg-white/90 rounded-2xl shadow-lg backdrop-blur-md px-3 py-2">
        <TouchableOpacity
          className="flex-row items-center flex-1"
          onPress={() =>
            (navigation as any).navigate('NowPlaying', { song: track })
          }
          activeOpacity={0.8}
        >
          <Image source={track.icon} className="w-12 h-12 rounded-lg mr-3" />
          <View className="flex-1">
            <Text className="text-black font-bold text-sm" numberOfLines={1}>
              {track.title}
            </Text>
            <Text className="text-gray-700 text-xs" numberOfLines={1}>
              {track.artist}
              {track.album ? ` • ${track.album}` : ''}
            </Text>
            <Slider
              className="w-full h-3"
              minimumValue={0}
              maximumValue={1}
              value={progress}
              onValueChange={setProgress}
              minimumTrackTintColor="#6366f1" // light accent
              maximumTrackTintColor="#bbb"
              thumbTintColor="#23243a"
            />
          </View>
        </TouchableOpacity>
        <View className="flex-row items-center ml-2">
          <TouchableOpacity onPress={onPrev} className="p-1">
            <Image
              source={require('../assests/icons/previous-button.png')}
              className="w-6 h-6 tint-black"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onPlayPause} className="p-1">
            <Image
              source={
                isPlaying
                  ? require('../assests/icons/pause.png')
                  : require('../assests/icons/play.png')
              }
              className="w-6 h-6 tint-black"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onNext} className="p-1">
            <Image
              source={require('../assests/icons/next-button.png')}
              className="w-6 h-6 tint-black"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MusicControl;
