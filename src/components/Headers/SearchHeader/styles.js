import {StyleSheet} from 'react-native';
import {vh, vw} from '../../../units/index';
import {Fonts} from '../../../assets/fonts';
import theme from '../../../utils/theme';

export default style = StyleSheet.create({
  searchView: {
    flexDirection: 'row',
    paddingTop: 5 * vh,
    // backgroundColor:'red',
    width: 90 * vw,
    justifyContent: 'space-between',
  },

  searchTextStyle: {
    alignSelf: 'center',
    fontFamily: Fonts.KB,
    fontSize: 2.8 * vh,
    color: theme.lightBlack,
    marginRight: vw * 30,
  },

  searchIconsView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 7 * vw,
    height: 7 * vh,
  },

  searchIconButtonView: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  searchIconStyle: {
    resizeMode: 'contain',
    height: 4 * vh,
    width: 4 * vw,
  },

  drawerIconStyle: {
    resizeMode: 'contain',
    height: 6 * vw,
    width: 6 * vw,
  },

  drawerButtonView: {
    justifyContent: 'center',
    width: vw * 8,
    alignItems: 'center',
  },
});
