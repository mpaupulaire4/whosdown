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
// import Create from './Create'
// import Community from './Community'
// import Squad from './Squad'
// import MyEvents from './MyEvents'
// import EventDetails from './EventDetails'
// import TabBar from '../components/TabBar'
// import { highlight4, highlight3 } from '../styles/colors';
// import HeaderBar from '../components/HeaderBar'

export const MyEventsStack = createStackNavigator({
  MyEvents,
  // EventDetails: {
  //   screen: EventDetails,
  //   navigationOptions: {
  //     tabBarVisible: false
  //   },
  // },
  // EditEvent: {
  //   screen: Create,
  //   navigationOptions: {
  //     tabBarVisible: false
  //   },
  // }
}, {
  initialRouteName: 'MyEvents',
  navigationOptions: {
    header: null
  }
})

// export const CommunityRouteConfig = {
//   Community: {
//     screen: Community,
//   },
//   Create: {
//     screen: Create,
//     navigationOptions: {
//       tabBarVisible: false
//     },
//   },
// }

const AppMain = createBottomTabNavigator({
  MyEvents: {
    screen: MyEventsStack,
    navigationOptions: {
      title: 'My Events',
    },
  },
  // Community: {
  //   screen: createStackNavigator(CommunityRouteConfig, {
  //     initialRouteName: 'Community',
  //     navigationOptions: {
  //       header: null
  //     }
  //   })
  // },
  Profile,
}, {
  tabBarPosition: 'bottom',
  lazy: true,
  swipeEnabled: true,
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
