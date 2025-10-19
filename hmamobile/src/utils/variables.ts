import { Dimensions, Platform } from 'react-native';

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

export const TOKEN = 'token';
export const LOGIN_DATA = 'LOGIN_DATA';
export const BASE_URL = 'BASE_URL';
export const IS_ANDROID = Platform.OS == 'android';
