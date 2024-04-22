import {useIsFocused} from '@react-navigation/native';
import CustomFlatList from 'components/atoms/custom-flatlist';
// import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {PrimaryButton} from 'components/atoms/buttons';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {InputWithIcon} from 'components/atoms/inputs';
import {KeyboardAvoidScrollview} from 'components/atoms/keyboard-avoid-scrollview';
import {Row} from 'components/atoms/row';
import CreateOrderCard from 'components/molecules/create-order-card';
import CartModal from 'components/molecules/modals/cart-modal';
import ServiceCard from 'components/molecules/service-card';
import {colors} from 'config/colors';
import {ORDER_ITEMS} from 'config/constants';
import {mvs} from 'config/metrices';
import {Formik} from 'formik';
import {useAppDispatch, useAppSelector} from 'hooks/use-store';
import {navigate} from 'navigation/navigation-ref';
import React from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import i18n from 'translation';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import styles from './styles';
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
  const [otpModalVisible, setOtpModalVisible] = React.useState(false);
  const [selectedItems, setSelectedItems] = React.useState([]);

  const handleAddToOrder = item => {
    console.log('Item added to order:', item);
    // Check if the item is already in the selectedItems array
    if (!selectedItems.some(selectedItem => selectedItem.id === item.id)) {
      setSelectedItems(prevItems => [...prevItems, item]);
    }
  };
  const itemSeparatorComponent = () => {
    return <View style={{paddingVertical: mvs(5)}}></View>;
  };

  const initialValues = {
    name: '',
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
    <CreateOrderCard item={item} setSelectedItems={setSelectedItems} />
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
                      onChangeText={id => setFieldValue('name', id)}
                      // onBlur={handleChange('vehicle_make')}
                      value={values.name}
                      id={values.name}
                      items={ORDER_ITEMS}
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
                        onPress={() => setOtpModalVisible(true)}
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
                  data={selectedItems || []}
                  // data={ORDER_ITEMS || []}
                  renderItem={renderAppointmentItem}
                  ItemSeparatorComponent={itemSeparatorComponent()}
                  keyExtractor={(_, index) => index?.toString()}
                />
              </View>
            </View>
          </KeyboardAvoidScrollview>
        </View>
      </ScrollView>
      <View style={{...styles.cardStyle, marginHorizontal: mvs(20)}}>
        <Row
          style={{
            alignItems: 'center',
            paddingHorizontal: mvs(5),
          }}>
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

      <View style={{paddingVertical: mvs(10)}}>
        <PrimaryButton
          containerStyle={{
            borderRadius: mvs(14),
            width: '90%',
            backgroundColor: colors.primary,
            alignSelf: 'center',
          }}
          loading={loading}
          onPress={() => navigate('CheckoutScreen')}
          title={'Add Order'}
          fontSize={mvs(22)}
          textStyle={{
            color: colors.white,
          }}
        />
      </View>
      <CartModal
        visible={otpModalVisible}
        onClose={() => setOtpModalVisible(false)}
        onAddToOrder={handleAddToOrder}
        selectedItems={selectedItems}
      />
    </View>
  );
};
export default CreateOrderScreen;
