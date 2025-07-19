// Sample music data for the application
// import { Music } from '../data/musicData'; // Adjust path as needed
import recentIcon1 from '../assests/icons/RecentIcon1.jpeg';
import recentIcon2 from '../assests/icons/RecentIcon2.jpeg'; 
import recentIcon3 from '../assests/icons/RecentIcon3.png';
import recentIcon4 from '../assests/icons/RecentIcon4.jpeg';
import recentIcon5 from '../assests/icons/RecentIcon5.jpeg';
import recentIcon6 from '../assests/icons/RecentIcon6.jpeg';
import recentIcon7 from '../assests/icons/RecentIcon7.jpeg';
import recentIcon8 from '../assests/icons/RecentIcon8.jpeg';

export const recentSongs: Music[] = [
    {
        id: '1',
        title: 'Abhi Na Jao Chodde karo',
        artist: 'Mohammed Rafi, Asha Bhosle',
        album: 'Hum Dono',
        icon: recentIcon1,
        audioUrl: '',
        duration: 220,
        playCount: 15000,
        likes: 42000,
        releaseYear: 1961,
        isFavorite: true,
        movieName: 'Hum Dono',
        genre: 'Bollywood',
        releaseDate: '1961-01-01',
    },
    {
        id: '2',
        title: 'Bade Achhe Lagte Hain',
        artist: 'Sherya Ghoshal, ',
        album: 'Bade Achhe Lagte Hain serial',
        icon: recentIcon2,
        audioUrl: '',
        duration: 210,
        playCount: 28000,
        likes: 67000,
        releaseYear: 2011,
        isFavorite: true,
        genre: 'Bollywood',
        releaseDate: '2011-05-29',
    },
    {
        id: '3',
        title: 'Bawre Mann',
        artist: 'Swanand Kirkire, Shantanu Moitra',
        album: 'Hazaaron Khwaishein Aisi',
        icon: recentIcon3,
        audioUrl: '',
        duration: 335,
        playCount: 33000,
        likes: 89000,
        releaseYear: 2005,
        isFavorite: false,
        genre: 'Bollywood',
        releaseDate: '2005-04-15',
    },
    {
        id: '4',
        title: 'Mahiya',
        artist: 'Wajid, Suzanne D\'Mello ',
        album: 'Awarapan',
        icon: recentIcon4,
        audioUrl: '',
        duration: 330,
        playCount: 33000,
        likes: 89000,
        releaseYear: 2009,
        isFavorite: false,
        genre: 'Bollywood',
        releaseDate: '2009-06-29',
    },
    {
        id: '5',
        title: 'Jo Bhi Main',
        artist: 'Mohit Chauhan',
        album: 'Rockstar',
        icon: recentIcon5,
        audioUrl: '',
        duration: 295,
        playCount: 33000,
        likes: 79000,
        releaseYear: 2011,
        isFavorite: true,
        genre: 'Bollywood',
        releaseDate: '2011-11-11',
    },
    {
        id: '6',
        title: 'Iktara',
        artist: 'Kavita Seth, Amit Trivedi',
        album: 'Wake Up Sid',
        icon: recentIcon6,
        audioUrl: '',
        duration: 235,
        playCount: 33000,
        likes: 89000,
        releaseYear: 2009,
        isFavorite: true,
        genre: 'Bollywood',
        releaseDate: '2009-10-02',
    },
    {
        id: '7',
        title: 'Channa Mereya',
        artist: 'Arijit Singh',
        album: 'Ae Dil Hai Mushkil',
        icon: recentIcon7,
        audioUrl: '',
        duration: 289,
        playCount: 53000,
        likes: 99000,
        releaseYear: 2016,
        isFavorite: false,
        genre: 'Bollywood',
        releaseDate: '2016-10-28',
    },
    {
        id: '8',
        title: 'Chirayee',
        artist: 'Swanand Kirkire',
        album: 'Chirayee',
        icon: recentIcon8,
        audioUrl: '',
        duration: 235,
        playCount: 330000,
        likes: 31000,
        releaseYear: 2012,
        isFavorite: true,
        genre: 'Bollywood',
        releaseDate: '2012-04-15',
    },
];


// Make sure to import or define favouriteIcon and playlistIcon above
import favouriteIcon from '../assests/icons/favouriteIcon.png';
import playlistIcon from '../assests/icons/playlistIcon.png';
import travelIcon from '../assests/icons/travelIcon.png';
import smoothIcon from '../assests/icons/smoothIcon.png';

export const categoryCards = [
    {
        id: 1,
        title: 'Favourite',
        // uri: 'https://i.pinimg.com/736x/6b/44/3d/6b443d716d06f5c1c7d068b9dad6460b.jpg',
        icon: favouriteIcon,
    },
    {
        id: 2,
        title: 'Travel',
        icon: travelIcon,
    },
    {
        id: 3,
        title: 'Smooth',
        icon: smoothIcon,
    },
    {
        id: 4,
        title: 'Playlist',
        icon: playlistIcon,
    },
];
