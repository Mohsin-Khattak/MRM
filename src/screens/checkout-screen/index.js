import {useIsFocused} from '@react-navigation/native';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {
  CommentInput,
  InputWithIcon,
  InputWithIconCheckout,
  MessageInput,
  PrimaryInputCheckout,
  PrimaryInputNote,
  SearchInput,
  TextAreaInput,
} from 'components/atoms/inputs';
import {KeyboardAvoidScrollview} from 'components/atoms/keyboard-avoid-scrollview';
import PrimaryInput from 'components/atoms/inputs';
import CustomerCard from 'components/molecules/customer-card';

import ServiceCard from 'components/molecules/service-card';
import {colors} from 'config/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {mvs} from 'config/metrices';
import {useAppDispatch, useAppSelector} from 'hooks/use-store';
import {navigate} from 'navigation/navigation-ref';
import React from 'react';
import {
  Alert,
  ImageBackground,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';

import i18n from 'translation';

import Medium from 'typography/medium-text';

import styles from './styles';
import {Formik} from 'formik';
import {Row} from 'components/atoms/row';
import {PAYMENT_METHODS} from 'config/constants';
import {PrimaryButton} from 'components/atoms/buttons';
import Bold from 'typography/bold-text';
const CheckoutScreen = props => {
  const initialValues = {
    amount: '',
    paymentMethod: '',
    paymentNote: '',
    shipping_charges: '',
    shipping_notes: '',
    sell_note: '',
    shipping_note: '',
    staff_note: '',
  };
  const [inputList, setInputList] = React.useState([]);
  const [showInputs, setShowInputs] = React.useState(false);
  const [showDeleteButtons, setShowDeleteButtons] = React.useState(false);

  // React.useEffect(() => {
  //   setInputList([initialValues]); // Initialize inputList with initial values when component mounts
  //   setShowInputs(true); // Show inputs when component mounts
  // }, []);

  // const handleInputChange = (index, field, value) => {
  //   const updatedList = inputList.map((item, i) =>
  //     i === index ? {...item, [field]: value} : item,
  //   );
  //   setInputList(updatedList);
  // };

  // const handleAddPayment = () => {
  //   setInputList([...inputList, initialValues]);
  //   setShowDeleteButtons(true); // Add more inputs to the list
  // };

  // const handleDeleteInput = index => {
  //   const updatedList = inputList.filter((item, i) => i !== index);
  //   setInputList(updatedList);
  // };
  React.useEffect(() => {
    setInputList([{...initialValues, paymentMethod: ''}]); // Initialize inputList with initial values when component mounts
    setShowInputs(true); // Show inputs when component mounts
  }, []);

  const handleInputChange = (index, field, value) => {
    const updatedList = inputList.map((item, i) =>
      i === index ? {...item, [field]: value} : item,
    );
    setInputList(updatedList);
  };

  const handleAddPayment = () => {
    setInputList([...inputList, {...initialValues, paymentMethod: ''}]);
    setShowDeleteButtons(true); // Add more inputs to the list
  };

  const handleDeleteInput = index => {
    const updatedList = inputList.filter((item, i) => i !== index);
    setInputList(updatedList);
  };

  const user = useAppSelector(s => s?.user);
  const isFocus = useIsFocused();
  const unreadNotification = user?.unreadNotification;
  const userInfo = user?.userInfo;
  const language = user?.language;
  const dispatch = useAppDispatch();
  const {t} = i18n;
  const [loading, setLoading] = React.useState(false);

  return (
    <View style={styles.container}>
      <Header1x2x
        add={false}
        onPressadd={() => navigate('AddCustomerScreen')}
        back={true}
        title={'Checkout'}
        unreadNotification={unreadNotification}
        style={{backgroundColor: colors.transparent}}
      />

      {/* <View style={styles.contentContainerStyle}>
        <View style={styles.contentContainerStyleNew}> */}
      <KeyboardAvoidScrollview
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        contentContainerStyle={styles.keyboardcontentcontainer}>
        <Formik
          initialValues={initialValues}
          // validationSchema={signinFormValidation}
          // onSubmit={handleFormSubmit}
        >
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
              {showInputs &&
                inputList.map((item, index) => (
                  <View key={item.id}>
                    <Row style={{}}>
                      <PrimaryInputCheckout
                        label="Amount:"
                        labelStyle={{color: colors.primary}}
                        keyboardType={'email-address'}
                        error={touched?.email ? t(errors.email) : ''}
                        placeholder={'Amount'}
                        // onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        // value={values.email}
                        value={item.amount}
                        onChangeText={value =>
                          handleInputChange(index, 'amount', value)
                        }
                        containerStyle={styles.containerInput}
                        errorStyle={{marginBottom: mvs(10)}}
                      />
                      <InputWithIconCheckout
                        // containerStyle={{width: '50%'}}
                        label="Payment Method"
                        labelStyle={{color: colors.primary}}
                        placeholder={'Select Payment'}
                        isRequired
                        // error={touched?.vehicle_type ? t(errors.vehicle_type) : ''}
                        // onChangeText={id => setFieldValue('type', id)}
                        // onBlur={handleChange('vehicle_make')}
                        value={values.type}
                        // value={item.paymentMethod}
                        // onChangeText={value =>
                        //   handleInputChange(index, 'paymentMethod', value)
                        // }
                        onChangeText={id => {
                          setFieldValue('type', id); // Update the formik field value
                          handleInputChange(index, 'paymentMethod', id); // Update the input list
                        }}
                        id={values.type}
                        items={PAYMENT_METHODS}
                      />
                    </Row>
                    <Row>
                      <TextAreaInput
                        Mainstyle={{width: '80%'}}
                        keyboardType={'email-address'}
                        error={touched?.email ? t(errors.email) : ''}
                        placeholder={'Payment Note'}
                        // onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        // value={values.email}
                        value={item.paymentNote}
                        onChangeText={value =>
                          handleInputChange(index, 'paymentNote', value)
                        }
                        containerStyle={styles.textareastyle}
                        errorStyle={{marginBottom: mvs(10)}}
                        multiline={true}
                      />
                      {showDeleteButtons && index !== 0 && (
                        <TouchableOpacity
                          onPress={() => handleDeleteInput(index)}>
                          <MaterialIcons
                            name={'delete'}
                            color={colors.red}
                            size={mvs(30)}
                          />
                        </TouchableOpacity>
                      )}
                    </Row>
                  </View>
                ))}
              <View style={{paddingVertical: mvs(2)}}>
                <PrimaryButton
                  containerStyle={{
                    borderRadius: mvs(6),
                    width: '60%',
                    height: mvs(50),
                    alignSelf: 'center',
                  }}
                  loading={loading}
                  onPress={handleAddPayment}
                  title={'Add Payment'}
                  fontSize={mvs(18)}
                />
              </View>
              <PrimaryInput
                mainContainer={{paddingVertical: mvs(15)}}
                label="Shipping Charges:"
                labelStyle={{color: colors.primary}}
                keyboardType={'email-address'}
                error={
                  touched?.shipping_charges ? t(errors.shipping_charges) : ''
                }
                placeholder={''}
                onChangeText={handleChange('shipping_charges')}
                onBlur={handleBlur('shipping_charges')}
                value={values.shipping_charges}
                containerStyle={styles.containerInput}
                errorStyle={{marginBottom: mvs(10)}}
              />
              <TextAreaInput
                keyboardType={'email-address'}
                error={touched?.shipping_note ? t(errors.shipping_note) : ''}
                placeholder={'Shipping Notes'}
                onChangeText={handleChange('shipping_note')}
                onBlur={handleBlur('shipping_note')}
                value={values.shipping_note}
                containerStyle={styles.textareastyle}
                errorStyle={{marginBottom: mvs(10)}}
                multiline
              />
              <Row style={{paddingVertical: mvs(12)}}>
                <View>
                  <Bold
                    label={'Total Payable:'}
                    color={colors.primary}
                    fontSize={mvs(16)}
                  />
                  <Medium
                    label={'25,0000'}
                    color={colors.black}
                    fontSize={mvs(13)}
                  />
                </View>
                <View>
                  <Bold
                    label={'Total Pending:'}
                    color={colors.primary}
                    fontSize={mvs(16)}
                  />
                  <Medium
                    label={'25,0000'}
                    color={colors.black}
                    fontSize={mvs(13)}
                  />
                </View>
              </Row>
              <Row>
                <View>
                  <Bold
                    label={'Change Return:'}
                    color={colors.primary}
                    fontSize={mvs(16)}
                  />
                  <Medium
                    label={'25,0000'}
                    color={colors.black}
                    fontSize={mvs(13)}
                  />
                </View>
                <View>
                  <Bold
                    label={'Total Balance:'}
                    color={colors.primary}
                    fontSize={mvs(16)}
                  />
                  <Medium
                    label={'25,0000'}
                    color={colors.black}
                    fontSize={mvs(13)}
                  />
                </View>
              </Row>
              <Row style={{paddingVertical: mvs(15)}}>
                <TextAreaInput
                  mainContainer={{width: '45%'}}
                  keyboardType={'email-address'}
                  error={touched?.sell_note ? t(errors.sell_note) : ''}
                  placeholder={'Sell Note'}
                  onChangeText={handleChange('sell_note')}
                  onBlur={handleBlur('sell_note')}
                  value={values.sell_note}
                  containerStyle={styles.textareastyle}
                  errorStyle={{marginBottom: mvs(10)}}
                  multiline
                  numberOfLines={10}
                />
                <TextAreaInput
                  mainContainer={{width: '45%'}}
                  keyboardType={'email-address'}
                  error={touched?.staff_note ? t(errors.staff_note) : ''}
                  placeholder={'Staff Notes'}
                  onChangeText={handleChange('staff_note')}
                  onBlur={handleBlur('staff_note')}
                  value={values.staff_note}
                  containerStyle={styles.textareastyle}
                  errorStyle={{marginBottom: mvs(10)}}
                  multiline
                />
              </Row>
            </>
          )}
        </Formik>
      </KeyboardAvoidScrollview>
      <View style={{paddingVertical: mvs(2)}}>
        <PrimaryButton
          containerStyle={styles.buttonStyle}
          loading={loading}
          onPress={() => navigate('Drawer')}
          title={'Finalize Payment'}
          fontSize={mvs(18)}
        />
      </View>
      {/* </View>
      </View> */}
    </View>
  );
};
export default CheckoutScreen;
