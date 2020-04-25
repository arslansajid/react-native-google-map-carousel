import { AppRegistry, Platform } from 'react-native';
import App from './App';

AppRegistry.registerComponent('react_native_google_map_carousel', () => App);

if (Platform.OS === 'web') {
  const rootTag = document.getElementById('root') || document.getElementById('main');
  AppRegistry.runApplication('react_native_google_map_carousel', { rootTag });
}
