import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingButton from '../components/Buttons/LoadingButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import useAuthStore from '../store/authStore';
import { Snackbar } from 'react-native-paper';

const DeliveryScreen = () => {
  const [error, setError] = useState('');
  const [succcess, setSuccess] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [receiverCity, setReceiverCity] = useState('');
  const [receiverCountry, setReceiverCountry] = useState('');
  const [receiverEmail, setReceiverEmail] = useState('');
  const [receiverPhone, setReceiverPhone] = useState('');
  const [receiverAddress, setReceiverAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const onDismissSnackBar = () => setVisible(false);

  const handleSubmit = async () => {
    if (
      !receiverName ||
      !receiverEmail ||
      !receiverPhone ||
      !receiverCity ||
      !receiverCountry ||
      !receiverAddress
    ) {
      setError('All fields are required');
      return;
    }
    const values = {
      name: receiverName,
      email: receiverEmail,
      phone: receiverPhone,
      address: receiverAddress,
      country: receiverCountry,
      city: receiverCity,
    };
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.BASE_URI}/order`,
        {
          values,
        },
        {
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
          },
        },
      );
      console.log(res.data);
      setError('');
      setReceiverAddress('');
      setReceiverEmail('');
      setReceiverName('');
      setReceiverCity('');
      setReceiverCountry('');
      setReceiverPhone('');
      setSuccess('Order Created Successfully');
    } catch (error) {
      console.log(error);
    } finally {
      setVisible(true);
      setLoading(false);
      setTimeout(() => {
        setVisible(false);
      }, 3000)
    }
  };

  const handleGetCartItems = async () => { };

  return (
    <>
      <SafeAreaView>
        <ScrollView>
          <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Checkout</Text>
            <Text style={{ fontSize: 17, marginTop: 2, }}>Please enter your information for a smooth delivery</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor={'black'}
              value={receiverName}
              onChangeText={text => setReceiverName(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={'black'}
              value={receiverEmail}
              onChangeText={text => setReceiverEmail(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone"
              placeholderTextColor={'black'}
              value={receiverPhone}
              onChangeText={text => setReceiverPhone(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Address"
              placeholderTextColor={'black'}
              value={receiverAddress}
              onChangeText={text => setReceiverAddress(text)}
            />
            <TextInput
              style={styles.input}
              placeholderTextColor={'black'}
              placeholder="City"
              value={receiverCity}
              onChangeText={text => setReceiverCity(text)}
            />
            <TextInput
              style={styles.input}
              placeholderTextColor={'black'}
              placeholder="Country"
              value={receiverCountry}
              onChangeText={text => setReceiverCountry(text)}
            />
            <Text style={{ color: 'red' }}>{error}</Text>
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: "#6E0E70",
                padding: 10,
                borderRadius: 5,
              }}>
              <TouchableOpacity
                onPress={handleSubmit}
                style={{ width: "100%" }}
              >
                <Text style={{ width: "100%", flex: 1, color: "white", fontWeight: 'bold', fontSize: 16 }}>
                  {loading ? 'Loading...' : 'Place Order'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView >
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
      >
        Successfully placed order!
      </Snackbar>
    </>
  );
};

export default DeliveryScreen;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    color: 'black',
  },
  button: {
    backgroundColor: 'black',
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
});
