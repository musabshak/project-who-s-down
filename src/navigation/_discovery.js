import React from 'react';
import { Button, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import EventList from '../components/event_list';
import EventInfo from '../components/event_info';
import GeographicDisplay from '../components/geographic_view';
import { signoutUser } from '../components/signin/actions';


const Stack = createStackNavigator();


// nest stack navigator to handle two internal views
// "name" prop is the name of the route
const Discovery = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Map View"
        component={GeographicDisplay}
        options={{
          title: 'Who\'s Down?',
          headerStyle: {
            backgroundColor: '#FF5722',
          },
          headerTintColor: '#fff',
          // headerTitle: (props) => <LogoTitle {...props} />,
          headerRight: () => (
            <Button
              onPress={() => (props.token ? props.signoutUser() : props.signoutUser(props.navigation.navigate))}
              title={props.userName ? 'Logout' : 'Login'}
              color="#fff"
            />
          ),
        }}
      />
      <Stack.Screen name="EventList"
        component={EventList}
        options={{
          title: 'Who\'s Down?',
          headerStyle: {
            backgroundColor: '#FF5722',
          },
          headerTintColor: '#fff',
          // headerTitle: (props) => <LogoTitle {...props} />,
          headerRight: () => (
            <Button
              onPress={() => (props.token ? props.signoutUser() : props.signoutUser(props.navigation.navigate))}
              title={props.userName ? 'Logout' : 'Login'}
              color="#fff"
            />
          ),
        }}
      />
      <Stack.Screen name="EventInfo"
        component={EventInfo}
        options={{
          title: 'Details',
          headerStyle: {
            backgroundColor: '#fffff',
          },
          headerTintColor: '#FF5722',
          // headerTitle: (props) => <LogoTitle {...props} />,
          headerRight: () => (
            <Button
              onPress={() => (props.token ? props.signoutUser() : props.signoutUser(props.navigation.navigate))}
              title={props.userName ? 'Logout' : 'Login'}
              color="#fff"
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const headerLeftHelper = () => {
  console.log('header left called!');
  return 'hi';
};

const mapStateToProps = (state) => {
  return ({
    userName: state.auth.userName,
    token: state.auth.token,
  });
};

export default connect(mapStateToProps, { signoutUser })(Discovery);
