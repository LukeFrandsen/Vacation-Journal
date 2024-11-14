// screens/HomeScreen.js
import React from 'react';
import { View, FlatList, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';


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

export function HomeScreen({ navigation }) {
  const [entries, setEntries] = React.useState([]);

  React.useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    try {
      const savedEntries = await AsyncStorage.getItem('journalEntries');
      if (savedEntries) {
        setEntries(JSON.parse(savedEntries));
      }
    } catch (error) {
      console.error('Error loading entries:', error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      loadEntries();
    }, [])
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.entryCard}
      onPress={() => navigation.navigate('EntryDetail', { entry: item })}
    >
      {item.photos && item.photos.length > 0 && (
        <Image 
          source={{ uri: item.photos[0] }} 
          style={styles.thumbnail}
        />
      )}
      <View style={styles.entryInfo}>
        <Text style={styles.entryTitle}>{item.title}</Text>
        <Text style={styles.entryDate}>{new Date(item.date).toLocaleDateString()}</Text>
        <Text style={styles.entryPreview} numberOfLines={2}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={entries}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}