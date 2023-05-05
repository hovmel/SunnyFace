import React, {FC, useEffect, useRef, useState} from 'react';
import {View, Animated, Text} from 'react-native';
import styles from './styles';
import {ActiveScreen} from '../../../Main';
import moment, {Moment} from 'moment';

interface Props {
  activeScreen: ActiveScreen;
}

const Time: FC<Props> = ({activeScreen}) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [date, setDate] = useState<Moment>(moment());

  const translateX = useRef(new Animated.Value(-450)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const show = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
    Animated.timing(translateX, {
      toValue: 0,
      duration: 200,
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
      Animated.timing(translateX, {
        toValue: -450,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }, 200);
  };

  useEffect(() => {
    if (activeScreen === 'android' && !isActive) {
      /* From other to this*/
      show();
      setIsActive(true);
    } else if (isActive) {
      /* From this to other*/
      hide();
      setIsActive(false);
    }
  }, [activeScreen]);

  useEffect(() => {
    setInterval(() => {
      const currentDate = moment();
      if (currentDate.minutes() !== date?.minutes()) {
        setDate(currentDate);
      }
    }, 10 * 1000);
  }, []);

  return (
    <Animated.View
      style={[styles.wrapper, {transform: [{translateX}]}, {opacity}]}>
      <Text style={styles.upperText}>{date.format('h:mm a')}</Text>
      <Text style={styles.lowerText}>{date.format('MMMM D, YYYY')}</Text>
    </Animated.View>
  );
};

export default Time;
