import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as IMG from 'assets/images';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import { Formik } from 'formik';
import React from 'react';
import {
  Image,
  TouchableOpacity,
  View
} from 'react-native';
import Geocoder from 'react-native-geocoding';

import { PrimaryButton } from 'components/atoms/buttons';
import { Checkbox } from 'components/atoms/checkbox';
import PrimaryInput from 'components/atoms/inputs';
import { KeyboardAvoidScrollview } from 'components/atoms/keyboard-avoid-scrollview';
import { Row } from 'components/atoms/row';
import SignUpModal from 'components/molecules/modals/SignUp-modal';
import CountryCodemOdal from 'components/molecules/modals/country-code-modal';
import { colors } from 'config/colors';
import { mvs } from 'config/metrices';
import { useAppDispatch, useAppSelector } from 'hooks/use-store';
import { navigate } from 'navigation/navigation-ref';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { getCountryCode } from 'services/api/auth-api-actions';
import { setCountries } from 'store/reducers/user-reducer';
import i18n from 'translation';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import { signupFormValidation } from 'validations';
import RootStackParamList from '../../types/navigation-types/root-stack';
import styles from './styles';
Geocoder.init('AIzaSyCbFQqjZgQOWRMuQ_RpXU0kGAUIfJhDw98');

type props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

const Signup = (props: props) => {
  const [value, setValue] = React.useState('');
  const [selectedGender, setSelectedGender] = React.useState('');
  const [otpModalVisible, setOtpModalVisible] = React.useState(false);
  const [countrycodeModal, setCountryCodeModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { navigation } = props;
  // const email = props?.route?.params;
  // console.log('values props', email);
  const { t } = i18n;
  const { user } = useAppSelector(s => s);
  const { location, countries } = user;

  const dispatch = useAppDispatch();
  const initialValues = {
    first_name: '',
    middle_name: '',
    surname: '',
    email: '',
    phone: '',
    confirm_password: '',
    password: '',
    gender: 'male',
    // roles: 'User',
  };
  const handleFormSubmit = async (values:any) => {
    // dispatch(onSignup(values, setLoading));
    navigate('SignupNext', {
      ...values,
      country_code: countries?.find(x => x?.selected)?.code || 'PK',
    });
    {
      console.log('values form siubmit', values);
    }
  };

  React.useEffect(() => {
    getCountryCodeDetails();
  }, []);
  const getCountryCodeDetails = async () => {
    try {
      dispatch(getCountryCode());
      // setLoading(false);
      // setCountryCode(res);
      // console.log('couyntey code', res);
    } catch (error) {
      // setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        resizeMode="cover"
        source={IMG.signupheader}
        style={styles.logobackground}
      />
      <Header1x2x style={{ backgroundColor: colors.transparent }} />
      <View style={styles.loginlogoview}>
        <Image
          source={IMG.signupLogo}
          resizeMode="cover"
          style={{ width: mvs(220), height: mvs(160) }}
        />
      </View>
      <View style={styles.contentContainerStyle}>
        <KeyboardAvoidScrollview
          contentContainerStyle={styles.keyboardcontentcontainer}>
          <View style={styles.contentContainerStyleNew}>
            <Bold
              label={t('signup_to_movers')}
              color={colors.bluecolor}
              fontSize={mvs(16)}
              style={styles.boldtext}
            />

            <Formik
              initialValues={initialValues}
              validationSchema={signupFormValidation}
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
                    error={
                      errors?.first_name && touched?.first_name ? `${t(errors?.first_name)}` : ''
                    }
                    placeholder={t('first_name')}
                    onChangeText={handleChange('first_name')}
                    onBlur={handleBlur('first_name')}
                    value={values.first_name}
                  />
                  <PrimaryInput
                    // error={
                    //   errors?.middle_name && touched?.middle_name ? `${t(errors?.middle_name)}` : ''
                    // }
                    placeholder={t('middle_name')}
                    onChangeText={handleChange('middle_name')}
                    onBlur={handleBlur('middle_name')}
                    value={values.middle_name}
                  />
                  <PrimaryInput
                    keyboardType={'email-address'}
                    error={
                      errors?.surname && touched?.surname ? `${t(errors?.surname)}` : ''
                    }
                    placeholder={t('surname')}
                    onChangeText={handleChange('surname')}
                    onBlur={handleBlur('surname')}
                    value={values.surname}
                  />
                  <Row style={{ marginBottom: mvs(20) }}>
                    <PrimaryButton
                      title={t('male')}
                      containerStyle={{
                        width: mvs(88),
                        height: mvs(39),
                        backgroundColor:
                          values?.gender === 'male'
                            ? colors.bluecolor
                            : colors.white,
                        borderColor: colors.bluecolor,
                        borderWidth: 1,
                      }}
                      textStyle={{
                        color:
                          values?.gender === 'male'
                            ? colors.white
                            : colors.black,
                      }}
                      onPress={() => setFieldValue('gender', 'male')}
                    />
                    <PrimaryButton
                      title={t('female')}
                      containerStyle={{
                        width: mvs(88),
                        height: mvs(39),
                        backgroundColor:
                          values?.gender === 'female'
                            ? colors.bluecolor
                            : colors.white,
                        borderColor: colors.bluecolor,
                        borderWidth: 1,
                      }}
                      textStyle={{
                        color:
                          values?.gender === 'female'
                            ? colors.white
                            : colors.black,
                      }}
                      onPress={() => setFieldValue('gender', 'female')}
                    />
                    <PrimaryButton
                      title={t('other')}
                      containerStyle={{
                        width: mvs(88),
                        height: mvs(39),
                        backgroundColor:
                          values?.gender === 'other'
                            ? colors.bluecolor
                            : colors.white,
                        borderColor: colors.bluecolor,
                        borderWidth: 1,
                      }}
                      textStyle={{
                        color:
                          values?.gender === 'other'
                            ? colors.white
                            : colors.black,
                      }}
                      onPress={() => setFieldValue('gender', 'other')}
                    />
                  </Row>
                  <PrimaryInput
                    keyboardType={'email-address'}
                    error={
                      errors?.email && touched?.email ? `${t(errors?.email)}` : ''
                    }
                    placeholder={t('email')}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                  />
                  <PrimaryInput
                    isPassword
                    error={
                      errors?.password && touched?.password ? `${t(errors?.password)}` : ''
                    }
                    placeholder={t('password')}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                  />
                  <PrimaryInput
                    isPassword
                    error={
                      errors?.confirm_password && touched?.confirm_password ? `${t(errors?.confirm_password)}` : ''
                    }
                    placeholder={t('confirm_password')}
                    onChangeText={handleChange('confirm_password')}
                    onBlur={handleBlur('confirm_password')}
                    value={values.confirm_password}
                  />
                  {/* <PrimaryInput
                    isPassword={true}
                    error={
                      errors?.confirm_password && touched?.confirm_password ? `${t(errors?.confirm_password)}` : ''
                    }
                    placeholder={t('confirm_password')}
                    onChangeText={handleChange('confirm_password')}
                    onBlur={handleBlur('confirm_password')}
                    value={values.confirm_password}
                  /> */}
                  <Row>
                    <Row
                      style={{
                        borderWidth: 1,
                        height: mvs(45),
                        borderRadius: mvs(10),
                        borderColor: colors.bluecolor,
                        padding: mvs(10),
                        width: '30%',
                      }}>
                      <Medium
                        label={countries?.find(x => x?.selected)?.code || 'PK'}
                      />

                      <TouchableOpacity
                        onPress={() => setCountryCodeModal(true)}>
                        <AntDesign
                          name={'caretdown'}
                          size={mvs(20)}
                          color={colors.bluecolor}
                        />
                      </TouchableOpacity>
                    </Row>
                    <PrimaryInput
                      mainContainer={{
                        width: '60%',
                      }}
                      containerStyle={{ borderRadius: mvs(10) }}
                      keyboardType={'number-pad'}
                  
                      error={
                        errors?.phone && touched?.phone ? `${errors?.phone}` : ''
                      }
                      placeholder={t('phone')}
                      onChangeText={handleChange('phone')}
                      onBlur={handleBlur('phone')}
                      value={values.phone}
                    />
                  </Row>
                  <Row style={{ marginBottom: mvs(10) }}>
                    <Checkbox checked />

                    <Medium
                      fontSize={mvs(10)}
                      label={t('i_agree to the,')}
                      numberOfLines={2}
                      style={styles.IAgreeView}>
                      <Medium
                        onPress={() => navigate('TermsandConditionsScreen')}
                        numberOfLines={2}
                        fontSize={mvs(10)}
                        label={t('terms_and_conditions')}
                        color={colors.bluecolor}>
                        <Medium
                          onPress={() => navigate('PrivacyPolicyScreen')}
                          numberOfLines={2}
                          fontSize={mvs(10)}
                          label={t('return_policy & private_policy')}
                          color={colors.bluecolor}
                        />
                      </Medium>
                    </Medium>
                  </Row>

                  <PrimaryButton
                    containerStyle={{
                      borderRadius: mvs(10),
                    }}
                    loading={loading}
                    onPress={handleSubmit}
                    title={t('next')}
                  />
                </>
              )}
            </Formik>
          </View>
        </KeyboardAvoidScrollview>
      </View>
      <CountryCodemOdal
        items={countries}
        setItems={items => {
          console.log('items', items);
          dispatch(setCountries(items));
        }}
        visible={countrycodeModal}
        onClose={() => setCountryCodeModal(false)}
      />

      <SignUpModal
        email={props?.route?.params?.email}
        onClose={() => setOtpModalVisible(false)}
        visible={otpModalVisible}
        setValue={setValue}
        value={value}
        {...props}
        isSignup={false}
      // // email={values?.email}
      // onClose={() => setOtpModalVisible(false)}
      // visible={otpModalVisible}
      // setValue={setValue}
      // value={value}
      // {...props}
      />
    </View>
  );
};
export default Signup;
