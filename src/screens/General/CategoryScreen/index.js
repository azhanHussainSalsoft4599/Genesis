import React, {useEffect, useState, useMemo} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {generalImages, icons} from '../../../assets/images';

import ScrollWrapper from '../../../components/Containers/ScrollWrapper';
import TextWrapper from '../../../components/TextWrapper';

import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';

import SearchHeader from '../../../components/Headers/SearchHeader';
import {getProductsCategories} from '../../../redux/actions/productsActions';
import theme from '../../../utils/theme';

import {useDispatch} from 'react-redux';
import {vh, vw} from '../../../units';

const CategoryScreen = props => {
  const dispatch = useDispatch();
  const [pageNo, setPageNo] = useState(1);
  const [categories, setCategories] = useState([]);
  const [fetchMore, setFetchMore] = useState(true);
  const [isloading, setloading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const getData = () => {
    const noloader = false;

    dispatch(getProductsCategories(pageNo, false))
      .then(response => {
        console.log('response from get Data ====>', response);
        setCategories(response);
        setPageNo(pageNo + 1);
        setRefresh(false);
      })
      .catch(err => {
        setRefresh(false);
      });
  };

  useEffect(() => {
    getData();
  }, []);
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
  const handleOnGetCategories = () => {
    if (fetchMore) {
      !isloading && setloading(true);
      // setloading(true)

      dispatch(getProductsCategories(pageNo, true))
        .then(response => {
          if (Array.isArray(response)) {
            console.log('response length ===>', response.length);
            if (response.length == 0) {
              setFetchMore(false);
            }
            setloading(false);
            setPageNo(pageNo + 1);
            // response.length <= 0 && setFetchMore(false);
            const newCategories = [...categories, ...response];
            // response.map((val) => {
            //   newCategories.push(val)
            // })

            setCategories(newCategories); //categories.concat(response)
            // setProductsFetch(true)
          }
        })
        .catch(e => {
          setloading(false);
          console.log(e, 'error');
        });
    }
  };
  console.log('Page no ===========>', pageNo);
  const renderFooter = () => {
    if (isloading) {
      return (
        <View style={{height: vh * 10}}>
          {console.log('Data from Render Footer')}
          <ActivityIndicator size="large" color="#BF47AC" />
        </View>
      );
    } else {
      return null;
    }
  };

  const renderCategoriesView = ({item}) => {
    const handleCategoriesImages = () => {
      if (item?.image == null) {
        return generalImages.placeholderImage;
      } else {
        return {uri: item?.image?.src};
      }
    };
    const handleCategoryPress = () => {
      props.navigation.navigate('ProductsScreen', {
        categoryId: item?.id,
        categoryName: item.name,
      });
    };
    return (
      <TouchableOpacity
        onPress={handleCategoryPress}
        style={[styles.categoryContainer, styles.categoryButton]}>
        <ImageBackground
          source={handleCategoriesImages()}
          style={[styles.categoryContainer, styles.categoryButtonBackground]}
          imageStyle={[
            styles.categoryContainer,
            styles.categoryButtonBackgroundImage,
          ]}>
          <View
            style={[
              styles.categoryContainer,
              styles.categoryButtonContentContainer,
            ]}>
            <TextWrapper style={styles.categoryText} numberOfLines={2}>
              {item.name}
            </TextWrapper>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };
  const refreshHandler = () => {
    setRefresh(true);
    getData();
  };
  return (
    <View style={{flex: 1, alignItems: 'center', paddingTop: vh * 2}}>
      <FlatList
        data={categories}
        initialNumToRender={10}
        renderItem={renderCategoriesView}
        onEndReachedThreshold={0.8}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item.id + index + Math.random()}
        key={'hell'}
        refreshing={isloading}
        onRefresh={handleOnGetCategories}
        onEndReached={handleOnGetCategories}
      />
    </View>
  );
};
export default CategoryScreen;
