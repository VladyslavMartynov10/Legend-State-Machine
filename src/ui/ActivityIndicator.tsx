import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ActivityIndicator as Indicator} from 'react-native';
import Modal from 'react-native-modal';

interface ActivityIndicatorProps {
  isVisible: boolean;
  color?: string;
}

export const ActivityIndicator: React.FC<ActivityIndicatorProps> = ({
  isVisible,
  color,
}) => (
  <Modal
    backdropOpacity={0.4}
    backdropColor="#000"
    isVisible={isVisible}
    animationIn="fadeIn"
    animationOut="fadeOut">
    <View style={styles.container}>
      <Indicator size="large" color={color} />
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
