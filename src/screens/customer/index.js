import CustomFlatList from 'components/atoms/custom-flatlist';
import {PrimaryButton} from 'components/atoms/buttons';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {SearchInput} from 'components/atoms/inputs';
import CustomerCard from 'components/molecules/customer-card';
import {colors} from 'config/colors';
import {CUSTOMER_LIST} from 'config/constants';
import {mvs} from 'config/metrices';
import {navigate} from 'navigation/navigation-ref';
import React, {useState} from 'react';
import {View} from 'react-native';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import styles from './styles';
const CustomerScreen = props => {
  const [loading, setLoading] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  console.log('selected customer show====>', selectedCustomer);
  const filteredCustomers = CUSTOMER_LIST.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const itemSeparatorComponent = () => {
    return <View style={{paddingVertical: mvs(5)}}></View>;
  };

  const renderAppointmentItem = ({item, index}) => (
    <CustomerCard
      item={item}
      onPress={() => setSelectedCustomer(item)} // Set selected customer
      selected={item === selectedCustomer} // Highlight selected customer
    />
  );

  return (
    <View style={styles.container}>
      <Header1x2x
        add={true}
        onPressadd={() => navigate('AddCustomerScreen')}
        back={true}
        title={'Customer'}
        style={{backgroundColor: colors.transparent}}
      />
      <View style={{paddingHorizontal: mvs(20)}}>
        <SearchInput
          placeholder="Search Customer"
          onChangeText={setSearchQuery}
          value={searchQuery}
          clearText={() => setSearchQuery('')}
        />
        <Bold style={styles.customerText} label={'Selected Customer :'} />
        <View style={styles.selectedCustomerContainer}>
          <Medium color={colors.white} label={selectedCustomer?.name} />
        </View>
      </View>

      <CustomFlatList
        // emptyList={<EmptyList label={t('no_notification')} />}
        contentContainerStyle={styles.contentContainerStyleFlatlist}
        showsVerticalScrollIndicator={false}
        data={filteredCustomers}
        renderItem={renderAppointmentItem}
        ItemSeparatorComponent={itemSeparatorComponent()}
        keyExtractor={(_, index) => index?.toString()}
      />

      <View style={{marginVertical: 10, paddingHorizontal: mvs(20)}}>
        <PrimaryButton
          containerStyle={{height: mvs(40)}}
          onPress={() => navigate('CheckoutScreen')}
          title="Continue"
        />
      </View>
    </View>
  );
};
export default CustomerScreen;
