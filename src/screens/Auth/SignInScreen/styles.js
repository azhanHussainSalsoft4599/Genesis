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

  logoView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.black,
    height: 40 * vw,
    width: 100 * vw,
  },

  logoStyle: {
    resizeMode: 'contain',
    height: 10 * vh,
    width: 35 * vw,
  },

  fieldContainer: {
    height: 100 * vh,
    width: 100 * vw,
    borderTopRightRadius: vh * 4,
    borderTopLeftRadius: vh * 4,
    backgroundColor: theme.whiteBackground,
  },

  miniContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80 * vw,
    alignSelf: 'center',
  },

  welcomeDescriptionText: {
    width: 80 * vw,
    fontSize: 1.8 * vh,
    marginTop: 1 * vh,
    color: theme.defaultAuthDescriptionColor,
  },

  welcomeBackTextStyle: {
    fontSize: 3 * vh,
    marginTop: 2 * vh,
    fontFamily: Fonts.MSW,
    width: 80 * vw,
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

  socialTextStyle: {
    fontFamily: Fonts.SFR,
    fontSize: vh * 1.8,
  },

  titleTextStyle: {
    fontSize: 1.8 * vh,
    fontFamily: Fonts.SFD,
  },

  socialButtonsView: {
    marginTop: 2 * vh,
    marginBottom: 5 * vh,
  },

  tabsView: {
    flexDirection: 'row',
    width: 80 * vw,
    marginTop: 5 * vh,
  },

  signupTabView: {
    marginLeft: 8 * vw,
  },

  signinTabTextStyle: {
    fontFamily: Fonts.SFD,
    fontSize: 1.8 * vh,
  },
  btnContainer: {
    height: vh * 15,
    justifyContent: 'center',
    marginTop: vh * 2,
  },

  signupTextStyle: {
    fontFamily: Fonts.SFD,
    fontSize: 1.8 * vh,
    color: theme.black,
  },
  renderSocialLoginStyle: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: vh * 2,
  },
  signupViewStyle: {
    marginLeft: vw * 4,
  },
});
export default styles;
