import {
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import React from 'react'
import AppLoading from './AppLoading'
import Login from './Login'
import Profile from './Profile'
import MyEvents from './MyEvents'
import Community from './Community'
import EventDetails from './EventDetails'
import EditEvent from './EditEvent'
// import Squad from './Squad'
// import TabBar from '../components/TabBar'
// import { highlight4, highlight3 } from '../styles/colors';
import HeaderBar from '../components/HeaderBar'

export const MyEventsStack = createStackNavigator({
  MyEvents,
  EventDetails,
  EditEvent,
}, {
  initialRouteName: 'MyEvents',
  navigationOptions: {
    header: null
  }
})

const AppMain = createBottomTabNavigator({
  MyEvents: {
    screen: MyEventsStack,
    navigationOptions: {
      title: 'My Events',
    },
  },
  Community,
  Profile,
}, {
  initialRouteName: 'Community',
  tabBarPosition: 'bottom',
  lazy: true,
  animationEnabled: true,
  removeClippedSubviews: true,
})
export const RootRouteConfig = {
  Login,
  AppLoading,
  AppMain
};


export default AppNav = createSwitchNavigator(
  RootRouteConfig,
  {
    initialRouteName: 'AppLoading',
  }
);
