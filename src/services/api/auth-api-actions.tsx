import {AppDispatch, RootState} from 'store';
import {getData, postData, postFormData, putData} from './';
import {URLS} from './api-urls';
import {UTILS} from 'utils';
import {STORAGEKEYS} from 'config/constants';
import {Alert} from 'react-native';
import {
  resetUser,
  setCountries,
  setNotifications,
  setUserInfo,
} from './../../store/reducers/user-reducer';
import {goBack, resetStack} from 'navigation/navigation-ref';
export const getUserInfo = () => {
  return getData(URLS.auth.get_user_info);
};
import axios from 'axios';

export const onLogin = (
  values: any,
  setLoading: (bool: boolean) => void,
  // props: any,
  isBack: boolean,
) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      setLoading(true);
      const res = await postData(URLS.auth.login, values);
      console.log('res of onLogin=>', res);
      await UTILS.setItem(STORAGEKEYS.token, res?.access_token);
      await UTILS.setItem(STORAGEKEYS.user, JSON.stringify(res?.user));
      // const uRes = await getUserInfo();
      // console.log('userinfo', uRes);
      dispatch(setUserInfo(res?.user));
      if (isBack) {
        goBack();
      } else {
        resetStack('Drawer');
      }
    } catch (error: any) {
      console.log('error in login', UTILS.returnError(error));
      Alert.alert('', UTILS.returnError(error));
    } finally {
      setLoading(false);
    }
  };
};

export const updateProfile = (
  data: any,
  setProfileBtnLoading: (bool: boolean) => void,
) => {
  // return

  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      setProfileBtnLoading(true);
      const res = await putData(URLS.auth.update_profile, data);
      console.log('res::::', res?.user);
      UTILS.setItem(STORAGEKEYS.user, JSON.stringify(res?.data?.user));
      dispatch(setUserInfo(res?.data.user || []));
    } catch (error: any) {
      console.log('error in updateProfile', UTILS.returnError(error));
      Alert.alert('', UTILS.returnError(error));
    } finally {
      setProfileBtnLoading(false);
    }
  };
};

// export const onSignup = (
//   values: any,
//   setLoading: (bool: boolean) => void,
//   props: any,
//   setOtpLoading: (bool: boolean) => void,
// ) => {
//   return async (dispatch: AppDispatch, getState: () => RootState) => {
//     try {
//       setLoading(true);
//       const res = await postData(URLS.auth.signup, values);
//       console.log('res of onSignupPress=>', res);
//       setOtpLoading(true);
//     } catch (error: any) {
//       console.log('error in onSignupPress', UTILS?.returnError(error));
//       Alert.alert('', UTILS?.returnError(error));
//     } finally {
//       setLoading(false);
//     }
//   };
// };
export const onLogoutPress = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      // await logout();
      await UTILS.clearStorage();
      dispatch(resetUser(null));

      resetStack('Splash');
    } catch (error: any) {
      console.log('error in onDeleteTask', UTILS.returnError(error));
      Alert.alert('', UTILS.returnError(error));
    }
  };
};

export const onSignup = (values: any) => postData(URLS.auth.signup, values);

export const onVerifyOtp = (values: any) =>
  getData(
    `${URLS.auth.verify_otp}?email=${values?.email}&otp=${values?.otp}&type=User`,
  );

export const onForgot = async (values: any) => {
  try {
    const res = await getData(
      `${URLS.auth.forgot_password}?email=${values?.email}&type=User`,
      // values,
    );
    console.log('res of onforgot=>', res);

    return res;
  } catch (error: any) {
    console.log('error in forgot password', UTILS.returnError(error));
    Alert.alert('', UTILS.returnError(error));
  }
};

export const onUpdatePassword = async (values: any) => {
  try {
    const res = await postData(URLS.auth.update_password, values);
    console.log('res of updateapssword=>', res);
    
    return res;
  } catch (error: any) {
    console.log('error in updateapssword', UTILS.returnError(error));
    Alert.alert('', UTILS.returnError(error));
  }
};
export const getCountryCode = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const {userInfo} = getState()?.user;
      const res = await getData(URLS.auth.create_user);
      const codeObj = res?.country_codes;
      const newList = Object.keys(codeObj)?.map(x => ({
        code: x,
        ...codeObj[x],
      }));
      if (userInfo?.id) {
        let copy = [...newList];
        copy = copy?.map(x => ({
          ...x,
          selected: x?.phone_code == userInfo?.country_code,
        }));
        dispatch(setCountries(copy));
      } else {
        dispatch(setCountries(newList));
        console.log('newList:::', newList);
      }
    } catch (error) {
      console.log('error', UTILS.returnError(error));
      Alert.alert('Error', UTILS.returnError(error));
    }
  };
};
export const onPostLocation = (values: any) =>
  postData(URLS.auth.post_location, values);

export const getDashbaord = async (slug: string) => {
  try {
    const res = await getData(URLS.auth.get_home_data);

    return res;
  } catch (error) {
    console.log('error', UTILS.returnError(error));
    Alert.alert('Error', UTILS.returnError(error));
  }
};
export const getHomeBanner = async (slug: string) => {
  try {
    const res = await getData(URLS.auth.get_home_banner);
    return res;
  } catch (error) {
    console.log('error', UTILS.returnError(error));
    Alert.alert('Error', UTILS.returnError(error));
  }
};

export const getDistance = async (
  lat1: any,
  lat2: any,
  lon1: any,
  lon2: any,
) => {
  console.log('lat1, lat2, lon1, lon2', lat1, lat2, lon1, lon2);

  try {
    var km = 1;
    let time = 0;
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${lat1},${lon1}&destinations=${lat2},${lon2}&key=AIzaSyCbFQqjZgQOWRMuQ_RpXU0kGAUIfJhDw98`,
    );
    if (response?.data?.status === 'OK') {
      console.log('Distance is ');
      km = response?.data?.rows[0]?.elements[0]?.distance?.value / 1000;
      time = response?.data?.rows[0]?.elements[0]?.duration?.text;
    }
    return {km, time};
  } catch (error) {
    throw new Error(UTILS.returnError(error));
  }
};

export const postDropDown = (id: any, values: any) =>
  postData(`${URLS.app.post_fillstore}${id}`, values);
export const getOrderList = (status: any) =>
  getData(`${URLS.app.get_orderlist}?status=${status}`);
export const getOrderDetails = (orderId: any) =>
  getData(`${URLS.app.get_order_details}?service_id=${orderId}`);

export const uploadImage = (data: any, setLoading: (bool: boolean) => void) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      setLoading(true);
      const res = await postFormData(URLS.auth.uploadImage, data);
      // console.log('res check image===>',res?.data);
      // return
      
      UTILS.setItem(STORAGEKEYS.user, JSON.stringify(res?.data?.user));
      dispatch(setUserInfo(res?.data?.user || []));
    } catch (error: any) {
      console.log('error in updateProfile', UTILS.returnError(error));
      Alert.alert('', UTILS.returnError(error));
    } finally {
      setLoading(false);
    }
  };
};

export const getNotifications = (setLoading: (bool: boolean) => void) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      setLoading(true);
      const res = await getData(URLS.notification.get_notification);
      dispatch(setNotifications(res?.notifications || []));
    } catch (error: any) {
      console.log('error in notification', UTILS.returnError(error));
      Alert.alert('', UTILS.returnError(error));
    } finally {
      setLoading(false);
    }
  };
};
export const onReadNotification = async (notification_id: any) => {
  try {    
    const res = await getData(
      `${URLS.notification.read_notification}?notification_id=${notification_id} `,
    );
    return res;
  } catch (error) {
    console.log('error in read notification', UTILS.returnError(error));
    Alert.alert('', UTILS.returnError(error));
  }
};

export const ratingDriver = (values: any) =>
  postData(URLS.app.driver_review, values);
export const updatePassword = (values: any) =>
  postData(URLS.auth.update_password, values);
export const getPrivacy = () => getData(URLS.auth.get_privacy);
export const getTermsAndCondition = () => getData(URLS.auth.get_term);
export const getContactUs = () => getData(URLS.auth.get_contactUs);
export const getTracking = (orderId: any) =>
  getData(`${URLS.auth.get_tracking}?order_id=${orderId}`);
