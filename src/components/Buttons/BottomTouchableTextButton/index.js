import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import theme from '../../../utils/theme';
import TextWrapper from '../../TextWrapper';
import styles from './styles';

const BottomTouchableTextButton = props => {
  return (
    <View style={styles.mainView}>
      {props.type === 'account' ? (
        <View>
          <TextWrapper style={styles.textAccountStyle}>
            {props.value
              ? `Already Have An Account ?`
              : `Don't Have An Account ?`}
          </TextWrapper>
        </View>
      ) : null}

      {props.type === 'back' ? (
        <View>
          <TextWrapper style={styles.backToTextStyle}>Back To </TextWrapper>
        </View>
      ) : null}

      <TouchableOpacity
        onPress={props.onPress}
        style={styles.touchableTextView}>
        <TextWrapper
          style={[
            props.customTextStyle ? props.customTextStyle : styles.textStyle,
            props.source == 'forgot'
              ? {
                  color: theme.primary,
                }
              : {
                  textDecorationLine: 'none',
                },
            props.type !== 'back' ? styles.margin : {},
          ]}>
          {props.title}
        </TextWrapper>
      </TouchableOpacity>
    </View>
  );
};

export default BottomTouchableTextButton;
