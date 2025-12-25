import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import type { SlidersRootState, SliderBanner, SliderItem } from '@/features/home/types/slider.types'
import { fetchSliders } from '@/features/home/state/sliders/sliderThunks'
import type { AppDispatch } from '@/store' 
import Slider from '@/features/home/components/Slider'
import BannerSkeleton from '@/features/home/skeleton/BannerSkeleton'
import Header from '@/features/home/components/Header'
import OfferMenu from '@/features/home/components/OfferMenu'
import Banner from '@/features/home/components/Banner'
import FeaturedCategories from '@/features/home/components/FeaturedCategories'
import { ScrollView } from 'react-native'
import FeaturedProducts from '@/features/home/components/FeaturedProducts'
import BestSellingProducts from '@/features/home/components/BestSellingProducts'
import FlashDeals from '../components/FlashDeals'

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { data: sliderData, loading: sliderLoading, error: sliderError } = useSelector((state: SlidersRootState) => state.sliders)

  useEffect(() => {
    dispatch(fetchSliders())
  }, [dispatch])


  const sliderCarouselItems: SliderItem[] | undefined = sliderData?.data?.map((item: SliderBanner) => ({
    image: { uri: item.photo },
  })) ?? []

  if (sliderLoading) {
    return (
      <SafeAreaView className="flex-1 bg-appbg">
        <BannerSkeleton />
      </SafeAreaView>
    )
  }


  return (
    <SafeAreaView className="flex-1 px-3 bg-appbg">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Header />

        {/* Home Slider */}
        <Slider data={sliderCarouselItems} autoPlay loop />

        {/* Offer Menu */}
        <OfferMenu />

        {/* Flash Deals */}
        <FlashDeals />

        {/* Banner */}
        <Banner />

        {/* Featured Categories */}
        <FeaturedCategories />


        {/* FeaturedProducts */}
        <FeaturedProducts />

        {/* BestSellingProducts  */}
        <BestSellingProducts />

       
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen