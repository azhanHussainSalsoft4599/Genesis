import React from 'react';
import {Image, View} from 'react-native';
import IconButton from '../../components/Buttons/IconButton';
import styles from './styles';
import RubikRegular from '../../components/TextWrapper';
import {authIcons, generalImages, icons} from '../../assets/images';
import {vh, vw} from '../../units';
import theme from '../../utils/theme';

const titles = {
  SearchScreen: 'Search',
  TypeSearchScreen: 'Search',
  FilterScreen: 'Filter',
  CategoryScreen: 'Categories',
  BasketScreen: 'Shopping Basket',
  PrivacyPolicyScreen: 'Privacy Policy',
  TermsConditionScreen: 'Terms & Conditions',
  ProfileScreen: 'Profile',
  EditProfile: 'Edit Profile',
  RequestDeleteScreen: 'Delete Profile',
  ProductDetailsScreen: 'Product Details',
  ProductsScreen: 'Products',
  ViewOrderScreen: 'Orders',
  OrderDetailsScreen: 'Order Details',
  ContactUsScreen: 'Contact Us',
  CheckoutScreen: 'Checkout',
  OrderAcceptedScreen: 'Checkout',
  AboutScreen: 'About Us',
  WishlistScreen: 'Wishlist',
};
const whiteBackgroundRoutes = {
  SearchScreen: 'Search',
  TypeSearchScreen: 'Search',
  FilterScreen: 'Filter',
  CategoryScreen: 'Categories',
  PrivacyPolicyScreen: 'Privacy Policy',
  TermsConditionScreen: 'Terms & Conditions',
  EditProfile: 'Edit Profile',
  RequestDeleteScreen: 'Delete Profile',
  ProductDetailsScreen: 'Product Details',
  ProductsScreen: 'Products',
  ViewOrderScreen: 'Orders',
  OrderDetailsScreen: 'Order Details',
};

const leftBackRoutes = {
  SearchScreen: 'Search Screen',
  TypeSearchScreen: 'Search Screen',
  FilterScreen: 'Filter',
  EditProfile: 'Edit Profile',
  RequestDeleteScreen: 'Delete Profile',
  ProductsScreen: 'Products',
  CategoryScreen: 'Categories',
  CheckoutScreen: 'Checkout',
  ProductDetailsScreen: 'Product Details',
};
const rightBtnNotification = {};

const leftBtnRoutes = {
  HomeScreen: 'Home',
  PrivacyPolicyScreen: 'Privacy Policy',
  TermsConditionScreen: 'Terms & Conditions',
  ViewOrderScreen: 'Orders',
  AboutScreen: 'About Us',
  WishlistScreen: 'Wishlist',
  
};

const blackBackgroundsRoutes = {
  BasketScreen: 'Shopping Basket',
  PrivacyPolicyScreen: 'Privacy Policy',
  TermsConditionScreen: 'Terms & Conditions',
  ViewOrderScreen: 'Orders',
  OrderDetailsScreen: 'Order Details',
  CheckoutScreen: 'Checkout',
  AboutScreen: 'About Us',
  WishlistScreen: 'Wishlist',
};
const getTitle = props => {
  if (
    props?.route?.name == 'ProfileScreen' ||
    props?.route?.name == 'ContactUsScreen' ||
    props?.route?.name == 'OrderAcceptedScreen'
  ) {
    return (
      <View
        style={{
          width: vw * 80,
          height: vh * 15,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.black,
        }}>
        <Image
          source={authIcons.logo}
          style={{height: vh * 20, width: vw * 35, resizeMode: 'contain'}}
        />
      </View>
    );
  }

  if (props?.route?.name == 'ProductDetailsScreen') {
    return (
      <View
        style={{
          width: vw * 60,
          height: vh * 4,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <RubikRegular style={{fontSize: vh * 2, color: theme.whiteBackground}}>
          {titles[props?.route?.name]}
        </RubikRegular>
      </View>
    );
  }

  if (blackBackgroundsRoutes[props?.route?.name]) {
    return (
      <View
        style={{
          width: vw * 60,
          height: vh * 4,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <RubikRegular style={{fontSize: vh * 2, color: theme.whiteBackground}}>
          {titles[props?.route?.name]}
        </RubikRegular>
      </View>
    );
  }
  if (titles[props?.route?.name]) {
    return (
      <View
        style={{
          width: vw * 60,
          height: vh * 4,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <RubikRegular style={{fontSize: vh * 2, color: theme.black}}>
          {titles[props?.route?.name]}
        </RubikRegular>
      </View>
    );
  }
};

const getHeaderLeft = props => {
  if (leftBtnRoutes[props?.route?.name]) {
    return (
      <IconButton
        onPress={() => props.navigation.openDrawer()}
        iconStyle={styles.drawerIcon}
        customStyle={styles.imageContainer}
        icon={icons.drawer}
        resizeMode="contain"
      />
    );
  }
  if (props?.route?.name == 'ProductDetailsScreen') {
    return (
      <IconButton
        onPress={() => props.navigation.goBack()}
        iconStyle={{
          height: 2 * vh,
          width: 2 * vw,
        }}
        customStyle={styles.backImageContainer}
        icon={icons.leftArrow}
        resizeMode="contain"
      />
    );
  }
  if (leftBackRoutes[props?.route?.name]) {
    return (
      <IconButton
        onPress={() => props.navigation.goBack()}
        iconStyle={[styles.drawerIconStyles]}
        customStyle={styles.backImageContainer}
        icon={icons.leftArrow}
        resizeMode="contain"
      />
    );
  }
  if (blackBackgroundsRoutes[props?.route?.name]) {
    return (
      <IconButton
        onPress={() => props.navigation.goBack()}
        iconStyle={[styles.drawerBlackIconStyles]}
        customStyle={styles.backImageContainer}
        icon={icons.leftArrow}
        resizeMode="contain"
      />
    );
  }
};

const getHeaderRight = props => {
  if (rightBtnNotification[props?.route?.name]) {
    return (
      <IconButton
        onPress={() => props.navigation.navigate('NotificationScreen')}
        iconStyle={[styles.headerNotificationButtons]}
        icon={icons.notification} //icons.home
        resizeMode="contain"
      />
    );
  }
};
const getHeaderStyle = props => {
  if (blackBackgroundsRoutes[props?.route?.name]) {
    return {
      shadowColor: 'transparent',
      backgroundColor: theme.black,
    };
  }
  if (props?.route?.name == 'ProductDetailsScreen') {
    return {
      shadowColor: 'transparent',
      backgroundColor: 'transparent',
    };
  }
  if (whiteBackgroundRoutes[props?.route?.name]) {
    return {
      shadowColor: 'transparent',
      backgroundColor: theme.whiteBackground,
    };
  }
  if (
    props?.route?.name == 'ProfileScreen' ||
    props?.route?.name == 'ContactUsScreen' ||
    props?.route?.name == 'OrderAcceptedScreen'
  ) {
    return {
      shadowColor: 'transparent',
      backgroundColor: theme.black,
      height: vh * 23,
    };
  }
};
const NavigtaionOptions = navProps => {
  return {
    headerTitle: () => getTitle(navProps),
    headerLeft: () => getHeaderLeft(navProps),
    headerRight: () => getHeaderRight(navProps),
    headerTitleAlign: 'center',
    headerStyle: getHeaderStyle(navProps),
  };
};
export default NavigtaionOptions;
