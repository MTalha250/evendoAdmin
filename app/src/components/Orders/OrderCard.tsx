import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome6';

const OrderCard = ({ item }: { item: any }) => {
  const navigation = useNavigation();

  return (
    <View style={{ display: "flex", alignItems: "center", flexDirection: "row", marginTop: 10, gap: 20, borderWidth: 1, borderColor: "#BB8EBC", padding: 10, paddingVertical: 20, borderRadius: 5 }}>
      <Image
        source={{ uri: item.item.images[0] }}
        style={{
          width: 75,
          height: 75,
          borderRadius: 5,
        }}
      />
      <View style={{ display: "flex", flexDirection: "column" }}>
        <Text style={{ color: "black", fontSize: 16, fontWeight: "600" }}>{item.item.title}</Text>
        <Text style={{ color: "black" }}>{item.item.content}</Text>
        <Text style={{ color: "black", marginTop: 10, fontWeight: "600" }}>PKR {item.totalPrice} </Text>
      </View>
    </View>
  )
}

export default OrderCard