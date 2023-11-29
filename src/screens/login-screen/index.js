import messaging from '@react-native-firebase/messaging';
import * as IMG from 'assets/images';
import {PrimaryButton} from 'components/atoms/buttons';
import PrimaryInput from 'components/atoms/inputs';
import {KeyboardAvoidScrollview} from 'components/atoms/keyboard-avoid-scrollview/index';
import OtpModal from 'components/molecules/modals/otp-modal';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {Formik} from 'formik';
import {useAppDispatch} from 'hooks/use-store';
import {navigate} from 'navigation/navigation-ref';
import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {onLogin} from 'services/api/auth-api-actions';
import i18n from 'translation';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import {signinFormValidation} from 'validations';
import {requestNotifications} from 'react-native-permissions';
import styles from './styles';
const LoginScreen = props => {
  const isBack = props?.route?.params?.isBack ?? {isBack: false};
  const dispatch = useAppDispatch();
  const {t} = i18n;
  const [otpModalVisible, setOtpModalVisible] = React.useState(false);
  const [value, setValue] = React.useState('');
  const initialValues = {
    email: '',
    password: '',
    fcm_token: '123456',
    type: 'User',
  };
  const [loading, setLoading] = React.useState(false);
  async function checkApplicationPermission() {
    const authorizationStatus = await messaging().requestPermission();

    if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
      console.log('User has notification permissions enabled.');
      return true;
    } else if (
      authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL
    ) {
      console.log('User has provisional notification permissions.');
      return true;
    } else {
      console.log('User has notification permissions disabled');
      return false;
    }
  }
  React.useEffect(() => {
    async function requestPermission() {
      const result = await requestNotifications(['alert', 'sound', 'badge']);
      if (result.status === 'granted') {
        // Notifications allowed
      } else {
        // Notifications not allowed
      }
    }

    requestPermission();
  }, []);
  const handleFormSubmit = async values => {
    try {
      // setLoading(true)
      await checkApplicationPermission();
      let fcmToken = '12345';
      try {
        fcmToken = await messaging().getToken();
      } catch (error) {
        console.log('fcm token error', error);
      }
      dispatch(
        dispatch(onLogin({...values, fcm_token: fcmToken}, setLoading, isBack)),
      );
    } catch (error) {
      console.log('error=>', error);
    }finally{
      // setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <Image
        resizeMode="cover"
        source={IMG.signupheader}
        style={styles.imagebackground}
      />
      <View style={styles.loginlogoview}>
        <Image
          source={IMG.loginimg}
          resizeMode="cover"
          style={{width: mvs(200), height: mvs(160)}}
        />
      </View>

      <View style={styles.contentContainerStyle}>
        <View style={styles.contentContainerStyleNew}>
          <KeyboardAvoidScrollview
            contentContainerStyle={styles.keyboradscrollcontent}>
            <View style={styles.lottieview}>
              <Medium
                label={t('login')}
                fontSize={mvs(16)}
                color={colors.black}
              />
            </View>
            <Bold
              label={t('login_to_movers')}
              color={colors.bluecolor}
              fontSize={mvs(16)}
              style={styles.loginmoverstext}
            />
            <Formik
              initialValues={initialValues}
              validationSchema={signinFormValidation}
              onSubmit={handleFormSubmit}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                touched,
                values,
                errors,
              }) => (
                <>
                  {console.log('errror2', errors)}
                  <PrimaryInput
                    keyboardType={'email-address'}
                    error={touched?.email ? t(errors.email) : ''}
                    placeholder={t('email')}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                  />
                  <PrimaryInput
                    isPassword
                    error={touched?.password ? t(errors.password) : ''}
                    placeholder={t('password')}
                    // label={t('password')}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    containerStyle={{marginBottom: 0}}
                    errorStyle={{marginBottom: 0}}
                  />
                  <TouchableOpacity
                    style={styles.forgotpasswordview}
                    onPress={() => navigate('ForgotPasswordScreen')}>
                    <Medium
                      label={t('forgot_password?')}
                      style={{textDecorationLine: 'underline'}}
                      color={colors.bluecolor}
                    />
                  </TouchableOpacity>
                  <PrimaryButton
                    containerStyle={{
                      borderRadius: mvs(10),
                    }}
                    loading={loading}
                    onPress={handleSubmit}
                    title={t('login')}
                  />
                  <View style={styles.createaccountview}>
                    <Medium label={t('or_create_a_new_account')} />
                  </View>

                  <PrimaryButton
                    containerStyle={styles.signupbuttoncontainer}
                    onPress={() => navigate('Signup')}
                    title={t('sign_up')}
                  />
                </>
              )}
            </Formik>

            <OtpModal
              onClose={() => setOtpModalVisible(false)}
              visible={otpModalVisible}
              setValue={setValue}
              value={value}
            />
          </KeyboardAvoidScrollview>
        </View>
      </View>
    </View>
  );
};
export default LoginScreen;
