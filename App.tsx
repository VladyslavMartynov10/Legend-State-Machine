import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {KeyboardProvider} from 'react-native-keyboard-controller';
import {RootNavigator} from './src/navigation';

function App(): React.JSX.Element {
  return (
    <KeyboardProvider>
      <SafeAreaProvider>
        <StatusBar animated translucent />
        <RootNavigator />
      </SafeAreaProvider>
    </KeyboardProvider>
  );
}

export default App;
