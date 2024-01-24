import {PrimaryButton} from 'components/atoms/buttons';
import {ModalWrapper} from 'components/atoms/modal-wrapper';
import {Row} from 'components/atoms/row';
import {colors} from 'config/colors';
import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import {CrossModal, OTPAnimation} from 'assets/icons';
import {mvs} from 'config/metrices';
import {SearchInput, SearchInputModal} from 'components/atoms/inputs';
import {ORDER_ITEMS} from 'config/constants';
// import DescriptionCard from '../description-card';
import Entypo from 'react-native-vector-icons/Entypo';

const CartModal = ({
  style,
  value,
  visible = false,
  onClose = () => {},
  onAddToOrder = () => {},
  onChangeText,
  selectedItems,
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchList, setSearchList] = React.useState([]);

  React.useEffect(() => {
    if (searchTerm?.trim()?.length) {
      const filtered = ORDER_ITEMS?.filter(item => {
        const cond =
          searchTerm === '' || item?.name?.match(new RegExp(searchTerm, 'i'));
        return cond; // Return the item if the condition is met
      });

      setSearchList(filtered);
    }
  }, [searchTerm]);
  return (
    <ModalWrapper
      onBackdropPress={() => onClose()}
      onBackButtonPress={() => onClose()}
      visible={visible}
      style={[styles.contentContainerStyle, style]}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => onClose()}
          style={{
            // paddingVertical: mvs(10),
            paddingHorizontal: mvs(20),
            alignSelf: 'flex-end',
          }}
          // style={styles.cross}
        >
          <CrossModal height={mvs(30)} width={mvs(30)} />
        </TouchableOpacity>
        <View style={{paddingVertical: mvs(20), paddingHorizontal: mvs(10)}}>
          <SearchInputModal
            containerStyle={{
              backgroundColor: colors.white,
            }}
            style={{
              color: colors.primary,
            }}
            onChangeText={setSearchTerm}
          />
        </View>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: mvs(10),
          }}>
          {searchTerm?.trim()?.length
            ? searchList.map((item, index) => (
                <View>
                  <View key={index} style={styles.contentContainerStyleNew}>
                    <Row>
                      <View style={{paddingHorizontal: mvs(10)}}>
                        <Medium
                          label={item?.name}
                          color={colors.primary}
                          fontSize={mvs(16)}
                        />
                      </View>
                      {/* <Row
                    style={{
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '25%',
                      marginTop: mvs(10),
                      marginRight: mvs(10),
                      // paddingHorizontal: mvs(20),
                    }}> */}
                      <TouchableOpacity
                        style={{
                          // backgroundColor: 'green',
                          width: '20%',
                          alignItems: 'center',
                          marginTop: mvs(10),
                        }}
                        onPress={() => onAddToOrder(item)}>
                        {selectedItems.some(
                          selectedItem => selectedItem.id === item.id,
                        ) ? (
                          <TouchableOpacity
                            style={{
                              marginVertical: mvs(5),
                              borderRadius: mvs(5),
                              paddingVertical: mvs(5),
                              paddingHorizontal: mvs(10),
                              backgroundColor: colors.primary,
                            }}>
                            <Medium
                              label="Added"
                              color={colors.white}
                              fontSize={mvs(12)}
                            />
                          </TouchableOpacity>
                        ) : (
                          <Entypo
                            name="circle-with-plus"
                            size={mvs(22)}
                            color={colors.red}
                          />
                        )}
                      </TouchableOpacity>
                      {/* </Row> */}
                    </Row>
                    <View style={{paddingHorizontal: mvs(10)}}>
                      <Medium
                        label={item?.price}
                        color={colors.primary}
                        fontSize={mvs(14)}
                      />
                    </View>
                  </View>
                </View>
              ))
            : ORDER_ITEMS?.map((item, index) => (
                <View>
                  <View key={index} style={styles.contentContainerStyleNew}>
                    <Row>
                      <View style={{paddingHorizontal: mvs(10)}}>
                        <Medium
                          label={item?.name}
                          color={colors.primary}
                          fontSize={mvs(16)}
                        />
                      </View>
                      {/* <Row
                    style={{
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '25%',
                      marginTop: mvs(10),
                      marginRight: mvs(10),
                      // paddingHorizontal: mvs(20),
                    }}> */}
                      <TouchableOpacity
                        style={{
                          // backgroundColor: 'green',
                          width: '20%',
                          alignItems: 'center',
                          marginTop: mvs(10),
                        }}
                        onPress={() => onAddToOrder(item)}>
                        {selectedItems.some(
                          selectedItem => selectedItem.id === item.id,
                        ) ? (
                          <TouchableOpacity
                            style={{
                              marginVertical: mvs(5),
                              borderRadius: mvs(5),
                              paddingVertical: mvs(5),
                              paddingHorizontal: mvs(10),
                              backgroundColor: colors.primary,
                            }}>
                            <Medium
                              label="Added"
                              color={colors.white}
                              fontSize={mvs(12)}
                            />
                          </TouchableOpacity>
                        ) : (
                          <Entypo
                            name="circle-with-plus"
                            size={mvs(22)}
                            color={colors.red}
                          />
                        )}
                        {/* <Entypo
                      name="circle-with-plus"
                      size={mvs(22)}
                      color={colors.red}
                    /> */}
                      </TouchableOpacity>
                      {/* </Row> */}
                    </Row>
                    <View style={{paddingHorizontal: mvs(10)}}>
                      <Medium
                        label={item?.price}
                        color={colors.primary}
                        fontSize={mvs(14)}
                      />
                    </View>
                  </View>
                </View>
              ))}
        </ScrollView>
      </View>
    </ModalWrapper>
  );
};
export default CartModal;
const styles = StyleSheet.create({
  contentContainerStyle: {
    width: '100%',
    backgroundColor: colors.transparent,
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  contentContainerStyleNew: {
    marginVertical: mvs(5),
    paddingVertical: mvs(10),
    overflow: 'hidden',
    // paddingVertical: mvs(8),
    // borderColor: colors.primary,
    paddingHorizontal: mvs(5),
    backgroundColor: colors.white,
    justifyContent: 'space-between',
    borderColor: colors.primary,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    borderRadius: mvs(10),
  },
  // cross: {
  //   paddingVertical: mvs(14),
  //   paddingHorizontal: mvs(20),
  //   backgroundColor: 'red',
  //   alignSelf: 'flex-end',
  // },
  bar: {
    height: mvs(3),
    borderRadius: mvs(5),
    width: mvs(104),
    alignSelf: 'center',
    backgroundColor: colors.lightGray,
    marginBottom: mvs(20),
  },
  title: {
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: mvs(20),
    color: colors.primary,
  },
  des: {marginVertical: mvs(5)},
  rowRating: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginVertical: mvs(20),
  },
  rateTxt: {
    marginLeft: mvs(10),
    lineHeight: mvs(20),
    color: colors.black,
    fontSize: mvs(16),
  },
  container: {
    height: mvs(572),

    backgroundColor: colors.primary,
    padding: mvs(15),
    borderTopRightRadius: mvs(20),
    borderTopLeftRadius: mvs(20),
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingVertical: mvs(Platform.OS === 'ios' ? 40 : 20),
  },
  row: {alignItems: 'center'},
  dollar: {marginHorizontal: mvs(20), fontSize: mvs(28)},
  button: {height: mvs(63), width: '45%'},
  cross: {padding: mvs(20), alignSelf: 'flex-end', position: 'absolute'},
});
