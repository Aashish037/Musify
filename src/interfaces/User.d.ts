
export interface User {
    uid: string;
    name: string;
    email: string;
    
    createdAt: Date;
    updatedAt: Date;
    profilePictureUrl?: string; // Optional: URL to the user's profile picture

}