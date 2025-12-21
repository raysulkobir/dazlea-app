import { View, Text, ScrollView, Image, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import type { HomeBannerRootState, HomeBannerItem, HomeBanner } from '@/features/home/types/banner.types'
import { fetchBanners } from '../state/banners/bannerThunks'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch } from '@/store' 

const Banner = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { data: bannerData, loading: bannerLoading, error: bannerError } = useSelector((state: HomeBannerRootState) => state.banners)
    
    useEffect(() => {
        dispatch(fetchBanners())
    }, [dispatch])

  return (
    <View className="mt-4">
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="px-4"
            contentContainerStyle={{ paddingRight: 16 }}
        >
            {bannerData?.data?.map((item) => (
                <Pressable key={item.photo} onPress={() => {}}>
                    <Image
                            source={{ uri: item.photo }}
                        className="w-[160px] h-[160px] mr-4 rounded-xl"
                    />
                </Pressable>
            ))}
        </ScrollView>
    </View>
  )
}

export default Banner