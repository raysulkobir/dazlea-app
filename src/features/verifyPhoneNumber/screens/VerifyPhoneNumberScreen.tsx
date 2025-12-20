import React, { useState } from "react";
import { View, Text, Image, Touchable, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input } from "@/ui/components/Input";
import { Button } from "@/ui/components/Button";
import { images } from "@/utils/images";
import { useNavigation } from "@react-navigation/native";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const handleLogin = () => {
    // handle login logic here
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <SafeAreaView className="flex-1 bg-appbg">
      <View className="flex-1 px-4 pb-6">
        <Image
          source={images.loginBanner}
          className="w-full h-100 mx-auto mb-11 mt-30"
          resizeMode="contain"
        />
        <Text className="text-3xl text-center font-bold text-gray-900">
          Verify your Phone number
        </Text>

        <Text className="text-base text-gray-500 mb-12 text-center mt-6">
          We will sent you an One Time Password(OTP)
        </Text>

        <Input
          placeholder="Phone Number"
          value={email}
          onChangeText={setEmail}
          iconName="call-outline"
        />

        <Button
          title="Get Otp"
          variant="primary"
          onPress={() => navigation.navigate('OtpVerification' as never)}
        />
      </View>
    </SafeAreaView>
  );
}
