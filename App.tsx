import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {KeyboardProvider} from 'react-native-keyboard-controller';
import {RootNavigator} from './src/navigation';
import {PortalProvider} from '@gorhom/portal';
import {DebugProvider} from './src/DebugContext';

function App(): React.JSX.Element {
  return (
    <KeyboardProvider>
      <SafeAreaProvider>
        <PortalProvider>
          <DebugProvider>
            <StatusBar animated translucent />
            <RootNavigator />
          </DebugProvider>
        </PortalProvider>
      </SafeAreaProvider>
    </KeyboardProvider>
  );
}

export default App;
