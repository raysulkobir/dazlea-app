import ProductImage from '@/assets/images/restaurants/n7yx-hero.jpg';
import Feather from '@expo/vector-icons/Feather';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function Card() {
    return (
        <View className="bg-white mr-3 shadow-lg rounded-3xl mb-3 ">
            <Image source={ProductImage} style={{ width: 250, height: 150 }} className="rounded-t-3xl" />
            <View className="px-3 pb-4 space-y-2">
                <Text className="text-lg font-bold pt-2 my-2">Papa johns</Text>
                <View className="flex-row">
                    <Image source={ProductImage} style={{ width: 15, height: 15 }} className="rounded-full" />
                    <Text className="ml-2">4(4.4k review). Fast Food</Text>
                </View>
            
                <View className="flex-row items-center space-y-1 mt-2">
                    <Feather name="map-pin" size={15} color="black" />
                    <Text className="text-gray-500">30-45 min . $15 min dd</Text>
                </View>
            </View>
           
        </View>
    )
}

const styles = StyleSheet.create({})
