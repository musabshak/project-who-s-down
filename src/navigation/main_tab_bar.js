import React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import MyEvents from '../components/my_events';
import Discovery from './discovery';
import AddEvents from '../components/new_event';
import Header from './header.js'
const Tab = createBottomTabNavigator();

const MainTabBar = () => {
  return (
        <Tab.Navigator
          initialRouteName="Discovery"
          tabBarOptions={{
            showLabel: false,
            activeTintColor: '#e91e63',
            activeBackgroundColor: '#FF5722',
            style: {
            backgroundColor: '#ffff1',
            height:60,


          }}}
        >
          <Tab.Screen
            name="Discovery"
            component={Discovery}
            options={{
              
             tabBarLabel: 'Discovery',
               tabBarIcon: ({ focused }) => (
                <View
                style={{
                  position: 'absolute',
                  bottom: -7, // space from bottombar
                  height: 75,
                  width: 75,
                  activeBackgroundColor: 'yellow',
                  justifyContent: 'center',
                  alignItems: 'center',
                  shadowOffset:{  width: 1,  height: 1,  },
                  shadowColor: 'black',
                  shadowOpacity: .50,
                }}>
              <Ionicons name={"compass"} size={55} color={focused ? 'white' : '#FF5722'} />
              </View>
           ),
          }}/>
          <Tab.Screen
            name="New Event"
            component={AddEvents}
            options={{
             tabBarIcon: ({focused}) => (
              <View
                style={{
                  position: 'absolute',
                  bottom: 5, // space from bottombar
                  height: 75,
                  width: 75,
                  borderRadius: 100,
                  backgroundColor: 'white',
                  activeBackgroundColor: 'yellow',
                  justifyContent: 'center',
                  alignItems: 'center',
                  shadowOffset:{  width: 5,  height: 5,  },
                  shadowColor: 'black',
                  shadowOpacity: .70,
                }}>
                <Ionicons name={"plus-circle"} size={65} color={'#FF5722' } />
              </View>
            ),
          }}/>
          <Tab.Screen
            name="My Events"
            component={MyEvents}
            options={{
             tabBarLabel: 'My Events',
               tabBarIcon: ({ focused }) => (
                <View
                style={{
                  position: 'absolute',
                  bottom: -7, // space from bottombar
                  height: 75,
                  width: 75,
                  activeBackgroundColor: 'yellow',
                  justifyContent: 'center',
                  alignItems: 'center',
                  shadowOffset:{  width: 1,  height: 1,  },
                  shadowColor: 'black',
                  shadowOpacity: .50,
                }}>
              <Ionicons name={"calendar"} size={40} color={focused ? 'white' : '#FF5722'}/>
              </View>
           ),
          }}/>
        </Tab.Navigator>
    );
};

export default MainTabBar;
