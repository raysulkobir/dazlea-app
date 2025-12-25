import { View, Text, ScrollView, Image } from 'react-native'
import React, { useEffect } from 'react'
import Countdown from '@/ui/components/Countdown'
import { useDispatch, useSelector } from 'react-redux'
import type { ProductsRootState, Products } from '@/features/home/types/products.types'
import type { AppDispatch } from '@/store'
import { fetchFlashDeals } from '@/features/home/state/flashDeals/flashDealsThunks'
import ProductCard from '@/ui/components/ProductCard'

const FlashDeals: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { data, loading, error } = useSelector(
    (state: ProductsRootState) => state.flashDeals
  )
  // Effects
  useEffect(() => {
    dispatch(fetchFlashDeals())
  }, [dispatch])

  return (
    <View className="mt-6">
       <View className="flex-row items-center justify-between">
      <Text className="text-xl font-bold text-gray-900 mb-2">Flash Deals</Text>
          <Text className="text-primary-600 font-sans">See All</Text>
      </View>
      <View className="items-center justify-between mb-4">
        {/* Banner */}
        <Image
          source={{ uri: data?.data?.[0]?.banner }}
          className="w-full h-40 rounded-md"
          resizeMode="cover"
        />
        <Countdown targetDate="2025-12-31T23:59:59" />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {data?.data?.[0]?.products?.data.map((product: Products) => (
          <ProductCard
            key={product.id}
            title={product.name}
            image={product.image}
            main_price={product.price}
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

export default FlashDeals