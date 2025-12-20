// ScreenScaffold.tsx
import React from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    ScrollViewProps,
    ViewStyle,
    StyleProp,
    Platform,
    KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from './Header';
import NavBar from './NavBar';
import { Colors } from '@/ui/theme/colors';

export type ScreenScaffoldProps = {
    children: React.ReactNode;

    /** Top bar */
    showTopBar?: boolean;
    TopBarComponent?: React.ComponentType<any>;
    topBarProps?: Record<string, unknown>;

    /** Bottom nav */
    showBottomNavBar?: boolean;
    BottomBarComponent?: React.ComponentType<any>;
    bottomNavBarProps?: Record<string, unknown>;

    /** Scrolling/content */
    scrollViewProps?: ScrollViewProps;
    contentContainerStyle?: StyleProp<ViewStyle>;
    containerStyle?: StyleProp<ViewStyle>;

    /** Keyboard handling */
    keyboardAvoid?: boolean;
    keyboardOffset?: number; // extra offset if needed for headers
};

const ScreenScaffold: React.FC<ScreenScaffoldProps> = ({
    children,

    showTopBar = true,
    TopBarComponent = Header,
    topBarProps = {},

    showBottomNavBar = false,
    BottomBarComponent = NavBar,
    bottomNavBarProps = {},

    scrollViewProps = {},
    contentContainerStyle,
    containerStyle,

    keyboardAvoid = true,
    keyboardOffset = Platform.select({ ios: 8, android: 0 }) as number,
}) => {
    const Content = (
        <ScrollView
            style={styles.scrollView}
            contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            {...scrollViewProps}
        >
            {children}
        </ScrollView>
    );

    return (
        <View style={[styles.container, containerStyle]} edges={['top', 'left', 'right']}>
            {showTopBar ? <TopBarComponent {...topBarProps} /> : null}

            {keyboardAvoid ? (
                <KeyboardAvoidingView
                    style={styles.flex}
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    keyboardVerticalOffset={keyboardOffset}
                >
                    {Content}
                </KeyboardAvoidingView>
            ) : (
                Content
            )}

            {showBottomNavBar ? (
                <SafeAreaView edges={['bottom']}>
                    <BottomBarComponent {...bottomNavBarProps} />
                </SafeAreaView>
            ) : null}
        </View>
    );
};

export default ScreenScaffold;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    flex: { flex: 1 },
    scrollView: { flex: 1 },
    contentContainer: {
        flexGrow: 1,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
});
