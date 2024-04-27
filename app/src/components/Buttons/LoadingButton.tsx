import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const LoadingButton = ({
    text,
    onPress,
    loading,
    disabled,
}:{
    text?: string,
    onPress?: () => void,
    loading?: boolean,
    disabled?: boolean
}) => {
  return (
    <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={{
        width: "100%",
        maxWidth: 300,
        }}
    >
        <View
            style={{
            backgroundColor: "#6E0C6F",
            padding: 10,
            borderRadius: 14,
            marginTop: 20,
            justifyContent: "center",
            alignItems: "center",
            height: 48,
            }}
        >
            <Text
            style={{
                color: "white",
                fontSize: 16,
            }}
            >
            {loading ? "Loading..." : text || "Submit"}
            </Text>
        </View>
    </TouchableOpacity>
  )
}

export default LoadingButton

const styles = StyleSheet.create({});