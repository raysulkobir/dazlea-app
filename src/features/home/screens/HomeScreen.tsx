import React, { useEffect } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Carousel from '@/ui/components/Carousel'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../home/state/categories/categoryThunks';
 

export default function HomeScreen() {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state: any) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);


  const carouselData = data?.data?.map((item: any) => ({
    image: { uri: item.banner },
  }));
  console.log("carouselData", carouselData)

  return (
    <SafeAreaView className='flex-1 bg-appbg'>
      <View>
        <Image
          source={{
            uri: "https://dazlea.com/public/uploads/all/lMLrlNFshOcmiWLPsVb4O4Uryp09XCBZOzybVNpU.webp",
          }}
          style={{ width: 300, height: 200 }}
        />
        <Carousel
          data={[
            { image: require('@/assets/images/onboardingImage.png') },
            { image: require('@/assets/images/onboardingImage.png') },
            {
              image: {
                uri: "https://dazlea.com/public/uploads/all/lMLrlNFshOcmiWLPsVb4O4Uryp09XCBZOzybVNpU.webp"
              }
            }
          ]}
          autoPlay
          loop
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})
