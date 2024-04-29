import {useIsFocused} from '@react-navigation/native';
import CustomFlatList from 'components/atoms/custom-flatlist';
import Header1x2x from 'components/atoms/header-home/header-1x-2x';
import BookingCard from 'components/molecules/booking-card';
import MyOrderCard from 'components/molecules/my-order-card';
import ServiceCard from 'components/molecules/service-card';
import {colors} from 'config/colors';
import {BOOKING_LIST, SALES_ACTIVITY_LIST, SLIDES_LIST} from 'config/constants';
import {mvs} from 'config/metrices';
import {useAppDispatch, useAppSelector} from 'hooks/use-store';
import React from 'react';
import {ScrollView, View} from 'react-native';
import i18n from 'translation';
import Bold from 'typography/bold-text';
import styles from './styles';
const HomeTab = props => {
  const user = useAppSelector(s => s?.user);
  const isFocus = useIsFocused();
  const unreadNotification = user?.unreadNotification;
  const userInfo = user?.userInfo;
  const language = user?.language;
  const dispatch = useAppDispatch();
  const {t} = i18n;
  const [loading, setLoading] = React.useState(false);

  const itemSeparatorComponent = () => {
    return <View style={{paddingVertical: mvs(5)}}></View>;
  };

  const renderAppointmentItem = ({item, index}) => <BookingCard item={item} />;

  return (
    <View style={styles.container}>
      <Header1x2x
        back={false}
        unreadNotification={unreadNotification}
        style={{backgroundColor: colors.transparent}}
      />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <MyOrderCard item={SLIDES_LIST} />

        <View style={styles.body}>
          <View style={{marginLeft: mvs(40)}}>
            <Bold
              label={'Sales Activity'}
              color={colors.primary}
              fontSize={mvs(20)}
            />
            <>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingVertical: mvs(10)}}>
                {SALES_ACTIVITY_LIST?.map((item, index) => {
                  return (
                    <View style={{padding: mvs(10), width: '20%'}}>
                      <View
                        style={{
                          backgroundColor: colors.primary,
                          borderRadius: mvs(10),
                          width: mvs(90),
                          height: mvs(45),
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Bold
                          label={item?.pckg}
                          color={colors.white}
                          fontSize={mvs(16)}
                          numberOfLines={4}
                        />
                      </View>
                      <Bold
                        label={item?.name}
                        color={colors.primary}
                        fontSize={mvs(12)}
                        numberOfLines={10}
                        style={{marginTop: mvs(10)}}
                      />
                    </View>
                  );
                })}
              </ScrollView>
            </>
            <Bold
              label={'Bookings'}
              color={colors.primary}
              fontSize={mvs(20)}
            />
          </View>
          <View style={{marginLeft: mvs(40)}}>
            <CustomFlatList
              // emptyList={<EmptyList label={t('no_notification')} />}
              contentContainerStyle={styles.contentContainerStyleFlatlist}
              showsVerticalScrollIndicator={false}
              data={BOOKING_LIST || []}
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
export default HomeTab;
