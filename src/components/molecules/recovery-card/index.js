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
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
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
const RecoveryCard = ({
  item,
  backgroundColor,
  index,
  style,
  onPress = () => {},
  onPressAccept = () => {},
  onPressReject = () => {},
  onPressDetails = () => {},
  onPressCart = () => {},
}) => {
  const {t} = i18n;

  return (
    <TouchableOpacity onPress={onPress} style={styles.contentContainerStyleNew}>
      <Row
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
          // paddingHorizontal: mvs(20),
          // paddingVertical: mvs(5),
        }}>
        <View
          style={{
            width: mvs(30),
            height: mvs(30),
            borderRadius: mvs(20),
            marginLeft: mvs(20),
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.white,
          }}>
          <EvilIcons name={'user'} color={colors.red} size={mvs(25)} />
        </View>

        <View
          style={{
            paddingHorizontal: mvs(20),
            paddingVertical: mvs(5),

            marginVertical: mvs(10),
            marginLeft: mvs(25),
            width: '100%',
            alignSelf: 'center',
            // flex: 1,
            borderRadius: mvs(10),
            backgroundColor: colors.white,
          }}>
          <Medium
            label={item?.name}
            fontSize={mvs(16)}
            color={colors.primary}
          />
        </View>
      </Row>
      <Row
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
          // paddingHorizontal: mvs(20),
          // paddingVertical: mvs(5),
        }}>
        <View
          style={{
            width: mvs(30),
            height: mvs(30),
            borderRadius: mvs(20),
            marginLeft: mvs(20),
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.white,
          }}>
          <Foundation name={'dollar'} color={colors.red} size={mvs(25)} />
        </View>

        <View
          style={{
            paddingHorizontal: mvs(20),
            paddingVertical: mvs(5),

            marginVertical: mvs(10),
            marginLeft: mvs(25),
            width: '100%',
            alignSelf: 'center',
            // flex: 1,
            borderRadius: mvs(10),
            backgroundColor: colors.white,
          }}>
          <Medium
            label={item?.price}
            fontSize={mvs(16)}
            color={colors.primary}
          />
        </View>
      </Row>
      <Row
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
          // paddingHorizontal: mvs(20),
          // paddingVertical: mvs(5),
        }}>
        <View
          style={{
            width: mvs(30),
            height: mvs(30),
            borderRadius: mvs(20),
            marginLeft: mvs(20),
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.white,
          }}>
          <MaterialCommunityIcons
            name={'alpha-s-circle-outline'}
            color={colors.red}
            size={mvs(20)}
          />
        </View>

        <View
          style={{
            paddingHorizontal: mvs(20),
            paddingVertical: mvs(5),

            marginVertical: mvs(10),
            marginLeft: mvs(25),
            width: '100%',
            alignSelf: 'center',
            // flex: 1,
            borderRadius: mvs(10),
            backgroundColor: colors.white,
          }}>
          <Medium
            label={item?.balance}
            fontSize={mvs(16)}
            color={colors.primary}
          />
        </View>
      </Row>
      <Row
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
          // paddingHorizontal: mvs(20),
          // paddingVertical: mvs(5),
        }}>
        <View
          style={{
            width: mvs(30),
            height: mvs(30),
            borderRadius: mvs(20),
            marginLeft: mvs(20),
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.white,
          }}>
          <EvilIcons name={'calendar'} color={colors.red} size={mvs(25)} />
        </View>

        <View
          style={{
            paddingHorizontal: mvs(20),
            paddingVertical: mvs(5),

            marginVertical: mvs(10),
            marginLeft: mvs(25),
            width: '100%',
            alignSelf: 'center',
            // flex: 1,
            borderRadius: mvs(10),
            backgroundColor: colors.white,
          }}>
          <Medium
            label={item?.date}
            fontSize={mvs(16)}
            color={colors.primary}
          />
        </View>
      </Row>

      {/* <LabelValue
        containerStyle={{
          paddingHorizontal: mvs(4),
          paddingVertical: mvs(8),
        }}
        label={t('Name')}
        value={item?.user_details?.name || 'N/A'}
        labelStyle={{flex: 1}}
        valueStyle={{flex: 1}}
      />
      <LabelValue
        containerStyle={{
          paddingHorizontal: mvs(4),
          paddingVertical: mvs(8),
        }}
        label={t('delivery_time')}
        value={item?.pickup_date || 'N/A'}
        labelStyle={{flex: 1}}
        valueStyle={{flex: 1}}
      />
      <LabelValue
        containerStyle={{
          paddingHorizontal: mvs(4),
          paddingVertical: mvs(8),
        }}
        label={t('pickup_location')}
        value={item?.pickup_address}
        labelStyle={{flex: 1}}
        valueStyle={{flex: 1}}
      />
      <LabelValue
        containerStyle={{
          paddingHorizontal: mvs(4),
          paddingVertical: mvs(8),
        }}
        label={t('Order')}
        value={`#${item?.id} ` || 'N/A'}
        labelStyle={{flex: 1}}
        valueStyle={{flex: 1}}
      />
      <LabelValue
        containerStyle={{
          paddingHorizontal: mvs(4),
          paddingVertical: mvs(8),
        }}
        label={t('price')}
        value={`USD ${item?.driver_price} ` || 'N/A'}
        labelStyle={{flex: 1}}
        valueStyle={{flex: 1}}
      /> */}
    </TouchableOpacity>
    // </View>
  );
};
export default React.memo(RecoveryCard);
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
    marginVertical: mvs(10),
    paddingVertical: mvs(10),
    overflow: 'hidden',
    // paddingVertical: mvs(8),
    // borderColor: colors.primary,
    paddingHorizontal: mvs(5),
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
