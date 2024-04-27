import { Text, View, Image } from 'react-native'
import React, { useState } from 'react'
import styles from './styles'
import { ScrollView } from 'react-native-gesture-handler'

interface ImageSliderProps {
    images: string[]
}

const ImageSlider = ({ images }: ImageSliderProps) => {
    const [active, setActive] = useState(0)

    const onChange = ({ nativeEvent }: any) => {
        if (nativeEvent) {
            const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
            if (slide !== active) {
                setActive(slide)
            }
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView
                onScroll={({ nativeEvent }) => onChange({ nativeEvent })}
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                horizontal
                style={styles.wrap}
            >
                {images.map((image, index) => (
                    <Image
                        key={index}
                        source={{ uri: image }}
                        resizeMode='contain'
                        style={styles.wrap}
                    />
                ))}
            </ScrollView>
            <View style={styles.wrapDot}>
                {
                    images.map((i, k) => (
                        <Text key={k} style={k == active ? styles.dotActive : styles.dot}>⬤</Text>
                    ))
                }
            </View>
        </View>
    )
}

export default ImageSlider;