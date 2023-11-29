import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Row} from 'components/atoms/row';
import Regular from 'typography/regular-text';
import {mvs} from 'config/metrices';
import Entypo from 'react-native-vector-icons/Entypo';
import {colors} from 'config/colors';
import {t} from 'i18next';
import Medium from 'typography/medium-text';
import {PrimaryInput} from 'components/atoms/inputs';

const DropDown = ({
  value,
  items = [],
  label,
  onChange,
  placeholder,
  isRequired = false,
}) => {
  //   const [selectedOrder, setSelectedOrder] = React.useState('');

  const [select, setSelect] = React.useState(true);

  const toggleOptions = () => {
    setSelect(!select);
  };
  return (
    <>
      <View
        style={{
          paddingHorizontal: mvs(20),
          paddingVertical: mvs(2),
        }}>
        <Row style={{justifyContent: 'flex-start'}}>
          <Medium label={label} color={colors.primary} fontSize={mvs(12)} />
          {isRequired ? <Regular color={colors.red} label={' *'} /> : null}
        </Row>
      </View>
      <Row style={styles.innerContainer}>
        <TouchableOpacity
          onPress={() => toggleOptions()}
          style={[styles.selectButton]}>
          <Row
            style={{
              paddingHorizontal: mvs(5),
            }}>
            {items?.some((item, index) => item?.selected) ? (
              <Regular
                color={colors.bluecolor}
                fontSize={mvs(12)}
                label={items?.find((item, index) => item?.selected)?.label}
              />
            ) : (
              <Regular fontSize={mvs(12)} label={placeholder} />
            )}
            <Entypo
              name={'chevron-small-right'}
              size={20}
              color={colors.primary}
              style={{transform: [{rotate: select ? '0deg' : '90deg'}]}}
            />
          </Row>
        </TouchableOpacity>

        {!select ? (
          <View style={styles.dotContainer}>
            <ScrollView
              contentContainerStyle={{flexGrow: 1}}
              nestedScrollEnabled>
              {items?.map((item, index) => (
                <TouchableOpacity
                  onPress={() => {
                    let copy = [...items];
                    copy = copy?.map(x => ({...x, selected: false}));
                    item.selected = true;
                    copy[index] = item;
                    onChange(copy);
                  }}>
                  <Regular
                    color={colors.black}
                    label={item?.label}
                    fontSize={mvs(12)}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        ) : null}
      </Row>
    </>
  );
};

export default DropDown;

const styles = StyleSheet.create({
  innerContainer: {
    alignItems: 'center',
    // width: '100%',
    marginBottom: mvs(20),
    marginHorizontal: mvs(20),
  },
  selectButton: {
    height: mvs(40),
    borderWidth: mvs(1),
    borderColor: colors.bluecolor,
    borderRadius: mvs(18),
    justifyContent: 'center',
    flex: 1,
  },
  dotContainer: {
    width: '100%',
    backgroundColor: 'white',
    maxHeight: mvs(100),
    position: 'absolute',
    paddingHorizontal: mvs(10),
    paddingVertical: mvs(10),
    zIndex: 1,
    top: mvs(40),

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
