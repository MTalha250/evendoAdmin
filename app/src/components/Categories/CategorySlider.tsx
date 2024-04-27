import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';

const categories = [
    {
        title: "Home & Kitchen",
        link: "Home-&-Kitchen",
        icon: "https://img.icons8.com/ios/50/000000/kitchen--v1.png"
    },
    {
        title: "Health & Beauty",
        link: "Health-&-Beauty",
        icon: "https://img.icons8.com/pulsar-line/48/makeup.png"
    },
    {
        title: "Fashion & Apparel",
        link: "Fashion-&-Apparel",
        icon: "https://img.icons8.com/external-others-abderraouf-omara/64/external-apparel-clothing-and-apparel-others-abderraouf-omara-29.png"
    },
    {
        title: "Electronics",
        link: "Electronics",
        icon: "https://img.icons8.com/ios-glyphs/30/multiple-devices.png"
    },
    {
        title: "Accessories",
        link: "Accessories",
        icon: "https://img.icons8.com/external-victoruler-solid-victoruler/64/external-accessories-clothes-and-outfit-victoruler-solid-victoruler.png"
    },
]

const CategorySlider = () => {
    const navigate = useNavigation();
    return (
        <>
            <Text
                style={{
                    fontSize: 24,
                    fontWeight: '700',
                    marginBottom: 5,
                }}>
                Categories
            </Text>
            <FlatList
                data={categories}
                keyExtractor={item => item.title}
                horizontal
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                // @ts-ignore
                                navigate.navigate('categoryScreen', { category: item.link, categoryName: item.title });
                            }}
                        >
                            <View
                                style={{
                                    padding: 10,
                                    backgroundColor: "#be35be20",
                                    marginBottom: 10,
                                    borderRadius: 10,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginRight: 10,
                                    gap: 8,
                                }}>
                                <Image
                                    source={{ uri: item.icon }}
                                    style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 10,
                                    }}
                                    tintColor={"#6E0E70"}
                                />
                                <Text
                                    style={{
                                        fontSize: 14,
                                        fontWeight: '700',
                                        width: 80,
                                        height: 40,
                                        textAlign: "center",
                                    }}>
                                    {item.title}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    );
                }}
            />
        </>
    )
}

export default CategorySlider