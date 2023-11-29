import {
  ForgotPasswordAnimation
} from 'assets/icons';
import * as IMG from 'assets/images';
import { PrimaryButton } from 'components/atoms/buttons';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import PrimaryInput from 'components/atoms/inputs';
import { KeyboardAvoidScrollview } from 'components/atoms/keyboard-avoid-scrollview/index';
import { colors } from 'config/colors';
import { mvs } from 'config/metrices';
import { Formik } from 'formik';
import { useAppDispatch } from 'hooks/use-store';
import LottieView from 'lottie-react-native';
import { navigate } from 'navigation/navigation-ref';
import React from 'react';
import {
  Alert,
  Image,
  View
} from 'react-native';
import { onForgot } from 'services/api/auth-api-actions';
import i18n from 'translation';
import Bold from 'typography/bold-text';
import { forgotPasswordValidation } from 'validations';
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
      <Image
        resizeMode="cover"
        source={IMG.signupheader}
        style={styles.logobackground}
      />
      <Header1x2x style={{backgroundColor: colors.transparent}} />
      <View style={styles.loginlogoview}>
        <Image
          source={IMG.forgotpasswordimg}
          resizeMode="cover"
          style={{width: mvs(280), height: mvs(160)}}
        />
      </View>

      <View style={styles.contentContainerStyle}>
        <View style={styles.contentContainerStyleNew}>
          <KeyboardAvoidScrollview
            contentContainerStyle={styles.keyboardcontentcontainer}>
            <Formik
              initialValues={initialValues}
              validationSchema={forgotPasswordValidation}
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
                  <View style={styles.lottiview}>
                    <LottieView
                      source={ForgotPasswordAnimation}
                      autoPlay={true}
                      loop={true}
                      style={{width: mvs(100), height: mvs(100)}}
                    />
                  </View>
                  <Bold
                    label={t('forgot_password')}
                    color={colors.bluecolor}
                    fontSize={mvs(16)}
                    style={styles.forgottext}
                  />

                  <PrimaryInput
                    keyboardType={'email-address'}
                    error={touched?.email ? t(errors.email) : ''}
                    placeholder={t('email')}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                  />

                  <PrimaryButton
                    containerStyle={{
                      borderRadius: mvs(10),
                    }}
                    // disabled={
                    //   Object.keys(errors).length > 0 ||
                    //   Object.keys(touched).length === 0
                    // }
                    loading={loading}
                    // onPress={() => navigate('ResetPasswordScreen')}
                    onPress={handleSubmit}
                    title={t('send')}
                  />
                </>
              )}
            </Formik>
          </KeyboardAvoidScrollview>
        </View>
      </View>
    </View>
  );
};
export default ForgotPasswordScreen;
