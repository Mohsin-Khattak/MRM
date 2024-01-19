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
import ServiceCard from 'components/molecules/service-card';
import {colors} from 'config/colors';
import {
  BOOKING_LIST,
  CUSTOMERWISE_RECOVERY_LIST,
  CUSTOMER_LIST,
  SALES_ACTIVITY_LIST,
  SALES_REPORT_LIST,
  SLIDES_LIST,
} from 'config/constants';
import {mvs} from 'config/metrices';
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
const ReportScreen = props => {
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
  const renderAppointmentItem = ({item, index}) => <CustomerCard item={item} />;

  return (
    <View style={styles.container}>
      {/* <ImageBackground
        source={IMG.HomeBackground2}
        resizeMode="stretch"
        style={styles.backgroundimg}> */}
      <Header1x2x
        add={false}
        onPressadd={() => navigate('AddCustomerScreen')}
        back={true}
        title={'Sales Report'}
        unreadNotification={unreadNotification}
        style={{backgroundColor: colors.transparent}}
      />
      <View style={{paddingHorizontal: mvs(20)}}>
        <View
          style={{
            paddingHorizontal: mvs(10),
            marginVertical: mvs(5),
            paddingVertical: mvs(10),
            // flex: 1,
            backgroundColor: colors.primary,
            borderRadius: mvs(10),
          }}>
          <Row
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '35%',
                // alignItems: 'center',
              }}>
              <Medium label={'Items'} fontSize={mvs(18)} color={colors.red} />
            </View>
            <View
              style={{
                width: '30%',
                // alignItems: 'center',
              }}>
              <Medium
                label={'Unit Sold'}
                fontSize={mvs(18)}
                color={colors.red}
              />
            </View>
            <View
              style={{
                width: '35%',
                // alignItems: 'center',
              }}>
              <Medium
                label={'Sales Amount'}
                fontSize={mvs(18)}
                color={colors.red}
                numberOfLines={2}
              />
            </View>
          </Row>
        </View>
      </View>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.body}>
          <View style={{paddingVertical: mvs(20)}}>
            {/* <View
              style={{
                paddingHorizontal: mvs(10),
                marginVertical: mvs(5),
                paddingVertical: mvs(10),
                flex: 1,
                backgroundColor: colors.primary,
                borderRadius: mvs(10),
              }}>
              <Row
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: '35%',
                    // alignItems: 'center',
                  }}>
                  <Medium
                    label={'Items'}
                    fontSize={mvs(18)}
                    color={colors.red}
                  />
                </View>
                <View
                  style={{
                    width: '30%',
                    // alignItems: 'center',
                  }}>
                  <Medium
                    label={'Unit Sold'}
                    fontSize={mvs(18)}
                    color={colors.red}
                  />
                </View>
                <View
                  style={{
                    width: '35%',
                    // alignItems: 'center',
                  }}>
                  <Medium
                    label={'Sales Amount'}
                    fontSize={mvs(18)}
                    color={colors.red}
                  />
                </View>
              </Row>
            </View> */}
            <View
              style={{
                paddingHorizontal: mvs(10),
                marginVertical: mvs(5),
                borderBottomWidth: 1,
                paddingBottom: mvs(10),
              }}>
              {SALES_REPORT_LIST?.map((item, index) => (
                <Row
                  style={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginVertical: mvs(5),
                  }}>
                  <View
                    style={{
                      width: '35%',
                      borderRightWidth: 2,
                      borderColor: colors.red,
                      paddingHorizontal: mvs(4),
                      paddingVertical: mvs(4),
                    }}>
                    <Medium
                      label={item?.item}
                      fontSize={mvs(12)}
                      color={colors.primary}
                      numberOfLines={2}
                    />
                  </View>
                  <View
                    style={{
                      width: '30%',
                      borderRightWidth: 2,
                      paddingHorizontal: mvs(4),
                      borderColor: colors.red,
                      paddingVertical: mvs(4),
                    }}>
                    <Medium
                      label={item?.unit}
                      fontSize={mvs(12)}
                      color={colors.primary}
                      numberOfLines={2}
                    />
                  </View>
                  <View
                    style={{
                      width: '35%',
                      // borderRightWidth: 2,
                      paddingHorizontal: mvs(4),
                      borderColor: colors.red,
                      paddingVertical: mvs(4),
                    }}>
                    <Medium
                      label={item?.amount}
                      fontSize={mvs(12)}
                      color={colors.primary}
                      numberOfLines={2}
                    />
                  </View>
                </Row>
              ))}
            </View>
            <View style={{paddingHorizontal: mvs(10), marginVertical: mvs(5)}}>
              <Row
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: '35%',
                    alignItems: 'center',
                    borderRightWidth: 2,
                  }}>
                  <Medium
                    label={'Total'}
                    fontSize={mvs(18)}
                    color={colors.red}
                    numberOfLines={2}
                  />
                </View>
                <View
                  style={{
                    width: '30%',
                    alignItems: 'center',
                    borderRightWidth: 2,
                  }}>
                  <Medium
                    label={'1000'}
                    fontSize={mvs(18)}
                    color={colors.red}
                    numberOfLines={2}
                  />
                </View>
                <View
                  style={{
                    width: '35%',
                    alignItems: 'center',
                    // borderRightWidth: 2,
                  }}>
                  <Medium
                    label={'500'}
                    fontSize={mvs(18)}
                    color={colors.red}
                    numberOfLines={2}
                  />
                </View>
              </Row>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default ReportScreen;
