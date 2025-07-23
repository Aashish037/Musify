import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

interface MusicControlProps {
  visible: boolean;
  track?: {
    icon: any; // local image import
    title: string;
    artist: string;
    album?: string;
  };
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  progress?: number; // 0 to 1
}

const MusicControl: React.FC<MusicControlProps> = ({
  visible,
  track,
  isPlaying,
  onPlayPause,
  onNext,
  onPrev,
  progress = 0,
}) => {
  const navigation = useNavigation();
  if (!visible || !track) return null;
  return (
    <View className="absolute left-4 right-4 bottom-20 z-50 bg-neutral-900/90 flex-row items-center rounded-xl shadow-lg p-2">
      <TouchableOpacity
        className="flex-row items-center flex-1"
        onPress={() =>
          (navigation as any).navigate('NowPlaying', { song: track })
        }
        activeOpacity={0.8}
      >
        <Image source={track.icon} className="w-12 h-12 rounded-lg mr-3" />
        <View>
          <Text className="text-white font-bold text-sm" numberOfLines={1}>
            {track.title}
          </Text>
          <Text className="text-neutral-300 text-xs" numberOfLines={1}>
            {track.artist}
            {track.album ? ` • ${track.album}` : ''}
          </Text>
          <View className="h-1 bg-neutral-700 rounded mt-1 w-full overflow-hidden">
            <View
              className="h-1 bg-red-500 rounded"
              style={{ width: `${progress * 100}%` }}
            />
          </View>
        </View>
      </TouchableOpacity>
      <View className="flex-row items-center ml-2">
        <TouchableOpacity onPress={onPrev}>
          <Image
            source={require('../assests/icons/previous-button.png')}
            className="w-6 h-6 mx-1 tint-white"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPlayPause}>
          <Image
            source={
              isPlaying
                ? require('../assests/icons/pause.png')
                : require('../assests/icons/play.png')
            }
            className="w-6 h-6 mx-1 tint-white"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onNext}>
          <Image
            source={require('../assests/icons/next-button.png')}
            className="w-6 h-6 mx-1 tint-white"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MusicControl;
