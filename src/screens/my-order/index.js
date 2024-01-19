import {useIsFocused} from '@react-navigation/native';
import {RecentOrder} from 'assets/icons';
import * as IMG from 'assets/images';
import {PrimaryButton} from 'components/atoms/buttons';
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
import OrderCard from 'components/molecules/order-card';
import OrderDetailsCard from 'components/molecules/order-details-card';
import ServiceCard from 'components/molecules/service-card';
import {colors} from 'config/colors';
import {
  BOOKING_LIST,
  CUSTOMER_LIST,
  MY_ORDER_PROCESSING_LIST,
  SALES_ACTIVITY_LIST,
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
const MyOrderScreenScreen = props => {
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
  const [selectedOrder, setSelectedOrder] = React.useState('');
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
  const renderAppointmentItem = ({item, index}) => (
    <OrderCard
      onPressEdit={() => props?.navigation?.navigate('EditOrderScreen')}
      item={item}
    />
  );

  return (
    <View style={styles.container}>
      {/* <ImageBackground
        source={IMG.HomeBackground2}
        resizeMode="stretch"
        style={styles.backgroundimg}> */}
      <Header1x2x
        add={true}
        onPressadd={() => navigate('CreateOrderScreen')}
        back={true}
        title={'Orders'}
        unreadNotification={unreadNotification}
        style={{backgroundColor: colors.transparent}}
      />
      <View style={{paddingHorizontal: mvs(20)}}>
        <Row style={{marginBottom: mvs(20)}}>
          <PrimaryButton
            title={'Processing'}
            containerStyle={{
              width: '45%',
              height: mvs(39),
              backgroundColor:
                selectedOrder === 'processing' ? colors.red : colors.white,
              borderColor: colors.lightGray,
              borderWidth: 1,
              ...colors.shadow,
            }}
            textStyle={{
              color:
                selectedOrder === 'processing' ? colors.white : colors.primary,
            }}
            onPress={() => {
              if (selectedOrder === 'processing') {
                setSelectedOrder('');
              } else {
                setSelectedOrder('processing');
              }
            }}
          />
          <PrimaryButton
            title={'Shipped'}
            containerStyle={{
              width: '45%',
              height: mvs(39),
              backgroundColor:
                selectedOrder === 'shipped' ? colors.red : colors.white,
              borderColor: colors.lightGray,
              borderWidth: 1,
              ...colors.shadow,
            }}
            textStyle={{
              color:
                selectedOrder === 'shipped' ? colors.white : colors.primary,
            }}
            onPress={() => {
              if (selectedOrder === 'shipped') {
                setSelectedOrder('');
              } else {
                setSelectedOrder('shipped');
              }
            }}
          />
        </Row>
      </View>
      {/* <View style={{paddingHorizontal: mvs(20), marginBottom: mvs(20)}}>
        <SearchInput />
      </View> */}
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.body}>
          <View>
            <CustomFlatList
              // emptyList={<EmptyList label={t('no_notification')} />}
              contentContainerStyle={styles.contentContainerStyleFlatlist}
              showsVerticalScrollIndicator={false}
              data={
                !selectedOrder
                  ? MY_ORDER_PROCESSING_LIST
                  : MY_ORDER_PROCESSING_LIST?.filter(
                      item => item?.status === selectedOrder,
                    )
              }
              // data={MY_ORDER_PROCESSING_LIST || []}
              renderItem={renderAppointmentItem}
              ItemSeparatorComponent={itemSeparatorComponent()}
              keyExtractor={(_, index) => index?.toString()}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default MyOrderScreenScreen;
