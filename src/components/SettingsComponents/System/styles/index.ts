import {StyleSheet} from 'react-native';
import {WINDOW_WIDTH} from '../../../../constants/system';

export default StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 30,
    left: (WINDOW_WIDTH - 508) / 2,
  },
  image: {
    width: 508,
    height: 468,
    resizeMode: 'contain',
  },
});
