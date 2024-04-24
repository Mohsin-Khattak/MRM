import {useIsFocused} from '@react-navigation/native';
import * as IMG from 'assets/images';
import DrawerHomeCard from 'components/molecules/drawer-home-card';
import {colors} from 'config/colors';
import {mvs, width} from 'config/metrices';
import {useAppDispatch, useAppSelector} from 'hooks/use-store';
import {t} from 'i18next';
import {navigate} from 'navigation/navigation-ref';
import React from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {onLogoutPress} from 'services/api/auth-api-actions';
import Medium from 'typography/medium-text';
const CustomDrawerContent = props => {
  const user = useAppSelector(s => s?.user);
  const userInfo = user?.userInfo;
  const dispatch = useAppDispatch();
  const [activeScreen, setActiveScreen] = React.useState('HomeTab');
  const isFocus = useIsFocused();

  React.useEffect(() => {
    if (isFocus) {
      setActiveScreen(null);
    }
  }, [isFocus]);
  const handleCardPress = screenName => {
    if (activeScreen === screenName) {
      // Deselect the active screen if pressed again
      setActiveScreen(null);
    } else {
      setActiveScreen(screenName);
      navigate(screenName);
    }
  };
  return (
    <View style={styles.drawerContainer}>
      <View style={styles.header}>
        <View style={styles.drawerheader}>
          <Image
            source={{
              uri:
                userInfo?.avatar ||
                'https://t3.ftcdn.net/jpg/01/18/01/98/360_F_118019822_6CKXP6rXmVhDOzbXZlLqEM2ya4HhYzSV.jpg',
            }}
            style={styles.drawerman}
          />
        </View>
        <Medium
          label={userInfo?.name || 'Guest Mode'}
          fontSize={mvs(18)}
          color={colors.white}
          style={{marginTop: mvs(6)}}
        />
        {/* <Medium
          label={`${userInfo?.email || 'guest@gmail.com'}`}
          fontSize={mvs(14)}
          color={colors.black}
          style={{marginTop: mvs(6)}}
        /> */}
      </View>
      <ScrollView style={styles.scrololstyle}>
        <DrawerHomeCard
          onPress={() => handleCardPress('HomeTab')}
          activeIcon={IMG.HomeActive}
          inactiveIcon={IMG.HomeSimple}
          label1={'Home'}
          screenName={'HomeTab'}
          isActive={activeScreen === 'HomeTab'}
          containerStyle={styles.helpStyle}
        />

        <DrawerHomeCard
          onPress={() => handleCardPress('MyOrderScreenScreen')}
          activeIcon={IMG.OrderActive}
          inactiveIcon={IMG.OrderSimple}
          label1={'Order'}
          screenName={'MyOrderScreenScreen'}
          isActive={activeScreen === 'MyOrderScreenScreen'}
          containerStyle={styles.helpStyle}
        />
        <DrawerHomeCard
          onPress={() => handleCardPress('RecoveryScreen')}
          activeIcon={IMG.RecoveryActive}
          inactiveIcon={IMG.Recovery}
          screenName={'RecoveryScreen'}
          label1={'Recovery'}
          isActive={activeScreen === 'RecoveryScreen'}
          containerStyle={styles.helpStyle}
        />

        <DrawerHomeCard
          onPress={() => handleCardPress('TrackingOrderScreen')}
          activeIcon={IMG.TrackingActive}
          inactiveIcon={IMG.TrackingSimple}
          label1={'Tracking'}
          screenName={'TrackingOrderScreen'}
          isActive={activeScreen === 'TrackingOrderScreen'}
          containerStyle={styles.helpStyle}
        />
        <DrawerHomeCard
          onPress={() => handleCardPress('CustomerScreen')}
          activeIcon={IMG.CustomerActive}
          inactiveIcon={IMG.Customer}
          label1={'Customer'}
          screenName={'CustomerScreen'}
          isActive={activeScreen === 'CustomerScreen'}
          containerStyle={styles.helpStyle}
        />
        <DrawerHomeCard
          onPress={() => handleCardPress('ReportScreen')}
          activeIcon={IMG.ReportActive}
          inactiveIcon={IMG.Report}
          label1={'Report'}
          screenName={'ReportScreen'}
          isActive={activeScreen === 'ReportScreen'}
          containerStyle={styles.helpStyle}
        />
        <DrawerHomeCard
          onPress={() => handleCardPress('CustomerWiseRecoveryScreen')}
          activeIcon={IMG.ReportActive}
          inactiveIcon={IMG.Report}
          label1={'Customerwise recovery'}
          screenName={'CustomerWiseRecoveryScreen'}
          isActive={activeScreen === 'CustomerWiseRecoveryScreen'}
          containerStyle={styles.helpStyle}
        />
        <DrawerHomeCard
          onPress={() => navigate('HelpUs')}
          activeIcon={IMG.SignoutActive}
          inactiveIcon={IMG.SignoutSimple}
          label1={'Sign Out'}
          containerStyle={styles.helpStyle}
        />
      </ScrollView>
    </View>
  );
};
export default CustomDrawerContent;
const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    // backgroundColor: colors.primary,
    // borderTopRightRadius: mvs(40),
    // borderBottomRightRadius: mvs(40),
  },
  header: {
    height: '30%',
    // width: width - 60,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    // borderBottomWidth: mvs(1),
    borderColor: colors.border,
    // backgroundColor: colors.primary,
  },
  needHelpContainer: {
    backgroundColor: colors.white,
    width: width - 100,
    marginHorizontal: mvs(17),
    borderRadius: mvs(8),
    // paddingHorizontal: mvs(17.5),
    marginVertical: mvs(8),
    alignItems: 'center',
    ...colors.shadow,
  },
  helpStyle: {margin: mvs(10), width: width - 120, height: mvs(27)},
  drawerlogo: {
    width: mvs(200),
    // height: mvs(100),
    resizeMode: 'contain',
  },
  drawerheader: {
    height: mvs(100),
    width: mvs(100),
    borderRadius: mvs(50),
    borderWidth: mvs(3),
    borderColor: colors.primary,
    backgroundColor: colors.transparent,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  drawerman: {
    height: '100%',
    width: '100%',
    borderRadius: mvs(50),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  scrololstyle: {
    flexGrow: 1,
    paddingVertical: mvs(10),
    // borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginBottom: mvs(10),
  },
});
