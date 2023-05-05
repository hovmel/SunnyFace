import React, {FC, useEffect, useRef, useState} from 'react';
import {View, Animated, Image} from 'react-native';
import styles from './styles';
import {ActiveScreen} from '../../../Main';
// @ts-ignore
import SImage from '../../../../assets/images/catalog.png';

interface Props {
  activeScreen: ActiveScreen;
}

const Catalog: FC<Props> = ({activeScreen}) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const opacity = useRef(new Animated.Value(0)).current;

  const show = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 230,
      useNativeDriver: true,
    }).start();
  };

  const hide = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (activeScreen === 'sunny_band' && !isActive) {
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

export default Catalog;
