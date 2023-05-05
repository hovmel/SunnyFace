import React, {FC, useEffect, useRef, useState} from 'react';
import {
  Alert,
  Animated,
  DeviceEventEmitter,
  PermissionsAndroid,
} from 'react-native';
import styles from './styles';
import {ActiveScreen} from '../../../Main';
// @ts-ignore
import WebView from 'react-native-webview';

interface Props {
  activeScreen: ActiveScreen;
}

const VideoChat: FC<Props> = ({activeScreen}) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isGranted, setIsGranted] = useState<boolean>(false);

  const translateY = useRef(new Animated.Value(600)).current;

  const show = () => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const hide = () => {
    Animated.timing(translateY, {
      toValue: 600,
      duration: 100,
      useNativeDriver: true,
    }).start();
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

  useEffect(() => {
    (async () => {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ]);
      if (granted) {
        setIsGranted(true);
      }
    })();
  }, []);

  return (
    <Animated.View style={[styles.wrapper, {transform: [{translateY}]}]}>
      {isGranted && (
        <WebView
          source={{
            uri: 'https://apiv1.sunny.solutions/video-chat',
          }}
          style={styles.webview}
          geolocationEnabled={true}
          mediaPlaybackRequiresUserAction={false}
          javaScriptEnabled={true}
        />
      )}
    </Animated.View>
  );
};

export default VideoChat;
