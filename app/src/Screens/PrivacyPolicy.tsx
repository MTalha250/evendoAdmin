import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { privacyPolicy } from '../constants'

const PrivacyPolicy = () => {
    return (
        <ScrollView>
            <View style={{ padding: 20 }}>
                <Text style={{ fontSize: 26, fontWeight: "bold", marginBottom: 10 }}>Terms and Conditions</Text>
                <Text style={{ fontSize: 17 }}>{privacyPolicy}</Text>
            </View>
        </ScrollView>
    )
}

export default PrivacyPolicy