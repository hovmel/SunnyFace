import {StyleSheet} from 'react-native';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '../../../constants/system';

export default StyleSheet.create({
  wrapper: {},
  animationContainer: {
    width: 1300,
    position: 'absolute',
    left: (WINDOW_WIDTH - 1300) / 2,
    top: (WINDOW_HEIGHT - 800) / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animation: {
    width: '100%',
    height: '100%',
    transform: [{scale: 1.1}],
  },
});
