import { Dimensions, Platform, StyleSheet } from 'react-native';

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

export const TOKEN = 'token';
export const LOGIN_DATA = 'LOGIN_DATA';
export const BASE_URL = 'BASE_URL';
export const ACCOUNTS = 'ACCOUNTS';
export const IS_ANDROID = Platform.OS == 'android';
export const HAIRLINE_WIDTH = StyleSheet.hairlineWidth;
