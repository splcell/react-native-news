import { useState, useCallback } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";
import HTMLView from "react-native-htmlview";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

function NewsItem({ body, date, title }) {
  const [showFullNews, setShowFullNews] = useState(false);

  SplashScreen.preventAutoHideAsync();

  const [fontsLoaded] = useFonts({
    "Montserrat-SemiBold": require("../assets/fonts/Montserrat-SemiBold.ttf"),
    "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-Medium": require("../assets/fonts/Montserrat-Medium.ttf"),
  });

  function onPressToFullNews() {
    setShowFullNews(!showFullNews);
  }
 //функция которая находит в тексте ссылки на сайты и ссылки на изображения и оборачивает их в нужные теги
  function findLinksAndImages(text) {
    const imgRegex = /<img[^>]+src="?([^"\s]+)"?\s*\/?>/g;
    const linkRegex = /<a href="([^"]+)">([^<]+)<\/a>/g;

    let result = text;

    result = result.replace(imgRegex, '<img src="$1" alt="$2"/>');

    result = result.replace(linkRegex, '<a href="$1">$2</a>');

    return result;
  }

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.newsInner} onLayout={onLayoutRootView}>
      <>
        <HTMLView value={`<h3>${title}</h3>`} stylesheet={styles} />
        <HTMLView
          value={
            !showFullNews
              ? `<p>${
                  String(findLinksAndImages(body)).slice(0, 50) + "..."
                }</p>`
              : `<p>${findLinksAndImages(body)}</p>`
          }
          stylesheet={styles}
        />
        <View style={styles.newsInfo}>
          <HTMLView value={`<span>${date}</span>`} stylesheet={styles} />
          <TouchableOpacity onPress={onPressToFullNews}>
            <View style={styles.buttonStyle}>
              {!showFullNews ? (
                <>
                  <Text style={styles.buttonText}>Подробнее</Text>
                  <Svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="#FF7700"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <Path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M8.3475 10.327C7.91157 9.89102 7.20478 9.89102 6.76885 10.327C6.33291 10.7629 6.33291 11.4697 6.76885 11.9056L11.6526 16.7893C12.0885 17.2253 12.7953 17.2253 13.2312 16.7893L18.1149 11.9056C18.5509 11.4697 18.5509 10.7629 18.1149 10.327C17.679 9.89102 16.9722 9.89102 16.5363 10.327L12.4419 14.4213L8.3475 10.327Z"
                    />
                  </Svg>
                </>
              ) : (
                <>
                  <Text style={styles.buttonText}>Скрыть</Text>
                  <Svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="#FF7700"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ transform: "rotate(180deg)" }}
                  >
                    <Path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M8.3475 10.327C7.91157 9.89102 7.20478 9.89102 6.76885 10.327C6.33291 10.7629 6.33291 11.4697 6.76885 11.9056L11.6526 16.7893C12.0885 17.2253 12.7953 17.2253 13.2312 16.7893L18.1149 11.9056C18.5509 11.4697 18.5509 10.7629 18.1149 10.327C17.679 9.89102 16.9722 9.89102 16.5363 10.327L12.4419 14.4213L8.3475 10.327Z"
                    />
                  </Svg>
                </>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </>
    </View>
  );
}

const styles = StyleSheet.create({
  newsInner: {
    borderRadius: 12,
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 16,
  },
  newsTitle: {
    fontFamily: "Montserrat-Semibold",
    fontSize: 17,
    fontWeight: "semibold",
    lineHeight: 22,
  },

  a: {
    color: "#F70",
  },

  p: {
    fontFamily: "Montserrat-Regular",
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "400",
    color: "#191C1F",
  },

  span: {
    fontFamily: "Montserrat-Medium",
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 22,
    letterSpacing: -0.1,
    color: "#838383",
  },

  newsInfo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 17,
  },

  buttonStyle: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    columnGap: 4,
    marginLeft: 170,
  },

  buttonText: {
    fontFamily: "Montserrat-SemiBold",
    fontWeight: "bold",
    fontSize: 14,
    backgroundColor: "transparent",
    color: "#F70",
  },
});

export default NewsItem;
