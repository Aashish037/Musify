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

// Sign out
export const signOut = () => {
  return auth().signOut();
};
