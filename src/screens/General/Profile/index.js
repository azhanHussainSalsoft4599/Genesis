import React, {useState} from 'react';
import {
  View,
  RefreshControl,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import styles from './styles';
// import GradientButton from '../../../components/Buttons/GradientButton';
import TextWrapper from '../../../components/TextWrapper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import {useFetchProfileHook} from '../../../hooks/useFetchProfileHook';
import {vh, vw} from '../../../units';
import {getProfileDetails} from '../../../redux/actions/profileActions';
import {showToast} from '../../../redux/Api/HelperFunction';
import theme from '../../../utils/theme';
import SearchHeader from '../../../components/Headers/SearchHeader';
import {deleteUser} from '../../../redux/actions/authActions';
import SubmitButton from '../../../components/Buttons/SubmitButton';
import {icons} from '../../../assets/images';
import {DrawerActions} from '@react-navigation/native';

const Profile = props => {
  const [isVisible, setIsVisible] = useState(false);
  const user = useSelector(state => state.authReducer?.customer);
  console.log('user ====>', user?.username);
  const [, profileFunc] = useFetchProfileHook();
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();

  const onRefresh = () => {
    if (!refreshing) {
      setRefreshing(true);
      try {
        dispatch(getProfileDetails(user?.id, setRefreshing))
          .then(res => {
            setRefreshing(false);
          })
          .catch(err => {
            setRefreshing(false);
            showToast(error);
          });
      } catch (error) {
        setRefreshing(false);
        showToast(error);
      }
    }
  };

  const handleDeleteUser = () => {
    try {
      dispatch(deleteUser(user?.user?.userDetails?.id));
    } catch (error) {
      showToast(error);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}>
      {/* <SearchHeader
        style={styles.headerStyle}
        type="drawer"
        title="Privacy Policy"
      /> */}
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: 80 * vw,
          alignSelf: 'center',
          height: 85 * vh,
        }}>
        <View style={styles.contactUsScreenIconView}>
          <TouchableOpacity
            onPress={() =>
              props.navigation.dispatch(DrawerActions.toggleDrawer())
            }
            style={styles.leftArrowIconButton}>
            <Image source={icons.drawer} style={styles.leftArrowIconStyle} />
          </TouchableOpacity>
          <TextWrapper style={styles.welcomeBackTextStyle}>Profile</TextWrapper>
        </View>
        <View style={styles.subContainer}>
          <View>
            <KeyboardAwareScrollView
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  titleColor={theme.primary}
                  colors={[theme.primary]}
                />
              }
              contentContainerStyle={{flexGrow: 1}}>
              <View style={{width: vw * 85}}>
                <View style={styles.inputView}>
                  <View style={styles.inputRow}>
                    <View
                      style={[styles.inputBox, {flex: 1, marginTop: vh * 2}]}>
                      <TextWrapper style={styles.inputText}>
                        {'First Name'}
                      </TextWrapper>
                      <TextWrapper
                        style={[styles.textInput, {marginRight: vw * 5}]}>
                        {user?.first_name ? user?.first_name : ''}
                      </TextWrapper>
                    </View>
                    <View
                      style={[styles.inputBox, {flex: 1, marginTop: vh * 2}]}>
                      <TextWrapper style={styles.inputText}>
                        {'Last Name'}
                      </TextWrapper>
                      <TextWrapper style={[styles.textInput]}>
                        {user?.last_name ? user?.last_name : ''}
                      </TextWrapper>
                    </View>
                  </View>
                  <View style={styles.inputRow}>
                    <View
                      style={[styles.inputBox, {flex: 1, marginTop: vh * 2}]}>
                      <TextWrapper style={styles.inputText}>
                        {'UserName'}
                      </TextWrapper>
                      <TextWrapper style={[styles.textInput]}>
                        {user?.username ? user?.username : ''}
                      </TextWrapper>
                    </View>
                    <View
                      style={[styles.inputBox, {flex: 1, marginTop: vh * 2}]}>
                      <TextWrapper style={styles.inputText}>
                        {'Email'}
                      </TextWrapper>
                      <TextWrapper style={[styles.textInput]}>
                        {user?.email ? user?.email : ''}
                      </TextWrapper>
                    </View>
                  </View>
                </View>
                <View style={styles.button}>
                  {/* <GradientButton
                  style={styles.btn}
                  textStyle={styles.btnText}
                  text={'Edit Profile'}
                  onPress={() => props.navigation.navigate('EditProfileScreen')}
                />
                <GradientButton
                  style={[styles.deleteBtn, {width: '80%'}]}
                  textStyle={styles.btnText}
                  text={'Request Delete Account'}
                  colors={[theme.red, theme.red]}
                  onPress={() =>
                    props.navigation.navigate('RequestDeleteScreen')
                  }
                /> */}
                  <SubmitButton
                    onPress={() => props.navigation.navigate('EditProfile')}
                    title="Edit Profile"
                    style={styles.deleteBtn}
                  />
                  <SubmitButton
                    onPress={() =>
                      props.navigation.navigate('RequestDeleteScreen')
                    }
                    title="Request Delete Account"
                    style={styles.deleteBtn}
                  />
                </View>
              </View>
            </KeyboardAwareScrollView>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;
