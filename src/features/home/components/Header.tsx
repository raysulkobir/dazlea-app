import React, { useMemo, useState } from "react";
import { View, TextInput, Pressable, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native"; // if using react-navigation

const Header: React.FC = () => {
    const navigator = useNavigation();

    return (
        <View className="my-2">
            <Pressable onPress={()=> navigator.navigate("SearchFilter") }>
                <View className="flex-row items-center rounded-full bg-[#f8f4f1] px-4 py-3 border border-primary shadow-sm">
                    <TextInput
                        placeholder="Search destination"
                        placeholderTextColor="#000"
                        returnKeyType="search"
                        className="flex-1 ml-3 text-[15px] text-black"
                    />
                    <Ionicons name="search" size={20} color="#000" />
                </View>
            </Pressable>
        </View>
    );
};

export default Header;
