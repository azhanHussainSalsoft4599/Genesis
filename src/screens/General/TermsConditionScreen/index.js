import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import RenderHtml from 'react-native-render-html';
import ScrollWrapper from '../../../components/Containers/ScrollWrapper';
import TextWrapper from '../../../components/TextWrapper';
import SearchHeader from '../../../components/Headers/SearchHeader';
import {WebView} from 'react-native-webview';

import styles from './styles';
import {vh, vw} from '../../../units';
import MainContainer from '../../../components/Containers/MainContainer';
import {termsConditionAction} from '../../../redux/actions/authActions';
import {useDispatch} from 'react-redux';
import theme from '../../../utils/theme';

const TermsConditionScreen = props => {
  const dispatch = useDispatch();
  const [terms, setTerms] = useState('');

  useEffect(() => {
    dispatch(termsConditionAction()).then(response => {
      setTerms(response?.description);
    });
  });

  const renderOrderAcceptedView = () => {
    return (
      <View style={styles.mainView}>
        <View style={styles.contentViewStyle}>
          <TextWrapper style={styles.descriptionContentView} numberOfLines={400}>
            {terms}
          </TextWrapper>
        </View>
      </View>
    );
  };
  const source = {
    html: terms,
  };
  return (
    <ScrollWrapper style={styles.scroll} contentContainerStyle={styles.content}>
 
     <View style={{backgroundColor:theme.whiteBackground, width: vw * 100, alignItems:'center'}}>
        <RenderHtml
          baseStyle={{
            width: 90 * vw,
            color: 'rgba(0,0,0,0.6)',
            textAlign: 'justify',
          }}
          contentWidth={60 * vw}
          source={source}
        />
      </View>
    </ScrollWrapper>
  );
};
export default TermsConditionScreen;
