import React, {useState, useCallback, useRef} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {
  authIcons,
  contactIcons,
  generalImages,
  icons,
} from '../../../assets/images/index';
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

const SignupScreen = props => {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [signupState, signupFunc] = useRegisterHook();
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  // const [username, setUsername] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [activeTab, setActiveTab] = useState(false);
  const [username, setUsername] = useState();

  const handleSignUp = () => {
    const data = {
      email: email,
      username: username,
      first_name: firstName,
      last_name: lastName,
      password: password,
      confirmPassword: confirmPassword,
    };
    signupFunc(data);
  };

  const renderLogo = () => {
    return (
      <View style={styles.logoView}>
        <Image source={authIcons.logo} style={styles.logoStyle} />
      </View>
    );
  };

  const renderSignUpFields = () => {
    return (
      <View style={styles.fieldContainer}>
        <View style={styles.miniContainer}>
          {renderTabs()}
          <TextWrapper style={styles.welcomeBackTextStyle}>
            Create Account
          </TextWrapper>

          <View style={styles.fieldsView}>
            <AuthTextInput
              value={username}
              onChangeText={text => setUsername(text)}
              fullName
              placeHolder="Enter Username"
              icon={contactIcons.name}
              onSubmitEditing={() => firstNameRef.current.focus()}
            />
            <AuthTextInput
              value={firstName}
              onChangeText={text => setFirstName(text)}
              fullName
              placeHolder="Enter First name"
              reference={firstNameRef}
              icon={contactIcons.name}
              onSubmitEditing={() => lastNameRef.current.focus()}
            />
            <AuthTextInput
              value={lastName}
              onChangeText={text => setLastName(text)}
              fullName
              placeHolder="Enter Last name"
              reference={lastNameRef}
              icon={contactIcons.name}
              onSubmitEditing={() => emailRef.current.focus()}
            />
            <AuthTextInput
              value={email}
              icon={authIcons.email}
              onChangeText={text => setEmail(text)}
              placeHolder="Enter Email Address"
              keyboardType="email-address"
              returnKeyType="next"
              reference={emailRef}
              onSubmitEditing={() => passwordRef.current.focus()}
            />
            <AuthTextInput
              reference={passwordRef}
              value={password}
              onChangeText={text => setPassword(text)}
              placeHolder="Enter Password"
              type="password"
              returnKeyType="next"
              onSubmitEditing={() => confirmPasswordRef.current.focus()}
              maxLength={16}
            />
            <AuthTextInput
              reference={confirmPasswordRef}
              value={confirmPassword}
              onChangeText={text => setConfirmPassword(text)}
              placeHolder="Confirm Password"
              type="password"
              maxLength={16}
              onSubmitEditing={() => {
                handleSignUp();
              }}
            />
          </View>
          <View style={styles.btnContainer}>
            <SubmitButton
              // onPress={() => props.navigation.navigate('TabNavigator')}
              onPress={() => handleSignUp()}
              style={styles.submitButtonStyle}
              titleTextStyle={styles.titleTextStyle}
              title="Sign up"
            />
          </View>
        </View>

        {renderSocialButtons()}
      </View>
    );
  };

  const renderSocialButtons = () => {
    return (
      <View style={styles.socialButtonsView}>
        {/* <SocialButton /> */}
        <ButtonTouchableTextButton
          onPress={() => props.navigation.navigate('SignInScreen')}
          type="account"
          title="Log in Here"
          value={'Already Have An Account ?'}
        />
      </View>
    );
  };

  const renderTabs = () => {
    return (
      <View style={styles.tabsView}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('SignInScreen')}
          style={styles.signupTabView}>
          <TextWrapper
            style={[styles.signinTabTextStyle, {textDecorationLine: 'none'}]}>
            Sign In
          </TextWrapper>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => props.navigation.navigate('SignupScreen')}
          style={styles.signupTabView}>
          <TextWrapper
            style={[
              styles.signupTextStyle,
              {color: theme.primary},
              {textDecorationLine: 'underline'},
            ]}>
            Sign Up
          </TextWrapper>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <MainContainer>
      <ScrollWrapper avoidKeyboard={true}>
        {renderLogo()}
        {renderSignUpFields()}
      </ScrollWrapper>
    </MainContainer>
  );
};
export default SignupScreen;
