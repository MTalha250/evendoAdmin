import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, ScrollView, Text, View } from 'react-native'
import Card from '../components/Cart/Card';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Snackbar } from 'react-native-paper';
import useAuthStore from '../store/authStore';

const CartScreen = () => {

  const [cart, setCart] = useState<any[]>([]);
  const { user } = useAuthStore();
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(true);
  const [visible, setVisible] = useState(false);
  const onDismissSnackBar = () => setVisible(false);

  function calculateTotalPrice(items: any) {
    return items.reduce((total: any, item: any) => total + item.totalPrice, 0);
  }

  async function fetchCart() {
    try {
      const res = await axios.get(`${process.env.BASE_URI}/cart`, {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("token")}`
        }
      });
      setCart(res.data.result.cart);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteCartItem(id: string) {
    try {
      const res = await axios.delete(`${process.env.BASE_URI}/cart/${id}`, {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("token")}`
        }
      });
      setCart(res.data.user.cart);
    } catch (error) {
      console.log(error);
    } finally {
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
      }, 3000)
    }
  }

  useFocusEffect(() => {
    fetchCart();
  })

  return (
    <>
      <View style={{ display: "flex", position: "relative", flexDirection: "column", flex: 1, gap: 5, padding: 15, paddingBottom: 150 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>My Cart</Text>
        <ScrollView>
          {
            cart?.length == 0 &&
            <Text style={{ fontSize: 24, fontWeight: "bold", margin: "auto", textAlign: "center", color: "#BB8EBC" }}>Your cart is empty</Text>
          }
          {
            cart.map((item) =>
              <Card item={item} deleteCartItem={deleteCartItem} key={item._id} />
            )
          }

        </ScrollView>
        <View style={{ padding: 15, position: "absolute", bottom: 0, width: "108%", flex: 1 }}>
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", paddingBottom: 10 }}>Total: </Text>
            <Text style={{ fontSize: 18, fontWeight: "bold", paddingBottom: 10 }}>PKR {calculateTotalPrice(cart)}</Text>

          </View>
          {
            cart && cart.length > 0 ?
              <TouchableOpacity
                style={{
                  backgroundColor: '#6E0E70',
                  padding: 10,
                  borderRadius: 6,
                  alignItems: 'center',
                }}
                disabled={loading}
                onPress={() => {
                  // @ts-ignore
                  navigation.navigate('deliveryScreen');
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: 'white',
                  }}>
                  Checkout
                </Text>
              </TouchableOpacity>

              :
              <TouchableOpacity
                style={{
                  backgroundColor: '#6E0E7050',
                  padding: 10,
                  borderRadius: 6,
                  alignItems: 'center',
                }}
                disabled={true}
                onPress={() => {
                  // @ts-ignore
                  navigation.navigate('deliveryScreen');
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: 'white',
                  }}>
                  No items in cart
                </Text>
              </TouchableOpacity>
          }
        </View>
      </View >
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        style={{}}
      >
        Successfully deleted item from cart!
      </Snackbar>
    </>
  )
}
export default CartScreen