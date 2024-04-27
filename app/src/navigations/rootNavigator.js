import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import LoginStackNavigation from './loginStackNavigation';

//Screens
import ExploreStackNavigation from './exploreStackNavigator';
import ProfileStackNavigation from './profileStackNavigation';
import DeliveryStackNavigation from './deliveryStackNavigation';

//Icons
import Feather from 'react-native-vector-icons/Feather';

import useAuthStore from '../store/authStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {loginBack} from '../actions/auth';

const Tab = createBottomTabNavigator();

const RootNavigator = () => {
  const {user, setUser} = useAuthStore();

  async function checkTokenAndLogin() {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      const res = await loginBack();
      // console.log(res);
      setUser(res.user);
    }
  }

  useEffect(() => {
    checkTokenAndLogin();
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#6E0C6F',
          tabBarStyle: {
            paddingBottom: 7,
            height: 60,
          },
        }}>
        <Tab.Screen
          name={'Explore'}
          component={ExploreStackNavigation}
          options={{
            tabBarIcon: ({color}) => (
              <Feather name="home" size={25} color={color} />
            ),
            headerShown: false,
          }}
        />

        <Tab.Screen
          name={'Cart'}
          component={user ? DeliveryStackNavigation : LoginStackNavigation}
          options={{
            tabBarIcon: ({color}) => (
              <Feather name="shopping-bag" size={30} color={color} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name={'Profile'}
          component={user ? ProfileStackNavigation : LoginStackNavigation}
          options={{
            tabBarIcon: ({color}) => (
              <Feather name="user" size={30} color={color} />
            ),
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
