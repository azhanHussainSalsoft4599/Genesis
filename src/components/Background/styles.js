import {StyleSheet} from 'react-native';
import {vh, vw} from '../../units';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: vw * 100,
  },
  contentContainer: {
    width: vw * 100,
    height: vh * 100,
  },
  scrollContainer: {
    flex: 1,
  },
});

export default styles;
