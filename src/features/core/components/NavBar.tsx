// src/ui/components/NavBar.tsx
import React, { memo } from 'react';
import {
    Image,
    ImageSourcePropType,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { Colors } from '@/ui/theme/colors';
import { images } from '@/utils/images';
import Fonts from '@/ui/theme/fonts';
import { getProportionalFontSize } from '@/ui/theme/typography';

type NavItem = {
    id: string;        
    title: string;          
    icon: ImageSourcePropType;
    onPress: () => void;
};

const HIT_SLOP = { top: 8, bottom: 8, left: 8, right: 8 };

const NavBar: React.FC = () => {
    const navigation = useNavigation<any>();

    const handleNavPress = (route: string) => {
        if (!route) return;
        navigation.navigate(route);
    };

    const navItems: NavItem[] = [
        {
            id: 'HomeScreen',
            title: 'home',
            icon: images.home as ImageSourcePropType,
            onPress: () => handleNavPress('Home'),
        },
        {
            id: 'GiveBloodScreen',
            title: 'donateblood',
            icon: images.donateblood as ImageSourcePropType,
            onPress: () => handleNavPress('GiveBloodScreen'),
        },
        {
            id: 'NeedBloodScreen',
            title: 'needblood',
            icon: images.needblood as ImageSourcePropType,
            onPress: () => handleNavPress('NeedBloodScreen'),
        },
        {
            id: 'RewardsScreen',
            title: 'rewards',
            icon: images.rewards as ImageSourcePropType,
            onPress: () => handleNavPress('RewardsScreen'),
        },
        {
            id: 'Menu',
            title: 'menu',
            icon: images.drawer as ImageSourcePropType,
            onPress: () => navigation.dispatch(DrawerActions.openDrawer()),
        },
    ];

    return (
        <View style={styles.container}>
            {navItems.map((item) => (
                <TouchableOpacity
                    key={item.id}
                    onPress={item.onPress}
                    hitSlop={HIT_SLOP}
                    accessibilityRole="button"
                    accessibilityLabel={item.title}
                    style={styles.navItem}
                >
                    <Image source={item.icon} style={styles.navIcon} resizeMode="contain" />
                    <Text style={styles.navText}>{item.title}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default memo(NavBar);

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primary,

        // Shadow
        elevation: 4,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,

        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,

        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',

        paddingVertical: 12,
        paddingHorizontal: 8,
    },

    navItem: {
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 56, // keeps tap targets reasonable
    },

    navIcon: {
        width: 24,
        height: 24,
        tintColor: Colors.white,
        alignSelf: 'center',
    },

    navText: {
        color: Colors.white,
        marginTop: 4,
        fontFamily: Fonts.font_400,
        fontSize: getProportionalFontSize(10),
        textTransform: 'capitalize',
    },
});
