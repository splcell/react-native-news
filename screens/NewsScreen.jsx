import { StyleSheet, Text, View, Image, Alert, ActivityIndicator } from 'react-native';
import { createContext, useEffect, useState, useCallback } from 'react';
import NewsList from '../components/NewsList';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
export const NewsContext = createContext(null);



export default function News() {

  const [news, setNews] = useState([])
  const [isLoading, setLoading] = useState(true);

  SplashScreen.preventAutoHideAsync();

  const [fontsLoaded] = useFonts({
    'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
  });

  

  async function getNews() {
    setLoading(true)
    await fetch('https://app-api.sm117.ru/api/v1/contract/news_for_test/')
    .then(response => response.json())
    .then(data => setNews(data))
    .catch(error => {
      console.log(error)
      Alert.alert('Ошибка', 'Новости не найдены')
    })
    .finally(() => {
      setLoading(false)
    })
  }
  
  useEffect(getNews, [])

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  if (isLoading) {
    return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color="#FF7700" />
      <Text style={{marginTop: 15, fontSize: 16}}>Загрузка...</Text>
    </View>
  }

  return (
    <NewsContext.Provider value={{news, isLoading, getNews, onLayoutRootView, fontsLoaded}}>
    <View style={styles.container} onLayout={onLayoutRootView}>
    <View style={styles.contentBox}>
        <NewsList />    
      </View>
      </View>
    </NewsContext.Provider>

)}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  contentBox: {
    position: 'relative',
    zIndex: 10,
    flex: 1,
    height: 'auto',
    marginTop: 20,
    paddingTop: 10,
    paddingLeft: 13,
    paddingRight: 13,
    paddingBottom: 10,
  },
});