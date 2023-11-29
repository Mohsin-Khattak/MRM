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
import {mvs} from '../../../config/metrices';
import {SpecialistLocation} from 'assets/icons';
import Entypo from 'react-native-vector-icons/Entypo';

const BookingCard = ({
  item,
  backgroundColor,
  index,
  style,
  onPress = () => {},
  onPressCart = () => {},
}) => {
  const {t} = i18n;
  const Icon = item.icon;
  return (
    <View style={{flex: 1}}>
      <Row style={{justifyContent: 'space-between', alignItems: 'center'}}>
        <View
          style={{
            backgroundColor: colors.primary,
            width: mvs(50),
            height: mvs(50),
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: mvs(10),
          }}>
          <Medium
            label={item?.initial}
            color={colors.white}
            fontSize={mvs(16)}
          />
        </View>
        <Medium label={item?.name} color={colors.primary} fontSize={mvs(16)} />
        <Medium label={item?.price} color={colors.primary} fontSize={mvs(16)} />
      </Row>
    </View>
  );
};
export default React.memo(BookingCard);
const styles = StyleSheet.create({
  container: {
    height: mvs(123),
    width: '45%',
    borderRadius: mvs(15),
    marginBottom: mvs(20),
    // backgroundColor: colors.homecard2,
    // backgroundColor: index % 2 === 0 ? colors.homecard1 : colors.homecard2,

    // ...colors.shadow,
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
