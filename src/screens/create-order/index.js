import CustomFlatList from 'components/atoms/custom-flatlist';
// import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {PrimaryButton} from 'components/atoms/buttons';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {Row} from 'components/atoms/row';
import CreateOrderCard from 'components/molecules/create-order-card';
import CartModal from 'components/molecules/modals/cart-modal';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {navigate} from 'navigation/navigation-ref';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import styles from './styles';
const CreateOrderScreen = props => {
  const [loading, setLoading] = React.useState(false);
  const [otpModalVisible, setOtpModalVisible] = React.useState(false);
  const [selectedItems, setSelectedItems] = React.useState([]);
  const [itemEditPress, setItemEditPress] = React.useState(false);

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

  const renderOrderItem = ({item, index}) => (
    <CreateOrderCard
      itemEditPress={itemEditPress[item.id]} // Pass editPress state for this item
      setItemEditPress={value =>
        setItemEditPress(prevState => ({...prevState, [item.id]: value}))
      }
      item={item}
      setSelectedItems={setSelectedItems}
    />
  );

  return (
    <View style={styles.container}>
      <Header1x2x
        add={false}
        back={true}
        title={'Create Order'}
        style={{backgroundColor: colors.transparent}}
      />

      <View style={styles.contentContainerStyleNew}>
        <Row
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Bold label={'Cart:'} fontSize={mvs(18)} color={colors.white} />
          <TouchableOpacity
            onPress={() => setOtpModalVisible(true)}
            style={styles.addButton}>
            <Row
              style={{
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
              <Entypo
                name="circle-with-plus"
                color={colors.green}
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

        <CustomFlatList
          // emptyList={<EmptyList label={t('no_notification')} />}
          contentContainerStyle={styles.contentContainerStyleFlatlist}
          showsVerticalScrollIndicator={false}
          data={selectedItems || []}
          renderItem={renderOrderItem}
          ItemSeparatorComponent={itemSeparatorComponent()}
          keyExtractor={(_, index) => index?.toString()}
        />
      </View>

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
          onPress={() => navigate('CustomerScreen', {screen: 'createOrder'})}
          title={'Continue'}
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
