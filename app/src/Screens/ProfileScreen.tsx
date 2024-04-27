import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Linking,
  TouchableOpacity,
} from 'react-native';
import useAuthStore from '../store/authStore';
import React, { useState } from 'react';
import { deleteAccount } from '../actions/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

const ProfileScreen = () => {
  const { user, setUser, setToken, setCustomer, token } = useAuthStore();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const navigation = useNavigation();
  // Function to handle opening the URL
  const handlePressSupportLink = async () => {
    const url = 'https://evendo.pk/contact';
    await Linking.openURL(url);
  };

  const logoutUser = async () => {
    setUser(null);
    setToken(null);
    setCustomer(null);
    await AsyncStorage.removeItem("token");
  };

  const handleDeleteAccount = async () => {
    try {
      setLoading(true);
      const res = await deleteAccount();
      if (res === 'Deleted') {
        setCustomer(null);
        setUser(null);
        setToken(null);
      } else {
        setError('Something went wrong, please try again later!');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        // padding: 20,
      }}>
      <View
        style={{
          // padding: 20,
        }}>
        {error && <Text>{error}</Text>}
        <View style={{ display: "flex", padding: 20, paddingVertical: 30, backgroundColor: "#6E0E70", gap: 20, flexDirection: "row", alignItems: "center" }}>
          <View style={{ backgroundColor: "#BB8EBC", alignSelf: "flex-start", borderRadius: 100, padding: 15 }}>
            <Icon name='user' size={30} color={"#6E0E70"} />

            {/* <Text > */}
            {/* <Text style={{
                fontSize: 30,
                fontWeight: "bold",
                color: "white",
              }}>{user?.name[0]}</Text>
            </Text> */}
          </View>
          <View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'white',
              }}>
              Hey, {user?.name}
            </Text>
            <Text
              style={{
                fontSize: 16,
                marginTop: 2,
                color: 'white',

              }}>
              {user?.email}
            </Text>
          </View>
        </View>

        <View style={{ padding: 20, display: "flex", flexDirection: "column", gap: 15 }}>
          <TouchableOpacity
            onPress={() => {
              // @ts-ignore
              navigation.navigate('MyOrdersScreen')
            }}>
            <Text
              style={{
                fontSize: 18,
                marginTop: 7,
                color: '#1a1a1a',
              }}>
              My Orders
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // @ts-ignore
              navigation.navigate("consultationScreen")
            }}>
            <Text
              style={{
                fontSize: 18,
                marginTop: 7,
                color: '#1a1a1a',
              }}>
              Contact Support
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL('mailto:info@evendo.com');
            }}>
            <Text
              style={{
                fontSize: 18,
                marginTop: 7,
                color: '#1a1a1a',
              }}>
              info@evendo.com
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // @ts-ignore
              navigation.navigate('TermsAndConditionsScreen')
            }}>
            <Text
              style={{
                fontSize: 18,
                marginTop: 7,
                color: '#1a1a1a',
              }}>
              Terms and Services
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // @ts-ignore
              navigation.navigate("PrivacyPolicyScreen")
            }}>
            <Text
              style={{
                fontSize: 18,
                marginTop: 7,
                color: '#1a1a1a',
              }}>
              Privacy Policy
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              logoutUser();
            }}>
            <Text
              style={{
                fontSize: 18,
                marginTop: 7,
                borderWidth: 1,
                borderRadius: 5,
                borderColor: "#BB8EBC",
                paddingVertical: 10,
                paddingHorizontal: 10,
                color: '#BB8EBC',
              }}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
