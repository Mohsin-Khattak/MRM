import {NativeStackScreenProps} from '@react-navigation/native-stack';
import * as IMG from 'assets/images';
import {SplashIcon} from 'assets/icons';
import {splash_bg} from 'assets/images';
import React from 'react';
import {ImageBackground, View, Image, TouchableOpacity} from 'react-native';
import i18n from 'translation';
import {STORAGEKEYS} from '../../config/constants';
import {
  setLanguage,
  setLocation,
  setUserInfo,
} from '../../store/reducers/user-reducer';
import RootStackParamList from '../../types/navigation-types/root-stack';
import {UTILS} from 'utils';
import {useAppDispatch} from 'hooks/use-store';
import styles from './styles';
import {mvs, width} from 'config/metrices';
import Medium from 'typography/medium-text';
import {t} from 'i18next';
import {colors} from 'config/colors';
import {getUserInfo} from 'services/api/auth-api-actions';

type props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const Splash = (props: props) => {
  const {navigation} = props;
  const dispatch = useAppDispatch();

  // React.useEffect(() => {
  //   dispatch(getLocations());
  // }, []);
  React.useEffect(() => {
    (async () => {
      try {
        let screen: any = 'Login';
        UTILS.get_current_location(
          position => {
            dispatch(
              setLocation({
                latitude: position?.coords?.latitude,
                longitude: position?.coords?.longitude,
              }),
            );
          },
          error => {},
        );
        UTILS.getItem(STORAGEKEYS.lang).then((lang: any) => {
          i18n.changeLanguage(lang);
          dispatch(setLanguage(lang ?? 'en'));
        });

        UTILS.getItem(STORAGEKEYS.user).then((data: any) => {
          if (data) {
            const user = JSON.parse(data);
            screen = 'Drawer';
            dispatch(setUserInfo(user));
          }
          setTimeout(() => {
            navigation?.replace(screen);
          }, 2000);
        });
      } catch (error) {}
    })();
  }, []);

  return (
    <View style={{...styles.container}}>
      {/* <ImageBackground
        source={IMG.splashbackground}
        resizeMode="cover"
        style={{width: '100%', height: '100%'}}> */}
      {/* <TouchableOpacity style={styles.skipbutton}>
          <Medium label={t('Skip')} color={colors.white} fontSize={mvs(24)} />
        </TouchableOpacity> */}
      <View
        style={{
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          // marginTop: '30%',
        }}>
        <Image
          source={IMG.Logo}
          resizeMode={'contain'}
          style={{width: mvs(250), height: mvs(250)}}
        />
        {/* <Image
          source={IMG.LogoText}
          resizeMode={'contain'}
          style={{width: mvs(250), height: mvs(100)}}
        /> */}
      </View>
      {/* </ImageBackground> */}
    </View>
  );
};
export default Splash;
