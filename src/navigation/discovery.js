import React from 'react';
import { Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import EventList from '../components/event_list';
import EventDetail from '../components/event_detail';
import MapView from '../components/geographic_view';


const Stack = createStackNavigator();

// nest stack navigator to handle two internal views
// "name" prop is the name of the route
const Discovery = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Search"
        component={MapView}
        options={{
          title: ' Map Events',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen name="EventList" component={EventList} />
      <Stack.Screen name="EventDetail" component={EventDetail} />
    </Stack.Navigator>
  );
};

export default Discovery;
