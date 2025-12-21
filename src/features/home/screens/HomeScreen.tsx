import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import type { SlidersRootState, SliderBanner, SliderItem } from '@/features/home/types/slider.types'
import { fetchSliders } from '../state/sliders/sliderThunks'
import type { AppDispatch } from '@/store' 
import Slider from '../components/Slider'
import BannerSkeleton from '@/features/home/skeleton/BannerSkeleton'
import Header from '../components/Header'
import OfferMenu from '../components/OfferMenu'
import Banner from '../components/Banner'
import FeaturedCategories from '../components/FeaturedCategories'

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
    <SafeAreaView className="flex-1 bg-appbg">
      {/* Header */}
      <Header />

      {/* Home Slider */}
      <Slider data={sliderCarouselItems} autoPlay loop />

      {/* Offer Menu */}
      <OfferMenu/>

      {/* Banner */}
      <Banner/>

      {/* Featured Categories */}
      <FeaturedCategories/>

    </SafeAreaView>
  )
}

export default HomeScreen