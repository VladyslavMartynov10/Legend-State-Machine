import {AppRegistry, TouchableOpacity} from 'react-native';
import App from './App';
import {setDefaultProps, touchableConfig} from './src/lib';
import {name as appName} from './app.json';

setDefaultProps(TouchableOpacity, touchableConfig);

AppRegistry.registerComponent(appName, () => App);
