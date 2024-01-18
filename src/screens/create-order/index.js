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
  ORDER_ITEMS,
  SALES_ACTIVITY_LIST,
  SLIDES_LIST,
} from 'config/constants';
import {mvs} from 'config/metrices';
import {Formik} from 'formik';
import {useAppDispatch, useAppSelector} from 'hooks/use-store';
import {navigate} from 'navigation/navigation-ref';
import Entypo from 'react-native-vector-icons/Entypo';
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
import CreateOrderCard from 'components/molecules/create-order-card';
const CreateOrderScreen = props => {
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
  const renderAppointmentItem = ({item, index}) => (
    <CreateOrderCard item={item} />
  );

  return (
    <View style={styles.container}>
      {/* <ImageBackground
        source={IMG.HomeBackground2}
        resizeMode="stretch"
        style={styles.backgroundimg}> */}
      <Header1x2x
        add={false}
        back={true}
        title={'Create Order'}
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

                    <Row
                      style={{
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <Bold
                        label={'Cart:'}
                        fontSize={mvs(18)}
                        color={colors.white}
                      />
                      <TouchableOpacity
                        style={{
                          backgroundColor: colors.white,
                          paddingVertical: mvs(8),
                          paddingHorizontal: mvs(10),
                          borderRadius: mvs(10),
                        }}>
                        <Row
                          style={{
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                          }}>
                          <Entypo
                            name="circle-with-plus"
                            color={colors.red}
                            size={mvs(18)}
                          />
                          <Medium
                            label={'Add item'}
                            color={colors.primary}
                            fontSize={mvs(12)}
                            style={{marginLeft: mvs(6)}}
                          />
                        </Row>
                      </TouchableOpacity>
                    </Row>
                  </>
                )}
              </Formik>
              <View style={{paddingVertical: mvs(10)}}>
                <CustomFlatList
                  // emptyList={<EmptyList label={t('no_notification')} />}
                  contentContainerStyle={styles.contentContainerStyleFlatlist}
                  showsVerticalScrollIndicator={false}
                  data={ORDER_ITEMS || []}
                  renderItem={renderAppointmentItem}
                  ItemSeparatorComponent={itemSeparatorComponent()}
                  keyExtractor={(_, index) => index?.toString()}
                />
              </View>
              <View style={styles.cardStyle}>
                <Row style={{alignItems: 'center', paddingHorizontal: mvs(5)}}>
                  <Medium
                    label={'Total Price'}
                    color={colors.primary}
                    fontSize={mvs(16)}
                  />
                  <Medium
                    label={'25,000 Rs.'}
                    color={colors.primary}
                    fontSize={mvs(16)}
                  />
                </Row>
              </View>
            </View>
            {/* <View style={{paddingVertical: mvs(30)}}>
            <PrimaryButton
              containerStyle={{
                borderRadius: mvs(14),

                backgroundColor: colors.primary,
                width: '70%',

                height: '35%',
                alignSelf: 'center',
              }}
              loading={loading}
              // onPress={handleSubmit}
              title={'Add Order'}
              fontSize={mvs(22)}
              textStyle={{
                color: colors.white,
              }}
            />
          </View> */}
          </KeyboardAvoidScrollview>
        </View>
      </ScrollView>
      <View style={{paddingVertical: mvs(10)}}>
        <PrimaryButton
          containerStyle={{
            borderRadius: mvs(14),
            width: '80%',
            backgroundColor: colors.primary,
            alignSelf: 'center',
          }}
          loading={loading}
          // onPress={handleSubmit}
          title={'Add Order'}
          fontSize={mvs(22)}
          textStyle={{
            color: colors.white,
          }}
        />
      </View>
    </View>
  );
};
export default CreateOrderScreen;
