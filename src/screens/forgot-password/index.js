import {ForgotPasswordAnimation} from 'assets/icons';
import * as IMG from 'assets/images';
import {PrimaryButton} from 'components/atoms/buttons';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import HeaderForgot1x2x from 'components/atoms/headers/header-forgot-1x-2x';
import PrimaryInput from 'components/atoms/inputs';
import {KeyboardAvoidScrollview} from 'components/atoms/keyboard-avoid-scrollview/index';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {Formik} from 'formik';
import {useAppDispatch} from 'hooks/use-store';
import LottieView from 'lottie-react-native';
import {navigate} from 'navigation/navigation-ref';
import React from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  TouchableOpacity,
  View,
} from 'react-native';
import {onForgot} from 'services/api/auth-api-actions';
import i18n from 'translation';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import {forgotPasswordValidation} from 'validations';
import styles from './styles';
const ForgotPasswordScreen = props => {
  const dispatch = useAppDispatch();
  const {t} = i18n;
  const [otpModalVisible, setOtpModalVisible] = React.useState(false);
  const [value, setValue] = React.useState('');
  const initialValues = {
    email: '',
  };
  const handleFormSubmit = async values => {
    try {
      setLoading(true);
      const res = await onForgot(values);
      setLoading(false);
      console.log('res===>>>>> forgot', res);
      navigate('ResetPasswordScreen', {
        ...values,
      });
      // setOtpModalVisible(true);
    } catch (error) {
      Alert.alert('error', UTILS.returnError(error));
      console.log('error=>', error);
      setLoading(false);
    }
  };
  const [loading, setLoading] = React.useState(false);

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
              <View style={styles.lottieview}>
                <Image
                  source={IMG.Logo}
                  resizeMode={'contain'}
                  style={{width: mvs(120), height: mvs(120)}}
                />
                <Bold
                  label={'Forgot Password'}
                  color={colors.primary}
                  fontSize={mvs(22)}
                  style={styles.loginmoverstext}
                />
              </View>

              <Formik
                initialValues={initialValues}
                // validationSchema={signupFormValidation}
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
                    />

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
                        title={t('Send')}
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
export default ForgotPasswordScreen;
