import * as IMG from 'assets/images';
import {PrimaryButton} from 'components/atoms/buttons';
import CustomFlatList from 'components/atoms/custom-flatlist';
import CustomMap from 'components/atoms/custom-map';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {Loader} from 'components/atoms/loader';
import MapDirections from 'components/atoms/map-directions';
import {Row} from 'components/atoms/row';
import ItemDetailsCard from 'components/molecules/item-details-card';
import OrderDetailsCard from 'components/molecules/order-details-card';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import React, {useEffect} from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {Marker} from 'react-native-maps';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {getOrderDetails, ratingDriver} from 'services/api/auth-api-actions';
import i18n from 'translation';
import Medium from 'typography/medium-text';
import {UTILS} from 'utils';
import styles from './styles';
import {Linking} from 'react-native';
import Bold from 'typography/bold-text';
import RatingModal from 'components/molecules/modals/rating-modal';
import Regular from 'typography/regular-text';
import RatingStar from 'components/molecules/rating-star';
import { useAppSelector } from 'hooks/use-store';

const OrderDetailsScreen = props => {
  const orderId = props?.route?.params?.orderId;
  const user = useAppSelector(s => s?.user);
  const userInfo=user?.userInfo
  const [data, setData] = React.useState({});
  console.log('order details===>', data);
  const [ratingModal, setRatingModal] = React.useState(false);
  const [ratingLoading, setRatingLoading] = React.useState(false);
  const [values, setValues] = React.useState({rating: '', comment: ''});
  const {t} = i18n;
  const [loading, setLoading] = React.useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getOrderDetails(orderId);
      setData(res?.value);
    } catch (error) {
      console.log('Error in get order details====>', error);
      Alert.alert('Error', UTILS.returnError(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const renderAppointmentItem = ({item, index}) => (
    <ItemDetailsCard item={item} />
  );
  const onPressRating = async () => {
    try {
      setRatingLoading(true);
      await ratingDriver({
        ...values,
        service_id: orderId,
        driver_id: data?.driver?.id,
      });
      setRatingModal(false);
      fetchData()
    } catch (error) {
      console.log('Error in getProducts====>', error);
      Alert.alert('Products Error', UTILS.returnError(error));
    } finally {
      setRatingLoading(false);
    }
  };

  const origin = {
    latitude: data?.pickup_lat * 1 || 37.78825,
    longitude: data?.pickup_long * 1 || -122.4324,
  };

  const destination = {
    latitude: data?.dropoff_lat * 1 || 37.78825,
    longitude: data?.dropoff_long * 1 || -122.4324,
  };
  const openGoogleMapsDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}`;
    Linking.openURL(url);
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        source={IMG.signupheader}
        style={styles.logobackground}>
        <Header1x2x
          style={{backgroundColor: colors.transparent}}
          title={t('order_details')}
        />
      </ImageBackground>
      {loading ? (
        <Loader />
      ) : (
        <View style={{flex: 1}}>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              backgroundColor: colors.primary,
            }}>
            <View style={styles.mapContainer}>
              <CustomMap
                initialRegion={{
                  latitude: origin.latitude,
                  longitude: origin.longitude,
                  latitudeDelta: 0.05,
                  longitudeDelta: 0.05,
                }}
                style={{
                  width: '100%',
                  height: '100%',
                }}>
                <Marker coordinate={origin} />
                <Marker coordinate={destination} />
                <MapDirections
                  origin={origin}
                  destination={destination}
                  strokeWidth={3}
                  strokeColor="blue"
                />
              </CustomMap>
              <TouchableOpacity
                onPress={openGoogleMapsDirections}
                style={{
                  position: 'absolute',
                  bottom: mvs(20),
                  right: mvs(20),
                }}>
                <Row
                  style={{
                    alignItems: 'center',
                    gap: mvs(5),
                    backgroundColor: colors.white,
                    opacity: 0.5,
                    padding: mvs(5),
                  }}>
                  <Bold color={colors.red} label={'Goto Map'} />
                  <FontAwesome5Icon
                    name="directions"
                    size={mvs(30)}
                    color={colors.bluecolor}
                  />
                </Row>
              </TouchableOpacity>
            </View>
            <View style={styles.contentContainerStyle}>
              <OrderDetailsCard item={data} />

              <Medium
                label={t('item_details')}
                color={colors.white}
                style={{alignSelf: 'center'}}
              />
              <CustomFlatList
                // emptyList={<EmptyList label={t('no_notification')} />}
                contentContainerStyle={styles.contentContainerStyleFlatlist}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                data={data?.json}
                renderItem={renderAppointmentItem}
                columnWrapperStyle={{justifyContent: 'space-between'}}
                // ItemSeparatorComponent={itemSeparatorComponent()}
                keyExtractor={(_, index) => index?.toString()}
              />
            {
              data?.any_instruction  &&(
                <>
              <Bold color={colors.white} label={'Any Instructions'}/>
                <View style={styles.anyinstructionContainer}>
                  <Regular color={colors.black} fontSize={mvs(12)} label={data?.any_instruction} />
                </View>

                </>
              )
            }
            </View>
            
            {data?.status === 'delivered' && data?.review !=null && (
              <Row
                style={{
                  backgroundColor: colors.white,
                  marginHorizontal: mvs(20),
                  padding: mvs(10),
                  borderRadius: mvs(10),
                  justifyContent: 'flex-start',
                  gap: mvs(20),
                  bottom:mvs(20)
                }}>
                <Image
                  source={{uri:userInfo?.avatar}}
                  style={{
                    height: mvs(40),
                    width: mvs(40),
                    borderRadius: mvs(25),
                  }}
                />
                <View style={{flex:1}}>
                  {/* <Medium label={orderData?.review?.title} /> */}
                  <Medium label={userInfo?.name} fontSize={mvs(14)} />
                  <View style={{width:mvs(100)}}>
                  <RatingStar rate={data?.review?.review} />
                  </View>
                  <Regular
                    fontSize={mvs(12)}
                    label={data?.review?.description || 'NA'}
                    numberOfLines={10}
                  />
                </View>
              </Row>
            )}
          </ScrollView>

          {data?.status === 'delivered' && data?.review == null  && (
            <View
              style={{
                paddingHorizontal: mvs(20),
                backgroundColor: colors.primary,
                paddingTop: mvs(20),
                paddingBottom: mvs(20),
              }}>
              <PrimaryButton
                containerStyle={styles.acceptbutton}
                textStyle={{color: colors.primary}}
                // onPress={() => navigate('Signup')}
                onPress={() => setRatingModal(true)}
                title={t('Driver Rating')}
              />
            </View>
          )}
        </View>
      )}
      <RatingModal
        onClose={() => setRatingModal(false)}
        visible={ratingModal}
        setValues={setValues}
        values={values}
        ratingLoading={ratingLoading}
        onSubmit={() => onPressRating()}
      />
    </View>
  );
};
export default OrderDetailsScreen;
