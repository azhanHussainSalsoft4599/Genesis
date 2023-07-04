import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  LayoutAnimation,
} from 'react-native';
import ScrollWrapper from '../../../components/Containers/ScrollWrapper';
import TextWrapper from '../../../components/TextWrapper';
import {generalImages, icons} from '../../../assets/images';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {vh, vw} from '../../../units';
import HomeSlider from '../../../components/Containers/HomeSlider';
import WishlistContainer from '../../../components/Containers/WishlistContainer';
import {DrawerActions, useFocusEffect} from '@react-navigation/native';

import {useSelector} from 'react-redux';

import styles from './styles';
import {FlatList} from 'react-native-gesture-handler';

import {useProductsHook} from '../../../hooks/useProductsHook';
import {useProductsCategoriesHook} from '../../../hooks/useProductsCategoriesHook';
import {useHomeDataHook} from '../../../hooks/useHomeDataHook';
import {useFetchProfileHook} from '../../../hooks/useFetchProfileHook';
import {useAddToCartHook} from '../../../hooks/useAddToCartHook';
import theme from '../../../utils/theme';

import LinearGradient from 'react-native-linear-gradient';
import MainContainer from '../../../components/Containers/MainContainer';
import {Fonts} from '../../../assets/fonts';
import {showToast} from '../../../redux/Api/HelperFunction';

const HomeScreen = props => {
  const user = useSelector(state => state.authReducer?.user);
  const loggedIn = useSelector(state => state.authReducer.loggedin);

  const cartReducer = useSelector(state => state.cartReducer);
  const [listProducts, listProductsFunc, variationFlag] = useProductsHook();
  const [listProductsCategoriesState, listProductsCategoriesFunc] =
    useProductsCategoriesHook();
  const [homeDataState, homeDataFunc] = useHomeDataHook();
  const [profileState, profileFunc] = useFetchProfileHook();
  const [cartState, addToCartFunc] = useAddToCartHook();
  React.useEffect(() => {
    props.navigation.setOptions({
      header: () => {
        return (
          <View style={styles.mainHeaderContainer}>
            <View style={{width: vw * 90}}>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.dispatch(DrawerActions.toggleDrawer())
                }>
                <Image style={styles.drawerIconStyle} source={icons.drawer} />
              </TouchableOpacity>
              <TextWrapper
                style={{
                  fontFamily: Fonts.SFR,
                  fontSize: vh * 2,
                }}>
                pure organics-RX
              </TextWrapper>

              <View style={styles.headerContainer}>
                <TextWrapper style={styles.clothingStoreTextStyle}>
                  Collections..!
                </TextWrapper>

                <View style={styles.buttonsView}>
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate('TypeSearchScreen')
                    }
                    style={styles.headerIconButton}>
                    <Image
                      source={icons.search}
                      style={styles.searchIconStyle}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => props.navigation.navigate('BasketScreen')}
                    style={styles.headerIconButton}>
                    <Image source={icons.cart} style={styles.cartIconStyle} />
                    {cartReducer?.cartItems?.length > 0 ? (
                      <View style={styles.cartBubbleView}>
                        <TextWrapper style={styles.cartBubbleIconStyle}>
                          {cartReducer?.cartItems?.length}
                        </TextWrapper>
                      </View>
                    ) : null}
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => props.navigation.navigate('FilterScreen')}
                    style={styles.headerIconButton}>
                    <Image
                      source={icons.filter}
                      style={styles.filterIconStyle}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        );
      },
    });
  });
  useEffect(() => {
    homeDataFunc();
    listProductsFunc();
    listProductsCategoriesFunc();
    if (loggedIn) {
      profileFunc(user);
    }
  }, []);

  const handleAddToCart = item => {
    const data = {
      itemId: item?.id,
      itemName: item?.name,
      itemPrice: item?.price,
      itemQuantity: 1,
      itemImage: item?.images[0]?.src,
    };
    if (item?.attributes) {
      let Size = item?.attributes.find(
        val => val.name == 'Size' || val.name == 'Size:',
      );
      if (Size) {
        props?.navigation.navigate('ProductDetailsScreen', {
          params: item?.id,
        });
      } else {
        addToCartFunc(data);
      }
    } else {
      addToCartFunc(data);
    }
  };

  const handleListProducts = () => {
    if (listProducts?.length < 4) {
      return listProducts;
    } else {
      const listOfProducts = listProducts?.slice(0, 4);
      return listOfProducts;
    }
  };

  const windowWidth = Dimensions.get('window').width;

  const [activeSlide, setActiveSlide] = useState(0);

  const renderCategoriesRow = () => {
    return (
      <View style={styles.rowForMainCategories}>
        <View style={styles.categoriesTextView}>
          <TextWrapper style={styles.categoriesTextStyle}>
            Categories
          </TextWrapper>
        </View>

        <TouchableOpacity
          onPress={() => props.navigation.navigate('CatgoriesStack')}
          style={styles.viewAllTextButtonView}>
          <TextWrapper style={styles.viewAllTextButton}>View All</TextWrapper>
        </TouchableOpacity>
      </View>
    );
  };

  const renderCategories = ({item}) => {
    const handleCategoriesImages = () => {
      if (item?.image == null) {
        return generalImages.placeholderImage;
      } else {
        return {uri: item?.image?.src};
      }
    };

    return (
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('ProductsScreen', {
            categoryId: item?.id,
            categoryName: item.name,
          })
        }
        style={[styles.touchableButtonView]}>
        <LinearGradient
          colors={['rgba(0,0,0,0.01)', 'rgba(0,0,0,0.8)']}
          style={styles.linearGradient}>
          <Image
            source={handleCategoriesImages()}
            style={styles.displayIconStyle}
          />
          <TextWrapper
            style={[
              styles.textStyle,
              {
                color:
                  item?.image == null
                    ? theme.whiteBackground
                    : theme.whiteBackground,
              },
            ]}>
            {item.name}
          </TextWrapper>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  const renderListCategories = () => {
    return (
      <View
        style={{
          height: 15 * vh,
          width: 100 * vw,
          marginHorizontal: 10 * vw,
          marginLeft: vw * 20,
          paddingRight: vw * 10,
        }}>
        <FlatList
          data={listProductsCategoriesState}
          renderItem={renderCategories}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => item?.id + index + Math.random()}
        />
      </View>
    );
  };

  const renderRecommendedProducts = () => {
    return (
      <View style={styles.rowForArivalCategories}>
        <View style={styles.categoriesTextView}>
          <TextWrapper style={styles.categoriesTextStyle}>
            New Arrivals
          </TextWrapper>
        </View>

        <TouchableOpacity
          onPress={() => props.navigation.navigate('ProductsScreen')}
          style={styles.viewAllTextButtonView}>
          <TextWrapper style={styles.viewAllTextButton}>View All</TextWrapper>
        </TouchableOpacity>
      </View>
    );
  };

  const _renderItem = ({item, index}) => {
    return (
      <View style={styles.sliderView}>
        <HomeSlider data={item} />
      </View>
    );
  };

  const pagination = () => {
    return (
      <Pagination
        dotsLength={homeDataState?.data?.length}
        activeDotIndex={activeSlide}
        containerStyle={styles.containerStylePagination}
        dotStyle={styles.dotStylePagination}
        inactiveDotStyle={styles.inactiveDotStylePagination}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  };
  const renderSlideBanner = () => {
    return (
      <View style={{height: 30 * vh, justifyContent: 'center'}}>
        <Carousel
          data={homeDataState?.data}
          renderItem={_renderItem}
          sliderWidth={windowWidth + 1}
          itemWidth={100 * vw}
          layout="default"
          onSnapToItem={index => setActiveSlide(index)}
          keyExtractor={(item, index) => item.id + index + Date.now()}
          // autoplay={true}
          // loop={true}
          // enableMomentum={false}
          // lockScrollWhileSnapping={true}
          // autoplayDelay={1000}
          // enableSnap={true}
          // keyExtractor={(item, index) => item.id + index + Math.random()}
          // loop={true}
          // autoplay={true}
        />
        {/* {pagination()} */}
      </View>
    );
  };
  const renderHeader = () => {
    return (
      <View style={styles.mainHeaderContainer}>
        <TouchableOpacity
          onPress={() =>
            props.navigation.dispatch(DrawerActions.toggleDrawer())
          }>
          <Image style={styles.drawerIconStyle} source={icons.drawer} />
        </TouchableOpacity>
        <TextWrapper
          style={{
            fontFamily: Fonts.SFR,
            fontSize: vh * 2,
          }}>
          Welcome
        </TextWrapper>

        <View style={styles.headerContainer}>
          <TextWrapper style={styles.clothingStoreTextStyle}>
            Skin Care Store!
          </TextWrapper>

          <View style={styles.buttonsView}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('TypeSearchScreen')}
              style={styles.headerIconButton}>
              <Image source={icons.search} style={styles.searchIconStyle} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => props.navigation.navigate('BasketScreen')}
              style={styles.headerIconButton}>
              <Image source={icons.cart} style={styles.cartIconStyle} />
              {cartReducer?.cartItems?.length > 0 ? (
                <View style={styles.cartBubbleView}>
                  <TextWrapper style={styles.cartBubbleIconStyle}>
                    {cartReducer?.cartItems?.length}
                  </TextWrapper>
                </View>
              ) : null}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => props.navigation.navigate('FilterScreen')}
              style={styles.headerIconButton}>
              <Image source={icons.filter} style={styles.filterIconStyle} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const renderRecommended = ({item}) => {
    const handleProductImage = () => {
      if (item.images[0] == null) {
        return generalImages.placeholderImage;
      } else {
        return {uri: item.images[0].src};
      }
    };
    return (
      <TouchableOpacity
        style={styles.mainProductView}
        onPress={() =>
          props.navigation.navigate('ProductDetailsScreen', {
            params: item.id,
          })
        }>
        <View style={styles.productImageContainerStyle}>
          <Image
            source={handleProductImage()}
            style={styles.productImageStyle}
          />
        </View>
        <View style={{marginTop: vh * 1.3, width: vw * 42}}>
          <View style={styles.cartView}>
            <TextWrapper style={[styles.cartCategoryTextStyle2]}>
              $ {item?.name}
            </TextWrapper>

            <TouchableOpacity
              onPress={() => handleAddToCart(item)}
              style={styles.cartGreenView}>
              <Image
                source={icons?.cartGreen}
                style={[styles.cartGreenStyle, {tintColor: theme.primary}]}
              />
            </TouchableOpacity>
          </View>
          <WishlistContainer
            data={item}
            categoryCartViewStyle={{
              width: '90%',
            }}
          />
          {/* <TouchableOpacity
            onPress={() => handleAddToCart(item)}
            style={styles.cartGreenView}>
            <Image
              source={icons.cartGreen}
              style={[styles.cartGreenStyle, { tintColor: theme.black }]}
            />
          </TouchableOpacity> */}
        </View>
      </TouchableOpacity>
    );
  };

  const renderRecommendedProductsList = data => {
    return (
      <View
        style={{
          width: 100 * vw,
          marginHorizontal: 10 * vw,
          marginLeft: vw * 20,
        }}>
        <FlatList
          data={data}
          // horizontal={true}
          key={'rem'}
          numColumns={2}
          renderItem={renderRecommended}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item?.id + index + Math.random()}
          contentContainerStyle={{paddingRight: vw * 6, paddingBottom: vh * 5}}

          // numColumns={2}
        />
      </View>
    );
  };

  // const renderMostPurchasedProducts = () => {
  //   return (
  //     <View style={styles.purchasedProductsView}>
  //       <FlatList
  //         data={handleListProducts()}
  //         renderItem={renderRecommended}
  //         horizontal={true}
  //         showsHorizontalScrollIndicator={false}
  //         keyExtractor={(item, index) => item.id + index + Math.random()}
  //       />
  //     </View>
  //   );
  // };

  return (
    <ScrollWrapper style={styles.scroll} contentContainerStyle={styles.content}>
      {/* {renderHeader()} */}
      {renderSlideBanner()}
      {renderCategoriesRow()}
      {renderListCategories()}
      {renderRecommendedProducts()}
      {renderRecommendedProductsList(handleListProducts())}
    </ScrollWrapper>
  );
};
export default HomeScreen;
