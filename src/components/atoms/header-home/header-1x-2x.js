import {useNavigation} from '@react-navigation/native';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {useAppSelector} from 'hooks/use-store';
import {navigate} from 'navigation/navigation-ref';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Regular from 'typography/regular-text';
import {SearchInput} from '../inputs';
import {Row} from '../row';
import * as IMG from 'assets/images';
const HeaderX = ({
  style = {},
  mtop = 0,
  title,
  back = true,
  onChangeText = t => {},
  isSearch = false,
  isMenu = false,
  unreadNotification,
  placeholder = 'Search here',
  ...props
}) => {
  const navigation = useNavigation();
  const [isOnline, setIsOnline] = React.useState(true);
  const user = useAppSelector(s => s?.user);
  const userInfo = user?.userInfo;
  return (
    <View style={[styles.container, style]}>
      <Row style={{alignItems: 'center', justifyContent: 'space-between'}}>
        <TouchableOpacity onPress={() => navigation?.toggleDrawer()}>
          {/* <MaterialCommunityIcons
            name={'menu'}
            size={mvs(30)}
            color={colors.primary}
          /> */}
          <Image
            source={IMG.MenuHome}
            style={{width: mvs(25), height: mvs(25), resizeMode: 'contain'}}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigate('Notifications')}>
          <Ionicons
            name={'notifications'}
            size={mvs(25)}
            color={colors.primary}
          />

          {userInfo?.id && (
            <View style={styles.notificationContainer}>
              <Regular fontSize={mvs(10)} label={unreadNotification} />
            </View>
          )}
        </TouchableOpacity>
      </Row>
      {isSearch && (
        <SearchInput
          onChangeText={onChangeText}
          placeholder={placeholder}
          mtop={mtop}
        />
      )}
    </View>
  );
};
export default React.memo(HeaderX);
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
    fontSize: mvs(18),
    color: colors.white,
  },
  back: {},

  notificationContainer: {
    backgroundColor: colors.white,
    width: mvs(20),
    height: mvs(20),
    borderRadius: mvs(10),
    position: 'absolute',
    right: mvs(-10),
    top: mvs(-10),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
