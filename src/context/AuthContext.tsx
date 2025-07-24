import React, { createContext, useState, useEffect, useContext } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { User } from '../interfaces/User';
import { signIn, signup, signOut } from '../services/firebaseService';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  isEmailVerified: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  //  Firebase Auth State Listener (Crucial!) ---
  // This useEffect runs once on component mount and sets up a listener
  // that automatically updates the `user` state whenever the Firebase
  // authentication status changes (login, logout, token refresh).
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(async firebaseUser => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          name: firebaseUser.displayName || '',
          profilePictureUrl: firebaseUser.photoURL || '',
          createdAt: new Date(firebaseUser.metadata.creationTime || ''),
          updatedAt: new Date(firebaseUser.metadata.lastSignInTime || ''),
        });
      } else {
        setUser(null);
      }
      setLoading(false);
      setError(null);
    });
    return () => subscriber(); // Cleanup the listener on unmount
  }, []);

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const userCredential = await signIn(email, password);
      const firebaseUser = userCredential.user;
      setUser({
        uid: firebaseUser.uid,
        email: firebaseUser.email || '',
        name: firebaseUser.displayName || '',
        profilePictureUrl: firebaseUser.photoURL || '',
        createdAt: new Date(firebaseUser.metadata.creationTime || ''),
        updatedAt: new Date(firebaseUser.metadata.lastSignInTime || ''),
      });

      // Check if Firestore user doc exists, if not, create it
      const userDoc = await firestore()
        .collection('users')
        .doc(firebaseUser.uid)
        .get();
      if (!userDoc.exists) {
        await firestore()
          .collection('users')
          .doc(firebaseUser.uid)
          .set({
            name: firebaseUser.displayName || '',
            email: firebaseUser.email,
            username: (firebaseUser.displayName || '')
              .toLowerCase()
              .replace(/\s/g, ''),
            profilePictureUrl: firebaseUser.photoURL || '',
            createdAt: firestore.FieldValue.serverTimestamp(),
          });
      }
    } catch (err: unknown) {
      console.log('Login error:', err);
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Failed to log in. Please check your credentials.';
      setError(errorMessage);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (
    email: string,
    password: string,
    name: string,
  ) => {
    setLoading(true);
    setError(null);
    try {
      const userCredential = await signup(email, password, name);

      // Set displayName and photoURL
      await userCredential.user.updateProfile({
        displayName: name,
        photoURL: '', // or a default avatar URL
      });

      setUser({
        uid: userCredential.user.uid,
        email: userCredential.user.email || '',
        name: name,
        profilePictureUrl: '',
        createdAt: new Date(userCredential.user.metadata.creationTime || ''),
        updatedAt: new Date(userCredential.user.metadata.lastSignInTime || ''),
      });

      // Create Firestore user doc after signup
      await firestore()
        .collection('users')
        .doc(userCredential.user.uid)
        .set({
          name: name,
          email: userCredential.user.email,
          username: name.toLowerCase().replace(/\s/g, ''),
          profilePictureUrl: '',
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
    } catch (err: unknown) {
      console.log('Sign Up error:', err);
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Failed to sign up. Please try again.';
      setError(errorMessage);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    setError(null);
    try {
      await signOut();
      setUser(null);
      setError(null);
    } catch (err: unknown) {
      console.log('Logout error:', err);
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Failed to log out. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login: handleLogin,
        signUp: handleSignUp,
        logout: handleLogout,
        isEmailVerified: user ? auth().currentUser?.emailVerified : false,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
