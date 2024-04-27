import React, { useState } from 'react'
import { ScrollView, Text, View } from 'react-native';
import Card from '../components/Cart/Card';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OrderCard from '../components/Orders/OrderCard';

const MyOrders = () => {

    const [orders, setOrders] = useState<any[]>([]);
    const navigation = useNavigation();
    const [loading, setLoading] = useState<boolean>(true);

    async function fetchOrders() {
        try {
            const res = await axios.get(`${process.env.BASE_URI}/order`, {
                headers: {
                    Authorization: `Bearer ${await AsyncStorage.getItem("token")}`
                }
            });
            setOrders(res.data);
            console.log(JSON.stringify(res.data, null, 2));
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    async function deleteCartItem(id: string) {
        try {
            const res = await axios.delete(`${process.env.BASE_URI}/order/${id}`, {
                headers: {
                    Authorization: `Bearer ${await AsyncStorage.getItem("token")}`
                }
            });
            setOrders(res.data.user.cart);
        } catch (error) {
            console.log(error);
        }
    }

    useFocusEffect(() => {
        fetchOrders();
    })
    return (
        <View style={{ display: "flex", position: "relative", flexDirection: "column", flex: 1, gap: 5, padding: 15, }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>My Orders</Text>
            <ScrollView>
                {
                    orders?.length == 0 &&
                    <Text style={{ fontSize: 24, fontWeight: "bold", margin: "auto", textAlign: "center", color: "#BB8EBC" }}>Your have no orders</Text>
                }
                {
                    orders.map((item) =>
                        <TouchableOpacity
                            onPress={() => {
                                // @ts-ignore
                                navigation.navigate('OrderDetailsScreen', { order: item });
                            }}
                            key={item._id}
                        >
                            <OrderCard item={item} key={item._id} />
                        </TouchableOpacity>
                    )
                }
            </ScrollView>
        </View >
    )
}

export default MyOrders