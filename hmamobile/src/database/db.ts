import { openDatabase } from 'react-native-sqlite-storage';

export const db = openDatabase('kiosk.db');
