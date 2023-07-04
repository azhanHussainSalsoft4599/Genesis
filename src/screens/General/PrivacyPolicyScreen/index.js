import React, {useState, useEffect} from 'react';
import {View, ScrollView} from 'react-native';
import RenderHtml from 'react-native-render-html';
import ScrollWrapper from '../../../components/Containers/ScrollWrapper';
import TextWrapper from '../../../components/TextWrapper';
import SearchHeader from '../../../components/Headers/SearchHeader';
import {WebView} from 'react-native-webview';

import styles from './styles';
import {vh, vw} from '../../../units';
import MainContainer from '../../../components/Containers/MainContainer';
import {useDispatch} from 'react-redux';
import {privacyPolicyAction} from '../../../redux/actions/authActions';
import theme from '../../../utils/theme';

const TermsConditionScreen = props => {
  const dispatch = useDispatch();
  const [policy, setPolicy] = useState('');

  useEffect(() => {
    dispatch(privacyPolicyAction()).then(response => {
      setPolicy(response?.description);
    });
  });
  const source = {
    html: policy,
  };
  const renderOrderAcceptedView = () => {
    return (
      <ScrollView
        style={styles.mainView}
        contentContainerStyle={{paddingBottom: vh * 35}}>
        <RenderHtml
          baseStyle={{
            width: 90 * vw,
            color: 'rgba(0,0,0,0.6)',
            textAlign: 'center',
          }}
          contentWidth={60 * vw}
          source={source}
        />
      </ScrollView>
    );
  };
  const renderContent = () => {
    return <View style={styles.contentView}></View>;
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
