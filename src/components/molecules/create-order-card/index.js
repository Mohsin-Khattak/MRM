import PrimaryInput from 'components/atoms/inputs';
import {Row} from 'components/atoms/row';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import i18n from 'translation';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import {colors} from '../../../config/colors';
import {mvs} from '../../../config/metrices';

const CreateOrderCard = ({
  item,
  backgroundColor,
  index,
  style,
  onPress = () => {},
  itemEditPress,
  setItemEditPress,
  setSelectedItems,
}) => {
  const {t} = i18n;
  const [quantity, setQuantity] = React.useState(1);
  const handleIncrement = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    } else {
      // If quantity is 1, remove the item from the selectedItems array
      setSelectedItems(prevItems =>
        prevItems.filter(prevItem => prevItem.id !== item.id),
      );
    }
  };

  return (
    <View>
      <View onPress={onPress} style={styles.contentContainerStyleNew}>
        <Row>
          <View style={{paddingHorizontal: mvs(10)}}>
            <Medium
              label={item?.name}
              color={colors.primary}
              fontSize={mvs(16)}
            />
          </View>
          <Row
            style={{
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '25%',
              marginTop: mvs(10),
              marginRight: mvs(10),
            }}>
            <TouchableOpacity onPress={() => handleDecrement()}>
              <Entypo
                name="circle-with-minus"
                size={mvs(16)}
                color={colors.green}
              />
            </TouchableOpacity>
            <Medium
              label={quantity.toString()}
              color={colors.primary}
              fontSize={mvs(14)}
            />
            <TouchableOpacity onPress={() => handleIncrement()}>
              <Entypo
                name="circle-with-plus"
                size={mvs(16)}
                color={colors.green}
              />
            </TouchableOpacity>
          </Row>
        </Row>
        <Row style={styles.priceContainer}>
          <View style={{width: '55%'}}>
            <Medium
              label={item?.price}
              color={colors.primary}
              fontSize={mvs(16)}
            />
          </View>
          <Row style={{flex: 1}}>
            <TouchableOpacity
              onPress={() => {
                itemEditPress == true
                  ? setItemEditPress(false)
                  : setItemEditPress(true);
              }}>
              <Entypo color={colors.primary} name={'edit'} size={mvs(20)} />
            </TouchableOpacity>
            <TouchableOpacity>
              <AntDesign color={colors.red} name={'delete'} size={mvs(20)} />
            </TouchableOpacity>
          </Row>
        </Row>
        {itemEditPress && (
          <View style={styles.discountContainer}>
            <Row>
              <View style={{width: '48%'}}>
                <Bold label={'Unit Price :'} />
                <PrimaryInput
                  editable={false}
                  placeholder="$ 12,000"
                  containerStyle={{borderRadius: mvs(5), marginTop: mvs(5)}}
                />
              </View>
              <View style={{width: '48%'}}>
                <Bold label={'Discount Amount :'} />
                <PrimaryInput
                  placeholder="$ 0.0"
                  containerStyle={{borderRadius: mvs(5), marginTop: mvs(5)}}
                />
              </View>
            </Row>
          </View>
        )}
      </View>
    </View>
  );
};
export default React.memo(CreateOrderCard);
const styles = StyleSheet.create({
  container: {
    height: mvs(327),
    width: mvs(147),
    borderRadius: mvs(15),
    marginBottom: mvs(30),
    borderWidth: 1,
    backgroundColor: colors.white,
    // backgroundColor: index % 2 === 0 ? colors.homecard1 : colors.homecard2,

    // ...colors.shadow,
  },
  contentContainerStyleNew: {
    paddingVertical: mvs(10),

    paddingHorizontal: mvs(5),
    backgroundColor: colors.white,
    borderWidth: 1,
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
  row: {alignItems: 'flex-end'},
  bg: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  btn: {
    backgroundColor: colors.white,
    height: mvs(28),
    width: mvs(96),
    borderRadius: mvs(10),
    ...colors.shadow,
  },
  btnTxt: {color: colors.primary, fontSize: mvs(12), lineHeight: mvs(16)},
  imgStyle: {borderRadius: mvs(15)},

  grd: {
    height: '100%',
    padding: mvs(15),
    borderRadius: mvs(15),
  },
  heartContainer: {
    position: 'absolute',
    right: mvs(20),
    top: mvs(-13),
    justifyContent: 'center',
    alignItems: 'center',
    height: mvs(30),
    width: mvs(30),
    borderRadius: mvs(15),
    backgroundColor: colors.red,
  },
  priceContainer: {
    paddingHorizontal: mvs(10),
    justifyContent: 'flex-start',
    gap: mvs(50),
    alignItems: 'center',
    marginTop: mvs(5),
  },
  discountContainer: {
    marginTop: mvs(10),
    paddingVertical: mvs(10),
    backgroundColor: 'white',
    width: '100%',
    paddingHorizontal: mvs(10),
  },
});
