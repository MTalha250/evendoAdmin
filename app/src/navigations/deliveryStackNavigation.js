import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DeliveryScreen from '../Screens/DeliveryScreen';
import ConsultationScreen from '../Screens/ConsultationScreen';
import CartScreen from '../Screens/CartScreen';

const Stack = createStackNavigator();

const FoodStackNavigation = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen
        name={'cartScreen'}
        component={CartScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'deliveryScreen'}
        component={DeliveryScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'consultationScreen'}
        component={ConsultationScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default FoodStackNavigation;
