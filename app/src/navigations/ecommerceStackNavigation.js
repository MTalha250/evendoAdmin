import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import EcommerceScreen from '../Screens/EcommerceScreen';
import ProductDetails from '../Screens/ProductDetails';

const Stack = createStackNavigator();

const EcommerceStackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="ecommerceScreen">
      <Stack.Screen
        name={'ecommerceScreen'}
        component={EcommerceScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'productDetails'}
        component={ProductDetails}
        options={{
          headerTitle: 'Product Details',
        }}
      />
    </Stack.Navigator>
  );
};

export default EcommerceStackNavigation;
