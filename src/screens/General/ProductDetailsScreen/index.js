import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  LayoutAnimation,
  ScrollView,
  useWindowDimensions,
  RefreshControl,
  FlatList,
  TextInput,
  Text,
} from 'react-native';
import {generalImages, icons} from '../../../assets/images';
import LinearGradient from 'react-native-linear-gradient';
import TextWrapper from '../../../components/TextWrapper';

import {useFocusEffect} from '@react-navigation/native';
import BackgroundWrapper from '../../../components/Background';
import {Rating, AirbnbRating} from 'react-native-ratings';

import styles from './styles';
import SubmitButton from '../../../components/Buttons/SubmitButton';
import ReviewsContainer from '../../../components/Containers/ReviewsContainer';
import {useGetProductDetailsHook} from '../../../hooks/useGetProductDetailsHook';
import {useRelatedProductsHook} from '../../../hooks/useRelatedProductsHook';
import {useAddToCartHook} from '../../../hooks/useAddToCartHook';
import {useAddWishlistHook} from '../../../hooks/useAddWishlistHook';
import {useRemoveFromWishlistHook} from '../../../hooks/useRemoveFromWishlistHook';
import RenderHtml from 'react-native-render-html';
import {useListReviewsHook} from '../../../hooks/useListReviewsHook';
import {useCreateReviewHook} from '../../../hooks/useCreateReviewHook';
import MainContainer from '../../../components/Containers/MainContainer';
import {useSelector} from 'react-redux';
import {vh, vw} from '../../../units';
import theme from '../../../utils/theme';
import ScrollWrapper from '../../../components/Containers/ScrollWrapper';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {showToast} from '../../../redux/Api/HelperFunction';
import {useGetProductvariationHook} from '../../../hooks/useGetProductvariationHook';

const ProductDetailsScreen = props => {
  const [productDetails, productDetailsFunc, variationFlag] =
    useGetProductDetailsHook();
  const [listRelatedProducts, listRelatedProductsFunc] =
    useRelatedProductsHook();
  const [cartState, addToCartFunc] = useAddToCartHook();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wishlistState, wishlistFunc] = useAddWishlistHook();
  const [removeWishlistState, removeWishListFunc] = useRemoveFromWishlistHook();
  const [wishlistadded, setWishlistAdded] = useState(false);
  const [reviewsListState, reviewsListFunc] = useListReviewsHook();
  const [isLoading, setIsLoading] = useState(false);
  const [review, setReview] = useState();
  const [rating, setRating] = useState();
  const [size, setSize] = useState('');
  const [productVariantion, productVariationFunc] =
    useGetProductvariationHook();
  const [showDropDown, hideDropDown] = useState(false);
  const [variationId, setVariationId] = useState();
  const [reviewState, reviewCreateFunc] = useCreateReviewHook();

  const [defaultTab, setDefaultTab] = useState(false);
  const wishlistItems = useSelector(
    state => state.wishlistReducer.wishlistItems,
  );

  useFocusEffect(
    useCallback(() => {
      productDetailsFunc(props?.route?.params?.params);
      productVariationFunc(props?.route?.params?.params);
    }, [props.route.params]),
  );

  useEffect(() => {
    listRelatedProductsFunc(productDetails?.related_ids);
    wishlistFilled();
    reviewsListFunc(props?.route?.params?.params);
  }, []);

  const handleTabs = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setDefaultTab(!defaultTab);
  };
  React.useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => {
        return (
          <View style={styles.searchIconsView}>
            <TouchableOpacity
              onPress={() => handleWishlist()}
              style={styles.searchIconButtonView}>
              <Image
                style={[
                  styles.searchIconStyle,
                  // { tintColor: wishlistadded ?  theme.red : theme.black },
                ]}
                source={wishlistadded ? icons.like : icons.heart}
              />
            </TouchableOpacity>
          </View>
        );
      },
    });
  });

  handleSize = a => {
    console.log('tag ====>', typeof a);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSize(a);
    hideDropDown(false);
    for (variations in productVariantion) {
      productVariantion[variations].attributes.find(value => {
        console.log('tag ====> valueOptions ==>', value.option);
        if (value.name === 'Size' || value.name === 'Size:') {
          if (value.option === a) {
            setVariationId(productVariantion[variations]?.id);
          }
        }
      });
    }
  };

  const user = useSelector(state => state.authReducer?.customer);
  const handleAddToCart = () => {
    if (variationFlag) {
      if (!variationId) {
        return showToast('Size Selection is Required');
      }

      const data = {
        itemId: props?.route?.params?.params,
        itemName: productDetails?.name,
        itemPrice: productDetails?.price * amountValue,
        itemQuantity: amountValue,
        itemImage: productDetails?.images[0]?.src,
        variationid: variationId,
      };
      addToCartFunc(data);
    } else {
      const data = {
        itemId: props?.route?.params?.params,
        itemName: productDetails?.name,
        itemPrice: productDetails?.price * amountValue,
        itemQuantity: amountValue,
        itemImage: productDetails?.images[0]?.src,
      };
      addToCartFunc(data);
    }
  };
  const {width} = useWindowDimensions();

  const [amountValue, setAmountValue] = useState(1);
  const incrementValue = () => {
    setAmountValue(amountValue + 1);
  };

  const decrementValue = () => {
    if (amountValue == 1) {
      setAmountValue(1);
    } else {
      setAmountValue(amountValue - 1);
    }
  };

  const wishlistFilled = () => {
    let WishListindex = wishlistItems.findIndex(
      x => x == props?.route?.params?.params,
    );
    if (WishListindex > -1) {
      setWishlistAdded(true);
      return true;
    } else {
      setWishlistAdded(false);
      return false;
    }
  };
  const handleWishlist = () => {
    if (wishlistadded) {
      removeWishListFunc(props?.route?.params?.params);
      setWishlistAdded(false);
    } else {
      wishlistFunc(productDetails);
      setWishlistAdded(true);
    }
  };

  const handleCreateReview = () => {
    const data = {
      product_id: props?.route?.params?.params,
      review: review,
      reviewer: user?.first_name ? user?.first_name : 'Guest User',
      reviewer_email: user?.email ? user?.email : 'Guest User',
      rating: rating,
    };
    console.log('ratingratingrating =====================>', typeof rating);
    if (!review && !rating) {
      showToast('Enter Review');
    } else if (rating < 1) {
      showToast('Please Select Rating');
    } else {
      reviewCreateFunc(data).then(Res => {
        reviewsListFunc(props?.route?.params?.params);
        setReview('');
        setRating(0);
        console.log('Response ==================>', Res);
      });
    }
  };

  const getReviews = () => {
    setIsLoading(false);
    reviewsListFunc(props?.route?.params?.params);
  };

  const renderSearchHeader = () => {
    // source={{uri: productDetails?.images[0]?.src}}

    return (
      <View style={{height: vh * 40}}>
        <Carousel
          data={
            productDetails?.images?.length > 0
              ? productDetails?.images
              : [{src: null}]
          }
          renderItem={({item}) => {
            const handleImage = () => {
              if (item?.src === null) {
                return require('../../../assets/images/generalImages/placeholderImage.png');
              } else {
                return {uri: item.src};
              }
            };
            return (
              <View style={{height: vh * 40}}>
                <BackgroundWrapper
                  resizeMode="cover"
                  imageStyle={{height: vh * 45}}
                  background={handleImage()}>
                  <LinearGradient
                    colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,0.2)']}
                    style={{height: vh * 45}}>
                    {/* <View style={styles.searchView}>
                      <TouchableOpacity
                        onPress={() => props.navigation.goBack()}
                        style={styles.rightArrowIconView}>
                        <Image
                          source={icons.leftArrow}
                          style={styles.leftArrowIconStyle}
                        />
                      </TouchableOpacity>
                      <TextWrapper style={styles.searchTextStyle}>
                        Product Details
                      </TextWrapper>

                      <View style={styles.searchIconsView}>
                        <TouchableOpacity
                          onPress={() => handleWishlist()}
                          style={styles.searchIconButtonView}>
                          <Image
                            style={[
                              styles.searchIconStyle,
                              // { tintColor: wishlistadded ?  theme.red : theme.black },
                            ]}
                            source={wishlistadded ? icons.like : icons.heart}
                          />
                        </TouchableOpacity>
                      </View>
                    </View> */}
                  </LinearGradient>
                </BackgroundWrapper>
              </View>
            );
          }}
          sliderWidth={vw * 100}
          itemWidth={vw * 100}
          onSnapToItem={index => setCurrentIndex(index)}
        />
      </View>
    );
  };

  const renderShowRating = rating => {
    return (
      <View style={styles.ratingMainView}>
        <AirbnbRating
          isDisabled={true}
          count={5}
          defaultRating={rating}
          size={12}
          showRating={false}
        />
      </View>
    );
  };
  const renderWriteRating = () => {
    return (
      <View style={styles.mainWriteRatingView}>
        {/* {listReviews()} */}
        <TextWrapper style={styles.writeYoursHeadingTextStyle}>
          Write Yours
        </TextWrapper>

        <View style={styles.writeRatingStyle}>
          <AirbnbRating
            count={5}
            defaultRating={rating}
            size={30}
            showRating={false}
            onFinishRating={text => setRating(text)}
          />
        </View>

        <View style={styles.textInputView}>
          <TextInput
            placeholderTextColor={theme.defaultInactiveBorderColor}
            placeholder="Write your experience"
            style={styles.textInputTextStyle}
            value={review}
            onChangeText={text => setReview(text)}
          />
        </View>

        <SubmitButton
          onPress={handleCreateReview}
          title="Submit"
          style={styles.reviewButtonView}
        />
        <View style={{marginTop: vh * 1, bottom: 0}}>
          <SubmitButton
            onPress={() => props.navigation.navigate('HomeScreen')}
            title="Continue Shopping"
            style={styles.cartButton}
          />
        </View>
        {props.renderFooterComponent}
      </View>
    );
  };
  const renderReviewItem = ({item}) => {
    const source = {
      html: item.review,
    };
    const handleReviewAvatar = () => {
      if (props?.data?.reviewer_avatar_urls == null) {
        return generalImages.placeHolderProfileImage;
      } else {
        return {uri: props?.data?.reviewer_avatar_urls[96]};
      }
    };
    return (
      <View style={styles.mainReviewView}>
        <View style={styles.displayView}>
          <Image
            source={handleReviewAvatar()}
            style={styles.displayIconStyle}
          />
        </View>

        <View style={styles.mainRowView}>
          <View style={styles.nameWithRatingView}>
            <View style={styles.nameView}>
              <TextWrapper style={styles.nameTextStyle}>
                {item.reviewer}
              </TextWrapper>
            </View>

            {renderShowRating(item.rating)}
          </View>

          <View style={styles.descriptionContainer}>
            <TextWrapper
              numberOfLines={2}
              style={styles.reviewsDescriptionView}>
              {/* {item.review} */}
              <RenderHtml
                baseStyle={{width: 70 * vw}}
                contentWidth={70 * vw}
                source={source}
              />
            </TextWrapper>
          </View>
        </View>
      </View>
    );
  };

  const renderEmptyComponent = () => {
    return (
      <TextWrapper style={styles.noReviewsView}>No Reviews Found</TextWrapper>
    );
  };

  const renderRviews = () => {
    return (
      <View style={{flex: 1}}>
        <FlatList
          style={styles.listView}
          contentContainerStyle={{width: vw * 100, alignItems: 'center'}}
          data={reviewsListState}
          renderItem={renderReviewItem}
          ListEmptyComponent={renderEmptyComponent()}
          ListFooterComponent={renderWriteRating()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  };

  const renderVariations = () => {
    if (variationFlag) {
      return productDetails?.attributes.map((value, index) => {
        // console.log("Value ===>", value)
        if (value?.name === 'Size' || value?.name === 'Size:') {
          return (
            <View style={{marginBottom: 2 * vh}}>
              <View style={styles.variationsContainer}>
                <View
                  style={{
                    alignItems: 'center',
                    width: '70%',
                    height: '100%',
                    justifyContent: 'center',
                  }}>
                  <TextWrapper style={{fontSize: vh * 1.6}}>
                    {size != '' ? size : 'Select Size'}
                  </TextWrapper>
                </View>
                <TouchableOpacity
                  style={{width: '20%', alignItems: 'center'}}
                  activeOpacity={0.5}
                  onPress={() => {
                    LayoutAnimation.configureNext(
                      LayoutAnimation.Presets.easeInEaseOut,
                    );

                    hideDropDown(!showDropDown);
                  }}>
                  {showDropDown ? (
                    <Image
                      source={icons.upIcon}
                      style={{
                        height: vh * 3,
                        width: vw * 3,
                        resizeMode: 'contain',
                      }}
                    />
                  ) : (
                    <Image
                      source={icons.dropDownIcon}
                      style={{
                        height: vh * 3,
                        width: vw * 3,
                        resizeMode: 'contain',
                      }}
                    />
                  )}
                </TouchableOpacity>
              </View>

              {showDropDown && (
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  style={{
                    backgroundColor: theme.whiteBackground,
                    width: vw * 30,
                    elevation: 10,
                    position: 'absolute',
                    top: vh * 5.2,
                    height: vh * 15,
                    borderBottomRightRadius: vh * 2,
                    borderBottomLeftRadius: vh * 2,
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.5,
                    shadowRadius: 2,
                  }}
                  contentContainerStyle={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 999999,
                  }}>
                  {value.options.map((options, ind) => {
                    return (
                      <TouchableOpacity
                        style={{
                          width: vw * 22,
                          height: vh * 3,
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginVertical: '1.5%',
                          borderBottomWidth: vh * 0.02,
                          borderColor: 'rgba(0,0,0,0.3)',
                        }}
                        onPress={() => handleSize(options)}>
                        <TextWrapper
                          style={styles.optionTextStyles}
                          numberOfLines={1}>
                          {options}
                        </TextWrapper>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              )}
            </View>
          );
        }
      });
    }
  };
  const renderOptions = () => {
    return (
      <View
        style={{
          width: vw * 80,
          justifyContent: 'center',
          height: vh * 6,
        }}>
        {renderVariations()}
      </View>
    );
  };

  const renderDetails = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.mainProductsContainerView}
        refreshControl={
          <RefreshControl
            colors={[theme.defaultInactiveBorderColor]}
            tintColor={theme.defaultInactiveBorderColor}
            refreshing={isLoading}
            onRefresh={() => {
              if (defaultTab) {
                getReviews();
              }
            }}
          />
        }>
        {/* {!defaultTab && renderCounter()} */}

        {!defaultTab ? (
          <View style={{zIndex: -10, flex: 1}}>{renderDetailsContent()}</View>
        ) : (
          <View style={{flex: 1, zIndex: -10}}>{renderRviews()}</View>
        )}
      </ScrollView>
    );
  };

  const renderProductDetailsContainer = () => {
    return (
      <View style={{width: 100 * vw, flex: 1, alignItems: 'center'}}>
        <View style={styles.productNameView}>
          <TextWrapper numberOfLines={2} style={styles.productNameTextStyle}>
            {productDetails?.name}
          </TextWrapper>
          <View
            style={{
              flexDirection: 'row',
              width: vw * 89,
              justifyContent: 'space-between',
            }}>
            <TextWrapper style={styles.productPriceTextStyle}>
              ${productDetails?.price}
            </TextWrapper>
            <View>{renderCounter()}</View>
          </View>
        </View>
        <View style={{width: vw * 89}}>{renderVariations()}</View>
        <View style={{zIndex: -222}}>{renderTabs()}</View>
        <View style={{zIndex: -10, flex: 1, paddingTop: vh * 1.5}}>
          {renderDetails()}
        </View>
        {!defaultTab && (
          <View style={{width: vw * 100, zIndex: -10}}>
            {renderAddToCart()}
          </View>
        )}
      </View>
    );
  };

  const renderCounter = () => {
    return (
      <View style={styles.amountValueView}>
        <TouchableOpacity
          onPress={decrementValue}
          style={styles.decreaseAmountView}>
          <TextWrapper style={styles.decrementTextStyle}>-</TextWrapper>
        </TouchableOpacity>

        <View style={styles.valueView}>
          <TextWrapper style={styles.valueTextStyle}>{amountValue}</TextWrapper>
        </View>

        <TouchableOpacity
          onPress={incrementValue}
          style={styles.increaseAmountView}>
          <TextWrapper style={styles.icrementTextStyle}>+</TextWrapper>
        </TouchableOpacity>
      </View>
    );
  };

  const renderTabs = () => {
    return (
      <View style={styles.mainTabsView}>
        <LinearGradient
          start={{x: 0.2, y: 0.4}}
          end={{x: 0.6, y: 0.5}}
          colors={defaultTab ? ['#FFFF', '#FFFF'] : ['#3CBEA0', '#1ECEE6']}
          style={styles.detailsTabView}>
          <TouchableOpacity onPress={handleTabs}>
            <TextWrapper
              style={[
                styles.detailsTextStyle,
                {
                  color: defaultTab
                    ? theme.defaultInactiveBorderColor
                    : theme.whiteBackground,
                },
              ]}>
              Details
            </TextWrapper>
          </TouchableOpacity>
        </LinearGradient>
        <LinearGradient
          start={{x: 0.2, y: 0.4}}
          end={{x: 0.6, y: 0.5}}
          colors={defaultTab ? ['#3CBEA0', '#1ECEE6'] : ['#FFFF', '#FFFF']}
          style={styles.detailsTabView}>
          <TouchableOpacity onPress={handleTabs}>
            <TextWrapper
              style={[
                styles.reviewsTabTextStyle,
                {
                  color: !defaultTab
                    ? theme.defaultInactiveBorderColor
                    : theme.whiteBackground,
                },
              ]}>
              Reviews
            </TextWrapper>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    );
  };

  const source = {
    html: productDetails?.description,
  };
  const renderDetailsContent = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',

          paddingHorizontal: vw * 2,
        }}
        style={styles.mainDescriptionContainer}>
        {productDetails?.description != '' ? (
          <RenderHtml
            baseStyle={styles.descriptionView}
            contentWidth={width - 70}
            source={source}
          />
        ) : (
          <View
            style={{
              height: vh * 42,
              width: vw * 100,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TextWrapper>No description Found</TextWrapper>
          </View>
        )}
      </ScrollView>
    );
  };

  const renderAddToCart = () => {
    return (
      <SubmitButton
        onPress={handleAddToCart}
        title="Add To Cart"
        style={styles.cartButton}
      />
    );
  };
  console.log('productDetails?.attributes ==>', productDetails?.attributes);

  return (
    <MainContainer style={styles.content}>
      {/* <ScrollWrapper > */}
      {renderSearchHeader()}
      <View
        style={{
          backgroundColor: theme.whiteBackground,
          flex: 1,
        }}>
        {renderProductDetailsContainer()}
      </View>
      {/* </ScrollWrapper> */}
    </MainContainer>
  );
};

export default ProductDetailsScreen;
