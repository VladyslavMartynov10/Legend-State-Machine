import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {$TextInput as TextInput} from '@legendapp/state/react-native';
import {Show} from '@legendapp/state/react';

interface FormInputProps {
  value$: any;
  error$: any;
  placeholder: string;
  secureTextEntry?: boolean;
  placeholderTextColor?: string;
  style: (isError: boolean) => object;
}

export const FormInput = ({
  value$,
  error$,
  placeholder,
  secureTextEntry = false,
  placeholderTextColor = '#666',
  style,
}: FormInputProps) => {
  return (
    <>
      <TextInput
        $value={value$}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        $style={() => style(!!error$.get())}
        placeholderTextColor={placeholderTextColor}
      />
      <Show if={error$}>
        {() => <Text style={stylesheet.error}>{error$.get()}</Text>}
      </Show>
    </>
  );
};

const stylesheet = StyleSheet.create({
  error: {
    color: 'red',
    fontSize: 14,
  },
});
