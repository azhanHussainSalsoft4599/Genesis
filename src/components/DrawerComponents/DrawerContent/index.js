import React, {useState, useEffect} from 'react';
import styles from './styles';
import DrawerButton from '../DrawerButton';
import {Image, View, Modal} from 'react-native';
import {
  useDrawerProgress,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import TextWrapper from '../../TextWrapper';
import {
  authIcons,
  generalImages,
  icons,
  sideIcons,
} from '../../../assets/images';
import {useSelector} from 'react-redux';
import theme from '../../../utils/theme';
import {vh} from '../../../units';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Fonts} from '../../../assets/fonts';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {useLogoutHook} from '../../../hooks/useLogoutHook';
import RemoveProductAlert from '../../Modals/RemoveProductAlert';
import GeneralAlert from '../../Modals/GeneralAlert';
import {BlurView} from '@react-native-community/blur';
import SubmitButton from '../../../components/Buttons/SubmitButton/index';
import LogoutAlert from '../../Modals/LogoutAlert';

const routeOrders = [
  'HomeStack',
  'AboutScreen',
  'WishlistScreen',
  'ProfileStack',
  'OrderStack',
  'ContactUsScreen',
  'PrivacyPolicyScreen',
  'TermsConditionScreen',
];
const GuestrouteOrders = [
  'HomeStack',
  'AboutScreen',
  'WishlistScreen',
  'ContactUsScreen',
  'PrivacyPolicyScreen',
  'TermsConditionScreen',
];
const drawerRoutes = {
  HomeStack: {
    label: 'Home',
    icon: sideIcons.home,
  },
  ProfileStack: {
    label: 'My Profile',
    icon: icons.profileIcon,
  },
  AboutScreen: {
    label: 'About Us',
    icon: sideIcons.aboutus,
  },

  WishlistScreen: {
    label: 'Wishlist',
    icon: sideIcons.heart,
  },
  OrderStack: {
    label: 'My Order',
    icon: sideIcons.shopping,
  },
  ContactUsScreen: {
    label: 'Contact Us',
    icon: sideIcons.phone,
  },
  PrivacyPolicyScreen: {
    label: 'Privacy Policy',
    icon: sideIcons.privacy,
  },
  TermsConditionScreen: {
    label: 'Terms & Conditions',
    icon: sideIcons.terms,
  },
};

const GUestdrawerRoutes = {
  HomeStack: {
    label: 'Home',
    icon: sideIcons.home,
  },
  AboutScreen: {
    label: 'About Us',
    icon: sideIcons.aboutus,
  },
  WishlistScreen: {
    label: 'Wishlist',
    icon: sideIcons.heart,
  },
  ContactUsScreen: {
    label: 'Contact Us',
    icon: sideIcons.phone,
  },
  PrivacyPolicyScreen: {
    label: 'Privacy Policy',
    icon: sideIcons.privacy,
  },
  TermsConditionScreen: {
    label: 'Terms & Conditions',
    icon: sideIcons.terms,
  },
};

const DrawerContent = props => {
  const user = useSelector(state => state.authReducer?.customer);
  const loggedIn = useSelector(state => state.authReducer.loggedin);

  const [visibility, setVisibility] = useState(false);
  const [itemIndex, setItemIndex] = useState(0);
  const [isCollapsed, setisCollapsed] = useState(true);
  const [logoutPopup, setLogoutPopup] = useState(false);

  const handleVisibility = () => {
    setVisibility(!visibility);
  };
  const [logoutState, logoutFunc] = useLogoutHook();
  const navigation = useNavigation();

  const handleOnDrawerItemPress = routeName => {
    console.log('ROute Name =====>', routeName);
    if (drawerRoutes[routeName]) {
      if (drawerRoutes[routeName].notRoute != true) {
        return props.navigation.navigate(routeName);
      }
    }
  };
  const handleOnGuestDrawerItemPress = routeName => {
    console.log('GUest Route Name ===========>', routeName);
    if (GUestdrawerRoutes[routeName]) {
      if (GUestdrawerRoutes[routeName].notRoute != true) {
        return props.navigation.navigate(routeName);
      }
    }
  };

  const logout = () => {
    logoutFunc();
    setVisibility(false);
  };

  const handleModalVisibility = () => {
    setVisibility(false);
  };

  return (
    <View style={[styles.container]}>
      <DrawerContentScrollView style={styles.drawercontainer} bounces={false}>
        <View>
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            style={styles.crossButtonView}>
            <Image style={styles.crossIconStyle} source={icons.whitecross} />
          </TouchableOpacity>

          <View style={styles.header}>
            <Image source={authIcons.logo} style={styles.logoImage} />
          </View>
        </View>
        <View style={styles.routeContainer}>
          {loggedIn
            ? routeOrders.map((item, index) => {
                return (
                  <DrawerButton
                    index={index}
                    onPress={handleOnDrawerItemPress}
                    routeName={item}
                  />
                );
              })
            : GuestrouteOrders.map((item, index) => {
                console.log('Index ------------>', item);
                return (
                  <DrawerButton
                    index={index}
                    onPress={handleOnGuestDrawerItemPress}
                    routeName={item}
                  />
                );
              })}

          {loggedIn ? (
            <TouchableOpacity
              onPress={handleVisibility}
              style={[styles.logoutButtonStyle]}>
              <Image style={styles.icon} source={sideIcons.logout} />
              <TextWrapper style={styles.label}>Log out</TextWrapper>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => props.navigation.navigate('SignInScreen')}
              style={[styles.logoutButtonStyle]}>
              <Image style={styles.icon} source={sideIcons.logout} />
              <TextWrapper style={styles.label}>SignIn / SignUp</TextWrapper>
            </TouchableOpacity>
          )}
        </View>

        {/* <RemoveProductAlert
        visibility={visibility}
        onHide={handleVisibility}
        onPress={logoutFunc}
        title="Are You Sure
        You Want To Logout?"
        icon={icons.circleChecked}
      /> */}
        {/* {visibility && (
          <Modal
            transparent={true}
            visible={visibility ? visibility : false}
            style={{flex: 1}}>
            <BlurView
              style={styles.blurViewStyle}
              blurType="dark"
              blurAmount={20}
            />

            <View style={styles.alertMainView}>
              <TouchableOpacity
                style={styles.crossIconView}
                onPress={() => setVisibility(false)}>
               </TouchableOpacity>

              <View style={styles.checkIconView}>
                <Image
                  source={icons.questionMark}
                  style={styles.checkIconStyle}
                />

                <TextWrapper
                  numberOfLines={4}
                  style={styles.customAlertHeadingTextStyle}>
                  Are you sure you want to logout?
                </TextWrapper>

                <View style={styles.choiceButtonView}>
                  <SubmitButton
                    style={styles.yesButtonView}
                    textStyle={styles.yesTextStyle}
                    title={'Yes'}
                    onPress={() => logout()}
                  />
                  <SubmitButton
                    style={styles.noButtonView}
                    textStyle={styles.noTextStyle}
                    title={'No'}
                    onPress={() => setVisibility(false)}
                  />
                </View>
              </View>
            </View>
          </Modal>
        )} */}

        <LogoutAlert
          onPress={handleModalVisibility}
          onHide={handleModalVisibility}
          visibility={visibility}
          setVisibility={setVisibility}
        />
      </DrawerContentScrollView>
    </View>
  );
};
export default DrawerContent;
