import React from 'react';
import {Text, View, Modal, Image, TouchableOpacity} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {vh, vw} from '../../../units/index';
import {icons} from '../../../assets/images/index';
import TextWrapper from '../../TextWrapper/index';
import SubmitButton from '../../Buttons/SubmitButton/index';
import styles from './styles';
import {useDeleteFromCartHook} from '../../../hooks/useDeleteFromCartHook';

const RemoveProductAlert = props => {
  const [removeCartItemState, removeFromCartFunc] = useDeleteFromCartHook();
  return (
    <Modal
    transparent={true}
    visible={props.visibility ? props.visibility : false}
    style={{flex: 1}}>
    <BlurView style={styles.blurViewStyle} blurType="dark" blurAmount={40} />
    <View style={styles.alertMainView}>
      <TouchableOpacity
        style={styles.crossIconView}
        onPress={props?.noButtonOnPress}>
        {/* <Image source={icons.cross} style={styles.crossIconStyle} /> */}
      </TouchableOpacity>

      <View style={styles.checkIconView}>
        <Image source={icons.questionMark} style={styles.checkIconStyle} />

        <TextWrapper
          numberOfLines={3}
          style={styles.customAlertHeadingTextStyle}>
          Are you sure you want to remove product from the cart?
        </TextWrapper>

        <View style={styles.choiceButtonView}>
          <SubmitButton
            title="YES"
            style={styles.yesButtonView}
            textStyle={styles.yesTextStyle}
            onPress={() => {
              removeFromCartFunc(props?.deleteItem);
              setTimeout(() => {
                props?.noButtonOnPress();
              }, 200);
            }}
          />

          <SubmitButton
            title="NO"
            onPress={props?.noButtonOnPress}
            style={styles.noButtonView}
            textStyle={styles.noTextStyle}
          />
        </View>
      </View>
    </View>
  </Modal>
  );
};

export default RemoveProductAlert;
