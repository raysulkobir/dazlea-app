import React, { useEffect } from 'react'
import { View, ScrollView, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import type { ProductsRootState, Products } from '@/features/home/types/products.types'
import type { AppDispatch } from '@/store'
import { fetchBestSellingProducts } from '@/features/home/state/bestSelling/fetchBestSellingProductsThunks'
import ProductCard from '@/ui/components/ProductCard'

const BestSellingProducts: React.FC = () => {
    // Hooks
    const dispatch = useDispatch<AppDispatch>()
    const { data, loading, error } = useSelector(
        (state: ProductsRootState) => state.bestSellingProducts
    )
    // Effects
    useEffect(() => {
        dispatch(fetchBestSellingProducts())
    }, [dispatch])

    // States
    if (loading) {
        return (
            <View className="mt-4 px-4">
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {Array.from({ length: 3 }).map((_, index) => (
                        <View
                            key={index}
                            className="mr-4 h-[260px] w-[170px] rounded-md bg-gray-200"
                        />
                    ))}
                </ScrollView>
            </View>
        )
    }

    if (error) {
        return null
    }

    return (
        <View className="mt-4">
            {/* Header */}
            <View className="flex-row items-center justify-between">
                <Text className="text-xl font-bold text-gray-900 mb-2">Best Selling Products</Text>
                <Text className="text-primary-600 font-sans">See All</Text>
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                {data?.data?.map((product: Products) => (
                    <ProductCard
                        key={product.id}
                        title={product.name}
                        image={product.thumbnail_image}
                        main_price={product.main_price}
                        oldPrice={product.stroked_price}
                        offerPercentage={product.discount}
                        rating={product.rating}
                        reviews={product.id}
                        inStock={product.id % 3 !== 0}
                        isAddedToCart={product.id % 2 === 0}
                        onPress={() => console.log('Product clicked', product.id)}
                        onAddToCart={() => console.log('Add to cart', product.id)}
                        onViewCart={() => console.log('View cart')}
                    />
                ))}
            </ScrollView>
        </View>
    )
}

export default BestSellingProducts
