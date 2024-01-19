import {useIsFocused} from '@react-navigation/native';
import {RecentOrder} from 'assets/icons';
import * as IMG from 'assets/images';
import CustomFlatList from 'components/atoms/custom-flatlist';
// import Header1x2x from 'components/atoms/headers/header-1x-2x';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {InputWithIcon, SearchInput} from 'components/atoms/inputs';
import {KeyboardAvoidScrollview} from 'components/atoms/keyboard-avoid-scrollview';
import {Loader} from 'components/atoms/loader';
import {Row} from 'components/atoms/row';
import BookingCard from 'components/molecules/booking-card';
import CustomerCard from 'components/molecules/customer-card';
import HomeSwiper from 'components/molecules/home-swiper';
import MyOrderCard from 'components/molecules/my-order-card';
import OrderDetailsCard from 'components/molecules/order-details-card';
import ServiceCard from 'components/molecules/service-card';
import {colors} from 'config/colors';
import {PrimaryButton} from 'components/atoms/buttons';
import PrimaryInput from 'components/atoms/inputs';
import {
  BOOKING_LIST,
  CUSTOMER_LIST,
  SALES_ACTIVITY_LIST,
  SLIDES_LIST,
} from 'config/constants';
import {mvs} from 'config/metrices';
import {Formik} from 'formik';
import {useAppDispatch, useAppSelector} from 'hooks/use-store';
import {navigate} from 'navigation/navigation-ref';
import React from 'react';
import {
  Alert,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  getDashbaord,
  getHomeBanner,
  getNotifications,
  getOrderList,
} from 'services/api/auth-api-actions';
import i18n from 'translation';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import {UTILS} from 'utils';
import styles from './styles';
const AddRecoveryScreen = props => {
  const user = useAppSelector(s => s?.user);
  const isFocus = useIsFocused();
  const unreadNotification = user?.unreadNotification;
  const userInfo = user?.userInfo;
  const language = user?.language;
  const dispatch = useAppDispatch();
  const {t} = i18n;
  const [loading, setLoading] = React.useState(false);
  const [dashboardDetails, setDashboardDetails] = React.useState([]);
  const [homeBanner, setHomeBanner] = React.useState([]);
  const [order, setOrder] = React.useState([]);
  const itemSeparatorComponent = () => {
    return <View style={{paddingVertical: mvs(5)}}></View>;
  };

  const initialValues = {
    first_name: '',
    phone: '',
    email: '',
    address: '',
  };

  const handleFormSubmit = async values => {
    // dispatch(onSignup(values, setLoading));
    navigate('SignupNext', {
      ...values,
      country_code: countries?.find(x => x?.selected)?.code || 'PK',
    });
    {
      console.log('values form siubmit', values);
    }
  };

  // const loadNotifications = async () => {
  //   try {
  //     if (!userInfo?.id) return;
  //     dispatch(getNotifications(setLoading));
  //   } catch (error) {
  //     console.log('error=>', error);
  //   }
  // };
  // React.useEffect(() => {
  //   loadNotifications();
  // }, [isFocus]);

  // const getList = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await getDashbaord();
  //     setDashboardDetails(res?.data || []);
  //     const banner = await getHomeBanner();
  //     setHomeBanner(banner?.data || []);
  //   } catch (error) {
  //     console.log('dashboard and homebanners get error', error);
  //     Alert.alert('Error', UTILS?.returnError(error));
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // React.useEffect(() => {
  //   getList();
  // }, []);
  // const fetchPending = async () => {
  //   try {
  //     if(userInfo?.id){

  //       const status = 'pending';
  //       const result = await getOrderList(status);
  //       setOrder(result?.data);
  //     }
  //   } catch (error) {
  //     console.log('pending order get error', error);
  //     Alert.alert('Error', UTILS?.returnError(error));
  //   }
  // };
  // React.useEffect(() => {
  //     fetchPending();
  // }, [isFocus]);
  const renderServiceList = ({item, index}) => (
    <ServiceCard
      backgroundColor={
        index % 4 === 0 || index % 4 === 3 ? colors.homecard2 : colors.homecard1
      }
      item={item}
      onPress={() =>
        props?.navigation?.navigate('WhereToMoveScreen', {
          service_id: item?.id,
        })
      }
    />
  );
  const renderAppointmentItem = ({item, index}) => <CustomerCard item={item} />;

  return (
    <View style={styles.container}>
      {/* <ImageBackground
        source={IMG.HomeBackground2}
        resizeMode="stretch"
        style={styles.backgroundimg}> */}
      <Header1x2x
        add={false}
        back={true}
        title={' Add Recovery'}
        unreadNotification={unreadNotification}
        style={{backgroundColor: colors.transparent}}
      />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.contentContainerStyle}>
          <KeyboardAvoidScrollview
            contentContainerStyle={styles.keyboardcontentcontainer}>
            <View style={styles.contentContainerStyleNew}>
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
                    <InputWithIcon
                      label="Select Customer"
                      placeholder={'Select Customer'}
                      isRequired
                      // error={touched?.vehicle_type ? t(errors.vehicle_type) : ''}
                      onChangeText={id => setFieldValue('vehicle_type', id)}
                      // onBlur={handleChange('vehicle_make')}
                      // value={values.vehicle_type}
                      // id={values.vehicle_type}
                      // items={vehicle_types}
                    />
                    <PrimaryInput
                      label="Enter Amount"
                      labelStyle={{color: colors.white}}
                      isRequired
                      error={touched?.first_name ? t(errors.first_name) : ''}
                      placeholder={'Amount'}
                      onChangeText={handleChange('first_name')}
                      onBlur={handleBlur('first_name')}
                      value={values.first_name}
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
                    <PrimaryInput
                      label="Enter Order ID"
                      labelStyle={{color: colors.white}}
                      isRequired
                      // error={touched?.middle_name ? t(errors.middle_name) : ''}
                      placeholder={'Order ID'}
                      onChangeText={handleChange('phone')}
                      onBlur={handleBlur('phone')}
                      value={values.phone}
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
                    <Row
                      style={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          // backgroundColor: 'red',
                          width: '45%',
                          height: mvs(40),
                        }}>
                        <Medium
                          label={'Upload Reciept'}
                          fontSize={mvs(14)}
                          color={colors.white}
                          numberOfLines={2}
                        />
                      </View>
                      <View
                        style={{
                          // backgroundColor: 'red',
                          width: '40%',
                          height: mvs(40),
                        }}>
                        <Medium
                          label={'Upload Bank Deposit Slip'}
                          fontSize={mvs(14)}
                          color={colors.white}
                          numberOfLines={2}
                        />
                      </View>
                    </Row>
                    <Row
                      style={{
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingVertical: mvs(10),
                      }}>
                      <TouchableOpacity
                        style={{
                          width: '45%',
                          height: mvs(40),
                          backgroundColor: colors.white,
                          borderRadius: mvs(6),
                          alignItems: 'center',
                          justifyContent: 'center',
                          alignSelf: 'center',
                          // marginTop: mvs(20),
                        }}>
                        <Medium
                          label={'Upload'}
                          color={colors.primary}
                          fontSize={mvs(16)}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          width: '45%',
                          height: mvs(40),
                          backgroundColor: colors.white,
                          borderRadius: mvs(6),
                          alignItems: 'center',
                          justifyContent: 'center',
                          alignSelf: 'center',
                          // marginTop: mvs(20),
                        }}>
                        <Medium
                          label={'Upload'}
                          color={colors.primary}
                          fontSize={mvs(16)}
                        />
                      </TouchableOpacity>
                    </Row>
                    {/* <Row
                      style={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'ceter',
                          width: '45%',
                        }}>
                        <Medium
                          label={'Upload Recipet:'}
                          color={colors.white}
                          fontSize={mvs(16)}
                        />
                        <TouchableOpacity
                          style={{
                            width: '100%',
                            height: mvs(40),
                            backgroundColor: colors.white,
                            borderRadius: mvs(6),
                            alignItems: 'center',
                            justifyContent: 'center',
                            alignSelf: 'center',
                            marginTop: mvs(20),
                          }}>
                          <Medium
                            label={'Upload'}
                            color={colors.primary}
                            fontSize={mvs(16)}
                          />
                        </TouchableOpacity>
                      </View>
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '45%',
                        }}>

                        <Medium
                          label={'Upload Bank Slip:'}
                          color={colors.white}
                          fontSize={mvs(16)}
                          numberOfLines={2}
                        />

                        <TouchableOpacity
                          style={{
                            width: '100%',
                            height: mvs(40),
                            backgroundColor: colors.white,
                            borderRadius: mvs(6),
                            alignItems: 'center',
                            justifyContent: 'center',
                            alignSelf: 'center',
                            marginTop: mvs(20),
                          }}>
                          <Medium
                            label={'Upload'}
                            color={colors.primary}
                            fontSize={mvs(16)}
                          />
                        </TouchableOpacity>
                      </View>
                    </Row> */}
                    <Row
                      style={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingVertical: mvs(20),
                      }}>
                      <TouchableOpacity
                        style={{
                          width: '45%',
                          height: mvs(100),
                          backgroundColor: colors.white,
                          borderRadius: mvs(8),
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Medium
                          label={'Image'}
                          color={colors.primary}
                          fontSize={mvs(16)}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          width: '45%',
                          height: mvs(100),
                          backgroundColor: colors.white,
                          borderRadius: mvs(8),
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Medium
                          label={'Image'}
                          color={colors.primary}
                          fontSize={mvs(16)}
                        />
                      </TouchableOpacity>
                    </Row>
                  </>
                )}
              </Formik>
            </View>
          </KeyboardAvoidScrollview>
        </View>
      </ScrollView>

      <View style={{paddingVertical: mvs(30)}}>
        <PrimaryButton
          containerStyle={{
            borderRadius: mvs(14),
            width: '80%',
            backgroundColor: colors.primary,
            alignSelf: 'center',
          }}
          loading={loading}
          // onPress={handleSubmit}
          title={'Add Recovery'}
          fontSize={mvs(22)}
          textStyle={{
            color: colors.white,
          }}
        />
      </View>
    </View>
  );
};
export default AddRecoveryScreen;
