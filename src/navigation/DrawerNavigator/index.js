import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
// import TabNavigator from '../../Navigation/TabNavigator';
import DrawerScreenWrapper from '../../components/DrawerComponents/DrawerScreenWrapper';
import DrawerContent from '../../components/DrawerComponents/DrawerContent';
import GeneralStack from '../GeneralStack';
import AboutUsScreen from '../../screens/General/AboutUsScreen';
import ContactUsScreen from '../../screens/General/ContactUsScreen';
import PrivacyPolicyScreen from '../../screens/General/PrivacyPolicyScreen';
import TermsConditionScreen from '../../screens/General/TermsConditionScreen';
import HomeScreen from '../../screens/General/HomeScreen';
import OtherStack from '../OtherStack';
import ProfileStack from '../../navigation/ProfileStack';
import {vh, vw} from '../../units';
import {useSelector} from 'react-redux';
import WishlistScreen from '../OrderStack';
import theme from '../../utils/theme';
import {Platform} from 'react-native';
import NavigtaionOptions from '../NavigationOptions';
import OrderStack from '../OrderStack';

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

  return (
    <Drawer.Navigator
      drawerContent={props => {
        return <DrawerContent {...props} />;
      }}
      screenOptions={{
        headerShown: {NavigtaionOptions},
        // drawerStyle: {
        //   width: 70 * vw,
        //   o
        // },
        // sceneContainerStyle: {backgroundColor: theme.primary},
        drawerType: 'front',
        swipeEnabled: false,
      }}>
      <Drawer.Screen
        name="HomeStack"
        component={GeneralStack}
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
        name="OrderStack"
        component={OrderStack}
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
      <Drawer.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
