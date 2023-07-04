import React, {useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';
import InputField from '../../../components/InputField';
import styles from './styles';
// import GradientButton from '../../../components/Buttons/GradientButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {showToast} from '../../../redux/Api/HelperFunction';
import {useFetchProfileHook} from '../../../hooks/useFetchProfileHook';
import {updateProfileDetails} from '../../../redux/actions/profileActions';
import {vh, vw} from '../../../units';
import SearchHeader from '../../../components/Headers/SearchHeader';
import theme from '../../../utils/theme';
import {Fonts} from '../../../assets/fonts';
import SubmitButton from '../../../components/Buttons/SubmitButton';
import {validateAlphabetsOnly} from '../../../utils/validation';

const EditProfile = props => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.authReducer?.customer);

  const [profileState, profileFunc] = useFetchProfileHook();
  const [firstName, setFirstName] = useState(
    profileState?.first_name ? profileState?.first_name : '',
  );
  console.log('Porfile State ==========>', profileState);
  const [lastName, setLastName] = useState(
    profileState?.last_name ? profileState?.last_name : '',
  );

  useFocusEffect(
    useCallback(() => {
      profileFunc(user?.id);
    }, []),
  );

  useEffect(() => {
    setFirstName(profileState?.first_name ? profileState?.first_name : '');
    setLastName(profileState?.last_name ? profileState?.last_name : '');
  }, [profileState]);

  console.log({details: user});

  const handleUpdate = () => {
    if (firstName === '' || lastName === '') {
      showToast('Fields are empty');
    } else if (validateAlphabetsOnly(firstName) != true) {
      showToast('Please Enter valid first name');
    } else if (validateAlphabetsOnly(lastName) != true) {
      showToast('Please Enter valid last name');
    } else {
      try {
        dispatch(
          updateProfileDetails(user?.id, {
            first_name: firstName,
            last_name: lastName,
          }),
        ).then(res => {
          profileFunc(user?.id);
          props.navigation.goBack();
        });
      } catch (error) {
        showToast(error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={{flex: 1}}>
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1}}>
            <View style={styles.contentContainer}>
              <View style={styles.inputView}>
                <View style={styles.inputRow}>
                  <InputField
                    text={'First Name '}
                    placeholderTextColor={'#666666'}
                    placeholder="Enter First Name"
                    value={firstName}
                    viewStyle={{flex: 1}}
                    // onChangeText={setCity}
                    style={{marginRight: vw * 5}}
                    autoCapitalize="none"
                    onChangeText={setFirstName}
                    asteric
                    inputText={{
                      fontFamily: Fonts.OB,
                    }}
                  />
                  <InputField
                    text={'Last Name '}
                    placeholderTextColor={'#666666'}
                    placeholder="Enter Last Name"
                    value={lastName}
                    viewStyle={{flex: 1}}
                    // onChangeText={setCity}
                    autoCapitalize="none"
                    onChangeText={setLastName}
                    asteric
                    inputText={{
                      fontFamily: Fonts.OB,
                    }}
                  />
                </View>
              </View>
              <View style={styles.button}>
                {/* <GradientButton
                  style={styles.btn}
                  textStyle={styles.btnText}
                  text={'Update'}
                  onPress={handleUpdate}
                /> */}
                <SubmitButton
                  onPress={handleUpdate}
                  title="Update"
                  style={styles.btn}
                />
              </View>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </View>
    </View>
  );
};

export default EditProfile;
