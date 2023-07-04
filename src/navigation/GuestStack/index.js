import React, {useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerScreenWrapper from '../../components/DrawerComponents/DrawerScreenWrapper';
import DrawerContent from '../../components/DrawerComponents/DrawerContent';
import GeneralStack from '../GeneralStack';
import AboutUsScreen from '../../screens/General/AboutUsScreen';
import ContactUsScreen from '../../screens/General/ContactUsScreen';
import PrivacyPolicyScreen from '../../screens/General/PrivacyPolicyScreen';
import TermsConditionScreen from '../../screens/General/TermsConditionScreen';
import OtherStack from '../OtherStack';
import {vh, vw} from '../../units';
import {useSelector} from 'react-redux';
import theme from '../../utils/theme';
import styles from './styles';
import {EventRegister} from 'react-native-event-listeners';
import {Modal, View, TouchableOpacity, Image} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import TextWrapper from '../../components/TextWrapper';
import SubmitButton from '../../components/Buttons/SubmitButton';
import {icons} from '../../assets/images';
import NavigtaionOptions from '../NavigationOptions';

const Drawer = createDrawerNavigator();

const AnimatedHomeStack = props => {
  return (
    <DrawerScreenWrapper {...props}>
      <GeneralStack />
    </DrawerScreenWrapper>
  );
};

const DrawerNavigator = props => {
  const user = useSelector(state => state.authReducer);
  const [isVisible, setIsVisible] = useState(false);
  React.useEffect(() => {
    EventRegister.addEventListener('GUEST_POPUP_OPEN', data => {
      setIsVisible(data);
    });
    return () => {};
  }, []);

  return (
    <>
      <Drawer.Navigator
        drawerContent={props => {
          return <DrawerContent {...props} />;
        }}
        screenOptions={{
          headerShown: {NavigtaionOptions},
          overlayColor: 'transparent',
          drawerStyle: {
            width: 70 * vw,
          },
          sceneContainerStyle: {backgroundColor: theme.primary},
          drawerType: 'slide',
        }}>
        <Drawer.Screen
          name="HomeStack"
          component={AnimatedHomeStack}
          options={{headerShown: false}}
        />
        <Drawer.Screen
          name="AboutScreen"
          component={AboutUsScreen}
          options={NavigtaionOptions}
        />
        <Drawer.Screen
          name="WishlistScreen"
          component={OtherStack}
          options={{headerShown: false}}
        />
        <Drawer.Screen
          name="ContactUsScreen"
          component={ContactUsScreen}
          options={NavigtaionOptions}
        />
        <Drawer.Screen
          name="PrivacyPolicyScreen"
          component={PrivacyPolicyScreen}
          options={NavigtaionOptions}
        />
        <Drawer.Screen
          name="TermsConditionScreen"
          component={TermsConditionScreen}
          options={NavigtaionOptions}
        />
      </Drawer.Navigator>
      {isVisible && (
        <Modal
          transparent={true}
          visible={isVisible ? isVisible : false}
          style={{flex: 1}}>
          <BlurView
            style={styles.blurViewStyle}
            blurType="dark"
            blurAmount={20}
          />

          <View style={styles.alertMainView}>
            <TouchableOpacity
              style={styles.crossIconView}
              onPress={() => setIsVisible(false)}>
              {/* <Image source={icons.cross} style={styles.crossIconStyle} /> */}
            </TouchableOpacity>

            <View style={styles.checkIconView}>
              <Image
                source={icons.questionMark}
                style={styles.checkIconStyle}
              />

              <TextWrapper
                numberOfLines={4}
                style={styles.customAlertHeadingTextStyle}>
                This feature requires Login Please Login First!?
              </TextWrapper>

              <View style={styles.choiceButtonView}>
                <SubmitButton
                  style={styles.yesButtonView}
                  textStyle={styles.yesTextStyle}
                  title={'Yes'}
                  onPress={() => props.navigation.replace('SignInScreen')}
                />
                <SubmitButton
                  style={styles.noButtonView}
                  textStyle={styles.noTextStyle}
                  title={'Cancel'}
                  onPress={() => setIsVisible(false)}
                />
              </View>
            </View>
          </View>
        </Modal>
      )}
    </>
  );
};

export default DrawerNavigator;
