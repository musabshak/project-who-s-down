/* eslint-disable react/no-string-refs */
/* eslint-disable no-alert */
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Button, Icon} from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'react-native-modal';

import GeographicView from '../components/geographic_view';
import EventList from '../components/event_list';
import MyEvents from '../components/my_events';
// import Discovery from './discovery';
import AddEvents from '../components/new_event';
import DownEvents from '../components/down_events';
import myEvents from '../components/my_events';



const Tab = createBottomTabNavigator();

const NullComponent = () => null;

// const getToken = async (key) => {
//   try {
//     const token = await AsyncStorage.getItem(key);
//     console.log(token);
//     console.log(token !== null);
//   } catch (e) {
//     console.log('could not get token');
//   }
// };

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
  const [modalVisible, setModalVisible] = useState(false);
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
            
            // Allow access to new event page only if user is logged in
            AsyncStorage.getItem('token').then(
              (token) => {
                if (token !== null) {
                  navigation.navigate('NewEvent');
                } else {
                  // alert('You need to be logged in to create a new event!');
                  setModalVisible(true);
                } },
            );
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
              <Modal 
                isVisible={modalVisible}
                backdropOpacity={0.3}
                onBackdropPress={() => setModalVisible(false)}
              >
                <View style={{
                  flex: 1, 
                  // borderColor: 'white',
                  // borderWidth: 2, 
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                >
                  <View style={{
                    // borderColor: 'white',
                    // borderWidth: 2, 
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    backgroundColor: 'floralwhite',
                    borderRadius: 10,
                    minHeight: 180,
                  }}
                  >
                    <Text>
                      <Icon type="FontAwesome5" name="exclamation-triangle" style={{color: 'red', fontSize: 40 }} />
                    </Text>
                    <Text style={{
                      color: 'red',
                      fontSize: 20,
                      textAlign: 'center', 
                    }}
                    >You need to be signed in to create new events!
                    </Text>
                    <View>
                      <Button 
                        style={{
                          backgroundColor: 'white',
                          borderRadius: 10,
                          width: 150,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        onPress={() => setModalVisible(false)}
                      >
                        <Text style={{
                          color: 'black',
                          // fontFamily: 'TitilliumWeb-Regular',
                          fontSize: 17, 
                        }}
                        >Okay
                        </Text>
                      </Button>
                    </View>
                  </View>
                </View>
              </Modal>

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
