import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

type ProductCardProps = {
    title: string
    image: string
    main_price: string
    oldPrice?: string
    offerPercentage?: string
    rating?: number
    reviews?: number
    inStock?: boolean
    isAddedToCart?: boolean
    onPress?: () => void
    onAddToCart?: () => void
    onViewCart?: () => void
}

const ProductCard: React.FC<ProductCardProps> = ({
    title,
    image,
    main_price,
    offerPercentage,
    oldPrice,
    rating = 0,
    reviews = 0,
    inStock = true,
    isAddedToCart = true,
    onPress,
    onAddToCart,
    onViewCart,
}) => {
    return (
        <Pressable
            onPress={onPress}
            className="w-[180px] rounded-md bg-white border border-gray-200"
        >
            {/* Image */}
            <View className="overflow-hidden p-2 rounded-t-md bg-gray-100">
                {offerPercentage && (
                    <Text className="absolute top-2 left-2 z-10 bg-primary-600 px-2 py-1 rounded-md text-xs font-semibold text-white">{offerPercentage}</Text>
                )}
                <Image
                    source={{ uri: image }}
                    className="w-full aspect-square"
                    resizeMode="contain"
                />
            </View>

            {/* Content */}
            <View className="p-3">
                {/* Title */}
                <Text
                    className="text-base font-semibold text-black mb-1"
                    numberOfLines={2}
                >
                    {title}
                </Text>

                {/* Rating */}
                <View className="flex-row items-center mb-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Ionicons
                            key={index}
                            name="star"
                            size={14}
                            color={index < rating ? '#F85402' : '#ccc'}
                        />
                    ))}
                    <Text className="ml-1 text-xs font-bold text-primary">
                        ({reviews})
                    </Text>
                </View>

                {/* Price */}
                <View className="mt-1 flex-row items-center">
                    {oldPrice && (
                        <Text className="text-sm text-gray-400 line-through mr-1">
                            ৳{oldPrice}
                        </Text>
                    )}
                    <Text className="text-base font-semibold text-primary">
                        ৳{main_price}
                    </Text>
                </View>

                {/* Buttons */}
                {inStock ? (
                    <>
                        {isAddedToCart ?
                            (
                                <Pressable
                                    onPress={onAddToCart}
                                    className="mt-3 rounded-md bg-black py-1.5 items-center"
                                >
                                    <Text className="text-sm font-semibold text-white">
                                        Add to cart
                                    </Text>
                                </Pressable>
                            ) : (
                                <Pressable
                                    onPress={onViewCart}
                                    className="mt-2 rounded-md bg-gray-900 py-1.5 items-center"
                                >
                                    <Text className="text-sm font-semibold text-white">
                                        View Cart
                                    </Text>
                                </Pressable>
                            )
                        }
                    </>
                ) : (
                    <View className="mt-3 rounded-md bg-primary py-1.5 items-center">
                        <Text className="text-sm font-semibold text-white">
                            Out of stock
                        </Text>
                    </View>
                )}
            </View>
        </Pressable>
    )
}

export default ProductCard
