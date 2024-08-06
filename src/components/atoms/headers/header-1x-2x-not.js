import {useNavigation} from '@react-navigation/native';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import React from 'react';
import {
  I18nManager,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import * as IMG from 'assets/images';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Medium from 'typography/medium-text';
import {Row} from '../row';
import {SearchInput} from '../inputs';
import Bold from 'typography/bold-text';
const HeaderXNot = ({
  style = {},
  mtop = 0,
  onPressadd = () => {},
  title,
  back = true,
  add = false,
  homeback = false,
  onChangeText = t => {},
  isSearch = false,
  isMenu = false,
  placeholder = 'Search here',
  color,
  ...props
}) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.container, style]}>
      <Row style={{alignItems: 'center'}}>
        {back ? (
          <TouchableOpacity onPress={() => navigation?.goBack()}>
            <AntDesign
              name={I18nManager.isRTL ? 'arrowright' : 'arrowleft'}
              size={mvs(20)}
              color={colors.white}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              backgroundColor: colors.white,
              padding: mvs(5),
              borderRadius: mvs(7),
            }}
            onPress={() => navigation?.toggleDrawer()}>
            <Image
              source={IMG.MenuHome}
              style={{width: mvs(25), height: mvs(25), resizeMode: 'contain'}}
            />
          </TouchableOpacity>
        )}

        {title ? (
          <Bold
            fontSize={mvs(20)}
            label={title}
            style={[styles.title]}
            color={colors.white}
          />
        ) : (
          <Image
            source={{
              uri: 'https://getmovers.co.uk/static/media/Asset%202.8980a30a.png',
            }}
            style={{width: mvs(60), height: mvs(30), resizeMode: 'cover'}}
          />
        )}
        {add ? (
          <TouchableOpacity onPress={onPressadd}>
            <FontAwesome
              name={'plus'}
              // name={I18nManager.isRTL ? 'arrowright' : 'arrowleft'}
              size={mvs(20)}
              color={colors.red}
            />
          </TouchableOpacity>
        ) : (
          // <TouchableOpacity
          //   style={{
          //     backgroundColor: colors.white,
          //     padding: mvs(5),
          //     borderRadius: mvs(7),
          //   }}
          //   onPress={() => navigation?.toggleDrawer()}>
          //   <Image
          //     source={IMG.MenuHome}
          //     style={{width: mvs(25), height: mvs(25), resizeMode: 'contain'}}
          //   />
          // </TouchableOpacity>
          <View style={styles.empty} />
        )}
        {/*  */}
      </Row>
      {isSearch && (
        <SearchInput
          onChangeText={onChangeText}
          placeholder={placeholder}
          mtop={mtop}
        />
      )}
      {/* {homeback && (
        <TouchableOpacity
          // style={{
          //   backgroundColor: colors.white,
          //   padding: mvs(5),
          //   borderRadius: mvs(7),
          // }}
          onPress={() => navigation?.goBack()}>
          <Icon
            name={I18nManager.isRTL ? 'arrowright' : 'arrowleft'}
            size={mvs(20)}
            color={colors.red}
          />
        </TouchableOpacity>
      )} */}
    </View>
  );
};
export default React.memo(HeaderXNot);
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    paddingHorizontal: mvs(22),
    paddingVertical: mvs(15),
  },
  empty: {
    width: mvs(10),
  },
  title: {
    fontSize: mvs(20),
    color: colors.white,
  },
  back: {},
});
