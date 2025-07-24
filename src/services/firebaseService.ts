import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// Sign in with email and password
export const signIn = (email: string, password: string) => {
  return auth().signInWithEmailAndPassword(email, password);
};

// Sign up with email and password
export const signup = async (email: string, password: string, name: string) => {
  const userCredential = await auth().createUserWithEmailAndPassword(
    email,
    password,
  );

  // Set the display name
  if (auth().currentUser) {
    await auth().currentUser.updateProfile({ displayName: name });
  }

  // Create user document in Firestore
  if (userCredential.user) {
    await firestore()
      .collection('users')
      .doc(userCredential.user.uid)
      .set({
        name,
        email,
        username: name.toLowerCase().replace(/\s/g, ''),
        profilePictureUrl: '',
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
  }

  return userCredential;
};

// Update profile picture URL in Firestore
export const updateProfilePictureUrl = async (uid: string, url: string) => {
  await firestore().collection('users').doc(uid).update({
    profilePictureUrl: url,
  });
};

// Update user profile (name, email, username, profilePictureUrl)
export const updateUserProfile = async (
  uid: string,
  {
    name,
    email,
    username,
    profilePictureUrl,
  }: {
    name?: string;
    email?: string;
    username?: string;
    profilePictureUrl?: string;
  },
) => {
  // Update Firestore user document
  const updateData: any = {};
  if (name !== undefined) updateData.name = name;
  if (email !== undefined) updateData.email = email;
  if (username !== undefined) updateData.username = username;
  if (profilePictureUrl !== undefined)
    updateData.profilePictureUrl = profilePictureUrl;
  await firestore().collection('users').doc(uid).update(updateData);

  // Update Firebase Auth profile if needed
  const currentUser = auth().currentUser;
  if (currentUser) {
    if (name !== undefined && name !== currentUser.displayName) {
      await currentUser.updateProfile({ displayName: name });
    }
    if (email !== undefined && email !== currentUser.email) {
      await currentUser.updateEmail(email);
    }
  }
};

// Sign out
export const signOut = () => {
  return auth().signOut();
};
