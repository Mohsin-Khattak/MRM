import { useIsFocused } from '@react-navigation/native';
import { RecentOrder } from 'assets/icons';
import * as IMG from 'assets/images';
import CustomFlatList from 'components/atoms/custom-flatlist';
import Header1x2x from 'components/atoms/header-home/header-1x-2x';
import { Loader } from 'components/atoms/loader';
import { Row } from 'components/atoms/row';
import HomeSwiper from 'components/molecules/home-swiper';
import ServiceCard from 'components/molecules/service-card';
import { colors } from 'config/colors';
import { mvs } from 'config/metrices';
import { useAppDispatch, useAppSelector } from 'hooks/use-store';
import { navigate } from 'navigation/navigation-ref';
import React from 'react';
import { Alert, ImageBackground, TouchableOpacity, View } from 'react-native';
import {
  getDashbaord,
  getHomeBanner,
  getNotifications,
  getOrderList,
} from 'services/api/auth-api-actions';
import i18n from 'translation';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import { UTILS } from 'utils';
import styles from './styles';
const HomeTab = props => {
  const user = useAppSelector(s => s?.user);
  const isFocus =useIsFocused();
  const unreadNotification =user?.unreadNotification;
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

  const loadNotifications = async () => {
    try {
      if (!userInfo?.id) return;
      dispatch(getNotifications(setLoading));
    } catch (error) {
      console.log('error=>', error);
    }
  };
  React.useEffect(() => {
    loadNotifications();
  }, [isFocus]);

  const getList = async () => {
    try {
      setLoading(true);
      const res = await getDashbaord();
      setDashboardDetails(res?.data || []);
      const banner = await getHomeBanner();
      setHomeBanner(banner?.data || []);
    } catch (error) {
      console.log('dashboard and homebanners get error', error);
      Alert.alert('Error', UTILS?.returnError(error));
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    getList();
  }, []);
  const fetchPending = async () => {
    try {
      if(userInfo?.id){

        const status = 'pending';
        const result = await getOrderList(status);
        setOrder(result?.data);
      }
    } catch (error) {
      console.log('pending order get error', error);
      Alert.alert('Error', UTILS?.returnError(error));
    }
  };
  React.useEffect(() => {
      fetchPending();
  }, [isFocus]);
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

  return (
    <View style={styles.container}>
      <ImageBackground
        source={IMG.HomeBackground2}
        resizeMode="stretch"
        style={styles.backgroundimg}>
        <Header1x2x
          back={false}
          unreadNotification={unreadNotification}
          style={{backgroundColor: colors.transparent}}
        />
        {/* {userInfo?.id && ( */}
        <Medium
          label={`${t('Hi')} ${userInfo?.name || t('guest')}`}
          fontSize={mvs(20)}
          color={colors.white}
          style={{marginLeft: mvs(25)}}
        />
        {/* )} */}
        {loading ? (
          <Loader />
        ) : (
          <>
            <HomeSwiper item={homeBanner} />
            <View style={styles.body}>
              <CustomFlatList
                ListHeaderComponent={
                  <>
                    <View style={{marginBottom: mvs(10)}}>
                      <Medium label={t('recent')} style={styles.heading} />
                      <TouchableOpacity
                        onPress={() => navigate('TotalOrderScreen')}>
                        <Row
                          style={{
                            backgroundColor: colors.homecard2,
                            gap: mvs(10),

                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            padding: mvs(20),
                            borderRadius: mvs(6),
                          }}>
                          <RecentOrder height={mvs(35)} width={mvs(35)} />
                          <Medium
                            label={t('total_order_request')}
                            color={colors.primary}
                            fontSize={mvs(14)}
                            style={{flex: 1}}
                          />
                          <Bold
                            color={colors.primary}
                            fontSize={mvs(16)}
                            label={order?.length || 0}
                          />
                        </Row>
                      </TouchableOpacity>
                    </View>
                    <View style={{marginBottom: mvs(10)}}>
                      <Medium label={t('our_service')} style={styles.heading} />
                    </View>
                  </>
                }
                numColumns={2}
                contentContainerStyle={styles.contentContainerStyle}
                showsVerticalScrollIndicator={false}
                data={dashboardDetails}
                renderItem={renderServiceList}
                columnWrapperStyle={{justifyContent: 'space-between'}}
                ItemSeparatorComponent={itemSeparatorComponent()}
              />
            </View>
          </>
        )}
      </ImageBackground>
    </View>
  );
};
export default HomeTab;
