import * as IMG from 'assets/images';
import {PrimaryButton} from 'components/atoms/buttons';
import GoogleSearchBar from 'components/atoms/google-auto-place';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import PrimaryInput from 'components/atoms/inputs';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {useAppDispatch, useAppSelector} from 'hooks/use-store';
import {navigate} from 'navigation/navigation-ref';
import React from 'react';
import {Alert, Image, ImageBackground, ScrollView, View} from 'react-native';
import i18n from 'translation';
import Medium from 'typography/medium-text';
import styles from './styles';

import {onPostLocation} from 'services/api/auth-api-actions';
import {UTILS} from 'utils';
import Regular from 'typography/regular-text';
import {DatePicker} from 'components/atoms/date-picker';
const WhereToMoveScreen = props => {
  const {service_id} = props?.route?.params;
  const user = useAppSelector(s => s?.user);
  const userInfo = user?.userInfo;
  const language = user?.language;
  const dispatch = useAppDispatch();
  const {t} = i18n;
  const [loading, setLoading] = React.useState(false);

  const [values, setValues] = React.useState({
    service_id: service_id,
    email: userInfo?.email || '',
    name: userInfo?.name || '',
    searchMapInput: '',
    searchMapInputDrop: '',
    latitude: '',
    longitude: '',
    latitudeDrop: '',
    longitudeDrop: '',
    pickup_date: '',
  });
  console.log(values);

  const PostData = async () => {
    if (
      !values.email ||
      !values.searchMapInput ||
      !values.searchMapInputDrop ||
      !values?.name
    ) {
      Alert.alert('Validation Error', 'Please fill in all required fields.');
      return;
    }
    try {
      setLoading(true);
      const res = await onPostLocation(values);
      console.log(res);
      navigate('FurnitureItemsScreen', {service_data: res});
    } catch (error) {
      console.log('Error in postdata====>', error);
      Alert.alert('postadata', UTILS.returnError(error));
    } finally {
      setLoading(false);
    }
  };
  const handlePlaceSelection = (data, details) => {
    // Extract latitude and longitude from details.geometry.location
    const {lat, lng} = details.geometry.location;
    // Determine whether this is for pickup or dropoff
    setValues({
      ...values,
      latitude: lat,
      longitude: lng,
      searchMapInput: details.formatted_address,
    });
  };

  const handlePlaceSelectionDrop = (data, details) => {
    // Extract latitude and longitude from details.geometry.location
    const {lat, lng} = details.geometry.location;
    // Determine whether this is for pickup or dropoff
    setValues({
      ...values,
      latitudeDrop: lat,
      longitudeDrop: lng,
      searchMapInputDrop: details.formatted_address,
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        source={IMG.signupheader}
        style={styles.logobackground}>
        <Header1x2x
          style={{backgroundColor: colors.transparent}}
          title={t('where_to_move')}
        />
      </ImageBackground>

      <View style={styles.contentContainerStyle}>
        <View style={styles.contentContainerStyleNew}>
          {/* <KeyboardAvoidScrollview
            contentContainerStyle={styles.keyboardcontentcontainer}> */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={true}
            style={styles.keyboardcontentcontainer}>
            <Medium
              numberOfLines={2}
              label={t('we_are_saving_your_money_and_time_by')}
              fontSize={mvs(16)}
              color={colors.primary}
            />
            <Medium
              numberOfLines={2}
              label={t('moving_your_goods_at_your_place')}
              fontSize={mvs(14)}
              color={colors.bluecolor}
            />

            <PrimaryInput
              editable={userInfo?.name ? false : true}
              label={t('please_enter_name')}
              keyboardType={'email-address'}
              // error={touched?.email ? t(errors.email) : ''}
              placeholder={t('name')}
              onChangeText={
                text => setValues({...values, name: text}) // Update the 'email' property in the 'values' object
              }
              // onBlur={handleBlur('email')}
              value={values?.name}
              containerStyle={{
                borderRadius: mvs(6),
                borderColor: colors.attachmentgray,
              }}
            />
            <PrimaryInput
              editable={userInfo?.email ? false : true}
              label={t('please_enter_email')}
              keyboardType={'email-address'}
              // error={touched?.email ? t(errors.email) : ''}
              placeholder={t('email')}
              onChangeText={
                text => setValues({...values, email: text}) // Update the 'email' property in the 'values' object
              }
              value={values?.email}
              containerStyle={{
                borderRadius: mvs(6),
                borderColor: colors.attachmentgray,
              }}
            />
            <Regular label={'Please select pickupDate'} color={colors.red} />
            <DatePicker
              onChangeText={text => setValues({...values, pickup_date: text})}>
              <PrimaryInput
                isCalendar
                editable={false}
                placeholder={t('date')}
                onChangeText={text => setValues({...values, pickup_date: text})}
                value={values.pickup_date}
              />
            </DatePicker>
            <GoogleSearchBar
              onPress={handlePlaceSelection}
              placeholder={'Pickup Location or PostCode'}
           
            />
            <GoogleSearchBar
              onPress={handlePlaceSelectionDrop}
              placeholder={'DropOff Location or PostCode'}
            />
          </ScrollView>
          {/* </KeyboardAvoidScrollview> */}
        </View>
      </View>
      <View style={{justifyContent: 'flex-end'}}>
        <PrimaryButton
          onPress={PostData}
          loading={loading}
          title={t('next')}
          containerStyle={styles.searchContainer}
        />
      </View>
      {/* </View> */}
    </View>
  );
};
export default WhereToMoveScreen;
