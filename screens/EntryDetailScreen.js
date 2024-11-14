// screens/EntryDetailScreen.js
import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#fff',
    },
    list: {
      padding: 16,
    },
    entryCard: {
      flexDirection: 'row',
      backgroundColor: '#f5f5f5',
      borderRadius: 8,
      marginBottom: 16,
      overflow: 'hidden',
    },
    thumbnail: {
      width: 100,
      height: 100,
    },
    entryInfo: {
      flex: 1,
      padding: 12,
    },
    entryTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    entryDate: {
      fontSize: 14,
      color: '#666',
      marginBottom: 4,
    },
    entryPreview: {
      fontSize: 14,
      color: '#444',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      padding: 12,
      marginBottom: 16,
    },
    descriptionInput: {
      height: 120,
      textAlignVertical: 'top',
    },
    photoGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginVertical: 16,
    },
    photoPreview: {
      width: 100,
      height: 100,
      margin: 4,
      borderRadius: 4,
    },
  });

export function EntryDetailScreen({ route }) {
  const { entry } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{entry.title}</Text>
      <Text style={styles.date}>
        {new Date(entry.date).toLocaleDateString()}
      </Text>
      <Text style={styles.description}>{entry.description}</Text>
      <View style={styles.photoGrid}>
        {entry.photos.map((photo, index) => (
          <Image
            key={index}
            source={{ uri: photo }}
            style={styles.photo}
          />
        ))}
      </View>
    </ScrollView>
  );
}
