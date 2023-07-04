import React, {useState, useCallback} from 'react';
import {View, Image, TouchableOpacity, ScrollView} from 'react-native';
import {authIcons, generalImages, icons} from '../../../assets/images/index';
import MainContainer from '../../../components/Containers/MainContainer';
import ScrollWrapper from '../../../components/Containers/ScrollWrapper'; //might need it
import TextWrapper from '../../../components/TextWrapper';
import AuthTextInput from '../../../components/TextInputs/AuthTextInput';
import SubmitButton from '../../../components/Buttons/SubmitButton';
import SocialButton from '../../../components/Buttons/SocialButton';
import ButtonTouchableTextButton from '../../../components/Buttons/BottomTouchableTextButton';
import {useRegisterHook} from '../../../hooks/useRegisterHook';
import {useLoginHook} from '../../../hooks/useLoginHook';
import styles from './styles';
import {useFocusEffect} from '@react-navigation/core';
import theme from '../../../utils/theme';
import LinearGradient from 'react-native-linear-gradient';
import {useRef} from 'react';
import {vh, vw} from '../../../units';

const SignInScreen = props => {
  const passRef = useRef();
  const [email, setEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginState, loginFunc] = useLoginHook();
  const [checked, setChecked] = useState(false);
  const handleLogin = () => {
    const data = {
      email: email,
      password: loginPassword,
    };
    loginFunc(data);
  };

  const renderLogo = () => {
    return (
      <View style={styles.logoView}>
        <Image source={authIcons.logo} style={styles.logoStyle} />
      </View>
    );
  };

  const handleForgotPasswordNav = () => {
    props.navigation.navigate('ForgotPasswordScreen');
  };

  const renderCheckWithForgotPassword = () => {
    return (
      <View style={styles.mainRow}>
        <TouchableOpacity
          onPress={() => setChecked(!checked)}
          style={styles.checkButtonView}>
          {checked ? (
            <Image source={icons.check} style={[styles.checkIconStyle]} />
          ) : (
            <Image source={icons.unchecked} style={styles.checkIconStyle} />
          )}
        </TouchableOpacity>

        <TextWrapper style={styles.rememberTextStyle}>Remember me</TextWrapper>

        <TouchableOpacity
          onPress={handleForgotPasswordNav}
          style={styles.forgotPasswordButtonView}>
          <TextWrapper style={styles.forgotPasswordTextStyle}>
            Forget Password
          </TextWrapper>
        </TouchableOpacity>
      </View>
    );
  };

  const renderSocialLogin = () => {
    return (
      <View style={styles.renderSocialLoginStyle}>
        <View>
          <TextWrapper
            style={[
              styles.socialTextStyle,
              {
                color: theme.black,
              },
            ]}>
            Don't Have An Account?
          </TextWrapper>
        </View>

        <TouchableOpacity
          style={styles.signupViewStyle}
          onPress={() => props.navigation.navigate('SignupScreen')}>
          <TextWrapper
            style={[
              styles.socialTextStyle,
              {
                color: theme.primary,
              },
            ]}>
            Sign Up Here
          </TextWrapper>
        </TouchableOpacity>
      </View>
    );
  };
  const renderLoginFields = () => {
    return (
      <View style={styles.fieldContainer}>
        <View style={styles.miniContainer}>
          {renderTabs()}
          <TextWrapper style={styles.welcomeBackTextStyle}>
            Welcome Back
          </TextWrapper>
          <View style={styles.fieldsView}>
            <AuthTextInput
              value={email}
              onChangeText={text => setEmail(text)}
              placeHolder="Enter Your Email Address"
              keyboardType="email-address"
              icon={authIcons.email}
              autoFocus={true}
              returnKeyType="next"
              onSubmitEditing={() => passRef.current.focus()}
            />
            <AuthTextInput
              reference={passRef}
              value={loginPassword}
              onChangeText={text => setLoginPassword(text)}
              placeHolder="Enter Your Password"
              type="password"
              onSubmitEditing={() => handleLogin()}
            />
          </View>

          {renderCheckWithForgotPassword()}
          <View style={styles.btnContainer}>
            <SubmitButton
              onPress={handleLogin}
              titleTextStyle={styles.titleTextStyle}
              title="Sign In"
            />
          </View>
        </View>
        <View
          style={{
            alignItems: 'center',
          }}>
          {renderSocialLogin()}
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: 80 * vw,
              alignSelf: 'center',
              height: vh * 10,
            }}
            onPress={() => props.navigation.navigate('GuestStack')}>
            <TextWrapper
              style={{color: theme.primary, textDecorationLine: 'underline'}}>
              Continue as Guest User
            </TextWrapper>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderTabs = () => {
    return (
      <View style={styles.tabsView}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('SignInScreen')}
          style={styles.signinTabView}>
          <TextWrapper
            style={[
              styles.signinTabTextStyle,
              {color: theme.primary},
              {textDecorationLine: 'underline'},
            ]}>
            Sign In
          </TextWrapper>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => props.navigation.navigate('SignupScreen')}
          style={styles.signupTabView}>
          <TextWrapper style={[styles.signupTextStyle]}>Sign Up</TextWrapper>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView style={{backgroundColor: theme.black, flex: 1}}>
      <ScrollWrapper
        avoidKeyboard={true}
        style={{
          backgroundColor: theme.black,
          borderTopRightRadius: vh * 2,
          borderTopLeftRadius: vh * 2,
        }}>
        {renderLogo()}
        {renderLoginFields()}
      </ScrollWrapper>
    </ScrollView>
  );
};
export default SignInScreen;
