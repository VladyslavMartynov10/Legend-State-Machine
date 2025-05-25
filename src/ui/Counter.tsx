import React, {useRef} from 'react';
import {Text, StyleSheet} from 'react-native';

export const Counter: React.FC = () => {
  const renderCounter = useRef(0);
  renderCounter.current += 1;

  return (
    <Text style={styles.text}>Repaints quantity: {renderCounter.current}</Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    color: '#999',
    height: 30,
    textAlign: 'center',
    fontWeight: '500',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
