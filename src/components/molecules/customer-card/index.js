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
const CustomerCard = ({
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
          justifyContent: 'flex-start',
          paddingHorizontal: mvs(20),
          paddingVertical: mvs(5),
        }}>
        <AntDesign name={'user'} color={colors.red} size={mvs(30)} />
        <Bold
          label={item?.name || 'N/A'}
          // label={`${t('Odrer')}: #${item?.id} `}
          fontSize={mvs(18)}
          color={colors.white}
          style={{
            marginLeft: mvs(10),
          }}
        />
      </Row>
      <View style={{marginVertical: mvs(10)}}>
        <View
          style={{
            paddingHorizontal: mvs(20),
            paddingVertical: mvs(5),

            marginVertical: mvs(10),
            width: '90%',
            alignSelf: 'center',
            flex: 1,
            borderRadius: mvs(12),
            backgroundColor: colors.white,
          }}>
          <Medium
            label={item?.phone}
            fontSize={mvs(16)}
            color={colors.primary}
          />
        </View>
        <View
          style={{
            paddingHorizontal: mvs(20),
            paddingVertical: mvs(5),
            marginVertical: mvs(10),
            width: '90%',
            alignSelf: 'center',
            borderRadius: mvs(12),
            flex: 1,
            backgroundColor: colors.white,
          }}>
          <Medium
            label={item?.address}
            fontSize={mvs(16)}
            color={colors.primary}
            numberOfLines={3}
          />
        </View>
      </View>

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
export default React.memo(CustomerCard);
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
