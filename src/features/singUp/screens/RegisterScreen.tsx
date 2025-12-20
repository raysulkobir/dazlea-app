import React, { useState } from "react";
import { View, Text, Image, Touchable, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input } from "@/ui/components/Input";
import { Button } from "@/ui/components/Button";
import Ionicons from '@expo/vector-icons/Ionicons';
import { images } from "@/utils/images";
import { OrDivider } from "@/ui/components/OrDivider";
import { icons } from "../../../utils/icons";
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
          Welcome To MedTalk
        </Text>
        
        <Text className="text-base text-gray-500 mb-6 text-center">
          Create your account
        </Text>

        <Input
          placeholder="Full Name"
          value={email}
          onChangeText={setEmail}
          iconName="person-outline"
        />

        <Input
          placeholder="Phone Number"
          value={email}
          onChangeText={setEmail}
          iconName="call-outline"
        />

        <Input
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          iconName="lock-closed-outline"
        />
        
        <Button
          title="SIGN UP"
          variant="primary"
          onPress={() => navigation.navigate('VerifyPhoneNumber')}
        />
      </View>
    </SafeAreaView>
  );
}
