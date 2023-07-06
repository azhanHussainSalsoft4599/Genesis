import {StyleSheet} from 'react-native';
import {Fonts} from '../../../assets/fonts';
import {vh, vw} from '../../../units/index';
import theme from '../../../utils/theme';

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: theme.whiteBackground,
  },
  cardContainer: {
    height: vh * 70,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  backImageContainer: {
    height: vh * 4,
    width: vw * 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: vw * 2,
  },
  welcome: {
    marginVertical: vh,
    color: theme.black,
    fontSize: vw * 4,
  },
  drawerBlackIconStyles: {
    height: 2 * vh,
    resizeMode: 'contain',
    width: 2 * vw,
    tintColor: theme.black,
  },
  headerStyleTwo: {
    marginTop: vh * 3.5,
    width: vw * 100,
    alignItems: 'center',
    //height: vh*9,
  },
  content: {
    alignItems: 'center',
  },
  radioContainer: {
    marginTop: vh * 2,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: vw * 90,
  },
  scrollStep3: {
    flex: 1,
    backgroundColor: theme.black,
    borderRadius: vh * 5,
  },
  searchView: {
    flexDirection: 'row',
    width: 100 * vw,
  },

  searchIconsView: {
    height: vh * 15,
    width: vw * 10,
  },

  searchIconStyle: {
    resizeMode: 'contain',
    height: 5 * vh,
    width: 5 * vw,
  },

  searchIconButtonView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: vh * 20,
  },

  searchTextStyle: {
    fontFamily: Fonts.MSW,
    fontSize: 2.8 * vh,
    color: theme.whiteBackground,
  },

  checkedStyle: {
    resizeMode: 'contain',
    height: 8 * vh,
    width: 8 * vw,
  },

  shippingCheckedCircleStyle: {
    resizeMode: 'contain',
    height: 8 * vh,
    width: 8 * vw,
    right: 4 * vw,
    top: 0.5 * vh,
  },

  billingAlertTextStyle: {
    fontFamily: Fonts.SFR,
    fontSize: 1.7 * vh,
    fontFamily: Fonts.JSR,
  },

  billingContainer: {
    flexDirection: 'row',
  },

  checkedView: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  billingAlertView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 3 * vw,
  },

  stateCountryView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  customTextInputView: {
    width: 38 * vw,
  },

  customTextInputStyle: {
    width: 35 * vw,
  },

  buttonsView: {
    flexDirection: 'row',
    marginTop: 10 * vh,
    width: 90 * vw,
    justifyContent: 'space-around',
    marginBottom: 10 * vh,
    backgroundColor: theme.whiteBackground,
  },

  backButtonStyle: {
    width: 40 * vw,
    backgroundColor: 'transparent',
    borderWidth: 1,
  },

  nextButtonStyle: {
    width: 40 * vw,
  },

  textStykeBackButton: {
    color: theme.black,
  },

  summaryTextStyle: {
    alignSelf: 'center',
    fontFamily: Fonts.KB,
    fontSize: 2.5 * vh,
    width: 80 * vw,
  },

  dressImageStyle: {
    height: 30 * vw,
    width: 30 * vw,
    resizeMode: 'cover',
    borderRadius: 4 * vw,
  },

  summaryView: {
    backgroundColor: theme.whiteBackground,
    width: vw * 100,
    flex: 1,
    alignItems: 'center',
    paddingVertical: vh * 3,
  },

  itemsView: {
    marginTop: 2 * vh,
    height: 25 * vh,
    marginHorizontal: 2 * vw,
  },

  amountTextStyle: {
    fontSize: 2 * vh,
    fontFamily: Fonts.MTB,
    color: theme.primary,
  },

  dressNameStyle: {
    fontSize: 1.8 * vh,
    fontFamily: Fonts.KB,
    marginTop: 1.5 * vh,

    width: 26 * vw,
  },

  miniItemView: {},

  shippingAddressHeadingView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 1 * vh,
    fontFamily: Fonts.PFB,
  },

  shippingAddressHeadingTextStyle: {
    alignSelf: 'center',
    fontFamily: Fonts.BMB,
    fontSize: 2 * vh,
  },
  TotalPrice: {
    alignSelf: 'center',
    fontFamily: Fonts.KB,
    fontSize: 2 * vh,
  },

  textDescriptionStyle: {
    color: theme.defaultInactiveBorderColor,
    width: 80 * vw,
    fontSize: 2 * vh,
    fontFamily: Fonts.MTR,
  },

  cardNumberTextStyle: {
    color: theme.primary,
    width: 80 * vw,
    fontSize: 2 * vh,
  },

  masterCardTextStyle: {
    color: theme.borderBottomDefaultColor,
    width: 80 * vw,
    fontSize: 1.9 * vh,
  },

  changeButtonView: {
    marginTop: 2 * vh,
  },

  changeTextStyle: {
    fontFamily: Fonts.BMB,
    color: theme.black,
    fontSize: 1.8 * vh,
  },

  mainCardDetailsView: {
    height: 20 * vh,
    borderBottomWidth: 1,
    borderBottomColor: theme.borderBottomDefaultColor,
    width: 80 * vw,
  },

  mainPaymentView: {
    height: 15 * vh,
    borderBottomColor: theme.borderBottomDefaultColor,
    width: 80 * vw,
    marginTop: 3 * vh,
  },

  paymentDetailsView: {
    flexDirection: 'row',
    width: 80 * vw,
  },

  creditCardStyle: {
    resizeMode: 'contain',
    height: 14 * vw,
    width: 14 * vw,
  },

  cardImageView: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  cardTextView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 2 * vw,
    marginTop: 1 * vh,
  },

  checkView: {
    justifyContent: 'center',
    alignItems: 'center',
    right: 25 * vw,
  },

  stepsImageStyle: {
    resizeMode: 'contain',
    height: 14 * vw,
    width: 80 * vw,
  },

  stepsView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100 * vw,
    marginTop: 2 * vh,
    marginBottom: 3 * vh,
  },

  cardsView: {
    flexDirection: 'row',
    width: 80 * vw,
    justifyContent: 'center',
    // justifyContent: 'space-around'
    // justifyContent: 'space-between',
  },

  cardButtonView: {
    width: 25 * vw,
    height: 8 * vh,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.primary,
    // marginLeft: 28 * vw,
  },

  cardIconView: {
    height: 4 * vw,
    width: 4 * vw,
  },

  cartItemsListStyle: {
    marginRight: 5 * vw,
    height: 30 * vh,
    borderBottomWidth: 0.5,
    borderBottomColor: theme.borderBottomDefaultColor,
    width: 80 * vw,
  },
});
export default styles;
