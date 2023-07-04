import React, {useEffect} from 'react';
import {View, ImageBackground, TouchableOpacity, Image} from 'react-native';

import TextWrapper from '../../../components/TextWrapper';

import styles from './styles';

import SearchHeaderWithBackground from '../../../components/Headers/SearchHeaderWithBackground';
import MainContainer from '../../../components/Containers/MainContainer';

import {useAboutUsHook} from '../../../hooks/useAboutUsHook';
import RenderHTML from 'react-native-render-html';
import {vw} from '../../../units';
import ScrollWrapper from '../../../components/ScrollWrapper';
import {generalImages, icons} from '../../../assets/images';
import {DrawerActions} from '@react-navigation/native';

const AboutUsScreen = props => {
  const [aboutUsState, aboutUsFunc] = useAboutUsHook();
  useEffect(() => {
    aboutUsFunc();
  }, []);

  const source = {
    html: aboutUsState,
  };
  console.log(aboutUsState, 'aboutUsFunc');
  const renderContent = () => {
    return (
      <View style={styles.contentView}>
        <View style={styles.contentViewStyle}></View>
      </View>
    );
  };
  // options={{headerTransparent: true}}

  return (
    <ScrollWrapper style={styles.scroll} contentContainerStyle={styles.content}>
      <RenderHTML
        baseStyle={{
          width: 90 * vw,
          color: 'rgba(0,0,0,0.6)',
          textAlign: 'justify',
        }}
        contentWidth={60 * vw}
        source={source}
      />
    </ScrollWrapper>
  );
};
export default AboutUsScreen;
