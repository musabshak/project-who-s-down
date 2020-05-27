import React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import MyEvents from '../components/my_events';
import Discovery from './discovery';
import NewEventPage from '../components/new_event';

const Tab = createBottomTabNavigator();

const MainTabBar = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Discovery"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let iconName;
                      
            // Customize the icon we display based on the tab route
            if (route.name === 'My Events') {
              iconName = 'calendar-outline';
            } 
            // Adding the search icon
            else if (route.name === 'Discovery') {
              iconName = 'compass-outline';
            }
            else if (route.name === 'New Events') {
              iconName = 'add-circle-outline';
            }
              
            // Return the respective icon
            return <Ionicons name={iconName} size={26} color={focused ? '#58AADA' : 'grey'} />;
          },
        })}
      >
        <Tab.Screen name="Discovery" component={Discovery} />
        <Tab.Screen name="New Events" component={NewEventPage} />
        <Tab.Screen name="My Events" component={MyEvents} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainTabBar;
