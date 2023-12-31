import * as IMG from 'assets/images';
import CustomFlatList from 'components/atoms/custom-flatlist';
import { Loader } from 'components/atoms/loader';
import Header1x2x from 'components/atoms/myorder-headers/header-1x-2x';
import { Row } from 'components/atoms/row';
import RecentOrderCard from 'components/molecules/recent-order-card';
import { colors } from 'config/colors';
import { RECENT_ORDER_LIST } from 'config/constants';
import { mvs } from 'config/metrices';
import { useAppDispatch, useAppSelector } from 'hooks/use-store';
import React, { useEffect } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import i18n from 'translation';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import styles from './styles';
const HistoryScreen = props => {
  const dispatch = useAppDispatch();
  const {userInfo, notifications} = useAppSelector(s => s.user);
  const {t} = i18n;
  const [loading, setLoading] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = React.useState('');
  const readNotifications = async () => {
    try {
    } catch (error) {
      console.log('error=>', error);
    }
  };

  useEffect(() => {}, []);
  const renderAppointmentItem = ({item, index}) => (
    <RecentOrderCard
      item={item}
      onPressDetails={() => props?.navigation?.navigate('OrderDetailsScreen')}
    />
  );
  const itemSeparatorComponent = () => {
    return <View style={{paddingVertical: mvs(5)}}></View>;
  };
  return (
    <View style={styles.container}>
      <Header1x2x title={t('history')} />
      <View style={styles.contentContainerStyle}>
        <Row>
          <TouchableOpacity style={styles.earningtoucbaleview}>
            <Image
              source={IMG.historyearning}
              resizeMode="contain"
              style={styles.earningimg}
            />
            <View style={{flex: 1}}>
              <Regular
                label={t('total_earnings')}
                color={colors.white}
                fontSize={mvs(14)}
                style={{paddingHorizontal: mvs(14), marginTop: mvs(10)}}
              />
              <Regular
                label={'$2500000'}
                color={colors.white}
                fontSize={mvs(12)}
                style={{paddingHorizontal: mvs(14)}}
              />

              <View style={styles.currencyview}>
                <Regular
                  label={'USD'}
                  color={colors.white}
                  fontSize={mvs(12)}
                  style={{paddingHorizontal: mvs(14)}}
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.compleetdorderview}>
            <Image
              source={IMG.historyCart}
              resizeMode="contain"
              style={styles.completedorderimage}
            />
            <View style={{flex: 1}}>
              <Regular
                label={t('completed_order')}
                color={colors.white}
                fontSize={mvs(14)}
                style={{paddingHorizontal: mvs(14), marginTop: mvs(10)}}
              />
              <Regular
                label={'100'}
                color={colors.white}
                fontSize={mvs(12)}
                style={{paddingHorizontal: mvs(14)}}
              />

              <Regular
                label={t('latest_delivery')}
                color={colors.white}
                fontSize={mvs(12)}
                style={{paddingHorizontal: mvs(14)}}
              />
              <Regular
                label={'Yesterday 02:27 pm'}
                color={colors.white}
                fontSize={mvs(12)}
                style={{paddingHorizontal: mvs(14)}}
              />
            </View>
          </TouchableOpacity>
        </Row>
        <Medium
          label={t('recent_orders')}
          fontSize={mvs(16)}
          style={{marginTop: mvs(12)}}
        />
        {loading ? (
          <Loader />
        ) : (
          <CustomFlatList
            // emptyList={<EmptyList label={t('no_notification')} />}
            contentContainerStyle={styles.contentContainerStyleFlatlist}
            showsVerticalScrollIndicator={false}
            data={RECENT_ORDER_LIST}
            renderItem={renderAppointmentItem}
            ItemSeparatorComponent={itemSeparatorComponent()}
            keyExtractor={(_, index) => index?.toString()}
          />
        )}
      </View>
    </View>
  );
};
export default HistoryScreen;
