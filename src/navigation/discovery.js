import React from 'react';
import { Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import EventList from '../components/event_list';
import EventDetail from '../components/event_detail';
import GeographicDisplay from '../components/geographic_view';
import { signoutUser } from '../components/signin/actions';


const Stack = createStackNavigator();


// nest stack navigator to handle two internal views
// "name" prop is the name of the route
const Discovery = (props) => {
  console.log('Checking token!');
  console.log(props.token);
  return (
    <Stack.Navigator>
      <Stack.Screen name="Search"
        component={GeographicDisplay}
        options={{
          title: ' Map Events',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          // headerTitle: (props) => <LogoTitle {...props} />,
          headerRight: () => (
            <Button
              onPress={() => (props.token ? props.signoutUser() : props.signoutUser(props.navigation.navigate))}
              title={props.userName ? props.userName : 'guest'}
              color="#fff"
            />
          ),
        }}
      />
      <Stack.Screen name="EventList" component={EventList} />
      <Stack.Screen name="EventDetail" component={EventDetail} />
    </Stack.Navigator>
  );
};

const mapStateToProps = (state) => {
  return ({
    userName: state.auth.userName,
    token: state.auth.token,
  });
};

export default connect(mapStateToProps, { signoutUser })(Discovery);
