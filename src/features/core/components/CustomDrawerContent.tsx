// CustomDrawerContent.tsx
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import {
    DrawerContentComponentProps,
} from '@react-navigation/drawer';
// optional: if you use safe areas inside drawer
import { images } from '@/utils/images';
import { Colors } from '@/ui/theme/colors';
import { getProportionalFontSize } from '@/ui/theme/typography';
import Fonts from '@/ui/theme/fonts';
// import drawerItems  from '../../core/data/DrawerItems';
import { drawerItems } from '@/features/core/data/DrawerItems';
import { SafeAreaView } from 'react-native-safe-area-context';

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
    const { navigation } = props;

    const handleProfile = () => navigation.navigate('Profile');
    const handleLogout = () => {
        navigation.replace('Login');
    };

    return (
        <SafeAreaView style={styles.container} >
            <TouchableOpacity onPress={handleProfile} style={styles.profileSection}>
                <Image source={images.user} style={styles.profileImage} />
                <Text style={styles.profileName}>John Doe</Text>
                <Text style={styles.profileSubTitle}>Have a nice day!</Text>
            </TouchableOpacity>

            <View style={styles.drawerContent}>
                <FlatList
                    data={drawerItems}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.drawerItem}
                            onPress={() => navigation.navigate(item.id)}>
                            <Image source={item.icon} style={styles.drawerIcon} />
                            <Text style={styles.drawerText}>{item.title}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutText}>logout</Text>
                <Image source={images.logout} />
            </TouchableOpacity>

            <Image source={images.logo}  style={styles.logo}/>
            <Text style={styles.versionText}>Version 1.0 Alpha</Text>
        </SafeAreaView>
    );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: Colors.border
    },
    profileSection:{
        height:150,
        backgroundColor: Colors.primary,
        justifyContent:'center',
        alignItems:'center',
    },
    profileImage:{
        width:70,
        height:70,
        marginBottom:10,
    },
    profileName:{
        color:Colors.white,
        fontSize:18,
        fontWeight:'bold',
        textTransform:'capitalize',
    },
    profileSubTitle:{
        color:Colors.grey,
        fontSize:14,
    },
    drawerContent:{
        flex:1,
        padding:20,
    },
    drawerItem:{
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:Colors.white,
        borderRadius: 10,
        marginBottom: 10, 
        height: 50,
    },
    drawerIcon:{
        width:24,
        height:24,
        marginHorizontal:10,
    },
    drawerText:{
        fontSize: getProportionalFontSize(12),
        color:Colors.black,
        textTransform:'capitalize',
        fontFamily: Fonts.font_400,
    },
    logoutButton: {
        flexDirection: 'row',
        alignSelf: 'center',
        backgroundColor: Colors.primary,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    logoutText: {
        color: Colors.white,
        fontSize: getProportionalFontSize(14),
        fontFamily: Fonts.font_500,
        marginRight: 10,
        textTransform:'capitalize',
    },
    logo:{
        alignSelf:'center', 
    },
    versionText:{
        alignSelf:'center', 
        marginBottom:30,
        color:Colors.black,
        fontSize: getProportionalFontSize(12),
        fontFamily: Fonts.font_400,
    },
});
