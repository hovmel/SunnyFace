import React, {
  FC,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  View,
  Button,
  Animated,
  Easing,
  DeviceEventEmitter,
  Alert,
} from 'react-native';
import styles from './styles';
import Lottie from 'lottie-react-native';
import {Heart} from '../../helpers/animations';
import {ActiveScreen} from '../../Main';

interface Props {
  activeScreen: ActiveScreen;
}

type TEmotion =
  | 'normal'
  | 'smile'
  | 'sad'
  | 'angry'
  | 'cry'
  | 'laser'
  | 'wait'
  | 'sleep'
  | 'talk'
  | 'crazy'
  | 'heart';

const Face: FC<Props> = ({activeScreen}) => {
  const lottieRef = useRef<Lottie>(null);
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const [currentEmotion, setCurrentEmotion] = useState<TEmotion>();

  const [speed, setSpeed] = useState<number>(1);
  const [loop, setLoop] = useState<boolean>(false);

  const forWaiting = () => {
    Animated.timing(scale, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
      easing: Easing.sin,
    }).start();
    Animated.timing(translateX, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
    Animated.timing(translateY, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
    Animated.timing(opacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const forAndroid = () => {
    Animated.timing(scale, {
      toValue: 0.5,
      duration: 200,
      useNativeDriver: true,
    }).start();
    Animated.timing(translateX, {
      toValue: 1100,
      duration: 200,
      useNativeDriver: true,
    }).start();
    Animated.timing(translateY, {
      toValue: -780,
      duration: 200,
      useNativeDriver: true,
    }).start();
    Animated.timing(opacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const forSettings = () => {
    hide();
  };

  const forSunnyBand = () => {
    hide();
  };

  const forEnvironment = () => {
    Animated.timing(scale, {
      toValue: 0.7,
      duration: 200,
      useNativeDriver: true,
    }).start();
    Animated.timing(translateX, {
      toValue: -70,
      duration: 200,
      useNativeDriver: true,
    }).start();
    Animated.timing(translateY, {
      toValue: -280,
      duration: 200,
      useNativeDriver: true,
    }).start();
    Animated.timing(opacity, {
      toValue: 1,
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
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
      Animated.timing(translateY, {
        toValue: -1700,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }, 200);
  };

  const onIntentReceive = (val: {emotion: TEmotion; duration: number}) => {
    if (!val) {
      return false;
    }

    if (val.emotion === 'heart' && currentEmotion !== 'heart') {
      becomeHeart();
    } else if (val.emotion === 'smile' && currentEmotion !== 'smile') {
      becomeFace();
    }
    //setCurrentEmotion(val.emotion);
  };

  const becomeHeart = () => {
    setLoop(false);
    play(0, 170);
    setTimeout(() => {
      hitHeart();
    }, 4000);
  };

  const hitHeart = () => {
    setLoop(true);
    play(170, 230);
  };

  const becomeFace = () => {
    setLoop(false);
    play(230, 420);
  };

  const play = (start: number, end: number) => {
    lottieRef.current?.play(start, end);
  };

  useEffect(() => {
    if (activeScreen === 'waiting') {
      /* From other to this*/
      forWaiting();
    } else {
      /* From this to other*/
      if (activeScreen === 'android') {
        forAndroid();
      } else if (activeScreen === 'sunny_band') {
        forSunnyBand();
      } else if (activeScreen === 'settings') {
        forSettings();
      } else if (activeScreen === 'environment') {
        forEnvironment();
      }
    }
  }, [activeScreen]);

  useEffect(() => {
    console.log('Adding intent listener');
    DeviceEventEmitter.addListener('broadcaster-data-received', data => {
      if (!data?.payload) {
        return false;
      }
      onIntentReceive(JSON.parse(data.payload));
    });

    return () => {
      console.log('Removing intent listener');
      DeviceEventEmitter.removeAllListeners('broadcaster-data-received');
    };
  }, []);

  return (
    <View style={styles.wrapper}>
      <Animated.View
        style={[
          styles.animationContainer,
          {
            transform: [{scale: scale}, {translateX}, {translateY}],
            opacity,
          },
        ]}>
        <Lottie
          ref={lottieRef}
          source={Heart}
          speed={speed}
          loop={loop}
          style={styles.animation}
        />
      </Animated.View>
    </View>
  );
};

export default Face;
