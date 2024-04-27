import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import LoginScreen from '../Screens/OnBoarding/loginScreen';
import SignupScreen from '../Screens/OnBoarding/signupScreen';
import WelcomeScreen from '../Screens/OnBoarding/Welcome';

const Stack = createStackNavigator();

const LoginStackNavigation = ({ navigation }) => {
  return (
    <Stack.Navigator
    >
      <Stack.Screen
        name={"WelcomeScreen"}
        component={WelcomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={"LoginScreen"}
        component={LoginScreen}
        options={{
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Explore")} style={{ marginLeft: 15 }}>
              <IonIcons name="close" size={35} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name={"SignupScreen"}
        component={SignupScreen}
        options={{
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Explore")} style={{ marginLeft: 15 }}>
              <IonIcons name="close" size={35} color="black" />
            </TouchableOpacity>
          ),
        }}
      />

    </Stack.Navigator>
  );
};

export default LoginStackNavigation;
