import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Feather';

const Card = ({ item, deleteCartItem }: { item: any, deleteCartItem: any }) => {
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
      <View style={{ flex: 1, alignSelf: "flex-end" }}>
        <TouchableOpacity
          style={{ backgroundColor: "#BB8EBC", alignSelf: "flex-end", padding: 5, borderRadius: 5, }}
          onPress={() => {
            deleteCartItem(item._id)
          }}
        >
          <Icon name='trash' size={20} color={'white'} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Card