// src/ui/components/Header.tsx
import React, { memo } from 'react';
import {
  Image,
  ImageSourcePropType,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/ui/theme/colors';
import { images } from '@/utils/images';

type HeaderProps = {
  onLogoPress?: () => void;
  onNotificationsPress?: () => void;
  onProfilePress?: () => void;
};

const Header: React.FC<HeaderProps> = ({
  onLogoPress,
  onNotificationsPress,
  onProfilePress,
}) => {
  return (
    <>
      {/* Android uses backgroundColor; iOS ignores it */}
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} animated />

      <SafeAreaView edges={['top']} style={styles.header}>
        <View style={styles.headerLeftSection}>
          <TouchableOpacity onPress={onLogoPress} hitSlop={HIT_SLOP}>
            <Image source={images.logowhite as ImageSourcePropType} style={styles.logo} resizeMode="contain" />
          </TouchableOpacity>
        </View>

        <View style={styles.headerRightSection}>
          <TouchableOpacity onPress={onNotificationsPress} hitSlop={HIT_SLOP}>
            <Image source={images.Notification as ImageSourcePropType} style={styles.icon} resizeMode="contain" />
          </TouchableOpacity>

          <TouchableOpacity onPress={onProfilePress} hitSlop={HIT_SLOP} style={styles.userImageContainer}>
            <Image source={images.user as ImageSourcePropType} style={styles.avatar} resizeMode="cover" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

const HIT_SLOP = { top: 8, bottom: 8, left: 8, right: 8 };

export default memo(Header);

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.primary,

    // Android shadow
    elevation: 2,

    // iOS shadow
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,

    // paddingVertical: 12,
    height: 130,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    

    paddingHorizontal: 20,
  },
  headerLeftSection: {
    width: '50%',
    justifyContent: 'center',
  },
  headerRightSection: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  userImageContainer: {
    marginLeft: 16,
  },
  logo: {
    width: 120,
    height: 40,
  },
  icon: {
    width: 24,
    height: 24,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
});
