import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useDebugContext} from '../DebugContext';

export const HighlightOnRender: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const {debugRenderHighlight} = useDebugContext();
  const borderColor = useSharedValue('transparent');

  if (debugRenderHighlight) {
    borderColor.value = withTiming('limegreen', {duration: 100}, () => {
      borderColor.value = withTiming('transparent', {duration: 500});
    });
  }

  const animatedStyle = useAnimatedStyle(() => ({
    borderWidth: debugRenderHighlight ? 1 : 0,
    borderColor: borderColor.value,
    borderRadius: 6,
  }));

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
};
