import React, {FC, useEffect, useRef, useState} from 'react';
import {View, Animated, Image} from 'react-native';
import styles from './styles';
import {ActiveScreen} from '../../../Main';
// @ts-ignore
import SImage from '../../../../assets/images/micro.png';

interface Props {
  activeScreen: ActiveScreen;
}

const Microphone: FC<Props> = ({activeScreen}) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const translateY = useRef(new Animated.Value(-300)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const show = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
    Animated.timing(translateY, {
      toValue: 0,
      duration: 270,
      useNativeDriver: true,
    }).start();
  };

  const hide = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      Animated.timing(translateY, {
        toValue: -300,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }, 200);
  };

  useEffect(() => {
    if (activeScreen === 'environment' && !isActive) {
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
    <Animated.View
      style={[styles.wrapper, {transform: [{translateY}]}, {opacity}]}>
      <Image source={SImage} style={styles.image} />
    </Animated.View>
  );
};

export default Microphone;
