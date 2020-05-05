
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StatusBar, View, BackHandler } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import ExploreTab from '../components/MainScreen/ExploreTab';
import ProfileTab from '../components/MainScreen/ProfileTab';
import CalendarTab from '../components/HostScreen/CalendarTab';
import RoomScreen from '../components/RoomScreen';
import AuthenticationScreen from '../components/AuthenticationScreen';
import FilterModal from '../components/FilterModal';
import BookingModal from '../components/BookingModal';
import CalendarModal from '../components/CalendarModal';

import Icon from 'react-native-vector-icons/Ionicons';

const MainTab = createBottomTabNavigator();
function MainStackScreen() {
  return (
    <MainTab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Explore') {
            iconName = 'ios-search';
          } else if (route.name === 'Profile') {
            iconName = 'ios-person';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        showIcon: true,
        activeTintColor: '#FF5A60',
        inactiveTintColor: '#3A3A3A',
        labelStyle: {
          fontSize: 10,
          fontWeight: 'bold'
        },
        tabStyle: {
          paddingBottom: 0,
          borderTopWidth: 1,
          borderTopColor: 'lightgray',
          backgroundColor: 'white'
        },
        style: {
          backgroundColor: 'white',
        },
      }}>
      <MainTab.Screen name="Explore" component={ExploreTab} />
      <MainTab.Screen name="Profile" component={ProfileTab} />
    </MainTab.Navigator>
  );
}

const HostTab = createBottomTabNavigator();
function HostStackScreen() {
  return (
    <HostTab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'CALENDAR') {
            iconName = 'ios-calendar';
          } else if (route.name === 'Profile') {
            iconName = 'ios-person';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        showIcon: true,
        activeTintColor: '#007B7F',
        inactiveTintColor: '#3A3A3A',
        labelStyle: {
          fontSize: 10,
          fontWeight: 'bold'
        },
        tabStyle: {
          paddingBottom: 0,
          borderTopWidth: 1,
          borderTopColor: 'lightgray',
          backgroundColor: 'white'
        },
        style: {
          backgroundColor: 'white',
        },
      }}>
      <HostTab.Screen name="CALENDAR" component={CalendarTab} />
      <HostTab.Screen name="Profile" component={ProfileTab} />
    </HostTab.Navigator>
  );
}

export const AppNavigator = createStackNavigator();

class AppWithNavigationState extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="#000"/>
        <AppNavigator.Navigator initialRouteName="Authentication">
          <AppNavigator.Screen name="Main" component={MainStackScreen} options={{ headerShown: false }} />
          <AppNavigator.Screen name="Host" component={HostStackScreen} options={{ headerShown: false }} />
          <AppNavigator.Screen name="Authentication" component={AuthenticationScreen} options={{ headerShown: false }} />
          <AppNavigator.Screen name="Room" component={RoomScreen} options={({ route }) => ({ title: route.params.item.title })} />
          <AppNavigator.Screen name="Filter" component={FilterModal} options={{title: '',headerStyle: {backgroundColor: '#007B7F',elevation: 0},headerTintColor: '#E2E2E2'}} />
          <AppNavigator.Screen name="Booking" component={BookingModal} options={{title: '', headerStyle: {backgroundColor: '#007B7F',elevation: 0},headerTintColor: '#E2E2E2'}} />
          <AppNavigator.Screen name="Calendar" component={CalendarModal} options={({ route }) => ({title: route.params.item.title, headerStyle: {backgroundColor: '#007B7F',elevation: 0},headerTintColor: '#E2E2E2'})} />
        </AppNavigator.Navigator> 
      </View>
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(AppWithNavigationState);
