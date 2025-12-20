import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Button } from "@/ui/components/Button";
import { useNavigation } from "@react-navigation/native";

export default function OtpVerificationScreen() {
  const navigation = useNavigation();

  // 6-digit OTP
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const inputsRef = useRef<Array<TextInput | null>>([]);

  // 2:45 countdown => 165 seconds
  const [timer, setTimer] = useState(165);

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const minutes = String(Math.floor(timer / 60)).padStart(2, "0");
  const seconds = String(timer % 60).padStart(2, "0");

  const handleChange = (value: string, index: number) => {
    const digit = value.slice(-1); // keep last typed digit only
    const newCode = [...code];
    newCode[index] = digit;
    setCode(newCode);

    if (digit && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const otp = code.join("");
    console.log("OTP:", otp);
    // TODO: verify OTP then navigate
    // navigation.navigate("NextScreen" as never);
  };

  const handleResend = () => {
    console.log("Resend OTP");
    // TODO: call resend API here
    setTimer(165); // reset timer
  };

  return (
    <SafeAreaView className="flex-1 bg-appbg">
      <View className="flex-1 px-6 pt-4 pb-8">
        {/* Back button */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="w-9 h-9 rounded-full border border-primary-600 items-center justify-center"
        >
          <Ionicons name="arrow-back" size={20} color="#006A64" />
        </TouchableOpacity>

        {/* Title & subtitle */}
        <View className="mt-30">
          <Text className="text-3xl font-bold text-center text-gray-900">
            Otp Verification
          </Text>
          <Text className="mt-10 text-base text-center text-gray-500">
            We've sent a 6-digit code to +8801xxxxxxxxx
          </Text>
        </View>

        {/* OTP inputs */}
        <View className="mt-20 flex-row justify-center">
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputsRef.current[index] = ref)}
              className="w-12 h-14 mx-1 rounded-xl border-2 border-primary-600 bg-white text-xl font-semibold text-center"
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={(value) => handleChange(value, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
            />
          ))}
        </View>

        {/* Timer */}
        <View className="mt-10">
          <Text className="text-center text-gray-500">Code expires in</Text>
          <Text className="mt-1 text-center text-lg font-bold text-primary-700">
            {minutes}:{seconds}
          </Text>
        </View>

        {/* Resend */}
        <View className="mt-4 justify-center">
          <Text className="text-gray-500 text-center">Didn't receive the code?</Text>
          <TouchableOpacity onPress={handleResend}>
            <Text className="ml-1 mt-2 font-semibold text-primary-700 text-center">
              Resend Code
            </Text>
          </TouchableOpacity>
        </View>

        {/* Verify button */}
        <View className="mt-auto">
          <Button title="Verify" variant="primary" onPress={() => navigation.navigate('CreatePassword')} />
        </View>
      </View>
    </SafeAreaView>
  );
}
