import * as IMG from 'assets/images';
import {PrimaryButton} from 'components/atoms/buttons';
import {Row} from 'components/atoms/row';
import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';
import i18n from 'translation';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import {colors} from '../../../config/colors';
import {mvs, width} from '../../../config/metrices';
import {SpecialistLocation} from 'assets/icons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {ColorSpace} from 'react-native-reanimated';
import Bold from 'typography/bold-text';
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
const OrderCard = ({
  item,
  backgroundColor,
  index,
  style,
  onPress = () => {},
  onPressAccept = () => {},
  onPressReject = () => {},
  onPressDetails = () => {},
  onPressEdit = () => {},
  onPressCart = () => {},
}) => {
  const [isLongPressed, setIsLongPressed] = React.useState(false);

  const handleLongPress = () => {
    setIsLongPressed(true);
  };
  const handleCloseEditOrder = () => {
    setIsLongPressed(false);
  };

  const handleEditOrder = () => {
    // Handle the logic for editing the order
  };
  const {t} = i18n;

  return (
    <TouchableOpacity
      // onLongPress={handleLongPress}
      onPress={onPress}
      style={styles.contentContainerStyleNew1}>
      <TouchableOpacity
        // onLongPress={handleLongPress}
        onPress={handleLongPress}
        style={styles.contentContainerStyleNew}>
        <Row
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: mvs(20),
            paddingVertical: mvs(5),
          }}>
          <Bold
            label={`${'Order Id '} #${item?.order_id}`}
            // label={`${t('Odrer')}: #${item?.id} `}
            fontSize={mvs(16)}
            color={colors.red}
            style={
              {
                // marginLeft: mvs(10),
              }
            }
          />
          <Medium
            label={'Total'}
            // label={`${t('Odrer')}: #${item?.id} `}
            fontSize={mvs(16)}
            color={colors.white}
            style={
              {
                // marginLeft: mvs(10),
              }
            }
          />
        </Row>
        <Row
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: mvs(20),
            paddingVertical: mvs(5),
          }}>
          <Bold
            label={item?.name}
            // label={`${t('Odrer')}: #${item?.id} `}
            fontSize={mvs(20)}
            color={colors.white}
            style={
              {
                // marginLeft: mvs(10),
              }
            }
          />
          <Bold
            label={item?.price}
            // label={`${t('Odrer')}: #${item?.id} `}
            fontSize={mvs(16)}
            color={colors.white}
            style={
              {
                // marginLeft: mvs(10),
              }
            }
          />
        </Row>
        <Row
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: mvs(20),
            paddingVertical: mvs(5),
          }}>
          <Bold
            label={item?.date}
            // label={`${t('Odrer')}: #${item?.id} `}
            fontSize={mvs(16)}
            color={colors.red}
            style={
              {
                // marginLeft: mvs(10),
              }
            }
          />
          <Medium
            label={`${'status: '}${item?.status}`}
            fontSize={mvs(14)}
            color={colors.white}
            style={
              {
                // marginLeft: mvs(10),
              }
            }
          />
        </Row>
      </TouchableOpacity>
      {isLongPressed && item?.status === 'processing' && (
        <Row style={{justifyContent: 'space-around', alignItems: 'center'}}>
          <TouchableOpacity onPress={onPressEdit}>
            <Row
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: mvs(10),
              }}>
              <Feather name="edit" color={colors.white} size={mvs(20)} />
              <Medium
                label={'Edit Order'}
                color={colors.white}
                fontSize={mvs(18)}
                style={{marginLeft: mvs(10)}}
              />
            </Row>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleCloseEditOrder()}>
            <Entypo
              name="circle-with-cross"
              size={mvs(25)}
              color={colors.white}
            />
          </TouchableOpacity>
        </Row>
      )}
    </TouchableOpacity>
    // </View>
  );
};
export default React.memo(OrderCard);
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
    // marginVertical: mvs(10),
    paddingVertical: mvs(10),
    overflow: 'hidden',
    // paddingVertical: mvs(8),
    // borderColor: colors.primary,
    // paddingHorizontal: mvs(5),
    backgroundColor: colors.primary,
    justifyContent: 'space-between',
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
    borderRadius: mvs(20),
  },
  contentContainerStyleNew1: {
    // marginVertical: mvs(10),
    // paddingBottom: mvs(10),
    // paddingVertical: mvs(10),
    // overflow: 'hidden',
    // paddingVertical: mvs(8),
    // borderColor: colors.primary,
    // paddingHorizontal: mvs(5),

    backgroundColor: colors.red,
    // justifyContent: 'space-between',

    borderColor: colors.primary,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    borderRadius: mvs(20),
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
});
