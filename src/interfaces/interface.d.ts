/**
 * Represents a single music track or song.
 */
interface Music {
  id: string; // Unique identifier for the song
  title: string; // Title of the song
  artist: string; // Name of the artist
  album: string; // Name of the album the song belongs to
  playCount: number; // Number of times the song has been played
  likes: number; // Number of likes the song has received
  releaseYear: number; // Year the song was released
  isFavorite: boolean; // Indicates if the song is marked as a favorite by the user
  movieName?: string; // Optional: Name of the movie if the song is from a soundtrack
  duration: number; // Duration of the song in seconds
  // albumArtUrl: string; // URL to the album cover art
  icon?: string; // Optional: URL or path to the icon representing the song
  audioUrl: string; // URL to the audio file of the song
  genre?: string; // Optional: Genre of the music (e.g., Pop, Rock, Classical)
  releaseDate?: string; // Optional: Release date of the song (e.g., "YYYY-MM-DD")
}

/**
 * Represents a trending music track, often used in lists of popular or trending songs.
 */
interface TrendingMusic {
  musicId: string; // Unique identifier for the trending song
  title: string; // Title of the trending song
  artist: string; // Artist of the trending song
  trendScore: number; // A numerical value indicating its trending status (e.g., play count, popularity score)
  albumArtUrl: string; // URL to the album cover art for the trending song
    audioUrl: string; // URL to the audio file of the trending song
    movieName?: string; // Optional: Name of the movie if the song is from a soundtrack
    duration: number; // Duration of the song in seconds
}

/**
 * Represents detailed information about a specific music track,
 * typically shown on a dedicated song detail page or "now playing" screen.
 */
interface MusicDetails {
  id: string; // Unique identifier for the song
  title: string; // Title of the song
  artist: string; // Name of the artist
  album: string; // Name of the album the song belongs to
  duration: number; // Duration of the song in seconds
  albumArtUrl: string; // URL to the album cover art
  audioUrl: string; // URL to the audio file of the song
  genre?: string; // Optional: Genre of the music
  releaseDate?: string; // Optional: Release date of the song
  lyrics?: string; // Optional: Full lyrics of the song
  label?: string; // Optional: Record label
  movieName?: string; // Optional: Name of the movie if the song is from a soundtrack
  playCount: number; // Number of times the song has been played
  likes: number; // Number of likes the song has received
  isFavorite: boolean; // Indicates if the song is marked as a favorite by the user
  releaseYear: number; // Year the song was released
  relatedSongs?: Music[]; // Optional: List of related songs (e.g., similar tracks or songs by the same artist)
  comments?: { user: string; comment: string; timestamp: string }[]; // Optional: List of user comments on the song
  isAvailableOffline?: boolean; // Optional: Indicates if the song is available for offline listening
  isLikedByUser?: boolean; // Optional: Indicates if the song is liked by the current user
  isDislikedByUser?: boolean; // Optional: Indicates if the song is disliked by the current user
}

/**
 * Props interface for a component that displays a trending music card.
 */
interface TrendingCardProps {
  music: TrendingMusic; // The trending music object to display
  index: number; // The index of the card in a list (useful for unique keys or ordering)
    onClick: (musicId: string) => void; // Callback function to handle click events on the card
    isPlaying: boolean; // Indicates if the music is currently playing
    isPaused: boolean; // Indicates if the music is paused
    isLiked: boolean; // Indicates if the music is liked by the user
    isDisliked: boolean; // Indicates if the music is disliked by the user

    /*
    onLike: (musicId: string) => void; // Callback function to handle liking the music
    onDislike: (musicId: string) => void; // Callback function to handle disliking the music
    onPlay: (musicId: string) => void; // Callback function to handle playing the music
    onPause: (musicId: string) => void; // Callback function to handle pausing the music
    onAddToPlaylist: (musicId: string) => void; // Callback function to handle adding the music to a playlist
    onRemoveFromPlaylist: (musicId: string) => void; // Callback function to handle removing the music from a playlist
    onShare: (musicId: string) => void; // Callback function to handle sharing the music
    onDownload: (musicId: string) => void; // Callback function to handle downloading the music
    onViewDetails: (musicId: string) => void; // Callback function to handle viewing details of the music
    onAddToFavorites: (musicId: string) => void; // Callback function to handle adding the music to favorites
    onRemoveFromFavorites: (musicId: string) => void; // Callback function to handle removing the music from favorites
    onReport: (musicId: string) => void; // Callback function to handle reporting the music
    onComment: (musicId: string, comment: string) => void; // Callback function to handle commenting on the music
*/
}
