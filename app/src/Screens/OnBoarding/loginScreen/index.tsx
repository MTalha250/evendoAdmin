import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import useAuthStore from '../../../store/authStore';
import { useNavigation } from '@react-navigation/native';
import { login } from '../../../actions/auth';
import styles from './styles';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const navigate = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const { setToken, setUser, setCustomer } = useAuthStore();
  const handleSubmit = async (e: any) => {
    setError('');
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill all fields');
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(`${process.env.BASE_URI}/auth/login`, {
        email,
        password,
      });
      console.log(res.data.user);
      console.log(res.data.token);
      setUser(res.data.user);
      setToken(res.data.token);
      await AsyncStorage.setItem('token', res.data.token);
      setLoading(false);
      //@ts-ignore
      // navigate.navigate('Explore');
    } catch (error: any) {
      console.log(error.response.data);
      if (typeof error.response.data == 'string') {
        setError(error.response.data);
      } else {
        setError('Something went wrong, please try again later!');
      }
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Login to Evendo or sign Up</Text>
      {/* Email password login */}
      {error && <Text style={styles.errorText}>{error}</Text>}
      <TextInput
        style={styles.inputText}
        placeholder="Email"
        autoCapitalize="none"
        placeholderTextColor={'#000'}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.inputText}
        placeholder="Password"
        placeholderTextColor={'#000'}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        style={{
          backgroundColor: '#000',
          padding: 10,
          borderRadius: 5,
          marginVertical: 10,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={handleSubmit}
        disabled={loading}>
        <Text
          style={{
            color: '#fff',
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          {loading ? 'Loading...' : 'Login'}
        </Text>
      </TouchableOpacity>
      <Text>Don't have an account? </Text>
      <TouchableOpacity
        //@ts-ignore
        onPress={() => navigate.navigate('SignupScreen')}
        disabled={loading}>
        <Text
          style={{
            color: '#000',
            fontSize: 20,
            marginVertical: 10,
            fontWeight: 'bold',
          }}>
          Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
