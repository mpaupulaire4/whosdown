import {
  createStackNavigator,
  createSwitchNavigator
}   from 'react-navigation';
import React from 'react'
import Login from './Login'
// import Create from './Create'
// import Community from './Community'
// import Squad from './Squad'
// import Profile from './Profile'
// import MyEvents from './MyEvents'
// import EventDetails from './EventDetails'
// import TabBar from '../components/TabBar'
// import { highlight4, highlight3 } from '../styles/colors';
// import HeaderBar from '../components/HeaderBar'

// export const MyEventsRouteConfig = {
//   MyEvents: {
//     screen: MyEvents,
//   },
//   EventDetails: {
//     screen: EventDetails,
//     navigationOptions: {
//       tabBarVisible: false
//     },
//   },
//   EditEvent: {
//     screen: Create,
//     navigationOptions: {
//       tabBarVisible: false
//     },
//   }
// }

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

export const RootRouteConfig = {
  Login,
  // MyEvents: {
  //   screen: createStackNavigator(MyEventsRouteConfig, {
  //     initialRouteName: 'MyEvents',
  //     navigationOptions: {
  //       header: null
  //     }
  //   }),
  //   navigationOptions: {
  //     title: 'My Events',
  //   },
  // },
  // Community: {
  //   screen: createStackNavigator(CommunityRouteConfig, {
  //     initialRouteName: 'Community',
  //     navigationOptions: {
  //       header: null
  //     }
  //   })
  // },
  // Profile: {
  //   screen: Profile,
  // },
};


export default AppNav = createSwitchNavigator(
  RootRouteConfig,
  {
    initialRouteName: 'Login',
  }
);
