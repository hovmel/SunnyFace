import {StyleSheet} from 'react-native';
import {COLORS} from '../../../constants/colors';
import {MAIN_BUTTON_SIZE} from '../../../constants/sizes';

export default StyleSheet.create({
  wrapper: {
    width: MAIN_BUTTON_SIZE,
    height: MAIN_BUTTON_SIZE,
    borderRadius: 200,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  shadow: {
    width: 1,
    height: 1,
    borderRadius: 1,
    backgroundColor: COLORS.second,
  },
  iconView: {
    position: 'absolute',
    zIndex: 101,
  },
});
