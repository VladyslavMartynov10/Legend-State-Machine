import React, {useState} from 'react';
import {AuthDefault, StateMachine} from './src';
import {KeyboardProvider} from 'react-native-keyboard-controller';
import {StatusBar} from 'react-native';

function App(): React.JSX.Element {
  const [index] = useState(2);

  return (
    <KeyboardProvider>
      <StatusBar translucent barStyle="light-content" />
      {index === 0 && <AuthDefault />}
      {index === 2 && <StateMachine />}
    </KeyboardProvider>
  );
}

export default App;
