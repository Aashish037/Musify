/**
 * @format
 */
// import TrackPlayer from 'react-native-track-player';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
// import { PlaybackService } from './src/services/musicPlayerService';

// TrackPlayer.registerPlaybackService(() => PlaybackService);

AppRegistry.registerComponent(appName, () => App);
// AppRegistry.registerComponent(...);
// TrackPlayer.registerPlaybackService(() => require('./service'));