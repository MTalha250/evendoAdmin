import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import useAuthStore from '../../../store/authStore';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import axios from 'axios';

const SignupScreen = () => {
  const navigate = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {setUser} = useAuthStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async () => {
    if (!email || !password || !name) {
      setError('Please fill all fields');
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(`${process.env.BASE_URI}/auth/register`, {
        email,
        password,
        name,
      });
      setLoading(false);
      setUser(res.data.user);
      //@ts-ignore
      navigate.navigate('LoginScreen');
    } catch (error: any) {
      console.log(error.response.data);
      setLoading(false);
      if (typeof error.response.data === 'string') {
        setError(error.response.data);
      } else {
        setError('Something went wrong, please try again later.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 24,
          fontWeight: '700',
          marginBottom: 17,
        }}>
        Welcome to Evendo
      </Text>
      {/* Email password signUp */}

      <TextInput
        style={styles.inputText}
        placeholder="Name"
        placeholderTextColor="#000"
        onChangeText={setName}
        value={name}
      />
      <TextInput
        style={styles.inputText}
        placeholder="Email"
        placeholderTextColor="#000"
        autoCapitalize="none"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.inputText}
        placeholder="Password"
        placeholderTextColor="#000"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      {error ? (
        <Text
          style={{
            color: 'red',
            fontSize: 16,
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: 10,
          }}>
          {error}
        </Text>
      ) : null}
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
        onPress={handleSubmit}>
        <Text
          style={{
            color: '#fff',
            fontSize: 20,
            fontWeight: 'bold',
          }}>
         {loading ? 'Loading...' : 'Sign Up'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupScreen;
