import * as IMG from 'assets/images';
import {PrimaryButton} from 'components/atoms/buttons';
import {Row} from 'components/atoms/row';
import React from 'react';
import {
  Image,
  ImageBackground,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Progress from 'react-native-progress';
import CircularProgress from 'react-native-circular-progress-indicator';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';
import i18n from 'translation';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import {colors} from '../../../config/colors';
import {height, mvs} from '../../../config/metrices';
import {SendIcon, SpecialistLocation} from 'assets/icons';
import Entypo from 'react-native-vector-icons/Entypo';
import {ColorSpace} from 'react-native-reanimated';
import moment from 'moment';
import {CheckmarkAnimation, CrossModal, OTPAnimation} from 'assets/icons';
import Bold from 'typography/bold-text';
const MyOrderCard = ({
  item,
  backgroundColor,
  index,
  style,
  acceptTitle,
  rejectTitle,
  onRefreshList,
  onPress = () => {},
  onPressAccept = () => {},
  onPressReject = () => {},
  onPressDetails = () => {},
  onPressCart = () => {},
  onPressChat = () => {},
  disabledAccept,
}) => {
  const {t} = i18n;

  return (
    <Row onPress={onPress} style={styles.contentContainerStyleNew}>
      <View
        style={{
          width: mvs(60), // Set the width of the dashboard container
          height: '100%', // Set the height of the dashboard container
          justifyContent: 'center', // Center horizontally
          alignItems: 'center',
        }}>
        <Bold
          label={'Dashboard'}
          fontSize={mvs(30)}
          color={colors.primary}
          style={{
            transform: [{rotate: '-90deg'}],
            textAlign: 'center',

            width: mvs(300),
          }}
        />
      </View>
      <View
        style={{
          backgroundColor: colors.primary,
          flex: 1,
          paddingVertical: mvs(5),
          borderTopLeftRadius: mvs(20),
          borderBottomLeftRadius: mvs(20),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Row
          style={{
            paddingHorizontal: mvs(10),
            paddingVertical: mvs(8),
            borderRadius: mvs(6),
            marginTop: mvs(20),
          }}>
          <View
            style={{
              width: '45%',
              height: mvs(140),
              backgroundColor: colors.red,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: mvs(20),
            }}>
            <Medium
              label={'Completed Odrer'}
              color={colors.white}
              fontSize={mvs(14)}
              style={{marginBottom: mvs(14)}}
            />
            <CircularProgress
              value={60}
              radius={mvs(35)}
              duration={2000}
              valueSuffix={'%'}
              progressValueColor={colors.white}
              activeStrokeColor={colors.primary}
              activeStrokeWidth={mvs(6)}
              titleColor={colors.white}
              titleStyle={{
                fontWeight: 'bold',
                fontSize: mvs(12),
              }}
              inActiveStrokeColor={colors.black}
              inActiveStrokeOpacity={0.2}
              progressValueFontSize={mvs(14)}
            />
            {/* <Progress.Circle
              // formatText={n => n * 20}
              size={mvs(55)}
              animated
              color={colors.primary}
              unfilledColor={colors.white}
              borderWidth={mvs(0)}
              borderColor={colors.primary}
              progress={0.7}
              thickness={mvs(5)}
              showsText
              textStyle={{
                fontWeight: 'bold',
                fontSize: mvs(14),
              }}
            /> */}
          </View>

          <View
            style={{
              width: '45%',
              height: mvs(140),
              backgroundColor: colors.red,
              // alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: mvs(20),

              marginLeft: mvs(20),
            }}>
            <Medium
              label={'Pending Odrer'}
              color={colors.white}
              fontSize={mvs(14)}
              style={{marginBottom: mvs(14)}}
            />
            {/* <Progress.Circle
              // formatText={n => n * 20}
              size={mvs(55)}
              animated
              color={colors.primary}
              unfilledColor={colors.white}
              borderWidth={mvs(0)}
              borderColor={colors.primary}
              progress={0.7}
              thickness={mvs(5)}
              showsText
              textStyle={{
                fontWeight: 'bold',
                fontSize: mvs(14),
              }}
            /> */}
            <CircularProgress
              value={60}
              radius={mvs(35)}
              duration={2000}
              valueSuffix={'%'}
              progressValueColor={colors.white}
              activeStrokeColor={colors.primary}
              activeStrokeWidth={mvs(6)}
              titleColor={colors.white}
              titleStyle={{
                fontWeight: 'bold',
                fontSize: mvs(12),
              }}
              inActiveStrokeColor={colors.black}
              inActiveStrokeOpacity={0.2}
              progressValueFontSize={mvs(14)}
            />
          </View>
        </Row>
      </View>
    </Row>
  );
};
export default React.memo(MyOrderCard);
const styles = StyleSheet.create({
  container: {
    height: mvs(327),
    width: mvs(147),
    borderRadius: mvs(15),
    marginBottom: mvs(20),
    borderWidth: 1,
    backgroundColor: colors.primary,
    // backgroundColor: index % 2 === 0 ? colors.homecard1 : colors.homecard2,

    // ...colors.shadow,
  },
  contentContainerStyleNew: {
    marginVertical: mvs(10),
    height: mvs(200),
    width: '100%',
    overflow: 'hidden',
    // borderColor: colors.primary,
    backgroundColor: colors.white,
    justifyContent: 'space-between',
    // borderWidth: 1,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,

    // elevation: 5,
    // borderRadius: mvs(6),
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%', // Adjust the width as needed
    backgroundColor: 'white',
    padding: mvs(20),
    height: mvs(300),
    borderRadius: mvs(10),
  },
  textInput: {
    marginTop: mvs(30),
    borderWidth: mvs(1),
    borderColor: colors.black,
    padding: mvs(10),
    marginBottom: mvs(10),
    borderRadius: mvs(10),
    height: mvs(130),
  },
  cross: {
    padding: mvs(14),
    alignSelf: 'flex-end',
    position: 'absolute',
    top: mvs(-5),
  },
});
