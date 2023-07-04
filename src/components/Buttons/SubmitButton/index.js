import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import TextWrapper from '../../TextWrapper';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';

const SubmitButton = props => {
  return (
    <LinearGradient
      start={{x: 0.2, y: 0.4}}
      end={{x: 0.6, y: 0.5}}
      colors={props?.tranparent ? ['#FFFF', '#FFFF'] : ['#3CBEA0', '#1ECEE6']}
      style={[styles.touchableButtonStyle, props.style]}>
      <TouchableOpacity
        style={{
          height: '100%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        disabled={props.disabled ? props.disabled : false}
        onPress={props.onPress}>
        <TextWrapper style={[styles.titleTextStyle, props.textStyle]}>
          {props.title}
        </TextWrapper>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default SubmitButton;
