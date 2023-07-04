import {Platform, StyleSheet} from 'react-native';
import fonts, {Fonts} from '../../../assets/fonts';
import {DEVICE_WIDTH, vh, vw} from '../../../units/index';
import theme from '../../../utils/theme';

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  optionTextStyles: {
    textTransform: 'capitalize',
    color: theme.primary,
    fontFamily: Fonts.SFR,
    fontSize: vh * 2,
  },

  variationsContainer: {
    backgroundColor: 'white',
    width: 30 * vw,
    height: 5 * vh,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 2 * vw,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  searchView: {
    flexDirection: 'row',
    marginTop: 10 * vh,
    width: 90 * vw,
    justifyContent: 'space-between',
  },

  searchIconsView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: vw * 15,
  },

  searchIconStyle: {
    resizeMode: 'contain',
    height: 5 * vh,
    width: 5 * vw,
    tintColor: theme.whiteBackground,

  },

  searchIconButtonView: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  searchTextStyle: {
    alignSelf: 'center',
    fontFamily: Fonts.KB,
    fontSize: 2.8 * vh,
    color: theme.whiteBackground,
    marginRight: 20 * vw,
   
  },

  productDetailsStyle: {
    resizeMode: 'contain',
    height: 30 * vh,
    width: 90 * vw,
  },

  productImageView: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  productNameViewWithAmount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  productNameTextStyle: {
    fontSize: 3 * vh,
    fontFamily: Fonts.KB,
    color: theme.black,
    marginLeft: vw * 2,
    // textShadowColor: 'rgba(0, 0, 0, 1)',
    // textShadowOffset: {width: 1, height: 1},
    // textShadowRadius: vh * 4,
  },

  productPriceTextStyle: {
    color: theme.primary,
    fontSize: 2.8 * vh,
    marginLeft: vw * 2,
    // textShadowColor: 'rgba(0, 0, 0, 1)',
    // textShadowOffset: {width: 1, height: 1},
    // textShadowRadius: vh * 4,
  },

  productAmountTextStyle: {
    fontFamily: Fonts.KB,
    fontSize: 2.4 * vh,
  },

  productDetailsView: {
    width: 90 * vw,
  },

  buttonView: {
    flexDirection: 'row',
    width: 40 * vw,
    height: 6 * vh,
    justifyContent: 'space-around',
    borderWidth: 2,
    alignItems: 'center',
    borderColor: '#EBEBEB',
    borderRadius: 1 * vw,
  },

  mainButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4 * vh,
    width: 90 * vw,
    alignSelf: 'center',
    height: 20 * vh,
  },

  colorView: {
    backgroundColor: theme.primary,
    height: 5 * vw,
    width: 5 * vw,
    borderRadius: 4 * vw,
  },

  mainDescriptionContainer: {
    marginTop: 1 * vh,
    // paddingBottom: vh * 10
    width: 90 * vw,
    zIndex: -10,

    // justifyContent: 'center',
    // alignItems: 'center',
    // alignSelf: 'center',
  },

  descriptionTextStyle: {
    fontSize: 1.7 * vh,
    fontFamily: Fonts.SFD,
    fontWeight: 'bold',
    marginBottom: 1 * vh,
  },

  descriptionView: {
    color: theme.defaultInactiveBorderColor,
    fontSize: 1.6 * vh,
    textAlign:'justify'
  },

  addToCartButtonMainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4 * vh,
  },

  cartButton: {
    width: 100 * vw,
    height: 7 * vh,
    borderTopRightRadius: 8 * vw,
    borderTopLeftRadius: 8 * vw,
    backgroundColor: theme.primary,
    position: 'absolute',
    bottom: 0,
  },

  amountValueView: {
    backgroundColor: theme.grayText2,
    width: 30 * vw,
    height: 4.5 * vh,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 1 * vw,
  },

  increaseAmountView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 8 * vw,
  },

  decreaseAmountView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 8 * vw,
  },

  valueView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 8 * vw,
  },

  icrementTextStyle: {
    fontSize: 2.5 * vh,
  },

  valueTextStyle: {
    fontSize: 2.2 * vh,
  },
  decrementTextStyle: {
    fontSize: 3.5 * vh,
  },

  mayAlsoLikeTextStyle: {
    fontFamily: Fonts.SFR,
    fontSize: 1.5 * vh,
    fontWeight: 'bold',
    marginBottom: 2 * vh,
  },

  recommendedProductsView: {
    marginTop: 3 * vh,
  },

  reviewsTextStyle: {
    fontFamily: Fonts.MSW,
    fontSize: 1.6 * vh,
  },

  writeYoursTextStyle: {
    color: '#A3A3A3',
    fontSize: 1.6 * vh,
  },

  reviewsContainer: {
    flex: 1,

    alignSelf: 'center',
  },

  writeYoursButtonView: {
    marginTop: 2 * vh,
    marginBottom: 1 * vh,
    justifyContent: 'center',
    width: 80 * vw,
  },

  postReviewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  postView: {
    justifyContent: 'center',
    marginTop: 1 * vh,
  },

  //

  mainProductsContainerView: {
    flex: 1,
    zIndex: -10,
  },

  mainTabsView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 60 * vw,
    alignSelf: 'center',
    justifyContent: 'space-around',
    marginTop:2*vh
    // zIndex: -10,
  },

  detailsTabView: {
    width: 28 * vw,
    paddingVertical:1*vh,
    // height: 5 * vh,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: theme.defaultAuthDescriptionColor,
    borderRadius: 0.5 * vw,
  },

  reviewsTabView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 28 * vw,
    height: 5 * vh,
    borderRadius: 1 * vw,
    zIndex: -10,
  },

  detailsTextStyle: {
    fontSize: 1.8 * vh,
  },

  reviewsTabTextStyle: {
    fontSize: 1.8 * vh,
  },

  variationValueTextStyle: {
    fontFamily: Fonts.MSW,
    fontSize: 1.8 * vh,
  },

  variationTextStyle: {
    fontSize: 2 * vh,
  },

  productNameView: {
    // marginTop: 5 * vh,
    // marginBottom: 4 * vh,
    width: 90 * vw,
    height: vh * 12,
    justifyContent:'space-evenly',
    paddingLeft: vw * 1.3,
    marginTop: vh * 2 
  },

  cartButtonView: {
    width: 100 * vw,
    height: 8 * vh,
  },

  continueShoppingView: {
    position: 'absolute',
    top: vh * 58,
    left: 0,
  },

  rightArrowIconView: {
    justifyContent: 'center',
  },

  leftArrowIconStyle: {
    resizeMode: 'contain',
    height: 5 * vh,
    width: 5 * vw,
    tintColor: theme.black,
    marginLeft: vw * 4,
  },

  displayIconStyle: {
    resizeMode: 'contain',
    height: 8 * vh,
    width: 12 * vw,
  },

  noReviewsView: {
    alignSelf: 'center',
    marginTop: 4 * vh,
    marginBottom: 4 * vh,
  },

  displayView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartButton: {
    width: 100 * vw,
    height: 7 * vh,
    borderTopRightRadius: 8 * vw,
    borderTopLeftRadius: 8 * vw,
    borderRadius:0,
    backgroundColor: theme.primary,
  },

  mainReviewView: {
    height: 13 * vh,
    flexDirection: 'row',
    width: vw * 80,
  },

  nameTextStyle: {
    fontFamily: Fonts.MSW,
    fontSize: 1.8 * vh,
  },

  reviewsDescriptionView: {
    width: 70 * vw,
    fontSize: 1.8 * vh,
    fontFamily: Fonts.SFR,
    color: theme.defaultInactiveBorderColor,
  },

  descriptionContainer: {},

  mainRowView: {
    justifyContent: 'center',
    marginLeft: 5 * vw,
    marginTop: 3 * vh,
  },

  nameView: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  nameWithRatingView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  ratingMainView: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  writeYoursHeadingTextStyle: {
    fontFamily: Fonts.MSW,
    fontSize: 1.8 * vh,
    marginLeft: vw * 4,
  },

  mainWriteRatingView: {
    paddingHorizontal: vw * 3,
  },

  textInputView: {
    borderBottomWidth: 0.1 * vw,
    marginTop: 4 * vh,
    marginBottom: 4 * vh,
  },

  textInputTextStyle: {
    fontSize: 2 * vh,
    color: theme.defaultInactiveBorderColor,
  },

  writeRatingStyle: {
    marginTop: 2 * vh,
  },

  reviewButtonView: {
    width: 40 * vw,
    marginBottom: 1 * vh,
    backgroundColor: theme.black,
  },

  listView: {
    flex: 1,
    paddingTop: vh * 2,
  },
});

// const styles = StyleSheet.create({
//   container: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//   },
//   subBgContainer: {
//       flex: 1,
//       alignItems: 'center',
//       justifyContent: 'center',
//   },
//   subContainer: {
//       position: 'absolute',
//       bottom: 0,
//       height: "60%",
//       width: DEVICE_WIDTH,
//   },
//   modalSubContainer: {
//       width: '100%',
//       height: "100%",
//       backgroundColor: theme.whiteBackground,
//       borderTopLeftRadius: vw * 10,
//       borderTopRightRadius: vw * 10,
//       paddingHorizontal: vw * 5,
//       paddingTop: vh * 3,
//       shadowColor: "#000",
//       shadowOffset: {
//         width: 0,
//         height: 3
//       },
//       shadowOpacity: 0.25,
//       shadowRadius: 4,
//       elevation: 5,
//   },
//   progressSteps: {
//       justifyContent: 'center',
//       alignSelf: 'center',
//       borderTopColor: theme.grayColor2,
//       borderTopWidth: 5,
//       borderRadius: vw*10,
//       width: vw*30,
//       height: 0,
//   },
//   tabView: {
//       justifyContent: 'center',
//       alignItems: 'center',
//       marginTop: vh*4,
//       flexDirection: 'row',
//   },
//   tabDetails: {
//       flex: 1,
//       justifyContent: 'center'
//   },
//   btnActive: {
//       justifyContent: 'center',
//       width: vw*25,
//       borderRadius: vw * 7,
//       height: vh * 5,
//       borderColor: theme.grayColor2,
//       borderWidth: 1,
//   },
//   btnInactive: {
//       justifyContent: 'center',
//       width: vw*25,
//   },
//   btnText: {
//       fontSize: vw*3,
//       textAlign: "center",
//       color: theme.black,
//   },
//   prodTitleView: {
//       flex: 1,
//       marginTop: vh*3,
//   },
//   prodTxt: {
//       fontSize: vw*4,
//       color: theme.lightBlack,
//   },
//   prodHeadTxt: {
//       fontSize: vw*6,
//       color: theme.black,
//   },
//   prodPriceTxt: {
//       fontSize: vw*5,
//       color: theme.lightBlack,
//   },
//   prodDescView: {
//       flex: 1,
//       marginTop: vh*2,
//   },
//   prodDescHeadTxt: {
//       fontSize: vw*4,
//       color: theme.lightBlack,
//   },
//   prodDescTxt: {
//       marginTop: vh,
//       fontSize: vw*3.3,
//       color: theme.grayColor,
//       width: vw*85,
//   },
//   SimilarProdView: {
//       flex: 1,
//       marginVertical: vh*3,
//   },
//   similarProdHeadTxt: {
//       fontSize: vw*3.5,
//       color: theme.lightBlack,
//   },
//   similarImageView: {
//       flex: 1,
//       flexDirection: 'row',
//   },
//   similarImg: {
//       margin: vh,
//       marginRight: vw,
//       width: vw*23,
//       resizeMode: 'cover',
//       height: vh*9,
//       borderRadius: vw*2,
//   },
//   actionView: {
//       flex: 1,
//       flexDirection: 'row',
//       marginBottom: vh*3,
//   },
//   removeProdTxt: {
//       resizeMode: 'contain',
//       width: vw*2,
//       height: vw*2,
//       alignContent: 'center',
//       alignSelf: 'center'
//   },
//   roundRemove: {
//       // marginTop: vh * 3,
//       justifyContent: 'center',
//       alignSelf: 'center',
//       width: vw*6,
//       height: vw*6,
//       borderRadius: (vw*6)/2,
//       backgroundColor: theme.themeColor
//   },
//   cartCountTxt: {
//       alignSelf: 'center',
//       marginHorizontal: vw*3,
//       fontSize: vw*3.8,
//       color: theme.black,
//   },
//   roundAdd: {
//       justifyContent: 'center',
//       alignSelf: 'center',
//       width: vw*6,
//       height: vw*6,
//       borderRadius: (vw*6)/2,
//       backgroundColor: theme.white,
//       borderColor: theme.themeColor,
//       borderWidth: 2
//   },
//   btn: {
//       flexDirection: 'row',
//       justifyContent: 'center',
//       alignItems: 'center',
//       alignSelf: 'center',
//       width: "65%",
//       borderRadius: vw * 10,
//       height: vh * 5.5,
//   },
//   GradientText: {
//       position: 'absolute',
//       left: vw*4.5,
//       fontSize: vw*3.5,
//       marginVertical: vh * 1.7,
//       //letterSpacing: 0,
//       color: theme.white,
//   },
//   userReview: {
//       flex: 1,
//       marginTop: vh*3,
//       flexDirection: 'row',
//   },
//   userDetail: {
//       flex: 1,
//       // justifyContent: 'center',
//       paddingLeft: vw*3,
//   },
//   demoUser: {
//       // alignSelf: 'center',
//       width: vw*12,
//       height: vw*12,
//       resizeMode: 'cover'
//   },
//   demoUserName: {
//       fontSize: vw*4,
//       color: theme.lightBlack,
//   },
//   demoUserTxt: {
//       marginTop: vh*2,
//       fontSize: vw*3,
//       color: theme.grayColor,
//   },
//   footerContainer: {
//       position: 'absolute',
//       right: 0,
//       width: vw * 20,
//       alignItems: 'center',
//       justifyContent: 'space-between',
//   },
//   starContainerStyle: {
//       width: vw * 20,
//       justifyContent: 'space-evenly',
//   },
//   writeReview: {
//       flex: 1,
//       marginTop: vh*4,
//   },
//   reviewContainer: {
//       flex: 1,
//       alignItems: 'center',
//       justifyContent: 'space-between',
//       marginTop: vh*2,
//   },
//   starReviewContainerStyle: {
//       flex: 1,
//       width: "100%",
//       alignItems: 'center',
//       justifyContent: 'space-around',
//   },
//   inputView: {
//       flex: 1,
//       flexDirection: 'row',
//       marginTop: vh*2,
//       // borderWidth: 1
//       borderBottomWidth: 1,
//       borderBottomColor: theme.grayColor2,
//       // paddingBottom: verticalScale(5)
//   },
//   textInput: {
//       flex: 1,
//       fontFamily: Fonts.MSW,
//       fontSize: vw*4.5,
//       marginTop: vw,
//       // paddingLeft: moderateScale(10),
//       color: theme.grayColor,
//   },
//   submitProdView: {
//       flex: 1,
//       marginTop: vh*3,
//       marginBottom: vh*3
//   },
//   roundBtn: {
//       flexDirection: 'row',
//       justifyContent: 'center',
//       alignItems: 'center',
//       alignSelf: 'center',
//       width: "35%",
//       borderRadius: vw * 10,
//       height: vh * 5.5,
//   }
// })

export default styles;
