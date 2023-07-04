import {StyleSheet, Platform} from 'react-native';
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

  logoView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5 * vh,
    marginBottom: 3 * vh,
  },

  logoStyle: {
    resizeMode: 'contain',
    height: 30 * vw,
    width: 70 * vw,
  },

  fieldContainer: {
    backgroundColor: theme.whiteBackground,
    height: 62 * vh,
    width: 100 * vw,
    borderRadius: 12 * vw,
  },

  miniContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80 * vw,
    alignSelf: 'center',
  },

  welcomeDescriptionText: {
    width: 60 * vw,
    textAlign: 'center',
    fontSize: 1.8 * vh,
    marginTop: 1 * vh,
    color: theme.defaultAuthDescriptionColor,
  },

  welcomeBackTextStyle: {
    fontSize: 3 * vh,
    marginTop: 5 * vh,
  },

  fieldsView: {
    marginTop: 2 * vh,
  },

  checkIconStyle: {
    resizeMode: 'contain',
    height: 4 * vh,
    width: 4 * vw,
  },

  mainRow: {
    flexDirection: 'row',
    width: 80 * vw,
    justifyContent: 'space-between',
    marginTop: 2 * vh,
  },

  checkButtonView: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  rememberTextStyle: {
    fontSize: 1.8 * vh,
    alignSelf: 'center',
    position: 'absolute',
    marginLeft: 6 * vw,
    fontFamily: Fonts.SFR,
  },

  forgotPasswordButtonView: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  forgotPasswordTextStyle: {
    color: theme.primary,
    fontSize: 1.8 * vh,
    fontFamily: Fonts.SFR,
  },

  submitButtonStyle: {
    width: 70 * vw,
    marginTop: 5 * vh,
  },

  titleTextStyle: {
    fontSize: 1.8 * vh,
    fontFamily: Fonts.SFD,
  },

  sliderView: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderBottomLeftRadius: 20 * vw,
    borderBottomRightRadius: 20 * vw,
  },
  containerStylePagination: {
    bottom: 10 * vh,
  },
  dotStylePagination: {
    width: 12,
    height: 1.5 * vh,
    borderRadius: 10,
    backgroundColor: theme.primary,
    marginHorizontal: -2 * vw,
    borderWidth: 0.5 * vw,
    borderColor: 'transparent',
  },

  inactiveDotStylePagination: {
    width: 16,
    height: 2.2 * vh,
    borderRadius: 8,
    backgroundColor: theme.primary,
    marginHorizontal: -2 * vw,
    borderColor: 'transparent',
  },

  sliderStyle: {
    height: 80 * vh,
  },

  mainButtonsView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5 * vh,
    bottom: 20 * vh,
    backgroundColor: '#ffffff',
    height: 50 * vh,
    borderTopRightRadius: 15 * vw,
  },

  descriptionView: {
    textAlign: 'center',
    color: theme.primary,
    fontSize: 2 * vh,
    width: 80 * vw,
    lineHeight: 2.5 * vh,
  },

  descriptionFirstView: {
    textAlign: 'center',
    color: theme.primary,
    fontSize: 2 * vh,
    width: 80 * vw,
    lineHeight: 2.5 * vh,
    bottom: 4 * vh,
  },

  headingTextStyle: {
    fontFamily: Fonts.MSW,
    fontSize: 2.8 * vh,
    marginBottom: 3 * vh,
    // bottom: 5 * vh,
  },

  headingFirstTextStyle: {
    fontFamily: Fonts.MSW,
    fontSize: 2.8 * vh,
    marginBottom: 3 * vh,
    bottom: 5 * vh,
  },

  submitButtonView: {
    width: 60 * vw,
    marginTop: 4 * vh,
  },

  submitFirstButtonView: {
    width: 60 * vw,
    marginTop: 4 * vh,
    bottom: 4 * vh,
  },

  submitAlternateButtonView: {
    width: 84 * vw,
    position: 'absolute',
    bottom: 5 * vh,
    height: vh * 7,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: vh * -3,
    flexDirection: 'row',
    marginLeft: vh * 4,
  },
  getStartedStyles: {
    fontFamily: Fonts.SFR,
    fontSize: vh * 1.2,
    color: '#0C0D34',

    fontSize: vh * 4,
    color: '#0C0D34',
  },
  loginContainerView: {
    width: 92 * vw,

    position: 'absolute',
    bottom: 8 * vh,
    height: vh * 7,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: vh * -3,
    flexDirection: 'row',
    marginLeft: vh * 2.8,
  },
  getStartedStyles: {
    fontFamily: Fonts.SFD,
    fontSize: vh * 3,
    color: '#0C0D34',

    fontSize: vh * 4,
    color: '#0C0D34',
  },
  iconContainerView: {
    width: 100 * vw,
    position: 'absolute',
    bottom: Platform.OS == 'ios' ? 15 * vh : 12 * vh,
    borderRadius: 2 * vw,
    alignItems: 'center',
    alignItems: 'center',
    marginBottom: Platform.OS == 'ios' ? vh * -5 : vh * -1,
  },

  appiconContainerView: {
    width: 64 * vw,
    position: 'absolute',
    bottom: 24 * vh,
    borderRadius: 2 * vw,
    alignItems: 'center',
    alignItems: 'center',
    marginBottom: Platform.OS == 'ios' ? vh * -5 : vh * -1,
  },
  getStartedStyles: {
    fontFamily: Fonts.SFD,
    fontSize: vh * 4,
    color: '#0C0D34',
  },

  textStyleAlternate: {
    color: theme.primary,
  },
});
export default styles;
