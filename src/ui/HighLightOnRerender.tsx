import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export const HighlightOnRender: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const borderColor = useSharedValue('transparent');

  borderColor.value = withTiming('limegreen', {duration: 100}, () => {
    borderColor.value = withTiming('transparent', {duration: 500});
  });

  const animatedStyle = useAnimatedStyle(() => ({
    borderWidth: 1,
    borderColor: borderColor.value,
  }));

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
};
