import * as IMG from 'assets/images';
import { PrimaryButton } from 'components/atoms/buttons';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import PrimaryInput from 'components/atoms/inputs';
import { KeyboardAvoidScrollview } from 'components/atoms/keyboard-avoid-scrollview';
import { Loader } from 'components/atoms/loader';
import { Row } from 'components/atoms/row';
import CountryCodemOdal from 'components/molecules/modals/country-code-modal';
import { colors } from 'config/colors';
import { mvs } from 'config/metrices';
import { Formik } from 'formik';
import { useAppDispatch, useAppSelector } from 'hooks/use-store';
import { goBack } from 'navigation/navigation-ref';
import React from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  getCountryCode,
  updatePassword,
  updateProfile,
  uploadImage,
} from 'services/api/auth-api-actions';
import { setCountries } from 'store/reducers/user-reducer';
import i18n from 'translation';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import { UTILS } from 'utils';
import {
  updatePasswordFormValidation,
  updateProfileFormValidation,
} from 'validations';
import styles from './styles';
const EditProfileScreen = props => {
  const [loading, setLoading] = React.useState(false);
  const [profileBtnLoading,setProfileBtnLoading]=React.useState(false)
  const user = useAppSelector(s => s?.user);
  const userInfo = user?.userInfo;
  const {countries} = user;
  const dispatch = useAppDispatch();
  const {t} = i18n;
  const [passLoading, setPassLoading] = React.useState(false);
  const [updatedModal, setUpdatedModal] = React.useState(false);
  const [passwordModal, setPasswordModal] = React.useState(false);
  const [countrycodeModal, setCountryCodeModal] = React.useState(false);
  const openGallery = async () => {
    try {
      const res = await UTILS._returnImageGallery(false, true);
      console.log('image path get',res);
      dispatch(
        uploadImage(
          {
            filename: 'crisp.jpg',
            avatar: res,
          },
          // () => {},
          setLoading,
        ),
      );
    } catch (error) {
      console.log('upload image error', error);
      Alert.alert('Error', UTILS?.returnError(error));
    }
  };
  const onSubmit = async values => {
    dispatch(
      updateProfile(
        {
          ...values,
          id: userInfo?.id,
          fcm_token: userInfo?.fcm_token,
          type: 'User',
          country_code: countries?.find(x => x?.selected)?.code || 'PK',
        },
        setProfileBtnLoading,
      ),
    );
  };
  const onSubmitPassword = async values => {
    try {
      const valuess = {
        ...values,
        fcm_token: userInfo?.fcm_token,
        type: 'User',
      };
      setPassLoading(true);
      await updatePassword(valuess);
      goBack();
    } catch (error) {
      console.log('update password error', error);
      Alert.alert('Error', UTILS?.returnError(error));
    } finally {
      setPassLoading(false);
    }
  };
  React.useEffect(() => {
    getCountryCodeDetails();
  }, []);
  const getCountryCodeDetails = async () => {
    try {
      dispatch(getCountryCode());
    } catch (error) {}
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        source={IMG.signupheader}
        style={styles.logobackground}>
        <Header1x2x
          style={{backgroundColor: colors.transparent}}
          title={t('edit_profile')}
        />
      </ImageBackground>

      {/* <View style={styles.body}> */}
      <View style={{...styles.img}}>
        {loading ? (
          <Loader color={colors.black} />
        ) : (
          <Image
            source={{uri: userInfo?.avatar || 'https://t3.ftcdn.net/jpg/01/18/01/98/360_F_118019822_6CKXP6rXmVhDOzbXZlLqEM2ya4HhYzSV.jpg'}}
            style={styles.imgUpload}
            resizeMode="cover"
          />
        )}
        {/* {userInfo?.id && ( */}
        <TouchableOpacity
          style={{
            backgroundColor: colors.red,
            borderRadius: mvs(10),
            position: 'absolute',
            right: mvs(-12),
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => openGallery()}>
          <MaterialIcons name="edit" color={colors.white} size={mvs(20)} />
        </TouchableOpacity>
        {/* )} */}
      </View>
      <Medium label={userInfo?.name || t('guest_mode')} style={styles.name} />
      <Regular
        label={`${userInfo?.email || 'guest@gmail.com'}`}
        style={styles.email}
      />
      <View style={styles.contentContainerStyle}>
        <View style={styles.contentContainerStyleNew}>
          <KeyboardAvoidScrollview
            contentContainerStyle={styles.keyboardcontentcontainer}>
            <Formik
              onSubmit={onSubmit}
              initialValues={{
                first_name: userInfo?.first_name || '',
                phone: userInfo?.phone || '',
                email: userInfo?.email,
              }}
              validationSchema={updateProfileFormValidation}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                setTouched,
                setFieldValue,
                values,
                touched,
                errors,
              }) => (
                <>
                  {console.log(errors)}
                  <Medium color={colors.text} label={t('basic_information')} />
                  <PrimaryInput
                    containerStyle={{marginTop: mvs(10)}}
                    placeholder={t('first_name')}
                    value={values?.first_name}
                    onChangeText={handleChange('first_name')}
                    error={touched?.first_name && errors?.first_name}
                  />
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
                      containerStyle={{borderRadius: mvs(10)}}
                      keyboardType={'number-pad'}
                      error={touched?.phone ? t(errors.phone) : ''}
                      placeholder={t('phone')}
                      onChangeText={handleChange('phone')}
                      onBlur={handleBlur('phone')}
                      value={values.phone}
                    />
                  </Row>
                  <PrimaryInput
                    editable={false}
                    keyboardType={'email-address'}
                    placeholder={t('email')}
                    value={userInfo?.email}
                    onChangeText={handleChange('email')}
                  />
                  <PrimaryButton
                    onPress={handleSubmit}
                    loading={profileBtnLoading}
                    title={t('update_profile')}
                  />
                </>
              )}
            </Formik>
            <Formik
              onSubmit={onSubmitPassword}
              initialValues={{
                password: '',
                confirm_password: '',
              }}
              validationSchema={updatePasswordFormValidation}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                setTouched,
                setFieldValue,
                values,
                touched,
                errors,
              }) => (
                <>
                  {console.log('errors::')}
                  <Medium
                    color={colors.text}
                    style={{paddingVertical: mvs(10)}}
                    label={t('password_changes')}
                  />
                  <PrimaryInput
                    placeholder={t('new_password')}
                    value={values?.password}
                    error={touched?.password && errors?.password}
                    onChangeText={handleChange('password')}
                  />
                  <PrimaryInput
                    placeholder={t('Retype Password')}
                    value={values?.confirm_password}
                    error={
                      touched?.confirm_password && errors?.confirm_password
                    }
                    onChangeText={handleChange('confirm_password')}
                  />
                  <PrimaryButton
                    onPress={handleSubmit}
                    loading={passLoading}
                    title={t('update_password')}
                  />
                </>
              )}
            </Formik>
          </KeyboardAvoidScrollview>
        </View>
      </View>
      <View style={{justifyContent: 'flex-end'}}></View>
      {/* </View> */}
      <CountryCodemOdal
        items={countries}
        setItems={items => {
          // console.log('items', items);
          dispatch(setCountries(items));
        }}
        visible={countrycodeModal}
        onClose={() => setCountryCodeModal(false)}
      />
    </View>
  );
};
export default EditProfileScreen;
