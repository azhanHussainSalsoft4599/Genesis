import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Animated,
  LayoutAnimation,
  TouchableOpacity,
} from 'react-native';
import {authIcons, generalImages, icons} from '../../../assets/images/index';
import MainContainer from '../../../components/Containers/MainContainer';
import ScrollWrapper from '../../../components/Containers/ScrollWrapper';
import TextWrapper from '../../../components/TextWrapper';
import AuthTextInput from '../../../components/TextInputs/AuthTextInput';
import SubmitButton from '../../../components/Buttons/SubmitButton';
import ButtonTouchableTextButton from '../../../components/Buttons/BottomTouchableTextButton';
import styles from './styles';
import GeneralAlert from '../../../components/Modals/GeneralAlert';
import {useForgotPasswordHook} from '../../../hooks/useForgotPasswordHook';
import {resetPasswordAction} from '../../../redux/actions/authActions';
import {showToast} from '../../../redux/Api/HelperFunction';
import {useDispatch} from 'react-redux';
import {vh, vw} from '../../../units';
import theme from '../../../utils/theme';
import {Fonts} from '../../../assets/fonts';

const ForgotPasswordScreen = props => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

  const [step, setStep] = useState(1);
  const [visible, setVisible] = useState(false);
  const [animation, setAnimation] = useState(new Animated.Value(20));
  const boxStyle = {
    width: animation,
  };

  const handleModalVisibility = () => {
    setVisible(false);
    props.navigation.navigate('SignInScreen');
  };

  const [forgotPasswordEmailState, forgotPasswordEmailFunc] =
    useForgotPasswordHook();

  const handleEmail = () => {
    const data = {email};
    forgotPasswordEmailFunc(data);
  };
  console.log(
    'forgotPasswordEmailStateforgotPasswordEmailStateforgotPasswordEmailState============================================================>',
    forgotPasswordEmailState,
  );

  useEffect(() => {
    if (forgotPasswordEmailState) {
      handleAnimation();
    }
  }, [forgotPasswordEmailState]);

  const handleVerification = () => {
    if (verificationCode == forgotPasswordEmailState?.code) {
      setStep(step + 1);
    } else {
      showToast('Code does not exist');
    }
  };

  const handleResetPassword = () => {
    if (password === confirmPassword) {
      const data = {
        email: email,
        password: password,
      };
      dispatch(resetPasswordAction(data)).then(response => {
        if (response?.status) {
          setVisible(!visible);
        }
      });
    } else {
      showToast('Passwords do not match');
    }
  };

  const handleOnPress = () => {
    if (step == 1) {
      handleEmail();

      // setStep(step + 1);
      // Animated.timing(animation, {
      //   toValue: 40,
      // }).start();
    }
    if (step == 2) {
      handleVerification();
      // Animated.timing(animation, {
      //   toValue: 60,
      // }).start();
    }
  };
  const hanldeResendEmail = () => {
    const data = {email};
    forgotPasswordEmailFunc(data);
  };
  const handleAnimation = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (step == 1) {
      if (!email) {
        showToast('Please fill the field');
        return;
      }
      setStep(step + 1);
      handleEmail();
      Animated.timing(animation, {
        toValue: 40,
      }).start();
    }
    if (step == 2) {
      if (!verificationCode) {
        showToast('Please enter Verification Code');
        return;
      }
      handleVerification();
      Animated.timing(animation, {
        toValue: 60,
      }).start();
    }
    // if (step > 2) {
    //   handleResetPassword();
    // }
  };

  const handleVisibility = () => {
    if (!password) {
      showToast('Please enter password');
      return;
    }
    if (!confirmPassword) {
      showToast('Please enter password again');
      return;
    }
    handleResetPassword();
    // setVisible(!visible);
  };

  const renderLogo = () => {
    return (
      <View style={styles.logoView}>
        <Image source={generalImages.logo} style={styles.logoStyle} />
      </View>
    );
  };

  const renderStepsLoading = () => {
    return (
      <View style={styles.loaderView}>
        <Animated.View
          style={[
            styles.subLoaderView,
            // {width: step > 1 ? 58 * vw : 29 * vw},
            boxStyle,
          ]}
        />
      </View>
    );
  };

  const renderConditionalFields = () => {
    if (step == 1) {
      return (
        <View style={styles.fieldsView}>
          <TextWrapper
            style={{fontSize: vw * 4, color: theme.black, fontFamily: Fonts.KB}}
            numberOfLines={2}>
            Enter your email address to receive a verification code.
          </TextWrapper>
          <AuthTextInput
            value={email}
            onChangeText={text => setEmail(text)}
            placeHolder="Enter your email address."
            icon={authIcons.email}
            // style={{fontSize: vh * 1.3}}
          />
        </View>
      );
    }
    if (step == 2) {
      return (
        <View style={styles.fieldsView}>
          <TextWrapper
            style={{fontSize: vw * 4, color: theme.black, fontFamily: Fonts.KB}}
            numberOfLines={2}>
            Enter Verification Code sent to your email address.
          </TextWrapper>
          <AuthTextInput
            value={verificationCode}
            onChangeText={text => setVerificationCode(text)}
            placeHolder="Enter Verification Code."
            keyboardType="number-pad"
            icon={authIcons.password}
          />
          <View
            style={{
              alignItems: 'flex-end',
              height: vh * 5,
              justifyContent: 'center',
            }}>
            <TouchableOpacity onPress={hanldeResendEmail}>
              <TextWrapper
                style={{
                  color: theme.primary,
                  textDecorationLine: 'underline',
                  fontSize: vw * 4,
                }}>
                Resend
              </TextWrapper>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    if (step == 3) {
      return (
        <View style={styles.fieldsView}>
          <TextWrapper
            style={{fontSize: vw * 4, color: theme.black, fontFamily: Fonts.KB}}
            numberOfLines={2}>
            Set a New password for your account.
          </TextWrapper>
          <AuthTextInput
            value={password}
            onChangeText={text => setPassword(text)}
            placeHolder="Enter Password"
            type="password"
            maxLength={16}
          />
          <AuthTextInput
            value={confirmPassword}
            onChangeText={text => setConfirmPassword(text)}
            placeHolder="Confirm Password"
            type="password"
            maxLength={16}
          />
        </View>
      );
    }
  };

  const renderFields = () => {
    return (
      <View style={styles.fieldContainer}>
        <View style={styles.miniContainer}>
          <TextWrapper style={styles.textStyle}>
            Step {step > 3 ? 3 : step} / 3
          </TextWrapper>
          {renderStepsLoading()}
          <TextWrapper style={styles.welcomeBackTextStyle}>
            Forgot Password?
          </TextWrapper>

          {renderConditionalFields()}

          {step == 3 ? (
            <SubmitButton
              onPress={handleVisibility}
              style={styles.submitButtonStyle}
              titleTextStyle={styles.titleTextStyle}
              title="Update"
            />
          ) : (
            <SubmitButton
              onPress={handleOnPress}
              style={styles.submitButtonStyle}
              titleTextStyle={styles.titleTextStyle}
              title="Continue"
            />
          )}
        </View>

        {renderSocialButtons()}
      </View>
    );
  };

  const renderSocialButtons = () => {
    return (
      <View style={styles.socialView}>
        <ButtonTouchableTextButton
          onPress={() => props.navigation.goBack()}
          type="back"
          title="Login"
        />
      </View>
    );
  };

  return (
    <MainContainer>
      <ScrollWrapper
        avoidKeyboard={true}
        style={styles.scroll}
        contentContainerStyle={styles.content}>
        {renderLogo()}
        {renderFields()}

        <GeneralAlert
          onPress={handleModalVisibility}
          onHide={handleModalVisibility}
          visibility={visible}
        />
      </ScrollWrapper>
    </MainContainer>
  );
};
export default ForgotPasswordScreen;
