import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InitialScreen from '@/features/auth/screens/InitialScreen';
import HomeScreen from '@/features/home/screens/HomeScreen';
import OnBoardingScreen from '@/features/onboarding/screens/onboardingScreen';
import LoginScreen from '@/features/auth/screens/LoginScreen';
import RegisterScreen from '@/features/singUp/screens/RegisterScreen';
import VerifyPhoneNumberScreen from '@/features/verifyPhoneNumber/screens/VerifyPhoneNumberScreen';
import OtpVerificationScreen from '@/features/otpVerification/screens/OtpVerificationScreen';
import CreatePasswordScreen from '@/features/CreateANewPassword/screens/CreatePasswordScreen';
import SearchFilterScreens from '@/features/searchFilter/screens/SearchFilterScreens';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName="InitialScreen"
        >
            <Stack.Screen name="InitialScreen" component={InitialScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="SearchFilter" component={SearchFilterScreens} />
            {/* <Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} /> */}

            {/* <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="VerifyPhoneNumber" component={VerifyPhoneNumberScreen} />
            <Stack.Screen name="OtpVerification" component={OtpVerificationScreen} />
            <Stack.Screen name="CreatePassword" component={CreatePasswordScreen} /> */}
        </Stack.Navigator>
    );
}
