import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'

const { width } = Dimensions.get('window')
const BANNER_HEIGHT = 150

export default function BannerSkeleton() {
    return (
        <View style={styles.wrap}>
            <View style={styles.box} />
        </View>
    )
}

const styles = StyleSheet.create({
    wrap: {
        paddingHorizontal: 16,
        paddingTop: 12,
    },
    box: {
        width: width - 32,
        height: BANNER_HEIGHT,
        backgroundColor: '#E1E9EE',
    },
})
