import messaging from '@react-native-firebase/messaging';
import * as IMG from 'assets/images';
import {PrimaryButton} from 'components/atoms/buttons';
import PrimaryInput from 'components/atoms/inputs';
import {KeyboardAvoidScrollview} from 'components/atoms/keyboard-avoid-scrollview/index';
import OtpModal from 'components/molecules/modals/otp-modal';
import {colors} from 'config/colors';
import {mvs, width} from 'config/metrices';
import {Formik} from 'formik';
import {useAppDispatch} from 'hooks/use-store';
import {navigate} from 'navigation/navigation-ref';
import React from 'react';
import {Image, ImageBackground, TouchableOpacity, View} from 'react-native';
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
    } finally {
      // setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={IMG.LoginBackgroundNew}
        style={{
          height: '100%',
          width: '100%',
        }}>
        {/* <View style={styles.logobackground}></View> */}
        {/* <Image source={IMG.LoginBackground} style={styles.logobackground} /> */}
        <View style={{alignSelf: 'center'}}>
          <Image
            source={IMG.LoginLogo}
            resizeMode={'contain'}
            style={{
              width: mvs(200),
              height: mvs(200),
              marginTop: '8%',
            }}
          />
        </View>

        <View style={styles.contentContainerStyle}>
          <View style={styles.contentContainerStyleNew}>
            <KeyboardAvoidScrollview
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              contentContainerStyle={styles.keyboardcontentcontainer}>
              <View style={styles.lottieview}>
                <Image
                  source={IMG.Logo}
                  resizeMode={'contain'}
                  style={{width: mvs(120), height: mvs(120)}}
                />
                <Bold
                  label={'Login Account'}
                  color={colors.primary}
                  fontSize={mvs(22)}
                  style={styles.loginmoverstext}
                />
              </View>

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
                  isValid,
                }) => (
                  <>
                    {console.log(errors, isValid, touched)}
                    <PrimaryInput
                      keyboardType={'email-address'}
                      error={touched?.email ? t(errors.email) : ''}
                      placeholder={t('email')}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                      containerStyle={{
                        borderRadius: mvs(8),
                        borderWidth: 1,
                        borderColor: colors.gray,

                        shadowColor: '#000',
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,

                        elevation: 5,
                      }}
                      errorStyle={{marginBottom: mvs(10)}}
                    />
                    <PrimaryInput
                      isPassword
                      error={touched?.password ? t(errors.password) : ''}
                      placeholder={t('password')}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                      containerStyle={{
                        marginBottom: 0,
                        borderRadius: mvs(8),
                        borderWidth: 1,
                        borderColor: colors.gray,
                        shadowColor: '#000',
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,

                        elevation: 5,
                      }}
                      errorStyle={{marginBottom: 0}}
                    />
                    <TouchableOpacity
                      style={styles.forgotpasswordview}
                      onPress={() => navigate('ForgotPasswordScreen')}>
                      <Medium
                        label={t('forgot_password?')}
                        style={{textDecorationLine: 'underline'}}
                        color={colors.red}
                      />
                    </TouchableOpacity>
                    <View style={{paddingVertical: mvs(20)}}>
                      <PrimaryButton
                        containerStyle={{
                          borderRadius: mvs(6),
                          width: '60%',
                          height: mvs(50),
                          alignSelf: 'center',
                        }}
                        loading={loading}
                        onPress={() => navigate('Drawer')}
                        title={t('login')}
                        fontSize={mvs(18)}
                      />
                    </View>
                  </>
                )}
              </Formik>
            </KeyboardAvoidScrollview>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
export default LoginScreen;
