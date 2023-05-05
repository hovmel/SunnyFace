import React, {FC, ReactElement, ReactNode, useRef} from 'react';
import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  Pressable,
  Animated,
} from 'react-native';
import styles from './styles';
import {Shadow} from 'react-native-shadow-2';
import {COLORS} from '../../constants/colors';

interface Props {
  style: StyleProp<ViewStyle>;
  iconStyle: StyleProp<ViewStyle>;
  icon: ReactNode | ReactElement;
  onPress: () => void;
}

const MainButton: FC<Props> = ({style, iconStyle, icon, onPress}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 1.8,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };
  const onPressOut = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      style={[styles.wrapper, style]}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={onPress}>
      <Animated.View
        style={[{transform: [{scale: scaleAnim}]}, styles.wrapper]}>
        <Shadow
          style={styles.shadow}
          distance={170}
          startColor={COLORS.mainButton}
        />
      </Animated.View>

      <View style={[styles.iconView, iconStyle]}>{icon}</View>
    </Pressable>
  );
};

export default MainButton;
