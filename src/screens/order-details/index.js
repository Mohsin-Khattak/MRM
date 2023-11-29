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
import {useAppSelector} from 'hooks/use-store';

const OrderDetailsScreen = props => {
  // const orderId = props?.route?.params?.orderId;
  const user = useAppSelector(s => s?.user);
  const userInfo = user?.userInfo;
  const [data, setData] = React.useState({});
  console.log('order details===>', data);
  const [ratingModal, setRatingModal] = React.useState(false);
  const [ratingLoading, setRatingLoading] = React.useState(false);
  const [values, setValues] = React.useState({rating: '', comment: ''});
  const {t} = i18n;
  const [loading, setLoading] = React.useState(true);

  const renderAppointmentItem = ({item, index}) => (
    <ItemDetailsCard item={item} />
  );

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
            }}></ScrollView>
        </View>
      )}
    </View>
  );
};
export default OrderDetailsScreen;
