import { View, Image } from "react-native";

export default function Home(){
  return(
    <View style={{justifyContent: 'center', alignItems: 'center', paddingLeft: 10, paddingRight: 10}}>
      <Image source={require('../assets/v_razrabotke.jpg')} style={{width: '100%', height: '100%', borderRadius: 5}} resizeMode="center" />
    </View>
  )
}