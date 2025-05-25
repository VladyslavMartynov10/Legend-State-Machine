import React from 'react';
import {StyleSheet, ViewProps} from 'react-native';
import Animated, {
  AnimatedProps,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

interface AnimatedBackdropProps {
  onBackdropPress?: () => void;
  isVisible: boolean;
}

export const AnimatedBackdrop: React.FC<AnimatedBackdropProps> = React.memo(
  ({onBackdropPress, isVisible}) => {
    const visibility = useDerivedValue(() => {
      return isVisible ? 1 : 0;
    }, [isVisible]);

    const animatedStyle = useAnimatedStyle(() => {
      return {
        opacity: withTiming(visibility.value),
      };
    });

    const animatedProps = useAnimatedProps<AnimatedProps<ViewProps>>(() => {
      return {
        pointerEvents: visibility.value > 0 ? 'auto' : 'none',
      };
    });

    return (
      <Animated.View
        animatedProps={animatedProps}
        onTouchStart={onBackdropPress}
        style={[styles.container, animatedStyle]}
      />
    );
  },
);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
});
