import {createDrawerNavigator} from '@react-navigation/drawer';
import {TabBar} from 'navigation/curvedtabs';
import React from 'react';
import {width} from 'config/metrices';
import CustomDrawerContent from './drawer-content';
import HomeTab from 'screens/home-tab';
const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          // backgroundColor: '#c6cbef',
          width: width - 60,
        },
        headerShown: false,
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="HomeTab" component={HomeTab} />
      {/* <Drawer.Screen name="TabBar" component={TabBar} /> */}
    </Drawer.Navigator>
  );
};
export default DrawerNavigation;
