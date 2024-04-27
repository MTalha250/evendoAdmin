import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ConsultationScreen from '../Screens/ConsultationScreen';

const Stack = createStackNavigator();

const ConsultationStackNavigation = () => {
    return (
        <Stack.Navigator initialRouteName= 'ConsultationScreen'>
        <Stack.Screen
          name={"ConsultationScreen"}
          component={ConsultationScreen}
          options={{
            headerShown: false,
          }}
          />
      </Stack.Navigator>
    )
};

export default ConsultationStackNavigation;