import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../Screens/ProfileScreen';
import TermsAndConditions from '../Screens/TermsAndConditions';
import PrivacyPolicy from '../Screens/PrivacyPolicy';
import MyOrders from '../Screens/MyOrders';
import OrderDetails from '../Screens/OrderDetails';

const Stack = createStackNavigator();

const ProfileStackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName='ProfileScreen'>
      <Stack.Screen
        name={"ProfileScreen"}
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={"TermsAndConditionsScreen"}
        component={TermsAndConditions}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={"MyOrdersScreen"}
        component={MyOrders}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={"OrderDetailsScreen"}
        component={OrderDetails}
        options={{
          headerShown: true,
          headerTitle: "Product Details"
        }}
      />
      <Stack.Screen
        name={"PrivacyPolicyScreen"}
        component={PrivacyPolicy}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
};

export default ProfileStackNavigation;