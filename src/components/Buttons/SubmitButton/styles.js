import {StyleSheet} from 'react-native';
// import {Fonts} from '../../../assets/fonts/index';
import theme from '../../../utils/theme';
import {vw, vh} from '../../../units/index';

export default style = StyleSheet.create({
  touchableButtonStyle: {
    width: 60 * vw,
    height: 6 * vh,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: vh,
  },

  titleTextStyle: {
    color: theme.whiteBackground,
    fontSize: 2 * vh,
  },
});
