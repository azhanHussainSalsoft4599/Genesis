import {StyleSheet} from 'react-native';
import {Fonts} from '../../../assets/fonts';
import {vh, vw} from '../../../units/index';
import theme from '../../../utils/theme';

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: theme.whiteBackground,
  },
  content: {
    alignItems: 'center',
    backgroundColor: theme.whiteBackground,
  },
  rightArrowIconView: {
    justifyContent: 'center',
    width: vw * 15,
    alignItems:'center'
  },

  leftArrowIconStyle: {
    resizeMode: 'contain',
    height: 6 * vh,
    width: 6 * vw,
  },
  searchView: {
    flexDirection: 'row',
    width: 100 * vw,
    height: 34 * vh,
    justifyContent: 'space-between',

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
  },

  searchTextStyle: {
    fontFamily: Fonts.MSW,
    fontSize: 2.8 * vh,
    color: theme.whiteBackground,
  },

  listView: {
    backgroundColor: 'red',
    height: 100 * vh,
    bottom: 30 * vh,
    borderTopLeftRadius: 10 * vw,
    borderTopRightRadius: 10 * vw,
  },

  rowContainer: {
    flexDirection: 'row',
    width: 100 * vw,
    height: 50 * vw,
  },

  contentView: {
    width: 100 * vw,
    backgroundColor: theme.whiteBackground,
    height: 70 * vh,
  },

  headingContentTextStyle: {
    fontFamily: Fonts.MSW,
    fontSize: 2.8 * vh,
  },

  descriptionContentView: {
    color: theme.defaultInactiveBorderColor,
    fontSize: 1.8 * vh,
    fontFamily: Fonts.SFR,
    marginTop: 1 * vh,
  },
  detailsContentView: {
    color: theme.defaultInactiveBorderColor,
    fontSize: 2.5 * vh,
    fontFamily: Fonts.SFR,
  },
  contentViewStyle: {
    width: 90 * vw,
    marginLeft: 5 * vw,
    alignItems: 'center',
  },
});
export default styles;
