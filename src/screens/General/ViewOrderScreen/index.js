import React, { useCallback , useE} from 'react';
import { Text, View, FlatList, ActivityIndicator } from 'react-native';
import ViewOrderCard from '../../../components/ViewOrderCard';
import styles from './styles';
import { vh, vw } from '../../../units';
import { useOrdersListHook } from '../../../hooks/useOrdersHook';
import { useSelector } from 'react-redux';
import SearchHeader from '../../../components/Headers/SearchHeader';
import theme from '../../../utils/theme';
import TextWrapper from '../../../components/TextWrapper';
import { useFocusEffect } from '@react-navigation/native';

const ViewOrderScreen = ({ navigation }) => {
  const user = useSelector(
    state => state.authReducer?.user,
  );

console.log("User from get Order  ========>", user);
  const [ordersListState, ordersListFunc] = useOrdersListHook();

  useFocusEffect(
    useCallback(() => {
      ordersListFunc(user);
    }, []),
  );


  const _listEmptyComponent = () => {
    return (
      <View
        style={{
          height: vh * 80,
          width: vw * 100,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TextWrapper style={{color: theme.black}}>No Orders Found</TextWrapper>
      </View>
    );
  };
  const renderItem = ({ item, index }) => {
    return (
      <ViewOrderCard
        data={item}
        index={index}
        onPress={() =>
          navigation.navigate('OrderStack', {
            screen: 'OrderDetailsScreen',
            params: { orderDetails: item },
          })
        }
      />
    );
  };
  return (
    <View style={styles.mainViewOrderScreenStyle}>
      <FlatList
        data={ordersListState}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={_listEmptyComponent}
        showsVerticalScrollIndicator={false}
contentContainerStyle={{paddingBottom: vh * 5}}
/>
    </View>
  );
};
export default ViewOrderScreen;
