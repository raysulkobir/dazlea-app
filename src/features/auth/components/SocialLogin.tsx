import React, { useEffect, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Platform,
    TouchableOpacity,
    ActivityIndicator,
    Image,
    Alert,
} from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import PropTypes from 'prop-types';

import { Colors } from '@/ui/theme/colors';
import { images } from '@/utils/images';
import { getProportionalFontSize } from '@/ui/theme/typography';

const WEB_CLIENT_ID =
    '29348014778-9dampicfdveuo3lgv9j72rb960r58qep.apps.googleusercontent.com';

const SocialLogin = ({
    onGoogleSuccess,
    onFacebookSuccess,
    onAppleSuccess,
    onFailure,
    showLoading = false,
    containerStyle,
}) => {
    useEffect(() => {
        GoogleSignin.configure({
            webClientId: WEB_CLIENT_ID,
            offlineAccess: true,
            forceCodeForRefreshToken: false,
        });
    }, []);

    // ---- Google Sign-In ----
    const signInWithGoogle = useCallback(async () => {
        try {
            // Optional: ensure clean state
            await GoogleSignin.signOut().catch(() => { });
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

            const userInfo = await GoogleSignin.signIn();
            // Shape from @react-native-google-signin/google-signin:
            // userInfo = { user, idToken, accessToken, serverAuthCode }
            const { user, idToken } = userInfo || {};

            const userData = {
                id: user?.id ?? '',
                email: user?.email ?? '',
                firstName: user?.givenName ?? '',
                lastName: user?.familyName ?? '',
                token: idToken ?? '',
                provider: 'google',
                photo: user?.photo ?? '',
            };

            onGoogleSuccess?.(userData);
        } catch (error) {
            console.error('Google Sign-In Error', error);
            onFailure?.(error, 'google');
            Alert.alert('Google Sign-In', 'Unable to complete Google sign-in.');
        }
    }, [onGoogleSuccess, onFailure]);

    // ---- Facebook Login ----
    const loginWithFacebook = useCallback(async () => {
        try {
            const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

            if (result.isCancelled) return;

            const data = await AccessToken.getCurrentAccessToken();
            if (!data?.accessToken) {
                throw new Error('No Facebook access token');
            }

            // Fetch email, name, and picture from Graph API
            const graphURL = `https://graph.facebook.com/v12.0/me?fields=id,first_name,last_name,email,picture.type(large)&access_token=${data.accessToken}`;
            const response = await fetch(graphURL);
            const profile = await response.json();

            if (profile?.error) {
                throw new Error(profile.error?.message || 'Facebook profile fetch failed');
            }

            const userData = {
                id: profile?.id ?? '',
                firstName: profile?.first_name ?? '',
                lastName: profile?.last_name ?? '',
                email: profile?.email ?? '', // may be empty if not granted
                token: data.accessToken.toString(),
                provider: 'facebook',
                photo: profile?.picture?.data?.url ?? '',
            };

            onFacebookSuccess?.(userData);
        } catch (error) {
            console.error('Facebook Login Error', error);
            onFailure?.(error, 'facebook');
            Alert.alert('Facebook Login', 'Unable to complete Facebook login.');
        }
    }, [onFacebookSuccess, onFailure]);

    // ---- Apple Sign-In (iOS only) ----
    const onAppleButtonPress = useCallback(async () => {
        if (Platform.OS !== 'ios' || !appleAuth.isSupported) {
            console.log('Apple Sign In is not available on this platform');
            return;
        }

        try {
            const appleAuthRequestResponse = await appleAuth.performRequest({
                requestedOperation: appleAuth.Operation.LOGIN,
                requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
            });

            const { user, email, fullName, identityToken, authorizationCode } = appleAuthRequestResponse;

            const userData = {
                id: user ?? '',
                email: email ?? '',
                firstName: fullName?.givenName ?? '',
                lastName: fullName?.familyName ?? '',
                token: identityToken ?? '',
                provider: 'apple',
                authCode: authorizationCode ?? '',
            };

            onAppleSuccess?.(userData);
        } catch (error) {
            console.error('Apple Sign-in error:', error);
            onFailure?.(error, 'apple');
            Alert.alert('Apple Sign-In', 'Unable to complete Apple sign-in.');
        }
    }, [onAppleSuccess, onFailure]);

    const SocialButton = ({ icon, onPress, buttonStyle, label }) => {
        return (
            <TouchableOpacity
                style={[styles.buttonContainer, buttonStyle]}
                onPress={onPress}
                disabled={showLoading}
                accessibilityRole="button"
                accessibilityLabel={label}
                activeOpacity={0.7}
            >
                {showLoading ? (
                    <ActivityIndicator size="small" />
                ) : (
                    <Image source={icon} style={styles.icon} resizeMode="contain" />
                )}
            </TouchableOpacity>
        );
    };

    return (
        <View style={[styles.container, containerStyle]}>
            <SocialButton
                onPress={signInWithGoogle}
                icon={images.logo}
                label="Sign in with Google"
            />
            <SocialButton
                onPress={loginWithFacebook}
                icon={images.logo}
                label="Sign in with Facebook"
            />
            {Platform.OS === 'ios' && appleAuth.isSupported ? (
                <SocialButton
                    buttonStyle={styles.appleButton}
                    onPress={onAppleButtonPress}
                    icon={images.logo}
                    label="Sign in with Apple"
                />
            ) : null}
        </View>
    );
};

SocialLogin.propTypes = {
    onGoogleSuccess: PropTypes.func,
    onFacebookSuccess: PropTypes.func,
    onAppleSuccess: PropTypes.func,
    onFailure: PropTypes.func,
    showLoading: PropTypes.bool,
    containerStyle: PropTypes.any,
};

const BUTTON_SIZE = 44;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonContainer: {
        width: BUTTON_SIZE,
        height: BUTTON_SIZE,
        borderRadius: BUTTON_SIZE / 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.white,
        marginHorizontal: 10, // reliable spacing (gap is not supported everywhere)
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#E6E6E6',
    },
    appleButton: {
        backgroundColor: Colors.black,
    },
    buttonText: {
        fontSize: getProportionalFontSize(16),
        fontWeight: '600',
    },
    icon: {
        width: 24,
        height: 24,
    },
});

export default SocialLogin;
