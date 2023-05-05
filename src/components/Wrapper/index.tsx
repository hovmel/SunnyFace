import React, {FC, ReactElement, ReactNode} from 'react';
import {View, ImageBackground} from 'react-native';
import styles from './styles';
// @ts-ignore
import BackgroundImage from '../../../assets/images/background.jpeg';

interface Props {
  children: ReactNode | ReactElement;
}

const Wrapper: FC<Props> = ({children}) => {
  return (
    <View style={styles.wrapper}>
      <ImageBackground
        source={BackgroundImage}
        style={styles.image}
        resizeMode={'repeat'}>
        {children}
      </ImageBackground>
    </View>
  );
};

export default Wrapper;
