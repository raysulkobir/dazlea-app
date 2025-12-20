import React, { useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

type InputPasswordProps = {
    placeholder?: string;
    value: string;
    onChangeText: (text: string) => void;

    iconColor?: string;
    iconSize?: number;

    inputTestID?: string;
    containerTestID?: string;
};

export const InputPassword: React.FC<InputPasswordProps> = ({
    placeholder = "Password",
    value,
    onChangeText,
    iconColor = "#9CA3AF",
    iconSize = 20,
    inputTestID,
    containerTestID,
}) => {
    const [secure, setSecure] = useState(true);

    return (
        <View className="mb-4" testID={containerTestID}>
            <View className="bg-white rounded-xl border border-gray-200 px-4 py-3 flex-row items-center">

                {/* Left lock icon */}
                <Ionicons
                    name="lock-closed-outline"
                    size={iconSize}
                    color={iconColor}
                    style={{ marginRight: 8 }}
                />

                {/* Text Input */}
                <TextInput
                    className="flex-1 text-gray-800 text-base"
                    placeholder={placeholder}
                    placeholderTextColor="#9CA3AF"
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={secure}
                    testID={inputTestID}
                />

                {/* Eye icon toggle */}
                <TouchableOpacity onPress={() => setSecure(!secure)}>
                    <Ionicons
                        name={secure ? "eye-off-outline" : "eye-outline"}
                        size={22}
                        color={iconColor}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};
