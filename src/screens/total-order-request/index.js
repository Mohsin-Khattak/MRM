import * as IMG from 'assets/images';
import {PrimaryButton} from 'components/atoms/buttons';
import CustomFlatList from 'components/atoms/custom-flatlist';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {Loader} from 'components/atoms/loader';
import {Row} from 'components/atoms/row';
import MyOrderCard from 'components/molecules/my-order-card';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {useAppDispatch, useAppSelector} from 'hooks/use-store';
import {navigate} from 'navigation/navigation-ref';
import React, {useEffect} from 'react';
import {
  Alert,
  I18nManager,
  Image,
  RefreshControl,
  TouchableOpacity,
  View,
} from 'react-native';
import {getOrderList} from 'services/api/auth-api-actions';
import {onCreateConveration} from 'services/api/chat-api-actions';
import i18n from 'translation';
import {UTILS} from 'utils';
import styles from './styles';
import Medium from 'typography/medium-text';
import Icon from 'react-native-vector-icons/AntDesign';

const TotalOrderScreen = props => {
  // const isBack =props?.route?.params?.isBack;
  const dispatch = useAppDispatch();
  const {userInfo} = useAppSelector(s => s.user);
  const {t} = i18n;
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [selectedOrder, setSelectedOrder] = React.useState('pending');
  const [chatLoading, setChatLoading] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  // const onRefresh = () => {
  //   setRefreshing(true);
  //   setTimeout(() => {
  //     fetchList();
  //     setRefreshing(false);
  //   }, 2000); // Simulated delay for the sake of example, replace this with your actual data fetching logic
  // };

  const renderAppointmentItem = ({item, index}) => (
    <MyOrderCard
      item={item}
      onMessagePress={() => onMessagePress(item?.driver_id)}
      onPressTracking={() => navigate('Tracking', {orderId: item?.id})}
      chatLoading={chatLoading}
      onPressDetails={() =>
        props?.navigation?.navigate('OrderDetailsScreen', {orderId: item?.id})
      }
    />
  );

  const itemSeparatorComponent = () => {
    return <View style={{paddingVertical: mvs(5)}}></View>;
  };
  return (
    <View style={styles.container}>
      <Image
        resizeMode="cover"
        source={IMG.signupheader}
        style={styles.logobackground}
      />
      {/* <Header1x2x
        style={{backgroundColor: colors.transparent}}
        title={t('total_order_request')}
      /> */}
      {/* <Row style={styles.headerContainer}>
        {isBack ? (
          <TouchableOpacity onPress={() => navigate('Home')}>
            <Icon
              name={I18nManager.isRTL ? 'arrowright' : 'arrowleft'}
              size={mvs(20)}
              color={colors.white}
            />
          </TouchableOpacity>
        ) : (
          <>
            <View />
          </>
        )}
        <Medium
          fontSize={mvs(20)}
          label={t('total_order_request')}
          style={{
            fontSize: mvs(18),
            color: colors.white,
          }}
        />
        <View />
      </Row> */}

      <View style={styles.contentContainerStyle}>
        <Row style={{marginBottom: mvs(0)}}>
          <PrimaryButton
            title={t('Pending')}
            containerStyle={{
              width: '30%',
              backgroundColor:
                selectedOrder === 'pending' ? colors.primary : colors.white,
              borderColor: colors.lightGray,
              borderWidth: 1,
              ...colors.shadow,
            }}
            textStyle={{
              color:
                selectedOrder === 'pending' ? colors.white : colors.primary,
            }}
            onPress={() => {
              if (selectedOrder === 'pending') {
                setSelectedOrder('');
              } else {
                setSelectedOrder('pending');
              }
            }}
          />
          <PrimaryButton
            title={t('Assigned')}
            containerStyle={{
              width: '30%',
              backgroundColor:
                selectedOrder === 'assigned' ? colors.primary : colors.white,
              borderColor: colors.lightGray,
              borderWidth: 1,
              ...colors.shadow,
            }}
            textStyle={{
              color:
                selectedOrder === 'assigned' ? colors.white : colors.primary,
            }}
            onPress={() => {
              if (selectedOrder === 'assigned') {
                setSelectedOrder('');
              } else {
                setSelectedOrder('assigned');
              }
            }}
          />
          <PrimaryButton
            title={t('Delivered')}
            containerStyle={{
              width: '30%',
              backgroundColor:
                selectedOrder === 'delivered' ? colors.primary : colors.white,
              borderColor: colors.lightGray,
              borderWidth: 1,
              ...colors.shadow,
            }}
            textStyle={{
              color:
                selectedOrder === 'delivered' ? colors.white : colors.primary,
            }}
            onPress={() => {
              if (selectedOrder === 'delivered') {
                setSelectedOrder('');
              } else {
                setSelectedOrder('delivered');
              }
            }}
          />
        </Row>
      </View>

      {loading ? (
        <Loader />
      ) : (
        <CustomFlatList
          // emptyList={<EmptyList label={t('no_notification')} />}
          contentContainerStyle={styles.contentContainerStyleFlatlist}
          showsVerticalScrollIndicator={false}
          data={data?.data}
          renderItem={renderAppointmentItem}
          ItemSeparatorComponent={itemSeparatorComponent()}
          keyExtractor={(_, index) => index?.toString()}
        />
      )}
    </View>
  );
};
export default TotalOrderScreen;
