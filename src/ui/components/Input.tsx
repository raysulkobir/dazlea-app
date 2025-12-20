import React from "react";
import { View, TextInput, TextInputProps } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

type InputProps = {
    placeholder?: string;
    value: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;

    // icon handled by Ionicons
    iconName?: keyof typeof Ionicons.glyphMap; // e.g. "mail-outline", "lock-closed-outline"
    iconSize?: number;
    iconColor?: string;

    // test IDs
    inputTestID?: string;
    containerTestID?: string;
} & Omit<
    TextInputProps,
    "value" | "onChangeText" | "secureTextEntry" | "placeholder"
>;

export const Input: React.FC<InputProps> = ({
    placeholder,
    value,
    onChangeText,
    secureTextEntry = false,
    iconName,
    iconSize = 20,
    iconColor = "#9CA3AF",
    inputTestID,
    containerTestID,
    ...rest
}) => {
    return (
        <View className="mb-4" testID={containerTestID}>
            <View className="bg-white rounded-xl border border-gray-200 px-4 py-3 flex-row items-center">
                {iconName && (
                    <Ionicons
                        name={iconName}
                        size={iconSize}
                        color={iconColor}
                        style={{ marginRight: 8 }}
                    />
                )}

                <TextInput
                    className="flex-1 text-gray-800 text-base"
                    placeholder={placeholder}
                    placeholderTextColor="#9CA3AF"
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={secureTextEntry}
                    testID={inputTestID}
                    {...rest}
                />
            </View>
        </View>
    );
};
