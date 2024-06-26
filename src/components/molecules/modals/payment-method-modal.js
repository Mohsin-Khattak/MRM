import {CrossModal, CrossModalRed} from 'assets/icons';
import {ModalWrapper} from 'components/atoms/modal-wrapper';
import {colors} from 'config/colors';
import {ORDER_ITEMS, PAYMENT_METHODS} from 'config/constants';
import {mvs} from 'config/metrices';
import {t} from 'i18next';
import React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Medium from 'typography/medium-text';

const PaymentMethodModal = ({
  style = {},
  value,
  visible = false,
  onClose = item => {},
  onChangeText,
  disabled,
  items = [],
}) => {
  return (
    <ModalWrapper
      onBackdropPress={() => onClose()}
      onBackButtonPress={() => onClose()}
      visible={visible}
      style={[styles.contentContainerStyle, style]}>
      <View style={styles.container}>
        {/* <View style={styles.header} /> */}
        <TouchableOpacity onPress={() => onClose()} style={styles.cross}>
          <CrossModalRed height={mvs(30)} width={mvs(30)} />
        </TouchableOpacity>
        <Medium
          numberOfLines={2}
          style={styles.pick}
          label={'Select Payment Method'}
        />
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: mvs(20),
            paddingTop: mvs(10),
          }}>
          {PAYMENT_METHODS?.map((item, index) => {
            return (
              <TouchableOpacity
                disabled={disabled}
                key={index}
                onPress={() => onChangeText(item?.id, onClose())}
                style={styles.button}>
                <Medium
                  label={item?.title || item?.name || item?.type || item?.id}
                  style={{fontSize: mvs(16)}}
                />
                <Icon
                  name={
                    item?.id === value
                      ? 'radio-button-checked'
                      : 'radio-button-unchecked'
                  }
                  size={mvs(20)}
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </ModalWrapper>
  );
};
export default PaymentMethodModal;
const styles = StyleSheet.create({
  contentContainerStyle: {
    width: '100%',
    backgroundColor: colors.transparent,
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  container: {
    maxHeight: mvs(572),
    minHeight: mvs(200),
    backgroundColor: colors.white,
    paddingTop: mvs(15),
    borderTopRightRadius: mvs(20),
    borderTopLeftRadius: mvs(20),
  },
  header: {
    height: mvs(3),
    borderRadius: mvs(5),
    width: mvs(104),
    alignSelf: 'center',
    backgroundColor: colors.lightGray,
    marginBottom: mvs(20),
  },
  pick: {
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: mvs(20),
  },
  button: {
    paddingHorizontal: mvs(30),
    marginBottom: mvs(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.7,
  },
  cross: {
    paddingHorizontal: mvs(12),
    // marginTop: mvs(8),
    paddingVertical: mvs(5),
    alignSelf: 'flex-end',
    // position: 'absolute',
  },
});
