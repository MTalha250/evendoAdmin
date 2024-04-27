import { StyleSheet, View, TouchableOpacity, Linking, Text } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons"

const Contact = () => {
    const handleWebsite = () => {
        Linking.openURL(`https://www.imperiumvisas.com`);
    }

    const handleWhatsapp = () => {
        Linking.openURL(`whatsapp://send?text=Hello, I'm insterested in your services. Can you please provide me with more information?&phone=+923064752178`);
    };

    return (
        <View
            style={{
                borderTopWidth: 1,
                borderTopColor: '#ddd',
                flexDirection: 'row',
                width: '100%',
                height: 70,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'space-evenly',
            }}
        >
            <TouchableOpacity style={styles.whatsappButton}
            onPress={() => {
                handleWhatsapp();
            }}
            >
                <Icon name={'chatbubble-ellipses-outline'} size={24} style={{
                    transform: [{
                        rotateY: '180deg'
                    }]
                }} color='#FFFFFf' />
                <Text style={styles.whatsappButtonText}>Whatsapp</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => {
                handleWebsite();
            }}
            style={styles.webButton}>
                <Icon2 name='web' size={24} style={{
                    transform: [{
                        rotateY: '180deg'
                    }]
                }} color='#B43A35' />
                <Text style={styles.webButtonText}>View Website</Text>
            </TouchableOpacity>

        </View>
    )
}

export default Contact;

const styles = StyleSheet.create({
    whatsappButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#B43A35',
        padding: 16,
        borderRadius: 10,
        width: '47%',
    },
    whatsappButtonText: {
        color: '#fff',
        marginLeft: 10,
        fontWeight: 'bold',
    },
    webButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#B43A35',
        borderWidth: 2,
        padding: 15,
        borderRadius: 10,
        width: '47%',
    },
    webButtonText: {
        color: '#B43A35',
        marginLeft: 10,
        fontWeight: 'bold',
    },
});