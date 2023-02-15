import {
  StyleSheet,
  PermissionsAndroid,
  Text,
  Image,
  View,
  Animated,
  Alert,
  StatusBar,
} from "react-native";
import React, { useRef, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const COLORS = { primary: "#1E319D", white: "#FFFFFF" };
const SplashScreen = () => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fadeIn();
    navig();
  }, []);

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 4500,
      useNativeDriver: true,
    }).start();
  };

  const navig = async () => {
    const loggedIn = await AsyncStorage.getItem("loggedIn");
    const intro = await AsyncStorage.getItem("intro");
    setTimeout(async () => {
      if (intro == 1 && loggedIn == 1) {
        navigation.navigate("AlarmScreen");
      } else if (intro != 1 && loggedIn != 1) {
        navigation.navigate("IntroScreen");
      } else if (intro == 1 && loggedIn != 1) {
        navigation.navigate("LoginScreen");
      } else {
        navigation.navigate("IntroScreen");
      }
    }, 3000);
  };

  // const cekAsync = async () => {
  //   const intro = await AsyncStorage.getItem("intro");
  //   const user = await AsyncStorage.getItem("loggedIn");

  //   console.warn(intro);
  // };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary}></StatusBar>
      <Image
        style={{ width: 100, height: 121 }}
        source={require("../assets/icon/lung_white.png")}
      ></Image>

      <View style={styles.kotak}>
        {/* <Text style={styles.text2}>Design By</Text> */}
        <Text style={styles.text}>PPMO TBC</Text>
      </View>

      {/* <Text style={styles.splash_title}>PPMO TBC</Text> */}
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  splash_title: {
    fontSize: 30,
    // fontWeight: "bold",
    color: "white",
    marginTop: "5%",
    fontFamily: "Poppins-LightItalic",
  },
  text: {
    fontSize: 20,
    fontFamily: "Poppins-Medium",
    color: "white",
  },
  text2: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    color: "white",
  },
  kotak: {
    position: "absolute",
    bottom: 70,
    alignItems: "center",
  },
});
