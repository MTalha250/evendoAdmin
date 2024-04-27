import { Image, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import LoadingButton from '../../../components/Buttons/LoadingButton';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
const logo = require('../../../../assets/evendo.png');
import AsyncStorage from '@react-native-async-storage/async-storage';

const WelcomeScreen = () => {

  const navigation = useNavigation();

  async function checkToken() {

    const token = await AsyncStorage.getItem("token");
    if (token?.length != 0) {
      console.log(token);
      return true;
    }
    return false;
  }

  checkToken();


  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.welcomeText}>Welcome to Evendo!</Text>
        <Text style={{
          color: '#202020',
          marginTop: 2,
        }}>Your favorite shops online</Text>
      </View>
      <View style={styles.buttonContainer}>
        <LoadingButton
          onPress={() => {
            //@ts-ignore
            navigation.navigate('SignupScreen');
          }}
          text="Let's get started" />
        {/* @ts-ignore */}
        <Text style={styles.loginText}>Already have an account? <Text
          //@ts-ignore
          onPress={() => navigation.navigate('LoginScreen')}
        >
          Login
        </Text>
        </Text>
      </View>
    </SafeAreaView >
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    justifyContent: 'space-between', // Adjusted for layout
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center', // Center logo vertically
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 50,
  },
  welcomeText: {
    color: '#202020',
    marginTop: 10,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  loginText: {
    color: '#202020',
    marginTop: 20,
  },
});
