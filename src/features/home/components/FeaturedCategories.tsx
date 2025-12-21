import React, { useEffect } from "react";
import { View, Text, Image, Pressable, ScrollView, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/features/home/state/categories/categoryThunks";
import type { RootState } from "@/features/home/types/category.types";
import type { AppDispatch } from "@/store";
import { SafeAreaView } from "react-native-safe-area-context";
import BannerSkeleton from "../skeleton/BannerSkeleton";


const FeaturedCategories: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { data, loading, error } = useSelector((state: RootState) => state.categories);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    // ✅ your API may be: data.data OR data (array)
    const list = (data?.data ?? data ?? []) as Array<{
        id?: string | number;
        name?: string;
        banner?: string;
    }>;

    if (loading) {
        return (
          <SafeAreaView className="flex-1 bg-appbg">
            <BannerSkeleton />
          </SafeAreaView>
        )
      }

    return (
        <View className="mt-4">
            {/* Header */}
            <View className="px-4 flex-row items-center justify-between">
                <Text className="text-2xl font-bold text-gray-900">Featured Categories</Text>
                <Pressable hitSlop={10}>
                    {({ pressed }) => (
                        <Text className={`text-sm ${pressed ? "text-primary-700" : "text-gray-500"}`}>
                            See all
                        </Text>
                    )}
                </Pressable>
            </View>

            {/* Horizontal list */}
              <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className="mx-4"
                >
                {list.map((item, idx) => {
                    return (
                        <Pressable
                            key={String(item.id ?? item.banner ?? idx)}
                            className={idx === list.length - 1 ? "" : "mr-4"}
                            hitSlop={8}
                            onPress={() => { }}
                        >
                            {({ pressed }) => (
                                <View
                                    className={`items-center bg-white border border-gray-100 p-3 ${pressed ? "opacity-90" : "opacity-100"
                                        }`}
                                >
                                    <Image
                                        source={{ uri: item.banner } }
                                        className="w-30 h-30 mb-2"
                                        resizeMode="cover"
                                    />

                                    <Text className="mt-2 text-center text-[13px] font-semibold text-gray-900" numberOfLines={1}>
                                        {item.name ?? "Category"}
                                    </Text>
                                </View>
                            )}
                        </Pressable>
                    );
                })}
            </ScrollView>
        </View>
    );
};

export default FeaturedCategories;
