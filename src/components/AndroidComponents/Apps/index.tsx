import React, {FC, useEffect, useRef, useState} from 'react';
import {View, Animated, Image, PermissionsAndroid} from 'react-native';
import styles from './styles';
import {ActiveScreen} from '../../../Main';
// @ts-ignore
import AppsImage from '../../../../assets/images/apps.png';
import {WINDOW_WIDTH} from '../../../constants/system';
import RNInstalledApplication from 'react-native-installed-application';
import WebView from 'react-native-webview';

interface Props {
  activeScreen: ActiveScreen;
}
interface TApp {
  packageName: string;
  apkDir: string;
  appName: string;
  firstInstallTime: number;
  icon: string;
  lastUpdateTime: number;
  size: number;
  versionCode: number;
  versionName: string;
}

const Apps: FC<Props> = ({activeScreen}) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [apps, setApps] = useState<TApp[]>();

  const translateX = useRef(new Animated.Value(-WINDOW_WIDTH)).current;
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
        toValue: -WINDOW_WIDTH,
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

  /*useEffect(() => {
        RNInstalledApplication.getApps()
      .then((res: TApp[]) => {
        setApps(res);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);*/

  return (
    <Animated.View
      style={[styles.wrapper, {transform: [{translateX}]}, {opacity}]}>
      <Image source={AppsImage} style={styles.image} />
    </Animated.View>
  );
};

export default Apps;
