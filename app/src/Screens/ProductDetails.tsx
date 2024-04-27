import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import React, { useState } from 'react';
import ImageSlider from '../components/imageSlider';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import useAuthStore from '../store/authStore';
import LoadingButton from '../components/Buttons/LoadingButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Snackbar } from 'react-native-paper';

//@ts-ignore
const ProductDetails = ({ route }) => {
  const navigate = useNavigation();
  const { user } = useAuthStore();
  const { item } = route.params;
  const [loading, setLoading] = useState<boolean>(false);
  const [buttonStatus, setButtonStatus] = useState<string>('Add to cart');
  const [visible, setVisible] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const onDismissSnackBar = () => setVisible(false);

  async function addToCart() {
    if (!item) {
      return;
    }
    if (!user || !AsyncStorage.getItem('token')) {
      //@ts-ignore
      navigate.navigate('LoginScreen');
      return;
    }
    setLoading(true);
    try {
      await axios.post(
        `${process.env.BASE_URI}/cart`,
        {
          item,
          quantity: 1,
          totalPrice: item.price,
        },
        {
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
          },
        },
      );
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
      }, 3000)
      // setButtonStatus('Item added to cart!');
    } catch (error: any) {
      console.log(error.response.data);
      setErrorVisible(true);
      setTimeout(() => {
        setErrorVisible(false);
      }, 3000)
      // setButtonS
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <ScrollView style={styles.container}>
        <ImageSlider images={item.images} />
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.price}>PKR {item.price}</Text>
          <Text style={styles.info}>Category: {item.category}</Text>
          <Text style={styles.info}>Subcategory: {item.subcategory}</Text>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <LoadingButton
              text={buttonStatus}
              onPress={addToCart}
              loading={loading}
            // disabled={buttonStatus === 'Item added to cart!'}
            />
          </View>
        </View>
      </ScrollView>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
      >
        Added item to cart!
      </Snackbar>
      <Snackbar
        visible={errorVisible}
        onDismiss={onDismissSnackBar}
      >
        Please login to add item to cart
      </Snackbar>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageSlider: {
    width: '100%',
    height: 300,
  },
  detailsContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  price: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#1A8601',
  },
  info: {
    fontSize: 16,
    marginBottom: 4,
    color: '#555',
  },
});

export default ProductDetails;
