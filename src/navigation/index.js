import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainNavigator from './MainNavigator';

function Navigation() {

  return (

    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>

  );
}

export default Navigation;
