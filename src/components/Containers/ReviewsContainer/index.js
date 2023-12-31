import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, RefreshControl } from 'react-native';
import { Fonts } from '../../../assets/fonts';
import { generalImages, icons } from '../../../assets/images';
import { vh, vw } from '../../../units';
import theme from '../../../utils/theme';
import TextWrapper from '../../TextWrapper';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import SubmitButton from '../../Buttons/SubmitButton';
import { useCreateReviewHook } from '../../../hooks/useCreateReviewHook';
import { useSelector } from 'react-redux';
import { showToast } from '../../../redux/Api/HelperFunction';
import { FlatList } from 'react-native';
import { useListReviewsHook } from '../../../hooks/useListReviewsHook';
import RenderHtml from 'react-native-render-html';

const ReviewsContainer = props => {
  const user = useSelector(state => state.authReducer?.customer);
  console.log("User --->", user);
  const [review, setReview] = useState();
  const [rating, setRating] = useState();
  const [reviewState, reviewCreateFunc] = useCreateReviewHook();
  const [reviewsListState, reviewsListFunc] = useListReviewsHook();

  const [isLoading, setIsLoading] = useState(false);+

  useEffect(() => {
    reviewsListFunc(props?.productId);
  }, []);

  const getReviews = () => {
    setIsLoading(true);
    reviewsListFunc(props?.productId);
    setIsLoading(false);
  };

  console.log(reviewsListState, 'reviewsListState');

  const handleCreateReview = () => {
    const data = {
      product_id: props.productId,
      review: review,
      reviewer: user?.first_name ? user?.first_name : 'Guest User',
      reviewer_email: user?.email ? user?.email : 'Guest User',
      rating: rating,
    };

    if (!review && !rating) {
      showToast('Enter Review');
    } else {
      reviewCreateFunc(data);
    }
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
            defaultRating={0}
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
        <View style={{marginTop : vh * 1, bottom: 0}}>
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

  const renderReviewItem = ({ item }) => {
    const source = {
      html: item.review,
    };
    const handleReviewAvatar = () => {
      if (props?.data?.reviewer_avatar_urls == null) {
        return generalImages.placeHolderProfileImage;
      } else {
        return { uri: props?.data?.reviewer_avatar_urls[96] };
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
                baseStyle={{ width: 70 * vw }}
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
  // const listReviews = () => {
  //   return (
  //     <FlatList
  //       refreshControl={
  //         <RefreshControl
  //           colors={[theme.defaultInactiveBorderColor]}
  //           tintColor={theme.defaultInactiveBorderColor}
  //           refreshing={isLoading}
  //           onRefresh={() => {
  //             getReviews();
  //           }}
  //         />
  //       }
  //       style={styles.listView}
  //       contentContainerStyle={{ width: vw * 90 , flex: 1}}
  //       data={reviewsListState}
  //       renderItem={renderReviewItem}
  //       ListEmptyComponent={renderEmptyComponent()}
  //       showsVerticalScrollIndicator={false}
  //     />
  //   );
  // };

  return (
<FlatList
        refreshControl={
          <RefreshControl
            colors={[theme.defaultInactiveBorderColor]}
            tintColor={theme.defaultInactiveBorderColor}
            refreshing={isLoading}
            onRefresh={() => {
              getReviews();
            }}
          />
        }
        style={styles.listView}
        contentContainerStyle={{ width: vw * 100 ,   alignItems:'center'}}
        data={reviewsListState}
        renderItem={renderReviewItem}
        ListEmptyComponent={renderEmptyComponent()}
        ListFooterComponent={renderWriteRating()}

        showsVerticalScrollIndicator={false}
      />

  );
};

const styles = StyleSheet.create({
  displayIconStyle: {
    resizeMode: 'contain',
    height: 8 * vh,
    width: 12 * vw,
  },

  noReviewsView: {
    alignSelf: 'center',
    marginTop: 4 * vh,
    marginBottom: 4 * vh,
  },

  displayView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartButton: {
    width: 100 * vw,
    height: 7 * vh,
    borderTopRightRadius: 8 * vw,
    borderTopLeftRadius: 8 * vw,
    backgroundColor: theme.primary,
  
  },

  mainReviewView: {
    height: 13 * vh,
    flexDirection: 'row',
    width: vw * 80,
  },

  nameTextStyle: {
    fontFamily: Fonts.MSW,
    fontSize: 1.8 * vh,
  },

  reviewsDescriptionView: {
    width: 70 * vw,
    fontSize: 1.8 * vh,
    fontFamily: Fonts.SFR,
    color: theme.defaultInactiveBorderColor,
  },

  descriptionContainer: {},

  mainRowView: {
    justifyContent: 'center',
    marginLeft: 5 * vw,
    marginTop: 3 * vh,
  },

  nameView: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  nameWithRatingView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  ratingMainView: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  writeYoursHeadingTextStyle: {
    fontFamily: Fonts.MSW,
    fontSize: 1.8 * vh,
marginLeft: vw * 4

  },

  mainWriteRatingView: {
 
    paddingHorizontal: vw * 3
  },

  textInputView: {
    borderBottomWidth: 0.1 * vw,
    marginTop: 4 * vh,
    marginBottom: 4 * vh
  },

  textInputTextStyle: {
    fontSize: 2 * vh,
    color: theme.defaultInactiveBorderColor,
  },

  writeRatingStyle: {
    marginTop: 2 * vh,
  },

  reviewButtonView: {
    width: 40 * vw,
    marginBottom: 1 * vh,
    backgroundColor:'#4FC6E4'
  },

  listView: {
    flex:1
  },

  scroll: {
    flex: 1,
  },
  content: {
    alignItems: 'center',
  },
});

export default ReviewsContainer;
