import React, {FC, useEffect, useRef, useState} from 'react';
import {View, Animated, Image} from 'react-native';
import styles from './styles';
import {ActiveScreen} from '../../../Main';
// @ts-ignore
import SImage from '../../../../assets/images/device_info.png';

interface Props {
  activeScreen: ActiveScreen;
}

const DeviceInfo: FC<Props> = ({activeScreen}) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const opacity = useRef(new Animated.Value(0)).current;

  const show = () => {
    setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }, 230);
  };

  const hide = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (activeScreen === 'settings' && !isActive) {
      /* From other to this*/
      show();
      setIsActive(true);
    } else if (isActive) {
      /* From this to other*/
      hide();
      setIsActive(false);
    }
  }, [activeScreen]);

  return (
    <Animated.View style={[styles.wrapper, {opacity}]}>
      <Image source={SImage} style={styles.image} />
    </Animated.View>
  );
};

export default DeviceInfo;
