import React, {FC, ReactElement, ReactNode, useState} from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import Face from '../components/Face';
import Wrapper from '../components/Wrapper';
import MainButton from '../components/MainButton';
import {
  AndroidIcon,
  EnvIcon,
  SettingsIcon,
  WaitingIcon,
} from '../helpers/icons';
import Apps from '../components/AndroidComponents/Apps';
import Notifications from '../components/AndroidComponents/Notifications';
import Time from '../components/AndroidComponents/Time';
import RobotInfo from '../components/SettingsComponents/RobotInfo';
import ConnectionInfo from '../components/SettingsComponents/ConnectionInfo';
import DeviceInfo from '../components/SettingsComponents/DeviceInfo';
import System from '../components/SettingsComponents/System';
import Appearance from '../components/SettingsComponents/Appearance';
import AiCvAnalytics from '../components/SettingsComponents/AiCvAnalytics';
import Behavior from '../components/SettingsComponents/Behavior';
import Microphone from '../components/EnvironmentComponents/Microphone';
import Help from '../components/EnvironmentComponents/Help';
import Balance from '../components/EnvironmentComponents/Balance';
import History from '../components/EnvironmentComponents/History';
import Profiles from '../components/EnvironmentComponents/Profiles';
import VideoChat from '../components/EnvironmentComponents/VideoChat';
import Catalog from '../components/SunnyBandComponents/Catalog';

interface Props {}
export type ActiveScreen =
  | 'waiting'
  | 'android'
  | 'sunny_band'
  | 'settings'
  | 'environment';

const Main: FC<Props> = ({}) => {
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>('waiting');

  const onAndroidPress = () => {
    setActiveScreen(activeScreen === 'android' ? 'waiting' : 'android');
  };
  const onSunnyBandPress = () => {
    setActiveScreen(activeScreen === 'sunny_band' ? 'waiting' : 'sunny_band');
  };
  const onEnvPress = () => {
    setActiveScreen(activeScreen === 'environment' ? 'waiting' : 'environment');
  };
  const onSettingsPress = () => {
    setActiveScreen(activeScreen === 'settings' ? 'waiting' : 'settings');
  };

  return (
    <Wrapper>
      <MainButton
        style={styles.bottomLeftButton}
        iconStyle={styles.bottomLeftIcon}
        icon={<AndroidIcon width={100} height={100} />}
        onPress={onAndroidPress}
      />
      <MainButton
        style={styles.topLeftButton}
        iconStyle={styles.topLeftIcon}
        icon={<WaitingIcon width={64} height={64} />}
        onPress={onSunnyBandPress}
      />
      <MainButton
        style={styles.topRightButton}
        iconStyle={styles.topRightIcon}
        icon={<EnvIcon width={80} height={80} />}
        onPress={onEnvPress}
      />
      <MainButton
        style={styles.bottomRightButton}
        iconStyle={styles.bottomRightIcon}
        icon={<SettingsIcon width={64} height={64} />}
        onPress={onSettingsPress}
      />

      <Face activeScreen={activeScreen} />

      {/* Android components start */}
      <Apps activeScreen={activeScreen} />
      <Notifications activeScreen={activeScreen} />
      <Time activeScreen={activeScreen} />
      {/* Android components end */}

      {/* Settings components start */}
      <RobotInfo activeScreen={activeScreen} />
      <ConnectionInfo activeScreen={activeScreen} />
      <DeviceInfo activeScreen={activeScreen} />
      <System activeScreen={activeScreen} />
      <Appearance activeScreen={activeScreen} />
      <AiCvAnalytics activeScreen={activeScreen} />
      <Behavior activeScreen={activeScreen} />
      {/* Settings components end */}

      {/* Environment components start */}
      <Microphone activeScreen={activeScreen} />
      <Help activeScreen={activeScreen} />
      <Balance activeScreen={activeScreen} />
      <History activeScreen={activeScreen} />
      <Profiles activeScreen={activeScreen} />
      <VideoChat activeScreen={activeScreen} />
      {/* Environment components end */}

      {/* Sunny Band components start */}
      <Catalog activeScreen={activeScreen} />
      {/* Sunny Band components end */}
    </Wrapper>
  );
};

export default Main;
