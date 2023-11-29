// In App.js in a new project
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {colors} from 'config/colors';
import * as React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CategoriesScreen from 'screens/categories';
import EditProfileScreen from 'screens/edit-profile';
import ForgotPasswordScreen from 'screens/forgot-password';
import FurnitureItemsScreen from 'screens/furniture-items';
import HelpUs from 'screens/help-us';
import HistoryScreen from 'screens/history';
import InboxScreen from 'screens/inbox-screen';
import LanguageScreen from 'screens/language-screen';
import LocationSetup from 'screens/location-setup';
import LoginScreen from 'screens/login-screen';
import {
  default as MessageHomeScreen,
  default as MesssageHomeScreen,
} from 'screens/messageHome';
import Notifications from 'screens/notifications';
import Onboarding from 'screens/on-boarding';
import OrderDetailsScreen from 'screens/order-details';
import OurServicesScreen from 'screens/our-services';
import PrivacyPolicyScreen from 'screens/privacy-policy';
import ResetPasswordScreen from 'screens/reset-password';
import Search from 'screens/search';
import ShoppingScreen from 'screens/shopping';
import Signup from 'screens/signup';
import SignupNext from 'screens/signup-part-2';
import Splash from 'screens/splash';
import TermsandConditionsScreen from 'screens/terms-and-conditions';
import TotalOrderScreen from 'screens/total-order-request';
import Tracking from 'screens/tracking';
import WhereToMoveScreen from 'screens/where-to-move';
import {horizontalAnimation} from '../utils';
import DrawerNavigation from './drawer-navigation/drawer-navigation';
const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex: 0, backgroundColor: colors.primary}} />
      <StatusBar
        translucent={false}
        backgroundColor={colors.white}
        barStyle={'dark-content'}
      />
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={horizontalAnimation}>
        <Stack.Group>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen
            name="ForgotPasswordScreen"
            component={ForgotPasswordScreen}
          />
          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
          />
          <Stack.Screen name="SignupNext" component={SignupNext} />
          <Stack.Screen name="Notifications" component={Notifications} />
          <Stack.Screen name="LanguageScreen" component={LanguageScreen} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen
            name="OurServicesScreen"
            component={OurServicesScreen}
          />
          <Stack.Screen name="TotalOrderScreen" component={TotalOrderScreen} />
          <Stack.Screen name="InboxScreen" component={InboxScreen} />
          <Stack.Screen
            name="TermsandConditionsScreen"
            component={TermsandConditionsScreen}
          />
          <Stack.Screen
            name="EditProfileScreen"
            component={EditProfileScreen}
          />
          <Stack.Screen
            name="MesssageHomeScreen"
            component={MesssageHomeScreen}
          />
          <Stack.Screen
            name="FurnitureItemsScreen"
            component={FurnitureItemsScreen}
          />

          <Stack.Screen
            name="PrivacyPolicyScreen"
            component={PrivacyPolicyScreen}
          />

          <Stack.Screen name="HistoryScreen" component={HistoryScreen} />
          <Stack.Screen
            name="OrderDetailsScreen"
            component={OrderDetailsScreen}
          />
          <Stack.Screen name="CategoriesScreen" component={CategoriesScreen} />
          <Stack.Screen
            name="MessageHomeScreen"
            component={MessageHomeScreen}
          />

          <Stack.Screen name="ShoppingScreen" component={ShoppingScreen} />

          <Stack.Screen
            name="WhereToMoveScreen"
            component={WhereToMoveScreen}
          />
        </Stack.Group>
        {/* location group */}
        <Stack.Group>
          <Stack.Screen name="LocationSetup" component={LocationSetup} />
        </Stack.Group>
        <Stack.Screen name="Drawer" component={DrawerNavigation} />
        <Stack.Screen name="HelpUs" component={HelpUs} />
        <Stack.Screen name="Tracking" component={Tracking} />
      </Stack.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
});
