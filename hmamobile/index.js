/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import MainWrapper from './src/components/wrapper/mainWrapper';

AppRegistry.registerComponent(appName, () => MainWrapper);
