import {StyleSheet} from 'react-native';
import {Fonts} from '../../../assets/fonts';
import {vh, vw} from '../../../units/index';
import theme from '../../../utils/theme';

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  content: {
    alignItems: 'center',
  },

  searchView: {
    flexDirection: 'row',
    width: 100 * vw,
    height: 50 * vh,
    justifyContent: 'space-between',
    resizeMode: 'contain',
    backgroundColor: theme.whiteBackground,
  },

  searchIconsView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  searchIconStyle: {
    resizeMode: 'contain',
    height: 5 * vh,
    width: 5 * vw,
  },

  searchIconButtonView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: vw * 8,
    marginRight: vw * 2,
  },

  searchTextStyle: {
    alignSelf: 'center',
    fontFamily: Fonts.MSW,
    fontSize: 2.8 * vh,
    color: theme.black,
    marginLeft: 5 * vw,
  },

  listView: {
    width: vw * 90,
  },

  searchRowContainer: {
    flexDirection: 'row',
    width: 80 * vw,
    justifyContent: 'space-between',
  },

  rowContainer: {
    flexDirection: 'row',
    width: 90 * vw,
    height: 25 * vh,
    marginLeft: 5 * vw,
  },

  listEmptyComponentView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2 * vh,
  },

  leftArrowIconStyle: {
    resizeMode: 'contain',
    height: 7 * vh,
    width: 7 * vw,
  },

  leftArrowIconButton: {
    justifyContent: 'center',
  },
});
export default styles;
