import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, useIsFocused } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Loader } from 'components/atoms/loader';
import { colors } from 'config/colors';
import { mvs } from 'config/metrices';
import { useAppDispatch, useAppSelector } from 'hooks/use-store';
import React from 'react';
import { Alert, Image, ScrollView, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getNotifications, onLogoutPress } from 'services/api/auth-api-actions';
import TabParamList from 'types/navigation-types/bottom-tab';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import i18n from '../../translation/index';
import RootStackParamList from '../../types/navigation-types/root-stack';
import styles from './styles';

type props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'UserTab'>,
  NativeStackScreenProps<RootStackParamList>
>;
const UserTab = (props: props) => {
  const user = useAppSelector(s => s?.user);
  const userInfo = user?.userInfo;
  const isFocus =useIsFocused();

  const dispatch = useAppDispatch();
  const { t } = i18n;
  const [loading, setLoading] = React.useState(false);
  const loadNotifications = async () => {
    try {
      if (!userInfo?.id) return;
      dispatch(getNotifications(setLoading));
    } catch (error) {
      console.log('error=>', error);
    }
  };
  React.useEffect(() => {
    loadNotifications();
  }, [isFocus]);


  const LogoutAccount = async () => {
    Alert.alert('Logout!', 'Are you sure you want to Logout your account?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Logout',
        onPress: () => {
          userInfo
            ? dispatch(onLogoutPress())
            : props?.navigation?.navigate('Login');
        },
      },
    ]);
  };
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={{ ...styles.img }}>
          {loading ? (
            <Loader color={colors.white} />
          ) : (
            <Image
            source={{uri: userInfo?.avatar || 'https://t3.ftcdn.net/jpg/01/18/01/98/360_F_118019822_6CKXP6rXmVhDOzbXZlLqEM2ya4HhYzSV.jpg'}}
              style={styles.imgUpload}
              resizeMode="cover"
            />
          )}

        </View>
        <Medium label={userInfo?.name || t('guest_mode')} style={styles.name} />
        <Regular
          label={`${userInfo?.email || 'guest@gmail.com'}`}
          style={styles.email}
        />

        <View style={styles.linkContainer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1, paddingBottom: mvs(100) }}>
            {userInfo && (
              <TouchableOpacity
                style={styles.itemtabs}
                onPress={() => props?.navigation?.navigate('TotalOrderScreen')}>
                <FontAwesome
                  name="shopping-cart"
                  size={mvs(22)}
                  color={colors.primary}
                />
                <Regular style={styles.itemText1} label={`${t('my_order')}`} />
              </TouchableOpacity>
            )}
            {/* <TouchableOpacity
              style={styles.itemtabs}
              onPress={() => props?.navigation?.navigate('LanguageScreen')}>
              <FontAwesome5
                name="globe"
                size={mvs(22)}
                color={colors.primary}
              />
              <Regular
                style={styles.itemText1}
                label={`${t('choose_language')}`}
              />
            </TouchableOpacity> */}
            {userInfo && (
              <TouchableOpacity
                style={styles.itemtabs}
                onPress={() =>
                  props?.navigation?.navigate('EditProfileScreen')
                }>
                <Ionicons
                  name="documents"
                  size={mvs(22)}
                  color={colors.primary}
                />
                <Regular
                  style={styles.itemText1}
                  label={`${t('edit_profile')}`}
                />
              </TouchableOpacity>
            )}
            {/* {userInfo && ( */}

            {/* <TouchableOpacity
              style={styles.itemtabs}
              onPress={() => props?.navigation?.navigate('WhereToMoveScreen')}>
              <FontAwesome5 name="car" size={mvs(22)} color={colors.primary} />
              <Regular
                style={styles.itemText1}
                label={`${t('where_to_move')}`}
              />
            </TouchableOpacity> */}
            {userInfo && (
              <TouchableOpacity
                style={styles.itemtabs}
                onPress={() =>
                  props?.navigation?.navigate('TermsandConditionsScreen')
                }>
                <Foundation
                  name="clipboard-notes"
                  size={mvs(22)}
                  color={colors.primary}
                />
                <Regular
                  style={styles.itemText1}
                  label={`${t('terms_and_conditions')}`}
                />
              </TouchableOpacity>
            )}
            {userInfo && (
              <TouchableOpacity
                style={styles.itemtabs}
                onPress={() =>
                  props?.navigation?.navigate('PrivacyPolicyScreen')
                }>
                <MaterialIcons
                  name="policy"
                  size={mvs(22)}
                  color={colors.primary}
                />
                <Regular
                  style={styles.itemText1}
                  label={`${t('return_policy & private_policy')}`}
                />
              </TouchableOpacity>
            )}
            {/* )} */}
            {/* <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',

              width: '100%',
              paddingBottom: mvs(60),
            }}> */}
            <TouchableOpacity
              style={styles.itemtabs}
              onPress={() =>
                userInfo
                  ? dispatch(onLogoutPress())
                  : props?.navigation?.navigate('Login')
              }>
              <AntDesign
                name={`${userInfo ? 'logout' : 'login'}`}
                size={mvs(22)}
                color={colors.red}
              />
              <Regular
                style={styles.itemText1}
                label={`${t(userInfo ? 'logout' : 'login')}`}
              />
            </TouchableOpacity>

            {/* </View> */}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};
export default UserTab;
