import {StyleSheet} from 'react-native';
import {Fonts} from '../../../assets/fonts';
import {vh, vw} from '../../../units/index';
import theme from '../../../utils/theme';
const buttonWidth = 90 * vw;
const buttonHeight = buttonWidth * 0.4567;
const padding = (100 * vw - 90 * vw) / 2;
const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  content: {
    alignItems: 'center',
  },

  searchView: {
    flexDirection: 'row',
    marginTop: 10 * vh,
    width: 80 * vw,
    justifyContent: 'space-between',
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
    marginRight: vw,
  },

  searchTextStyle: {
    alignSelf: 'center',
    fontFamily: Fonts.MSW,
    fontSize: 2.8 * vh,
  },

  imageBackgroundStyle: {
    flex: 1,
    // height: 20 * vh,
    // width: 90 * vw,
    // resizeMode: 'contain',
    // justifyContent: 'center',
    // alignItems: 'center',
    // borderRadius:3*vw
  },

  sliderDescriptionView: {
    flexDirection: 'row',
    width: 80 * vw,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
    marginBottom: 5 * vh,
    justifyContent: 'space-between',
    backgroundColor: 'red',
  },

  sliderTextView: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: vh * 9,
  },

  sliderTextStyle: {
    width: 50 * vw,
    fontSize: 3.5 * vh,
    color: '#fff',
    lineHeight: 3.9 * vh,
    fontFamily: Fonts.KB,
    textTransform: 'capitalize',
  },

  taglineTextStyle: {
    width: 50 * vw,
    fontSize: 1.8 * vh,
    color: '#fff',
    lineHeight: 2 * vh,
    fontFamily: Fonts.SFR,
  },

  flatListView: {
    marginTop: 4 * vh,
    flex: 1,
  },

  linearGradient: {
    height: 20 * vh,
    width: 90 * vw,
    borderRadius: 3 * vw,
  },
  categoryContainer: {
    width: buttonWidth,
    height: buttonHeight,
    borderRadius: 4,
  },
  categoryButton: {
    marginBottom: 2 * vh,
  },
  categoryButtonBackground: {},
  categoryButtonBackgroundImage: {},
  categoryButtonContentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: padding,
  },
  categoryText: {
    fontSize: 3 * vh,
    color: '#fff',
    fontFamily: Fonts.KB,
    textTransform: 'capitalize',
  },
});
export default styles;
