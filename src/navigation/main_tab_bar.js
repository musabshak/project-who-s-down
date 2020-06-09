/* eslint-disable react/no-string-refs */
/* eslint-disable no-alert */
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Button, Icon} from 'native-base';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'react-native-modal';

import GeographicView from '../components/geographic_view';
import EventList from '../components/event_list';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../assets/styles/event_info';
import { TouchableOpacity } from 'react-native-gesture-handler';



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
        // showLabel: false,
        activeTintColor: '#FF5722',
        // activeBackgroundColor: '#FF5722',
        style: {
          backgroundColor: '#fff',
          height: 0.12*SCREEN_HEIGHT,
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
                // position: 'absolute',
                // bottom: -7, // space from bottombar
                height: 1000,
                // width: 75,
                activeBackgroundColor: 'yellow',
                justifyContent: 'center',
                alignItems: 'center',
                // shadowOffset: { width: 1, height: 1 },
                // shadowColor: 'black',
                // shadowOpacity: 0.50,
              }}
            >
              <Icon type="MaterialCommunityIcons" name={ focused ? 'compass' : "compass-outline"} style={{ fontSize: 30, color: focused? '#FF5722' : '#ADADAD' }}/>
              {/* <Icon type="MaterialCommunityIcons" name={ focused ? 'compass' : "compass-outline"} style={{ fontSize: 30, color: '#FF5722' }}/> */}
              {/* <Ionicons name="compass" size={55} color={focused ? 'white' : '#FF5722'} /> */}
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
                console.log('token:',token);
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
          tabBarLabel: NullComponent,
          tabBarIcon: ({focused}) => (
            <View
              style={{
                // position: 'absolute',
                borderRadius: 100,
                backgroundColor: 'white',
                activeBackgroundColor: 'yellow',
                justifyContent: 'center',
                alignItems: 'center',
                // shadowOffset: { width: 5, height: 5 },
                // shadowColor: 'black',
                // shadowOpacity: 0.70,
              }}
            >
              <Modal 
                isVisible={modalVisible}
                backdropOpacity={0.5}
                onBackdropPress={() => setModalVisible(false)}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                  <View style={{
                    // borderColor: 'white',
                    // borderWidth: 2, 
                    display: 'flex',
                    // justifyContent: 'space-around',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    borderRadius: 5,
                    minHeight: 60,
                    maxWidth: '100%',
                    shadowOffset: { width: 2, height: 2 },
                    shadowColor: 'black',
                    shadowOpacity: 0.2,
                    shadowRadius: 5,
                    padding: 25,
                  }}
                  >
                    {/* <Text>
                      <Icon type="FontAwesome5" name="exclamation-triangle" style={{color: 'red', fontSize: 40 }} />
                    </Text> */}
                    <Icon type="MaterialCommunityIcons" name="alert-circle-outline" style={{ fontSize: 30, color: '#FF5722' }}/>
                    <Text style={{
                      color: '#757575',
                      fontFamily: 'OpenSans-Regular',
                      fontSize: 16,
                      textAlign: 'center', 
                      padding: 10,
                    }}
                    >You need to be signed in to create new events!
                    </Text>
                    {/* <View>
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
                          fontFamily: 'TitilliumWeb-Regular',
                          fontSize: 14, 
                        }}
                        >Dismiss
                        </Text>
                      </Button>
                    </View> */}
                  </View>
              </Modal>
              <TouchableOpacity
                activeOpacity={0.6}
                style={{
                }}
              >
                <Icon type="MaterialCommunityIcons" name='plus-circle-outline' style={{ fontSize: 60, color: '#FF5722' }}/>
              </TouchableOpacity>
            </View>
          ),
          tabBarVisible: false,
        }}
      />
      <Tab.Screen
        name="EventList"
        component={(EventList)}
        options={{
          tabBarLabel: 'Feed',
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                // shadowOffset: { width: 1, height: 1 },
                // shadowColor: 'black',
                // shadowOpacity: 0.50,
              }}
            >
              <Icon type="MaterialCommunityIcons" name="format-list-bulleted" style={{ fontSize: 30, color: focused ? '#FF5722' : '#ADADAD' }}/>
              {/* <Ionicons name="calendar" size={30} color={focused ? 'white' : '#FF5722'} /> */}
          </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabBar;
