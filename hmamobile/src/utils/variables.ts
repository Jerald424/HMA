import { Dimensions, Platform, StyleSheet } from 'react-native';

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

export const TOKEN = 'token';
export const LOGIN_DATA = 'LOGIN_DATA';
export const BASE_URL = 'BASE_URL';
export const ACCOUNTS = 'ACCOUNTS';
export const IS_ANDROID = Platform.OS == 'android';
export const HAIRLINE_WIDTH = StyleSheet.hairlineWidth;
export const EMPLOYEE_REGISTER_COUNT = 'EMPLOYEE_REGISTER_COUNT';
export const LOCAL_ATTENDANCE_RECORD = 'LOCAL_ATTENDANCE_RECORD';
export const ATTENDANCE_MODE = 'ATTENDANCE_MODE';
export const ITEM_PER_INIT = 'ITEM_PER_INIT';
