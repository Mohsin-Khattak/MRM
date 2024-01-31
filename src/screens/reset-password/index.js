import * as IMG from 'assets/images';
import {PrimaryButton} from 'components/atoms/buttons';

import {
  PasswordChangedAnimation,
  ResetYourPasswordAnimation,
} from 'assets/icons';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import PrimaryInput from 'components/atoms/inputs';
import {KeyboardAvoidScrollview} from 'components/atoms/keyboard-avoid-scrollview/index';
import ForgotOtpModal from 'components/molecules/modals/forgot-otp-modal';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {Formik} from 'formik';
import {useAppDispatch} from 'hooks/use-store';
import LottieView from 'lottie-react-native';
import {navigate} from 'navigation/navigation-ref';
import React from 'react';
import {Alert, Image, ImageBackground, Platform, View} from 'react-native';
import {onUpdatePassword} from 'services/api/auth-api-actions';
import i18n from 'translation';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import {UTILS} from 'utils';
import {updatePasswordValidation} from 'validations';
import styles from './styles';
import HeaderForgot1x2x from 'components/atoms/headers/header-forgot-1x-2x';

const ResetPasswordScreen = props => {
  const dispatch = useAppDispatch();
  // const {values} = props?.route?.params;
  const {t} = i18n;
  const [otpModalVisible, setOtpModalVisible] = React.useState(false);
  const [isPasswordChanged, setIsPasswordChanged] = React.useState(false);
  const [value, setValue] = React.useState('');
  const initialValues = {
    // email: '',
    password: '',
    confirm_password: '',
    type: 'User',
  };
  const [loading, setLoading] = React.useState(false);

  const [verifyloading, setVerifyLoading] = React.useState(false);
  const [data, setData] = React.useState({});

  const handleFormSubmit = async values => {
    setData(values);
    setOtpModalVisible(true);
  };
  const handleVerify = async () => {
    try {
      setVerifyLoading(true);
      const res = await onUpdatePassword({
        ...data,
        otp: value,
        ...props?.route?.params,
      });

      if (res?.status === true) {
        setOtpModalVisible(false);
        setIsPasswordChanged(true);
      }

      console.log(res);
    } catch (error) {
      Alert.alert('Error', UTILS.returnError(error));
      Alert.alert('Error', UTILS.returnError(error));
    } finally {
      setVerifyLoading(false);
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
        <HeaderForgot1x2x back={true} />
        <View style={{alignSelf: 'center'}}>
          <Image
            source={IMG.LoginLogo}
            resizeMode={'contain'}
            style={{
              width: mvs(160),
              height: mvs(160),
              // marginTop: '8%',
            }}
          />
        </View>

        <View style={styles.contentContainerStyle}>
          <View style={styles.contentContainerStyleNew}>
            <KeyboardAvoidScrollview
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              contentContainerStyle={styles.keyboardcontentcontainer}>
              <Formik
                initialValues={initialValues}
                validationSchema={updatePasswordValidation}
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
                    {!isPasswordChanged ? (
                      <>
                        <View style={styles.lottiview}>
                          <LottieView
                            source={ResetYourPasswordAnimation}
                            autoPlay={true}
                            loop={true}
                            style={{width: mvs(100), height: mvs(100)}}
                          />
                        </View>
                        <Bold
                          label={t('reset_your_password')}
                          color={colors.bluecolor}
                          fontSize={mvs(16)}
                          style={styles.resetpasswordtext}
                        />
                        <PrimaryInput
                          keyboardType={'email-address'}
                          error={touched?.password ? t(errors.password) : ''}
                          placeholder={t('password')}
                          onChangeText={handleChange('password')}
                          onBlur={handleBlur('password')}
                          value={values.password}
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
                          errorStyle={{marginBottom: 10}}
                        />
                        <PrimaryInput
                          keyboardType={'email-address'}
                          error={
                            touched?.confirm_password
                              ? t(errors.confirm_password)
                              : ''
                          }
                          placeholder={t('confirm_password')}
                          onChangeText={handleChange('confirm_password')}
                          onBlur={handleBlur('confirm_password')}
                          value={values.confirm_password}
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
                          errorStyle={{marginBottom: 10}}
                        />

                        {/* <PrimaryButton
                          containerStyle={{
                            borderRadius: mvs(10),
                          }}
                          loading={loading}
                          onPress={handleSubmit}
                          title={t('confirm')}
                        /> */}
                        <View style={{paddingVertical: mvs(20)}}>
                          <PrimaryButton
                            containerStyle={{
                              borderRadius: mvs(6),
                              width: '90%',
                              height: mvs(50),
                              alignSelf: 'center',
                            }}
                            loading={loading}
                            onPress={() => navigate('ResetPasswordScreen')}
                            title={t('Confirm')}
                            fontSize={mvs(18)}
                          />
                        </View>
                      </>
                    ) : (
                      <View>
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Bold
                            label={t('password_changed')}
                            style={styles.txt}
                          />
                          <Bold
                            label={t('congratulations')}
                            style={styles.txt2}
                          />
                          <Medium
                            label={t(
                              'you_have_successfully_changed_your_password',
                            )}
                            fontSize={mvs(16)}
                            numberOfLines={2}
                            style={{textAlign: 'center'}}
                          />
                          <LottieView
                            source={PasswordChangedAnimation}
                            autoPlay={true}
                            loop={true}
                            style={{width: mvs(200), height: mvs(200)}}
                          />
                        </View>

                        <PrimaryButton
                          containerStyle={{
                            borderRadius: mvs(10),
                          }}
                          loading={loading}
                          onPress={() => navigate('Login')}
                          title={t('back_to_login')}
                        />
                      </View>
                    )}
                  </>
                )}
              </Formik>
            </KeyboardAvoidScrollview>
          </View>
        </View>

        <ForgotOtpModal
          email={props?.route?.params?.email}
          onClose={() => setOtpModalVisible(false)}
          loading={verifyloading}
          visible={otpModalVisible}
          setValue={setValue}
          onPress={handleVerify}
          value={value}
          {...props}
          isSignup={false}
          // onPress={handleSubmit}
          // // email={values?.email}
          // onClose={() => setOtpModalVisible(false)}
          // visible={otpModalVisible}
          // setValue={setValue}
          // value={value}
          // {...props}
        />
      </ImageBackground>
    </View>
  );
};
export default ResetPasswordScreen;
