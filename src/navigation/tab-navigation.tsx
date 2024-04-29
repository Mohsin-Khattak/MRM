import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from 'config/colors';
import * as React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomerScreen from 'screens/customer';
import HomeTab from 'screens/home-tab';
import MyOrderScreenScreen from 'screens/my-order';
import UserTab from 'screens/user-tab';
import TabParamList from '../types/navigation-types/bottom-tab';
const Tab = createBottomTabNavigator();
const BottomTab = createNativeStackNavigator<TabParamList>();
const TabNavigator = () => {
  return (
    <Tab.Navigator
    tabBarOptions={{
      labelStyle: {marginBottom:5},
    }}
    
      screenOptions={({ route }) => ({

        headerShown: false,
        tabBarLabel: () => null,
        unmountOnBlur: true,
        tabBarIcon: ({ focused, color, size }) => {

         let iconName = 'home';
          if (route.name === 'HomeTab') {
                iconName = 'home';
          } else if (route.name === 'CustomerScreen') {
            iconName = 'users';
          } else if (route.name === 'MyOrderScreenScreen') {
            iconName = 'search';
          } else if (route. name === 'UserTab') {
            iconName = 'user';
          }
          // You can return any component that you like here!
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: 'gray',
  
      })}>
      <BottomTab.Screen
       name="HomeTab"
       component={HomeTab}
       options={{
        tabBarIcon: ({ focused, color, size }) => (
          <MaterialIcons name="dashboard" size={20} color={color} />
        ),
        tabBarLabel: 'Dash Board',
      }}
       />
      <BottomTab.Screen name="MyOrderScreenScreen"
      component={MyOrderScreenScreen} 

       options={{
          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesome name="list" size={20} color={color} />
            
          ),
          tabBarLabel: 'My Orders',
        }}
      />
      <BottomTab.Screen name="CustomerScreen"
     
      component={CustomerScreen}
      options={{
        tabBarIcon: ({ focused, color, size }) => (
          <FontAwesome name="users" size={20} color={focused? colors.primary:'gray' } />
        ),
        tabBarLabel: 'Customers',
        
      }}
      />
      <BottomTab.Screen name="UserTab"
      component={UserTab}
      options={{
        tabBarIcon: ({ focused, color, size }) => (
          <FontAwesome name="user" size={20} color={color} />
        ),
        tabBarLabel: 'User',
      }}
      />
    </Tab.Navigator>
  );
};
export default TabNavigator;
