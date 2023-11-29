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

const ServiceCard = ({
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
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, {backgroundColor}]}>
      <View style={styles.bg}>
        <View
          style={{
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            padding: mvs(10),
          }}>
          <Image
            source={
              item?.icon ? {uri: `${item?.icon}`} : IMG.serviceAntiqueicon
            }
            resizeMode="cover"
            style={{height: mvs(36), width: mvs(36)}}
          />
          {/* <Icon height={mvs(36)} width={mvs(36)} /> */}
          <View style={{flex: 1}}>
            <Medium
              label={item?.title}
              numberOfLines={2}
              color={colors.primary}
              fontSize={mvs(14)}
              style={{marginTop: mvs(5), textAlign: 'center'}}
            />
            <Regular
              label={item?.desc}
              fontSize={mvs(12)}
              style={{textAlign: 'center'}}
            />
          </View>
        </View>
        {/* </LinearGradient> */}
      </View>
      {/* </ImageBackground> */}
    </TouchableOpacity>
  );
};
export default React.memo(ServiceCard);
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
