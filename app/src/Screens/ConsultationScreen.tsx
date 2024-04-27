import {
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ConsultationScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [education, setEducation] = useState('');
  const [nationality, setNationality] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const submitHandler = async () => {
    try {
      if (
        !name ||
        !email ||
        !phoneNumber ||
        !message) {
        setError('Please fill in all the required fields');
        return;
      }
      setLoading(true);
      const res = await axios.post(`${process.env.BASE_URI}/contact`, {
        name,
        email,
        phone: phoneNumber,
        message
      },
        {
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem("token")}`
          }
        }
      );
      setLoading(false);
      setError('');
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}>Contact Us</Text>
      <Text style={{ marginBottom: 20 }}>
        Please fill in the form below and we will get back to you as soon as
        possible.
      </Text>
      {error && (
        <Text
          style={{
            color: 'red',
            marginBottom: 20,
            backgroundColor: '#f8d7da',
            width: '100%',
            padding: 10,
            borderRadius: 6,
          }}>
          {error}
        </Text>
      )}
      {success && (
        <Text
          style={{
            color: 'green',
            marginBottom: 20,
            backgroundColor: '#d4edda',
            width: '100%',
            padding: 10,
            borderRadius: 6,
          }}>
          You message has been submitted!
        </Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={text => setEmail(text)}
        placeholder="Email"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        value={phoneNumber}
        onChangeText={text => setPhoneNumber(text)}
        placeholder="Phone Number"
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={text => setMessage(text)}
        placeholder="Message"
        multiline
      />

      <TouchableOpacity
        style={{
          backgroundColor: '#6E0E70',
          padding: 10,
          borderRadius: 6,
          alignItems: 'center',
        }}
        onPress={() => submitHandler()}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: 'white',
          }}>
          {loading ? 'Submitting...' : 'Submit'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ConsultationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
  },
});
