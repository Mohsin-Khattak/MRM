import {createDrawerNavigator} from '@react-navigation/drawer';
import {TabBar} from 'navigation/curvedtabs';
import React from 'react';
import {mvs, width} from 'config/metrices';
import CustomDrawerContent from './drawer-content';
import HomeTab from 'screens/home-tab';
import {colors} from 'config/colors';
import TabNavigator from 'navigation/tab-navigation';
const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          // backgroundColor: '#c6cbef',
          width: '60%',
          backgroundColor: colors.primary,
          borderTopRightRadius: mvs(40),
          borderBottomRightRadius: mvs(40),
        },
        headerShown: false,
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      {/* <Drawer.Screen name="HomeTab" component={HomeTab} /> */}
      <Drawer.Screen name="TabNavigator" component={TabNavigator} />
      {/* <Drawer.Screen name="TabBar" component={TabBar} /> */}
    </Drawer.Navigator>
  );
};
export default DrawerNavigation;
