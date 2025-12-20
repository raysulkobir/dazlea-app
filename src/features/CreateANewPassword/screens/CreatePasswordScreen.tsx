import React, { useState } from "react";
import { View, Text, Image, Touchable, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input } from "@/ui/components/Input";
import { Button } from "@/ui/components/Button";
import { images } from "@/utils/images";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { InputPassword } from "@/ui/components/InputPassword";

export default function CreatePasswordScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [re_password, setRePassword] = useState("");

  const navigation = useNavigation();

  const handleLogin = () => {
    // handle login logic here
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <SafeAreaView className="flex-1 bg-appbg">
      <View className="flex-1 px-4 pb-6">
      {/* Back button */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="w-9 h-9 rounded-full border border-primary-600 items-center justify-center"
        >
          <Ionicons name="arrow-back" size={20} color="#006A64" />
        </TouchableOpacity>
        <Text className="text-3xl text-center font-bold text-gray-900 mt-40">
          Create a new password
        </Text>

        <Text className="text-base text-gray-500 mb-12 text-center mt-6">
          Your password must be at least 8 characters
        </Text>

        <InputPassword
          placeholder="New passwod"
          value={password}
          onChangeText={setPassword}
        />

        <InputPassword
          placeholder="Enter your password"
          value={re_password}
          onChangeText={setPassword}
        />

        <Button
          title="Create Password"
          variant="primary"
          onPress={() => navigation.navigate('OtpVerification')}
        />
      </View>
    </SafeAreaView>
  );
}
