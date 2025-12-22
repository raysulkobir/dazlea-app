import { View, Text, ScrollView, Pressable, Image } from 'react-native'
import React from 'react'
import Ionicons from "@expo/vector-icons/Ionicons";
import ProductCard from '@/ui/components/ProductCard';


const FeaturedProducts: React.FC = () => {
    return (
        <View className="mt-4">
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                <ProductCard
                    title="Vaseline Gluta Hya Radiance Serum Lotion – 200ml"
                    image="https://www.dazlea.com/public/uploads/all/IlcSbuxRjCD9F6PVFjJQ9uQHXr3cTBx8qTgFmqYM.webp"
                    price={1900}
                    oldPrice={2999}
                    offerPercentage={22}
                    rating={3}
                    reviews={120}
                    inStock={true}
                    isAddedToCart={true}
                    onPress={() => alert('Product clicked')}
                    onAddToCart={() => alert('Added to cart')}
                    onViewCart={() => alert('View cart')}
                />
                <ProductCard
                    title="Vaseline Gluta Hya Radiance Serum Lotion – 200ml"
                    image="https://www.dazlea.com/public/uploads/all/IlcSbuxRjCD9F6PVFjJQ9uQHXr3cTBx8qTgFmqYM.webp"
                    price={1900}
                    oldPrice={2999}
                    rating={3}
                    reviews={120}
                    inStock={true}
                    isAddedToCart={false}
                    onPress={() => alert('Product clicked')}
                    onAddToCart={() => alert('Added to cart')}
                    onViewCart={() => alert('View cart')}
                />
                

            </ScrollView>
        </View>
    )
}

export default FeaturedProducts
