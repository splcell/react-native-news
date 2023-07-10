import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../screens/Home";
import News from "../screens/NewsScreen";
import Svg, { Path } from "react-native-svg";
import { ScreenTitle } from "./ScreenTitle";
import { getHeaderTitle } from "@react-navigation/elements";
import { useCallback } from "react";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const Tab = createBottomTabNavigator();

export function Navigation() {


  SplashScreen.preventAutoHideAsync();

  const [fontsLoaded] = useFonts({
    "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            justifyContent: "flex-start",
            paddingLeft: 20,
            marginTop: -10,
          },
          tabBarItemStyle: {
            flex: 0,
            height: "auto",
            justifyContent: "flex-start",
            alignItems: "center",
            marginRight: 25,
            paddingTop: 10,
            paddingBottom: 10,
          },
          tabBarLabelStyle: {
            fontFamily: "Montserrat-Regular",
            fontSize: 11,
            fontWeight: 400,
          },
          tabBarActiveTintColor: "#0666EB",
          tabBarInactiveTintColor: "#ADB4BB",
        }}
        onLayout={onLayoutRootView}>
        <Tab.Screen
          name="Главная"
          component={Home}
          options={{
            header: ({ options, route }) => {
              const title = getHeaderTitle(options, route.name);
              return <ScreenTitle title={title} />;
            },
            tabBarIcon: ({ focused }) => (
              <Svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill={focused ? "#0666EB" : "#ADB4BB"}
                xmlns="http://www.w3.org/2000/svg"
                style={{ marginBottom: 6 }}
              >
                <Path d="M21.7558 11.4107L12.5891 2.24399C12.4328 2.08776 12.2209 2 11.9999 2C11.7789 2 11.567 2.08776 11.4107 2.24399L2.24396 11.4107C2.12745 11.5273 2.04811 11.6758 2.01597 11.8374C1.98383 11.999 2.00034 12.1665 2.06339 12.3188C2.12645 12.471 2.23324 12.6012 2.37025 12.6928C2.50726 12.7843 2.66834 12.8332 2.83313 12.8333H3.87481C3.93006 12.8333 3.98305 12.8552 4.02212 12.8943C4.06119 12.9333 4.08314 12.9863 4.08314 13.0416V21.1667C4.08314 21.3877 4.17094 21.5996 4.32722 21.7559C4.48351 21.9122 4.69547 22 4.91648 22H9.70819C9.76345 22 9.81644 21.9781 9.85551 21.939C9.89458 21.8999 9.91653 21.8469 9.91653 21.7917V17.8333C9.91653 17.2808 10.136 16.7508 10.5267 16.3601C10.9174 15.9694 11.4473 15.7499 11.9999 15.7499C12.5524 15.7499 13.0823 15.9694 13.473 16.3601C13.8637 16.7508 14.0832 17.2808 14.0832 17.8333V21.7917C14.0832 21.8469 14.1052 21.8999 14.1443 21.939C14.1833 21.9781 14.2363 22 14.2916 22H19.0833C19.3043 22 19.5163 21.9122 19.6725 21.7559C19.8288 21.5996 19.9166 21.3877 19.9166 21.1667V13.0416C19.9166 12.9863 19.9386 12.9333 19.9776 12.8943C20.0167 12.8552 20.0697 12.8333 20.125 12.8333H21.1666C21.3314 12.8332 21.4925 12.7843 21.6295 12.6928C21.7665 12.6012 21.8733 12.471 21.9364 12.3188C21.9994 12.1665 22.0159 11.999 21.9838 11.8374C21.9516 11.6758 21.8723 11.5273 21.7558 11.4107Z" />
              </Svg>
            ),
          }}
        />
        <Tab.Screen
          name="Новости"
          component={News}
          options={{
            header: ({ options, route }) => {
              const title = getHeaderTitle(options, route.name);
              return <ScreenTitle title={title} />;
            },
            tabBarIcon: ({ focused }) => (
              <Svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill={focused ? "#0666EB" : "#ADB4BB"}
                xmlns="http://www.w3.org/2000/svg"
                style={{ marginBottom: 6 }}
              >
                <Path d="M20.0488 2H3.95122C3.43372 2 2.93742 2.20557 2.5715 2.5715C2.20557 2.93742 2 3.43372 2 3.95122V20.0488C2 20.5663 2.20557 21.0626 2.5715 21.4285C2.93742 21.7944 3.43372 22 3.95122 22H20.0488C20.5663 22 21.0626 21.7944 21.4285 21.4285C21.7944 21.0626 22 20.5663 22 20.0488V3.95122C22 3.43372 21.7944 2.93742 21.4285 2.5715C21.0626 2.20557 20.5663 2 20.0488 2V2ZM12.7317 16.6341C12.7317 16.7635 12.6803 16.8876 12.5888 16.9791C12.4974 17.0706 12.3733 17.122 12.2439 17.122H7.36585C7.23648 17.122 7.1124 17.0706 7.02092 16.9791C6.92944 16.8876 6.87805 16.7635 6.87805 16.6341V15.6585C6.87805 15.5292 6.92944 15.4051 7.02092 15.3136C7.1124 15.2221 7.23648 15.1707 7.36585 15.1707H12.2439C12.3733 15.1707 12.4974 15.2221 12.5888 15.3136C12.6803 15.4051 12.7317 15.5292 12.7317 15.6585V16.6341ZM17.6098 12.2439C17.6098 12.3733 17.5584 12.4974 17.4669 12.5888C17.3754 12.6803 17.2513 12.7317 17.122 12.7317H7.36585C7.23648 12.7317 7.1124 12.6803 7.02092 12.5888C6.92944 12.4974 6.87805 12.3733 6.87805 12.2439V11.2683C6.87805 11.1389 6.92944 11.0148 7.02092 10.9234C7.1124 10.8319 7.23648 10.7805 7.36585 10.7805H17.122C17.2513 10.7805 17.3754 10.8319 17.4669 10.9234C17.5584 11.0148 17.6098 11.1389 17.6098 11.2683V12.2439ZM17.6098 7.85366C17.6098 7.98303 17.5584 8.10711 17.4669 8.19859C17.3754 8.29007 17.2513 8.34146 17.122 8.34146H7.36585C7.23648 8.34146 7.1124 8.29007 7.02092 8.19859C6.92944 8.10711 6.87805 7.98303 6.87805 7.85366V6.87805C6.87805 6.74867 6.92944 6.6246 7.02092 6.53312C7.1124 6.44164 7.23648 6.39024 7.36585 6.39024H17.122C17.2513 6.39024 17.3754 6.44164 17.4669 6.53312C17.5584 6.6246 17.6098 6.74867 17.6098 6.87805V7.85366Z" />
              </Svg>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
