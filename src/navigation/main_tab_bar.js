import React from 'react';
import { Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import EventList from '../components/event_list';
import GeographicView from '../components/geographic_view';
import AddEvents from '../components/new_event';


const Tab = createBottomTabNavigator();

const NullComponent = () => null;

// const NewEventStack = createStackNavigator();

// const NewEventStackScreen = () => {
//   return (
//     <NewEventStack.Navigator>
//       <NewEventStack.Screen name="newEventPage"
//         component={AddEvents}
//         options={{
//           gestureEnabled: false,
//         }}
//       />
//     </NewEventStack.Navigator>
//   );
// };

const MainTabBar = (props) => {
  return (
    <Tab.Navigator
      initialRouteName="GeographicView"
      // shifting
      tabBarOptions={{
        showLabel: false,
        activeTintColor: '#e91e63',
        activeBackgroundColor: '#FF5722',
        style: {
          backgroundColor: '#ffff1',
          height: 60,
        },
      }}
    >
      <Tab.Screen
        name="GeographicView"
        component={GeographicView}
        options={{
          tabBarLabel: 'Map',
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
                shadowOffset: { width: 1, height: 1 },
                shadowColor: 'black',
                shadowOpacity: 0.50,
              }}
            >
              <Ionicons name="compass" size={55} color={focused ? 'white' : '#FF5722'} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="New Event"
        // component={(AddEvents)}
        component={NullComponent}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            // Prevent default action
            e.preventDefault();
      
            // Do something with the `navigation` object
            navigation.navigate('NewEvent');
          },
        })}
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
                shadowOffset: { width: 5, height: 5 },
                shadowColor: 'black',
                shadowOpacity: 0.70,
              }}
            >
              <Ionicons name="plus-circle" size={65} color="#FF5722" />
            </View>
          ),
          tabBarVisible: false,
        }}
      />
      <Tab.Screen
        name="EventList"
        component={(EventList)}
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
                shadowOffset: { width: 1, height: 1 },
                shadowColor: 'black',
                shadowOpacity: 0.50,
              }}
            >
              <Ionicons name="calendar" size={40} color={focused ? 'white' : '#FF5722'} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabBar;
