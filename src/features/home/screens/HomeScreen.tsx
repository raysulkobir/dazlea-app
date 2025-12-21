import React, { useEffect } from 'react'
import { StyleSheet, View, ActivityIndicator, Dimensions } from 'react-native'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories } from '@/features/home/state/categories/categoryThunks'
import type { RootState, CarouselItem } from '@/features/home/types/category.types'
import type { SlidersRootState, SliderBanner, SliderItem } from '@/features/home/types/slider.types'
import { fetchSliders } from '../state/sliders/sliderThunks'
import type { AppDispatch } from '@/store' 
import Slider from '../components/Slider'
import BannerSkeleton from '@/features/home/skeleton/BannerSkeleton'
import Header from '../components/Header'
import OfferMenu from '../components/OfferMenu'

const HomeScreen: React.FC = () => {

  const dispatch = useDispatch<AppDispatch>()
  const { data, loading } = useSelector((state: RootState) => state.categories)
  const { data: sliderData, loading: sliderLoading, error: sliderError } = useSelector((state: SlidersRootState) => state.sliders)

  useEffect(() => {
    dispatch(fetchCategories())
    dispatch(fetchSliders())
  }, [dispatch])

  const carouselData: CarouselItem[] | undefined = data?.data?.map((item: any) => ({
    image: { uri: item.banner },
  }))

  const sliderCarouselItems: SliderItem[] | undefined = sliderData?.data?.map((item: SliderBanner) => ({
    image: { uri: item.photo },
  })) ?? []

  if (loading) {
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
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})