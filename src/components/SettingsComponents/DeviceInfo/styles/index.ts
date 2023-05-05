import {StyleSheet} from 'react-native';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '../../../../constants/system';

export default StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 360,
    left: (WINDOW_WIDTH - 450) / 2,
  },
  image: {
    width: 450,
    height: 119,
    resizeMode: 'contain',
  },
});
