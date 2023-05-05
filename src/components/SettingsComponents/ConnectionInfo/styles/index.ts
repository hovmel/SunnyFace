import {StyleSheet} from 'react-native';
import {WINDOW_WIDTH} from '../../../../constants/system';

export default StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 60,
    left: (WINDOW_WIDTH - 508) / 2,
  },
  image: {
    width: 508,
    height: 180,
    resizeMode: 'contain',
  },
});
