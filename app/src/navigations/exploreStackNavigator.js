import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreen';
import ProductDetails from '../Screens/ProductDetails';
import Cities from '../Screens/Cities';
import Categories from '../Screens/Categories';

const Stack = createStackNavigator();

const ExploreStackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name={'HomeScreen'}
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'ProductDetails'}
        component={ProductDetails}
        options={{
          headerTitle: 'Product Details',
        }}
      />
      <Stack.Screen
        name={'cityScreen'}
        component={Cities}
        options={{
          headerTitle: 'Products',
        }}
      />
      <Stack.Screen
        name={'categoryScreen'}
        component={Categories}
        options={{
          headerTitle: 'Products',
        }}
      />
    </Stack.Navigator>
  );
};

export default ExploreStackNavigation;
