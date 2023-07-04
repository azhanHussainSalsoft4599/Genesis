import {StyleSheet} from 'react-native';
import {vw} from '../../../units';

export default styles = StyleSheet.create({
  container: {
    width: vw * 8,
    height: vw * 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    width: vw * 8,
    aspectRatio: 1,
    resizeMode: 'contain',
  
  },
});
