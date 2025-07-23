import TrackPlayer, { Event, RepeatMode } from 'react-native-track-player';

import { recentSongs } from '../data/musicData';

export const setupPlayer = async () => {    

    let isSetup = false;

    try {
        await TrackPlayer.getCurrentTrack()
        isSetup = true;
    } catch (error) {
        await TrackPlayer.setupPlayer()
        isSetup = true;
    } finally {
        return isSetup;
    }

}

export const loadTracks = async () => {
    await TrackPlayer.add( recentSongs );
    await TrackPlayer.setRepeatMode(RepeatMode.Queue);
}

export const PlaybackService = async () => {

    TrackPlayer.addEventListener(Event.RemotePlay, () => {
        TrackPlayer.play();
    });
    TrackPlayer.addEventListener(Event.RemotePause, () => {
        TrackPlayer.pause();
    });
    TrackPlayer.addEventListener(Event.RemoteNext, () => {
        TrackPlayer.skipToNext();
    });
    TrackPlayer.addEventListener(Event.RemotePrevious, () => {
        TrackPlayer.skipToPrevious();
    });
    TrackPlayer.addEventListener(Event.RemoteStop, () => {
        TrackPlayer.stop();
    });
    
}