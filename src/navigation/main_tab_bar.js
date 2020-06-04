import React, { useState } from 'react';
import {
  Text, View, Button, TouchableOpacity, Dimensions,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import Discovery from './discovery';
import NewEventPage from '../components/new_event';
import { styles } from '../../assets/styles/signin';
import EventList from '../components/event_list';

const DEVICE_WIDTH = Dimensions.get('window').width;

// const TabBarBtn = (props) => {
//   return (
//     <TouchableOpacity
//       style={{
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#FF5722',
//         width: '33%',
//       }}
//     >
//       <Ionicons name={props.name} size={40} color="#58AADA" />
//     </TouchableOpacity>
//   );
// };

const NewEventModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <TouchableOpacity
        onPress={() => { setModalVisible(true); }}
        style={{
          position: 'absolute', left: '50%', zIndex: 1,
        }}
      >
        <Ionicons name="plus-circle" size={40} color="#58AADA" style={{ left: -16, marginTop: 0 }} />
      </TouchableOpacity>
      <View style={styles.container}>
        <Modal
          backdropOpacity={0.3}
          isVisible={modalVisible}
          onBackdropPress={() => setModalVisible(false)}
          style={styles.contentView}
        >
          {/* <View style={styles.content}>
            <Text style={styles.contentTitle}>Hi!</Text>
            <Text>Hello from Overlay!</Text>
          </View> */}
          <NewEventPage nav_return={() => setModalVisible(false)} />
        </Modal>
      </View>
    </>
  );
};


const Tab = createBottomTabNavigator();

const MainTabBar = (props) => {
  return (
    <Tab.Navigator
      initialRouteName="Discovery"
      tabBarOptions={{
        style: {
          position: 'absolute',
          backgroundColor: 'white',
          // width: DEVICE_WIDTH * 0.98,
          borderBottomLeftRadius: 33,
          borderBottomRightRadius: 33,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          // bottom: 12,
          // marginLeft: '2.8%',
          shadowColor: '#000000',
          shadowOffset: {
            width: 0,
            height: 0.3,
          },
          shadowRadius: 5,
          shadowOpacity: 0.1,
        },
      }}
      screenOptions={({ route }) => ({
        
        tabBarIcon: ({ focused }) => {
          let iconName;
                    
          // Customize the icon we display based on the tab route
          if (route.name === 'List') {
            iconName = 'list';
          } 
          // Adding the search icon
          else if (route.name === 'Discovery') {
            iconName = 'compass';
          }
          // else if (route.name === 'New Event') {
          //   iconName = 'plus-circle';
          // }
          // Return the respective icon
          return <Ionicons style={{ textAlign: 'center', textAlignVertical: 'center' }} name={iconName} size={26} color={focused ? '#58AADA' : 'grey'} />;
        },
      })}
    >
      <Tab.Screen
        name="Discovery"
        component={Discovery} 
        options={{
          // tabBarButton: () => (<TabBarBtn name="compass" />),
        }} 
      />
      <Tab.Screen
        name="New Event"
        component={() => null}
        options={{
          tabBarButton: () => (<NewEventModal />),
        }} 
      />
      <Tab.Screen
        name="List"
        component={EventList}
        options={{
          // tabBarButton: () => (<TabBarBtn name="calendar" />),
        }} 
      />
    </Tab.Navigator>
  );
};

export default MainTabBar;
