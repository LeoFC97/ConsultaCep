/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src'; //definindo a primeira pagina a ser chamada
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
