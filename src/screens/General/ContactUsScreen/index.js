import React, {useState} from 'react';
import {View, Image, TouchableOpacity, TextInput, Platform} from 'react-native';
import {generalImages, icons, authIcons} from '../../../assets/images/index';
import MainContainer from '../../../components/Containers/MainContainer';
import ScrollWrapper from '../../../components/Containers/ScrollWrapper';
import TextWrapper from '../../../components/TextWrapper';
import AuthTextInput from '../../../components/TextInputs/AuthTextInput';
import SubmitButton from '../../../components/Buttons/SubmitButton';
import styles from './styles';
import theme from '../../../utils/theme';

import {useContactUsHook} from '../../../hooks/useContactUsHook';
import {contactIcons} from '../../../assets/images/index';
import {DrawerActions} from '@react-navigation/native';
import {vh} from '../../../units';
import {useSelector} from 'react-redux';
import {showToast} from '../../../redux/Api/HelperFunction';

const ContactUsScreen = props => {
  const user = useSelector(state => state.authReducer?.customer);

  const [contactUsState, contactUsFunc] = useContactUsHook();
  const [email, setEmail] = useState(user?.email ? user?.email : null);
  const [fullName, setFullName] = useState(
    user?.first_name && user?.last_name
      ? user?.first_name + ' ' + user?.last_name
      : 'Guest User',
  );
  const [subject, setSubject] = useState();
  const [message, setMessage] = useState('');

  const handleContactUs = () => {
    const data = {
      fullName: fullName,
      email: email,
      subject: subject,
      message: message,
    };
    contactUsFunc(data)
      .then(res => {
        if (res) {
          setMessage('');
          setSubject('');
          showToast(res?.message);
        }
      })
      .catch(err => {
        console.log('Error from ContactUs Screen ------------->', err);
        showToast(err);
      });
    // .then(res => {
    //   if (res) {
    //     showToast(res?.message);
    //   }
    // })
    // .catch(err => {
    //   // showToast(err)
    //   console.log('Error from ContactUS ==================>', err);
    // });
  };

  console.log(contactUsState?.status, 'contactUsState');

  const [checked, setChecked] = useState(false);
  const [focus, setFocus] = useState(false);
  const renderLogo = () => {
    return (
      <View style={styles.logoView}>
        <Image source={generalImages.DrawerLogo} style={styles.logoStyle} />
      </View>
    );
  };

  const renderFields = () => {
    return (
      <View style={styles.fieldContainer}>
        <View style={styles.miniContainer}>
          <View style={styles.contactUsScreenIconView}>
            <TouchableOpacity
              onPress={() =>
                props.navigation.dispatch(DrawerActions.toggleDrawer())
              }
              style={styles.leftArrowIconButton}>
              <Image source={icons.drawer} style={styles.leftArrowIconStyle} />
            </TouchableOpacity>
            <TextWrapper style={styles.welcomeBackTextStyle}>
              Contact Us
            </TextWrapper>
          </View>

          <View style={styles.fieldsView}>
            <AuthTextInput
              value={fullName}
              onChangeText={text => {
                if (text) setFullName(text);
              }}
              placeHolder="Enter Full Name"
              icon={contactIcons.name}
              fullName
            />
            <AuthTextInput
              value={email}
              onChangeText={text => setEmail(text)}
              placeHolder="Enter Email Address"
              icon={authIcons.email}
            />
            <AuthTextInput
              value={subject}
              onChangeText={text => setSubject(text)}
              placeHolder="Enter Subject Here"
              subject
              icon={icons.message}
            />

            <View
              style={[
                styles.messageView,
                {
                  borderColor: focus
                    ? theme.primary
                    : theme.defaultInactiveBorderColor,
                },
              ]}>
              <View style={styles.emailIconView}>
                <Image
                  source={authIcons.message}
                  style={[
                    styles.emailStyle,
                    {
                      tintColor: focus
                        ? theme.primary
                        : theme.defaultInactiveBorderColor,
                    },
                  ]}
                />
              </View>
              <View
                style={{
                  marginTop: Platform.OS === 'android' ? 0.01 * vh : 1.8 * vh,
                }}>
                <TextInput
                  onFocus={() => setFocus(true)}
                  value={message}
                  onChangeText={text => setMessage(text)}
                  placeholder="Enter Your Message"
                  placeholderTextColor={theme.defaultInactiveBorderColor}
                  multiline={true}
                  style={styles.textInputStyle}
                />
              </View>
            </View>
          </View>

          <SubmitButton
            onPress={handleContactUs}
            style={styles.submitButtonStyle}
            titleTextStyle={styles.titleTextStyle}
            title="Submit"
          />
        </View>
      </View>
    );
  };

  return (
    <MainContainer>
      <ScrollWrapper
        avoidKeyboard={true}
        style={styles.scroll}
        contentContainerStyle={styles.content}>
        {renderFields()}
      </ScrollWrapper>
    </MainContainer>
  );
};
export default ContactUsScreen;
