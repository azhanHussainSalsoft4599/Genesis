import * as React from 'react';
import { Easing } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import CategoryScreen from '../screens/General/CategoryScreen';
import ProductsScreen from '../screens/General/ProductsScreen';
import GeneralStack from './GeneralStack';
import NavigtaionOptions from './NavigationOptions';

function CatgoriesStack() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName='CategoryScreen' screenOptions={NavigtaionOptions}>
      <Stack.Screen
        name="CategoryScreen"
        component={CategoryScreen}
      />

      <Stack.Screen
        name="ProductsScreen"
        component={ProductsScreen}
      />
    </Stack.Navigator>
  );
}

export default CatgoriesStack;
