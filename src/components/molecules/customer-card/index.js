import {Row} from 'components/atoms/row';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import i18n from 'translation';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import {colors} from '../../../config/colors';
import {mvs} from '../../../config/metrices';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
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
  selected,
  screen,
}) => {
  console.log('check in card screen', screen);
  const {t} = i18n;
  return (
    <TouchableOpacity
      disabled={screen != 'createOrder'}
      onPress={onPress}
      style={styles.contentContainerStyleNew}>
      {selected && (
        <View
          style={{
            backgroundColor: colors.white,
            width: mvs(25),
            height: mvs(25),
            borderRadius: mvs(12),
            position: 'absolute',
            right: mvs(20),
            top: mvs(20),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <MaterialIcons color={colors.black} size={mvs(20)} name={'done'} />
        </View>
      )}
      <Row style={styles.headerContainer}>
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
        <View style={styles.phone}>
          <Medium
            label={item?.phone}
            fontSize={mvs(16)}
            color={colors.primary}
          />
        </View>
        <View style={styles.phone}>
          <Medium
            label={item?.address}
            fontSize={mvs(16)}
            color={colors.primary}
            numberOfLines={3}
          />
        </View>
      </View>
    </TouchableOpacity>
    // </View>
  );
};
export default React.memo(CustomerCard);
const styles = StyleSheet.create({
  contentContainerStyleNew: {
    marginVertical: mvs(10),
    paddingVertical: mvs(10),
    overflow: 'hidden',
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
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: mvs(20),
    paddingVertical: mvs(5),
  },
  phone: {
    paddingHorizontal: mvs(20),
    paddingVertical: mvs(5),

    marginVertical: mvs(10),
    width: '90%',
    alignSelf: 'center',
    flex: 1,
    borderRadius: mvs(12),
    backgroundColor: colors.white,
  },
});
