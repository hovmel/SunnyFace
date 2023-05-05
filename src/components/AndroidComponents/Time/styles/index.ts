import {StyleSheet} from 'react-native';
import {COLORS} from '../../../../constants/colors';
import {FONTS} from '../../../../constants/fonts';

export default StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 160,
    left: 70,
  },
  upperText: {
    fontSize: 64,
    color: COLORS.black,
    fontFamily: FONTS.light,
    marginBottom: 8,
  },
  lowerText: {
    fontSize: 24,
    color: COLORS.black,
    fontFamily: FONTS.regular,
    marginBottom: 8,
  },
});
