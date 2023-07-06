import React, {useState} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
import {vh, vw} from '../../units';

import TextWrapper from '../TextWrapper';
import LinearGradient from 'react-native-linear-gradient';
import theme from '../../utils/theme';

const RadioPaymentButton = props => {
  const [value, setValue] = useState(props.radioVal);

  return (
    <LinearGradient
      start={{x: 0.2, y: 0.4}}
      end={{x: 0.6, y: 0.5}}
      colors={
        props.radioVal === props.uniqKey
          ? ['#3CBEA0', '#1ECEE6']
          : ['#FFFF', '#FFFF']
      }
      style={[
        styles.container,
        {
          borderColor:
            props.radioVal === props.uniqKey ? theme.primary : theme.grayColor,
        },
      ]}>
      <TouchableOpacity
        style={styles.subContainer}
        onPress={() => props.setRadioVal(props.uniqKey)}>
        <View style={styles.imgView}>
          <Image source={props.icon} style={styles.img} />
        </View>
        <TextWrapper
          style={
            props.radioVal === props.uniqKey
              ? styles.activeRadioText
              : styles.radioText
          }>
          {props.text}
        </TextWrapper>
      </TouchableOpacity>
      {/* <TouchableOpacity
        style={styles.radioCircle}
        onPress={() => props.setRadioVal(props.uniqKey)}>
        {/* {props.radioVal === props.uniqKey && <View style={styles.selectedRb} />} */}
      {/* </TouchableOpacity>  */}
    </LinearGradient>
  );
};

export default RadioPaymentButton;
