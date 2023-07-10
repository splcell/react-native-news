import { StatusBar } from 'expo-status-bar';
import { StyleSheet} from 'react-native';
import { createContext} from 'react';
import { Navigation } from './components/Navigation';
export const NewsContext = createContext(null);



export default function App() {

  return (
    <>
    <StatusBar style="auto" />
    <Navigation />
    </>
    
  );
}

