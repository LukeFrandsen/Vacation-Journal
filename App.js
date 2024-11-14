// App.js
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './screens/HomeScreen.js';
import { NewEntryScreen } from './screens/NewEntryScreen.js';
import { EntryDetailScreen } from './screens/EntryDetailScreen.js';
import { View, LogBox, StyleSheet } from 'react-native';
import { Home, PlusCircle } from 'lucide-react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Ignore specific warnings if needed
LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native']);

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="JournalHome" 
        component={HomeScreen} 
        options={{ title: 'My Travel Journal' }} 
      />
      <Stack.Screen 
        name="EntryDetail" 
        component={EntryDetailScreen} 
        options={{ title: 'Entry Details' }} 
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#007AFF',
            tabBarInactiveTintColor: 'gray',
          }}
        >
          <Tab.Screen 
            name="Home" 
            component={HomeStack}
            options={{
              tabBarIcon: ({ color }) => <Home size={24} color={color} />
            }}
          />
          <Tab.Screen 
            name="New Entry" 
            component={NewEntryScreen}
            options={{
              tabBarIcon: ({ color }) => <PlusCircle size={24} color={color} />
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

// styles.js
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


