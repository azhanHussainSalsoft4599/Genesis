import {useState, useCallback} from 'react';
import {userLogin} from '../../redux/actions/authActions';
import {useDispatch} from 'react-redux';
import {showToast} from '../../redux/Api/HelperFunction';
import {useNavigation} from '@react-navigation/native';
import {forgotPasswordEmail} from '../../redux/actions/authActions';
import {validateEmail} from '../../utils/validation';

export const useForgotPasswordHook = () => {
  const dispatch = useDispatch();
  const [forgotPasswordEmailState, setForgotPasswordEmailState] = useState();

  const forgotPasswordEmailFunc = useCallback(data => {
    try {
      if (data?.email == '') {
        showToast('Please Enter Email Address');
        return;
      }
      if (validateEmail(data?.email) != true) {
        showToast('Please enter a valid email');
        return;
      }

      dispatch(forgotPasswordEmail(data)).then(res => {
        console.log('REs ==========>', res);
        showToast(res?.message);
        setForgotPasswordEmailState(res);
      });
    } catch (error) {
      showToast(error);
    }
  }, []);
  return [forgotPasswordEmailState, forgotPasswordEmailFunc];
};
