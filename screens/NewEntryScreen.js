// screens/NewEntryScreen.js
import React from 'react';
import { View, TextInput, Button, ScrollView, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    contentContainer: {
      flex: 1,
      justifyContent: 'center', // Centers content vertically
      padding: 16,
      width: '100%',
    },
    inputContainer: {
      width: '90%',          // Makes inputs take up 90% of width
      alignSelf: 'center',   // Centers the input container
    },
    input: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      padding: 12,
      marginBottom: 16,
      backgroundColor: '#fff',
    },
    descriptionInput: {
      height: 120,
      textAlignVertical: 'top',
    },
    buttonContainer: {
      width: '90%',
      alignSelf: 'center',
      marginVertical: 10,
    },
    photoGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginVertical: 16,
      justifyContent: 'center', // Centers photos
    },
    photoPreview: {
      width: 100,
      height: 100,
      margin: 4,
      borderRadius: 4,
    },
});

export function NewEntryScreen({ navigation }) {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [photos, setPhotos] = React.useState([]);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // Correct usage
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log('ImagePicker result:', result);
  
      if (!result.canceled) {
        setPhotos([...photos, result.assets[0].uri]); // Check if `result.assets` exists
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const saveEntry = async () => {
    try {
        const newEntry = {
          id: Date.now().toString(),
          title,
          description,
          photos,
          date: new Date().toISOString(),
        };
    
        console.log('New entry to save:', newEntry);
    
        const savedEntries = await AsyncStorage.getItem('journalEntries');
        const entries = savedEntries ? JSON.parse(savedEntries) : [];
        entries.unshift(newEntry);
    
        await AsyncStorage.setItem('journalEntries', JSON.stringify(entries));
    
        setTitle('');
        setDescription('');
        setPhotos([]);
    
        navigation.navigate('Home');
      } catch (error) {
        console.error('Error saving entry:', error);
      }
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={[styles.input, styles.descriptionInput]}
          placeholder="Write about your experience..."
          value={description}
          onChangeText={setDescription}
          multiline
        />
        <View style={styles.buttonContainer}>
          <Button title="Add Photos" onPress={pickImage} />
        </View>
        <View style={styles.photoGrid}>
          {photos.map((photo, index) => (
            <Image
              key={index}
              source={{ uri: photo }}
              style={styles.photoPreview}
            />
          ))}
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Save Entry" onPress={saveEntry} />
        </View>
      </View>
    </ScrollView>
  );
}

