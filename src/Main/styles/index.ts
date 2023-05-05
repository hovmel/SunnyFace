import {StyleSheet} from 'react-native';
import {MAIN_BUTTON_SIZE} from '../../constants/sizes';

export default StyleSheet.create({
  bottomLeftButton: {
    left: -MAIN_BUTTON_SIZE / 2,
    bottom: -MAIN_BUTTON_SIZE / 2,
  },
  bottomLeftIcon: {
    left: MAIN_BUTTON_SIZE / 2 + 4,
    top: MAIN_BUTTON_SIZE / 2 - 74,
  },

  topLeftButton: {
    left: -MAIN_BUTTON_SIZE / 2,
    top: -MAIN_BUTTON_SIZE / 2,
  },
  topLeftIcon: {
    left: MAIN_BUTTON_SIZE / 2,
    top: MAIN_BUTTON_SIZE / 2 + 14,
  },

  topRightButton: {
    right: -MAIN_BUTTON_SIZE / 2,
    top: -MAIN_BUTTON_SIZE / 2,
  },
  topRightIcon: {
    left: MAIN_BUTTON_SIZE / 2 - 84,
    top: MAIN_BUTTON_SIZE / 2,
  },

  bottomRightButton: {
    right: -MAIN_BUTTON_SIZE / 2,
    bottom: -MAIN_BUTTON_SIZE / 2,
  },
  bottomRightIcon: {
    left: MAIN_BUTTON_SIZE / 2 - 72,
    top: MAIN_BUTTON_SIZE / 2 - 70,
  },
});
