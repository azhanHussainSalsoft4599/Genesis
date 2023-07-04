import React, {useCallback} from 'react';
import {View, TouchableOpacity, Image, FlatList} from 'react-native';
import {icons} from '../../../assets/images';

import TextWrapper from '../../../components/TextWrapper';

import CartContainer from '../../../components/Containers/CartContainer';

import styles from './styles';

import {useListWishlistHook} from '../../../hooks/useListWishlistHook';
import {useFocusEffect} from '@react-navigation/core';

import {useSelector} from 'react-redux';
import {vh, vw} from '../../../units';

import {DrawerActions, useNavigation} from '@react-navigation/native';

import ProductsContainer from '../../../components/Containers/ProductsContainer';
import MainContainer from '../../../components/Containers/MainContainer';
import theme from '../../../utils/theme';

const WishlistScreen = props => {
  const navigation = useNavigation();
  const wishlistItems = useSelector(
    state => state.wishlistReducer.wishlistItems,
  );

  const [wishlistProductsState, listWishlistProductFunc] =
    useListWishlistHook();
  useFocusEffect(
    useCallback(() => {
      listWishlistProductFunc(wishlistItems);
    }, [wishlistItems]),
  );
  React.useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => {
        return (
          <View style={styles.searchIconsView}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('TypeSearchScreen')}
              style={styles.searchIconButtonView}>
              <Image
                style={[
                  styles.searchIconStyle,
                  // { tintColor: wishlistadded ?  theme.red : theme.black },
                ]}
                source={icons.search}
              />
            </TouchableOpacity>
          </View>
        );
      },
    });
  });
  const renderSearchHeader = () => {
    return (
      <View style={styles.searchView}>
        <View style={styles.rowContainer}>
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            style={styles.leftArrowIconButton}>
            <Image source={icons.drawer} style={styles.leftArrowIconStyle} />
          </TouchableOpacity>
          <TextWrapper style={styles.searchTextStyle}>WishList</TextWrapper>

          {/* <View style={styles.searchIconsView}>
            <TouchableOpacity style={styles.searchIconButtonView}>
              <Image
                style={[
                  styles.searchIconStyle,
                  {tintColor: theme.whiteBackground},
                ]}
                source={icons.search}
              />
            </TouchableOpacity>
          </View> */}
        </View>
      </View>
    );
  };

  const renderListView = ({item}) => {
    return (
      <View>
        {/* <CartContainer filled={true} data={item} /> */}
        <ProductsContainer filled={true} data={item} />
      </View>
    );
  };

  const renderListEmptyComponent = () => {
    return (
      <View style={styles.listEmptyComponentView}>
        <TextWrapper style={{color: theme.black}}>
          No Items are available
        </TextWrapper>
      </View>
    );
  };

  const renderWishFlatList = () => {
    return (
      <View
        style={{
          // height: vh * 100,
          // borderTopRightRadius: vh * 10,
          backgroundColor: theme.whiteBackground,
          // paddingTop: vh * 2,
        }}></View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.whiteBackground,
        alignItems: 'center',
      }}>
      <FlatList
        data={wishlistProductsState}
        renderItem={renderListView}
        contentContainerStyle={{paddingBottom: vh * 35}}
        style={styles.listView}
        ListEmptyComponent={renderListEmptyComponent}
        numColumns={2}
        keyExtractor={(item, index) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
export default WishlistScreen;
