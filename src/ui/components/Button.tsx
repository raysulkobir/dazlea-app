import React from "react";
import { TouchableOpacity, Text } from "react-native";

// Button Component
export const Button = ({
    title,
    onPress,
    variant = "primary",
    disabled = false,
}) => {
    const variants: Record<string, string> = {
        primary: "bg-primary-600",
        secondary: "bg-purple-600",
        success: "bg-green-600",
        danger: "bg-red-600",
        outline: "bg-white border-2 border-blue-600",
    };

    const textColors: Record<string, string> = {
        primary: "text-white",
        secondary: "text-white",
        success: "text-white",
        danger: "text-white",
        outline: "text-blue-600",
    };

    const bgClass = variants[variant] ?? variants.primary;
    const textClass = textColors[variant] ?? textColors.primary;

    return (
        <TouchableOpacity
            className={`${bgClass} rounded-xl py-4 px-6 mb-3 ${disabled ? "opacity-50" : ""
                }`}
            onPress={onPress}
            disabled={disabled}
        >
            <Text className={`${textClass} font-bold text-center text-base`}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};
