import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BasketScreen from '../screens/General/BasketScreen';
import CheckoutScreen from '../screens/General/CheckoutScreen';
import OrderAcceptedScreen from '../screens/General/OrderAcceptedScreen';
import EditCardsScreen from '../screens/General/EditCardsScreen';
import ProductsScreen from '../screens/General/ProductsScreen';
import GeneralStack from './GeneralStack';
import NavigtaionOptions from './NavigationOptions';

function CartStack() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={NavigtaionOptions}>
      <Stack.Screen
        name="BasketScreen"
        component={BasketScreen}
      />

      <Stack.Screen
        name="CheckoutScreen"
        component={CheckoutScreen}
      />

      <Stack.Screen
        name="OrderAcceptedScreen"
        component={OrderAcceptedScreen}
      />

      <Stack.Screen
        options={{headerShown: false}}
        name="EditCardsScreen"
        component={EditCardsScreen}
      />

      <Stack.Screen
        options={{headerShown: false}}
        name="GeneralStack"
        component={GeneralStack}
      />

      <Stack.Screen
        options={{headerShown: false}}
        name="ProductsScreen"
        component={ProductsScreen}
      />
    </Stack.Navigator>
  );
}

export default CartStack;
