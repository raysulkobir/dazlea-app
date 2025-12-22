import React, { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

type MenuKey = "discount" | "popular" | "nearby" | "top";

type OfferMenuProps = {
    onChange?: (key: MenuKey) => void;
};

const OfferMenu: React.FC<OfferMenuProps> = ({ onChange }) => {
    const [active, setActive] = useState<MenuKey>("");

    const handlePress = (key: MenuKey) => {
        setActive(key);
        onChange?.(key);
    };

    const Item = ({ keyName, label, icon, }: { keyName: MenuKey;label: string;
        icon: React.ComponentProps<typeof Ionicons>["name"];
    }) => {
        const isActive = active === keyName;

        return (
            <Pressable
                onPress={() => handlePress(keyName)}
                className={`mr-3 rounded-xl px-4 py-3 border ${isActive ? "bg-primary-50 border-primary" : "bg-primary-500 border-primary-400"
                    }`}
                style={({ pressed }) => ({
                    opacity: pressed ? 0.7 : 1,
                    transform: [{ scale: pressed ? 0.98 : 1 }],
                })}
            >
                <View className="flex-row items-center  justify-center gap-2">
                    <Ionicons name={icon} size={15} color={isActive ? "#F85402" : "#fff"} />
                    <Text className={`text-[14px] font-semibold  ${isActive ? "text-primary" : "text-secondary-700"}`}>
                        {label}
                    </Text>
                </View>
            </Pressable>
        );
    };

    return (
        <View className="mt-4 border-yellow-700" >
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                <Item keyName="discount" label="Todays Deal" icon="pricetag" />
                <Item keyName="popular" label="Flash Deal" icon="flame" />
                <Item keyName="nearby" label="Nearby" icon="location" />
                <Item keyName="top" label="Top Rated" icon="star" />
            </ScrollView>
        </View>
    );
};

export default OfferMenu;
