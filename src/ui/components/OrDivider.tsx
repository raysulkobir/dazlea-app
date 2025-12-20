// ui/components/OrDivider.tsx
import React from "react";
import { View, Text } from "react-native";

type OrDividerProps = {
    label?: string;
    className?: string;
};

export const OrDivider: React.FC<OrDividerProps> = ({
    label = "or",
    className,
}) => {
    return (
        <View className={`flex-row items-center my-4 ${className ?? ""}`}>
            <View className="flex-1 h-[1px] bg-gray-200" />
            <Text className="mx-3 text-xs text-gray-400">{label}</Text>
            <View className="flex-1 h-[1px] bg-gray-200" />
        </View>
    );
};
