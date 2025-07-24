import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const BackHeader = ({ title }: { title: string }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerRow}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.button}
      >
        <Text style={styles.arrow}>{'\u2190'}</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  button: {
    padding: 8,
    alignSelf: 'flex-start',
  },
  arrow: {
    fontSize: 22, // Smaller font size
    color: '#FF6F61', // Use your app's accent color here
    fontWeight: 'bold',
    marginRight: 8,
  },
  title: {
    fontSize: 22, // One size smaller than before
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'SpaceMono-Bold',
  },
});

export default BackHeader;
