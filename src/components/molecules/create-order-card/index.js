import {Row} from 'components/atoms/row';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import i18n from 'translation';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import {colors} from '../../../config/colors';
import {mvs} from '../../../config/metrices';
const LabelValue = ({label, value, containerStyle, labelStyle, valueStyle}) => (
  <Row style={containerStyle}>
    <Medium
      style={labelStyle}
      label={label}
      fontSize={mvs(12)}
      color={colors.black}
    />
    <Regular
      style={valueStyle}
      label={value}
      fontSize={mvs(12)}
      numberOfLines={5}
      // color={colors.gray}
    />
  </Row>
);
const CreateOrderCard = ({
  item,
  backgroundColor,
  index,
  style,
  onPress = () => {},
  onPressAccept = () => {},
  onPressReject = () => {},
  onPressDetails = () => {},
  onPressCart = () => {},
  setSelectedItems,
}) => {
  const {t} = i18n;
  const [quantity, setQuantity] = React.useState(1);
  const handleIncrement = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };
  // const handleDecrement = () => {
  //   setQuantity(prevQuantity => prevQuantity - 1);
  // };
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
              // paddingHorizontal: mvs(20),
            }}>
            <TouchableOpacity onPress={() => handleDecrement()}>
              <Entypo
                name="circle-with-minus"
                size={mvs(16)}
                color={colors.red}
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
                color={colors.red}
              />
            </TouchableOpacity>
          </Row>
        </Row>
        <Row style={styles.priceContainer}>
          <View style={{width: '50%'}}>
            <Medium
              label={item?.price}
              color={colors.primary}
              fontSize={mvs(16)}
            />
          </View>
          <Row style={{flex: 1}}>
            <TouchableOpacity>
              <Entypo color={colors.black} name={'edit'} size={mvs(20)} />
            </TouchableOpacity>
            <TouchableOpacity>
              <AntDesign color={colors.black} name={'delete'} size={mvs(20)} />
            </TouchableOpacity>
          </Row>
        </Row>
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
});
