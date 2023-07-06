import React, {useState, useCallback, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  LayoutAnimation,
  Platform,
} from 'react-native';
import {generalImages, icons} from '../../../assets/images';
import ScrollWrapper from '../../../components/Containers/ScrollWrapper';
import TextWrapper from '../../../components/TextWrapper';
import CheckoutInput from '../../../components/TextInputs/CheckoutInput';
import styles from './styles';
import SearchHeader from '../../../components/Headers/SearchHeader';
import SubmitButton from '../../../components/Buttons/SubmitButton';
import theme from '../../../utils/theme';
import {useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/core';
import {useCheckoutHook} from '../../../hooks/useCheckoutHook';
import {FlatList} from 'react-native-gesture-handler';
import {vh, vw} from '../../../units';
import {showToast} from '../../../redux/Api/HelperFunction';
import {CardField, useStripe} from '@stripe/stripe-react-native';
import {makePaymentViaCard} from '../../../redux/actions/checkoutAction';
import {useDispatch} from 'react-redux';
import {Fonts} from '../../../assets/fonts';
import MainContainer from '../../../components/Containers/MainContainer';
import RadioPaymentButton from '../../../components/RadioPaymentButton';
import {validateAlphabetsOnly} from '../../../utils/validation';
import IconButton from '../../../components/Buttons/IconButton';

const CheckoutScreen = props => {
  const dispatch = useDispatch();
  // const {createToken} = useStripe();
  const [card, setCard] = useState(null);
  const {createToken} = useStripe();

  const [paymentMethod, setPaymentMethod] = useState(false);
  const [cardHoldersName, setCardHoldersName] = useState();
  const [cardToken, setCardToken] = useState();
  const handlePaymentMethod = () => {
    setPaymentMethod(!paymentMethod);
  };

  const RadioPaymentData = [
    {
      key: 'cod',
      text: 'Cash on Delivery',
      icon: icons.wallet,
    },
    {
      key: 'card',
      text: 'Card',
      icon: icons.creditCard,
    },
  ];
  const user_ID = useSelector(state => state.authReducer?.user);

  const [checked, setChecked] = useState(true);
  const [customerDetails, setCustomerDetails] = useState();
  const [step, setStep] = useState(1);

  const customer = useSelector(state => state.authReducer?.customer);
  const cartItems = useSelector(state => state.cartReducer?.cartItems);
  const [radioVal, setRadioVal] = useState('cod');

  const [checkoutState, checkoutFunc] = useCheckoutHook();
  useFocusEffect(
    useCallback(() => {
      setCustomerDetails(customer);
    }, []),
  );
  React.useEffect(() => {
    props.navigation.setOptions({
      // headerTitle: () => {
      //   return (
      //     <View
      //       style={{
      //         width: vw * 60,
      //         height: vh * 4,
      //         alignItems: 'center',
      //         justifyContent: 'center',
      //       }}>
      //       <TextWrapper style={{fontSize: vh * 2, color: theme.black}}>
      //         Checkout
      //       </TextWrapper>
      //     </View>
      //   );
      // },
      // headerLeft: () => {
      //   return (
      //     <IconButton
      //       onPress={() => props.navigation.goBack()}
      //       iconStyle={[styles.drawerBlackIconStyles]}
      //       customStyle={styles.backImageContainer}
      //       icon={icons.leftArrow}
      //       resizeMode="contain"
      //     />
      //   );
      // },
      header: () => {
        return (
          <View
            style={{
              backgroundColor: step > 2 ? theme.black : theme.whiteBackground,
            }}>
            <View style={styles.searchView}>
              <View style={styles.searchIconsView}>
                <TouchableOpacity
                  style={styles.searchIconButtonView}
                  onPress={() => props.navigation.goBack()}>
                  <Image
                    source={icons.leftArrow}
                    style={{
                      height: vh * 4,
                      width: vw * 4,
                      resizeMode: 'contain',
                      tintColor: step > 2 ? theme.whiteBackground : theme.black,
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: vw * 80,
                  height: vh * 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TextWrapper
                  numberOfLines={2}
                  style={[
                    styles.searchTextStyle,
                    {color: step > 2 ? theme.whiteBackground : theme.black},
                  ]}>
                  Checkout
                </TextWrapper>
              </View>
            </View>
            {renderSteps()}
          </View>
        );
      },
    });
  });
  //states
  const [streetAddress1, setStreedAddress1] = useState('');
  const [streetAddress2, setStreetAddress2] = useState('');
  const [city, setCity] = useState('');
  const [stateRegion, setStateRegion] = useState('');
  const [country, setCountry] = useState('');
  const totalItemsPrice = cartItems
    ?.reduce((acc, item) => acc + item.quantity * item.product_price, 0)
    .toFixed(2);

  const handleDetails = async () => {
    try {
      if (cardToken?.token) {
        const data = {
          amount: props.route?.params?.amount
            ? (
                Number(totalItemsPrice) -
                Number(props.route?.params?.amount).toFixed(2) +
                (Number(totalItemsPrice) * TaxRate) / 100
              ).toFixed(2)
            : (
                Number(totalItemsPrice) +
                (Number(totalItemsPrice) * TaxRate) / 100
              ).toFixed(2),
          token: cardToken?.token?.id,
        };

        try {
          dispatch(makePaymentViaCard(data)).then(res => {
            if (res) {
              handleCheckout();
              // props.navigation.navigate('OrderAcceptedScreen');
              // props.navigation.reset({
              //   index: 0,
              //   routes: [{name: 'OrderAcceptedScreen'}],
              // });
            }
          });
        } catch (e) {
          showToast(e);
        }
      }
    } catch (error) {
      showToast(error);
    }
  };
  const handleCheckout = () => {
    const data = {
      customer_id: user_ID,
      payment_method: 'cod',
      payment_method_title: 'Cash on Delivery',
      set_paid: paymentMethod ? true : false,
      billing: {
        first_name: customerDetails?.first_name,
        last_name: customerDetails?.last_name,
        address_1: streetAddress1,
        address_2: streetAddress2,
        city: city,
        state: stateRegion,
        // "postcode": "94103",
        country: country,
        email: customerDetails?.email,
        // phone: "(555) 555-5555"
      },
      shipping: {
        first_name: customerDetails?.first_name,
        last_name: customerDetails?.last_name,
        address_1: streetAddress1,
        address_2: streetAddress2,
        city: city,
        state: stateRegion,
        // postcode: 94103,
        country: country,
      },
      line_items: cartItems,
    };

    checkoutFunc(data);
  };

  const goNext = async () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (step == 3) {
      if (paymentMethod) {
        handleDetails();
      } else {
        handleCheckout();
      }
      setStep(3);
    }
    if (step == 2) {
      if (paymentMethod) {
        if (cardHoldersName) {
          const paymentToken = await createToken({
            type: 'Card',
            name: cardHoldersName,
          });
          showToast(paymentToken);
          setCardToken(paymentToken);
          if (paymentToken?.token) {
            setStep(step + 1);
          }
        } else {
          showToast('Please fill Card Details');
        }
      } else {
        setStep(step + 1);
      }
    }
    if (step == 1) {
      if (
        streetAddress1 !== '' &&
        city !== '' &&
        stateRegion !== '' &&
        country !== ''
      ) {
        if (validateAlphabetsOnly(streetAddress1) != true) {
          console.log('VAlidate only');
          showToast('Please Enter valid Address');
          // setStep(step + 1);
        } else if (validateAlphabetsOnly(city) != true) {
          showToast('Please Enter valid City');
        } else if (validateAlphabetsOnly(stateRegion) != true) {
          showToast('Please Enter valid State');
        } else if (validateAlphabetsOnly(country) != true) {
          showToast('Please Enter valid Country');
        } else {
          setStep(step + 1);
        }
      } else {
        showToast('Please fill the fields');
      }
    }
  };
  const getAddress = () => {
    if (streetAddress1 != '' && streetAddress2 != '') {
      return streetAddress1 + ', ' + streetAddress2;
    } else {
      return streetAddress1;
    }
  };
  const goBack = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (step == 1) {
      setStep(1);
    } else {
      setStep(step - 1);
    }
  };

  const handleChangeAddress = () => {
    setStep(1);
  };

  const handleChecked = () => {
    // setChecked(!checked);
  };
  const renderItem = (item, index) => {
    return (
      <RadioPaymentButton
        uniqKey={item.key}
        text={item.text}
        setRadioVal={val => {
          val === 'card' ? setPaymentMethod(true) : setPaymentMethod(false);
          LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
          setRadioVal(val);
        }}
        radioVal={radioVal}
        icon={item.icon}
      />
    );
  };
  const renderSteps = () => {
    if (step == 1) {
      return (
        <View style={styles.stepsView}>
          {/* <Image source={generalImages.step1} style={styles.stepsImageStyle} /> */}
          <Image source={generalImages.step1} style={styles.stepsImageStyle} />
        </View>
      );
    }

    if (step == 2) {
      return (
        <View style={styles.stepsView}>
          <Image source={generalImages.step2} style={styles.stepsImageStyle} />
        </View>
      );
    }

    if (step == 3) {
      return (
        <View style={styles.stepsView}>
          <Image source={generalImages.step3} style={styles.stepsImageStyle} />
        </View>
      );
    }
  };

  const renderBillingInformation = () => {
    if (step == 1) {
      return (
        <View style={styles.billingContainer}>
          <View style={styles.checkedView}>
            <Image
              source={checked ? icons.circleChecked : icons.circleUnchecked}
              style={styles.checkedStyle}
            />
          </View>

          <View style={styles.billingAlertView}>
            <TextWrapper style={styles.billingAlertTextStyle}>
              Billing address is the same as delivery address
            </TextWrapper>
          </View>
        </View>
      );
    }
  };
  const renderInputFields = () => {
    if (step == 1) {
      return (
        <View>
          <CheckoutInput
            title="Street 1*"
            placeholdText="Enter Street Address"
            value={streetAddress1}
            placeholderTextColor={theme.defaultInactiveBorderColor}
            onChangeText={text => setStreedAddress1(text)}
            textInputRow={{bottom: vh * 1}}
          />
          <CheckoutInput
            title="Street 2"
            placeholdText="Enter Street Address"
            value={streetAddress2}
            onChangeText={text => setStreetAddress2(text)}
            placeholderTextColor={theme.defaultInactiveBorderColor}
            textInputRow={{bottom: vh * 1}}
          />
          <CheckoutInput
            title="City*"
            placeholdText="Enter City"
            keyboardType=""
            value={city}
            placeholderTextColor={theme.defaultInactiveBorderColor}
            onChangeText={text => setCity(text)}
            textInputRow={{bottom: vh * 1}}
          />
          <View style={styles.stateCountryView}>
            <CheckoutInput
              title="State*"
              placeholdText="Enter State"
              customTextInputView={styles.customTextInputView}
              customTextInputStyle={styles.customTextInputStyle}
              value={stateRegion}
              placeholderTextColor={theme.defaultInactiveBorderColor}
              onChangeText={text => setStateRegion(text)}
              keyboardType=""
              textInputRow={{bottom: vh * 1}}
            />
            <CheckoutInput
              title="Country*"
              placeholdText="Enter Country"
              customTextInputView={styles.customTextInputView}
              customTextInputStyle={styles.customTextInputStyle}
              value={country}
              placeholderTextColor={theme.defaultInactiveBorderColor}
              onChangeText={text => setCountry(text)}
              textInputRow={{bottom: vh * 1}}
            />
          </View>
        </View>
      );
    }

    if (step == 2) {
      return (
        <View style={styles.stepsView}>
          <View style={styles.cardContainer}>
            <View style={[styles.headerStyleTwo]}>
              <TextWrapper style={styles.welcome}>
                Choose Your Payment Method
              </TextWrapper>
            </View>

            <View style={[styles.radioContainer]}>
              {RadioPaymentData.map((item, index) => renderItem(item, index))}
            </View>
            {paymentMethod && (
              <View style={{width: 90 * vw, alignSelf: 'center'}}>
                <CheckoutInput
                  value={cardHoldersName}
                  onChangeText={text => setCardHoldersName(text)}
                  customTextInputStyle={{
                    fontSize: 1.8 * vh,
                    color: theme.black,
                    fontFamily: Fonts.SFR,
                  }}
                  title="Name on Card"
                  placeholdText="Enter Card Holder's Name"
                  placeholderTextColor={theme.defaultInactiveBorderColor}
                />
                <View>
                  <CardField
                    postalCodeEnabled={true}
                    placeholder={{
                      number: '4242 4242 4242 4242',
                    }}
                    cardStyle={{
                      placeholderColor: theme.whiteBackground,
                      backgroundColor: theme.primary,
                      borderRadius: vh * 2,
                      textColor: '#ffffff',
                      alignItems: 'center',
                      fontSize: vh * 2.5,
                    }}
                    style={{
                      width: 90 * vw,
                      height: vh * 7,
                      borderRadius: vh * 4,
                      marginVertical: vh * 4,
                    }}
                    onCardChange={cardDetails => {
                      setCard(cardDetails);
                    }}
                    onFocus={focusedField => {
                      console.log('focusField', focusedField);
                    }}
                  />
                </View>
              </View>
            )}
            <View style={styles.buttonsView}>
              <SubmitButton
                onPress={goBack}
                textStyle={styles.textStykeBackButton}
                style={styles.backButtonStyle}
                title="BACK"
                tranparent
              />
              <SubmitButton
                onPress={goNext}
                style={styles.nextButtonStyle}
                title="Next"
              />
            </View>
          </View>
        </View>
      );
    }

    if (step == 3) {
      return (
        <View style={styles.summaryView}>
          <TextWrapper style={styles.summaryTextStyle}>Summary</TextWrapper>
          {renderCartItemsList()}
          <View style={styles.mainCardDetailsView}>
            <View style={styles.shippingAddressHeadingView}>
              <TextWrapper style={styles.shippingAddressHeadingTextStyle}>
                Total Price
              </TextWrapper>
              <TextWrapper style={styles.TotalPrice}>
                {props?.route?.params?.TotalPrice}
              </TextWrapper>
            </View>
            <View style={styles.shippingAddressHeadingView}>
              <TextWrapper style={styles.shippingAddressHeadingTextStyle}>
                Shipping Address
              </TextWrapper>
            </View>

            <TextWrapper numberOfLines={2} style={styles.textDescriptionStyle}>
              {getAddress() + ', ' + city + ', ' + stateRegion + ', ' + country}
            </TextWrapper>

            <TouchableOpacity
              onPress={handleChangeAddress}
              style={styles.changeButtonView}>
              <TextWrapper style={styles.changeTextStyle}>Change</TextWrapper>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonsView}>
            {step == 1 ? null : (
              <SubmitButton
                onPress={goBack}
                textStyle={styles.textStykeBackButton}
                style={styles.backButtonStyle}
                title="BACK"
                tranparent
              />
            )}
            {step == 3 ? (
              <SubmitButton
                onPress={goNext}
                style={styles.nextButtonStyle}
                title="Pay"
              />
            ) : (
              <SubmitButton
                onPress={goNext}
                style={styles.nextButtonStyle}
                title="Next"
              />
            )}
          </View>
        </View>
      );
    }
  };

  const renderCartItem = ({item}) => {
    console.log(item, 'cartItemsSummary');
    const handleProductImage = () => {
      if (item.product_image) {
        return {uri: item.product_image};
      } else {
        return generalImages.placeholderImage;
      }
    };
    return (
      <View style={styles.itemsView}>
        <View style={styles.miniItemView}>
          <Image
            source={handleProductImage()}
            style={[
              styles.dressImageStyle,
              item.product_image == null && {tintColor: 'grey'},
            ]}
          />
          <TextWrapper style={styles.dressNameStyle}>
            {item.product_name}
          </TextWrapper>
          <TextWrapper style={styles.amountTextStyle}>
            ${item.product_price}
          </TextWrapper>
        </View>
      </View>
    );
  };

  const renderCartItemsList = () => {
    return (
      <View style={styles.cartItemsListStyle}>
        <FlatList
          horizontal={true}
          data={cartItems}
          renderItem={renderCartItem}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  };

  const renderNextButtons = () => {
    if (step != 2) {
      return (
        <View style={styles.buttonsView}>
          {step == 1 ? null : (
            <SubmitButton
              onPress={goBack}
              textStyle={styles.textStykeBackButton}
              style={styles.backButtonStyle}
              title="BACK"
            />
          )}
          {step == 3 ? (
            <SubmitButton
              onPress={goNext}
              style={styles.nextButtonStyle}
              title="Pay"
            />
          ) : (
            <SubmitButton
              onPress={goNext}
              style={styles.nextButtonStyle}
              title="Next"
            />
          )}
        </View>
      );
    }
  };

  return (
    <MainContainer>
      <ScrollWrapper
        avoidKeyboard={true}
        style={step == 3 ? styles.scrollStep3 : styles.scroll}
        contentContainerStyle={styles.content}>
        {/* <View style={{backgroundColor: theme.black}}>
          <SearchHeader
            title="Checkout"
            tintColor={theme.whiteBackground}
            style={{
              color: theme.whiteBackground,
              alignSelf: 'center',
              fontFamily: Fonts.KB,
              fontSize: 2.8 * vh,
            }}
            drawerButtonView={{
              width: vw * 9,
              alignItems: 'center',
            }}
          />
        </View> */}
        {/* {renderBillingInformation()} */}
        {renderInputFields()}
        {step != 3 && renderNextButtons()}
      </ScrollWrapper>
    </MainContainer>
  );
};
export default CheckoutScreen;
