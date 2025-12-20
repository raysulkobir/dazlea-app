import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

type Props = { navigation: any };

export default function InitialScreen({ navigation }: Props) {
    useEffect(() => {
        // Simulate loading, then navigate
        const timer = setTimeout(() => {
            navigation.replace("Home"); // or whatever your first screen is
        }, 1500);

        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View className='bg-primary flex-1 items-center justify-center'>
            <View className='bg-white w-[300] h-[300px] rounded-full items-center justify-center'>
                <Text className='text-primary text-4xl font-bold mb-4'>dazlea</Text>
                <Text className='text-[#064448] text-base'>Healthcare Communication</Text>
            </View>
        </View>
    );
}

