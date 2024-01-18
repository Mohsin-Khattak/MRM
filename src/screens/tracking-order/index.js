import {useIsFocused} from '@react-navigation/native';
import {RecentOrder} from 'assets/icons';
import * as IMG from 'assets/images';
import CustomFlatList from 'components/atoms/custom-flatlist';
// import Header1x2x from 'components/atoms/headers/header-1x-2x';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {SearchInput} from 'components/atoms/inputs';
import {Loader} from 'components/atoms/loader';
import {Row} from 'components/atoms/row';
import BookingCard from 'components/molecules/booking-card';
import CustomerCard from 'components/molecules/customer-card';
import HomeSwiper from 'components/molecules/home-swiper';
import MyOrderCard from 'components/molecules/my-order-card';
import OrderDetailsCard from 'components/molecules/order-details-card';
import RecoveryCard from 'components/molecules/recovery-card';
import ServiceCard from 'components/molecules/service-card';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from 'config/colors';
import {
  BOOKING_LIST,
  CUSTOMER_LIST,
  RECOVERY_LIST,
  SALES_ACTIVITY_LIST,
  SLIDES_LIST,
} from 'config/constants';
import {mvs} from 'config/metrices';
import {Formik} from 'formik';
import {useAppDispatch, useAppSelector} from 'hooks/use-store';
import {navigate} from 'navigation/navigation-ref';
import PrimaryInput from 'components/atoms/inputs';
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
const TrackingOrderScreen = props => {
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
  const renderAppointmentItem = ({item, index}) => <RecoveryCard item={item} />;

  return (
    <View style={styles.container}>
      {/* <ImageBackground
        source={IMG.HomeBackground2}
        resizeMode="stretch"
        style={styles.backgroundimg}> */}
      <Header1x2x
        add={false}
        onPressadd={() => navigate('AddRecoveryScreen')}
        back={true}
        title={'Tracking'}
        unreadNotification={unreadNotification}
        style={{backgroundColor: colors.transparent}}
      />
      {/* <View style={{paddingHorizontal: mvs(20), marginBottom: mvs(20)}}>
        <SearchInput />
      </View> */}
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.body}>
          <View
            style={{
              marginVertical: mvs(10),
              paddingVertical: mvs(10),
              overflow: 'hidden',
              // paddingVertical: mvs(8),
              // borderColor: colors.primary,
              paddingHorizontal: mvs(5),
              backgroundColor: colors.primary,
              justifyContent: 'space-between',
              borderWidth: 1,
              borderColor: colors.primary,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
              borderRadius: mvs(10),
            }}>
            <Medium
              label={'Enter Order ID:'}
              fontSize={mvs(20)}
              color={colors.white}
              style={{paddingHorizontal: mvs(10), marginTop: mvs(10)}}
            />

            <Row
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                // paddingVertical: mvs(10),
                marginHorizontal: mvs(10),
              }}>
              <View style={{flex: 1, marginTop: mvs(20)}}>
                <PrimaryInput
                  keyboardType={'email-address'}
                  // error={touched?.email ? t(errors.email) : ''}
                  placeholder={'Order ID'}
                  // onChangeText={handleChange('email')}
                  // onBlur={handleBlur('email')}
                  // value={values.email}
                  containerStyle={{
                    borderRadius: mvs(8),
                    borderWidth: 1,
                    borderColor: colors.gray,

                    // width: '80%',

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
              </View>
              <View
                style={{
                  width: mvs(30),
                  height: mvs(30),
                  borderRadius: mvs(20),
                  marginLeft: mvs(20),
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: colors.white,
                }}>
                <FontAwesome
                  name={'map-marker'}
                  color={colors.red}
                  size={mvs(22)}
                />
              </View>
            </Row>
          </View>
          <View
            style={{
              marginVertical: mvs(10),
              paddingVertical: mvs(10),
              overflow: 'hidden',
              // paddingVertical: mvs(8),
              // borderColor: colors.primary,
              paddingHorizontal: mvs(5),
              backgroundColor: colors.primary,
              justifyContent: 'space-between',
              borderWidth: 1,
              borderColor: colors.primary,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
              borderRadius: mvs(10),
            }}>
            <Row
              style={{
                paddingHorizontal: mvs(20),
                alignItems: 'center',
                marginVertical: mvs(10),
              }}>
              <Medium
                label={'Order ID:'}
                color={colors.white}
                fontSize={mvs(16)}
              />
              <Medium
                label={'53476126916'}
                color={colors.white}
                fontSize={mvs(16)}
              />
            </Row>
            <View style={{paddingHorizontal: mvs(20), marginVertical: mvs(10)}}>
              <Medium
                label={'Product Name'}
                color={colors.white}
                fontSize={mvs(20)}
              />
            </View>
            <Row
              style={{
                paddingHorizontal: mvs(20),
                marginVertical: mvs(10),
                flex: 1,
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: '35%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}>
                <Medium
                  label={'18 January 2024 08:08 pm'}
                  color={colors.white}
                  fontSize={mvs(14)}
                  numberOfLines={3}
                  style={{
                    textAlign: 'center',
                  }}
                />
              </View>
              <View
                style={{
                  width: mvs(40),
                  height: mvs(40),
                  borderRadius: mvs(20),
                  marginRight: mvs(20),
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: colors.white,
                }}>
                <FontAwesome6
                  name={'arrows-rotate'}
                  color={colors.red}
                  size={mvs(22)}
                />
              </View>
              <View>
                <Medium
                  label={'In Process'}
                  color={colors.white}
                  fontSize={mvs(16)}
                />
              </View>
            </Row>
            <View
              style={{
                backgroundColor: colors.white,
                width: mvs(6),
                height: mvs(200),
                marginLeft: mvs(10),

                bottom: mvs(10),
                alignSelf: 'center',
              }}></View>
            <Row
              style={{
                paddingHorizontal: mvs(20),
                flex: 1,
                // marginVertical: mvs(10),
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: '35%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}>
                <Medium
                  label={'18 January 2024 08:08 pm'}
                  color={colors.white}
                  fontSize={mvs(14)}
                  numberOfLines={3}
                  style={{
                    textAlign: 'center',
                  }}
                />
              </View>
              <View>
                <View
                  style={{
                    width: mvs(40),
                    height: mvs(40),
                    borderRadius: mvs(20),
                    marginRight: mvs(35),
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: colors.red,
                  }}>
                  <MaterialCommunityIcons
                    name={'truck-check-outline'}
                    color={colors.white}
                    size={mvs(22)}
                  />
                </View>
              </View>
              <View>
                <Medium
                  label={'Deliever'}
                  color={colors.white}
                  fontSize={mvs(16)}
                />
              </View>
            </Row>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default TrackingOrderScreen;
