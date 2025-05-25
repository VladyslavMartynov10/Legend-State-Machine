import React, {useState} from 'react';
import {AuthLegend} from './AuthLegend';
import {AuthDefault} from './AuthDefault';
import {KeyboardProvider} from 'react-native-keyboard-controller';
import {StateMachine} from './StateMachine';

function App(): React.JSX.Element {
  const [index] = useState(2);

  return (
    <KeyboardProvider>
      {index === 0 && <AuthDefault />}
      {index === 1 && <AuthLegend />}
      {index === 2 && <StateMachine />}
    </KeyboardProvider>
  );
}

export default App;
