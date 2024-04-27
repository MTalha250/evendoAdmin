import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import FaIcon from 'react-native-vector-icons/FontAwesome6';
import { capitalizeFirstLetter, toReadableDate } from '../lib/utils';
import { useFocusEffect } from '@react-navigation/native';

//@ts-ignore
const OrderDetails = ({ route }) => {
  const { order } = route.params;
  const [status, setStatus] = useState<string[]>([order.orderStatus.toLowerCase()]);

  useEffect(() => {
    if (status.includes("delivery")) {
      setStatus(prevStatus => [...prevStatus, "pending"]);
    }
    else if (status.includes("completed")) {
      setStatus(prevStatus => [...prevStatus, "pending", "delivery"]);
    }
  }, [])

  return (
    <ScrollView style={styles.container}>
      <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 15, marginHorizontal: 20, paddingBottom: 10, borderBottomWidth: 1, borderColor: "#F1F1F1" }}>
        <Image source={{ uri: order.item.images[0] }} width={75} height={75} style={{ borderRadius: 5 }} />
        <View>
          <Text style={{ fontSize: 16, fontWeight: "500" }}>{order.item.title}</Text>
          <Text style={styles.info}>{order.item.category} - {order.item.subcategory}</Text>
          <Text style={styles.price}>PKR {order.item.price}</Text>
        </View>
      </View>
      <View style={styles.detailsContainer}>
        <View style={{ display: "flex", flexDirection: "row", gap: 5, paddingVertical: 10, paddingBottom: 20, borderBottomWidth: 1, borderColor: "#F1F1F1" }}>
          <Text style={{ fontWeight: "400", fontSize: 17, marginRight: 10, }}>
            Shipment ID
          </Text>
          <Text style={{ marginLeft: 5, fontSize: 17, fontWeight: "600" }}>
            {order._id}
          </Text>
        </View>
        <View style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 3 }}>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>Delivery Address</Text>
          <Text style={{ fontSize: 17 }}>
            {capitalizeFirstLetter(order.name)}
          </Text>
          <Text style={{ fontSize: 17 }}>
            {capitalizeFirstLetter(order.address)}
          </Text>
        </View>
        <View style={{ marginTop: 25 }}>
          <View style={{ display: "flex", flexDirection: "row", gap: 10, alignItems: "flex-start", marginTop: 0, paddingTop: 0 }}>
            <View >
              <View style={{ width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: status.includes('pending') ? "#6E0E70" : "#d8d8d8", borderRadius: 500 }}>
                <Icon name='check' size={23} color={"white"} style={{}} />
              </View>
              <View style={{ width: 3, height: 50, backgroundColor: status.includes('pending') ? "#6E0E70" : "#d8d8d8", position: "relative", left: 18, bottom: 5 }}></View>
            </View>
            <Text style={{ fontSize: status.includes('pending') ? 20 : 18, fontWeight: "500", marginTop: 5 }}>Order Placed
              <Text style={{ fontSize: 15, color: "gray" }}> on {toReadableDate(order.createdAt)}</Text>
            </Text>
          </View>
          <View style={{ display: "flex", flexDirection: "row", gap: 10, alignItems: "flex-start", position: "relative", bottom: 15 }}>
            <View >
              <View style={{ width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: status.includes('delivery') ? "#6E0E70" : "#d8d8d8", borderRadius: 500 }}>
                <FaIcon name='truck' size={16} color={"white"} style={{}} />
              </View>
              <View style={{ width: 3, height: 50, backgroundColor: status.includes('delivery') ? "#6E0E70" : "#d8d8d8", position: "relative", left: 18, bottom: 5 }}></View>
            </View>
            <Text style={{ fontSize: status.includes('delivery') ? 20 : 18, fontWeight: status.includes('delivery') ? "500" : "400", marginTop: 5 }}>Out For Delivery
            </Text>
          </View>
          <View style={{ display: "flex", flexDirection: "row", gap: 10, alignItems: "flex-start", position: "relative", bottom: 30 }}>
            <View >
              <View style={{ width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: status.includes('completed') ? "#6E0E70" : "#d8d8d8", borderRadius: 500 }}>
                <Icon name='box' size={23} color={"white"} style={{}} />
              </View>
            </View>
            <Text style={{ fontSize: status.includes('completed') ? 20 : 18, fontWeight: status.includes('completed') ? "500" : "400", marginTop: 5 }}>Completed
            </Text>
          </View>
        </View>
      </View>
    </ScrollView >
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
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
    borderWidth: 1
  },
  price: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 16,
    color: '#1A8601',
  },
  info: {
    fontSize: 14,
    marginBottom: 4,
    color: '#555',
  },
});

export default OrderDetails;
