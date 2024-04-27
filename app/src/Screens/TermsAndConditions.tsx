import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { termsAndConditions } from '../constants'

const TermsAndConditions = () => {
    return (
        <ScrollView>
            <View style={{ padding: 20 }}>
                <Text style={{ fontSize: 26, fontWeight: "bold", marginBottom: 10 }}>Terms and Conditions</Text>
                <Text style={{ fontSize: 17 }}>{termsAndConditions}</Text>
            </View>
        </ScrollView>
    )
}

export default TermsAndConditions