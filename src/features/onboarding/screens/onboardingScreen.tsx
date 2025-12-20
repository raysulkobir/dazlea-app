import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/utils/images'
import { useNavigation } from '@react-navigation/native'
import { Button } from '@/ui/components/Button'

export default function OnBoardingScreen() {
    const navigation = useNavigation<any>();

    return (
        <SafeAreaView className='flex-1 bg-appbg'>
            <View className='flex-1 px-4 pb-6'>
                <View className='flex-1 items-right justify-center'>
                    <Image
                        source={images.onboardingImage}
                        className="w-full h-100 mb-6"
                        resizeMode="contain"
                    />
                    <Text className='font-bold text-primary text-[32px] text-justify'>Your Wellness {"\n"}Journey Starts here</Text> 
                    <Text className='font-bold text-[#777777] text-base py-4'>Book Appointments with Ease, {"\n"}Anytime, Anywhere</Text>
                </View>
                <Button
                    title="CONTINUE"
                    variant="primary"
                    onPress={() => navigation.navigate('Login')}
                />

                <Button
                    title="SIGN UP"
                    variant="primary"
                    onPress={() => navigation.navigate('RegisterScreen')}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})
