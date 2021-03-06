/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, TextInput, ImageBackground, ActivityIndicator, Dimensions,
} from 'react-native';
import {
  Icon, Fab,
} from 'native-base';
import * as Font from 'expo-font';
import { BlurView } from 'expo-blur';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';

import { signinUser } from './actions';
import { styles } from '../../../assets/styles/signin';

// import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

class SignIn extends Component {
  static navigationOptions = {
    headerMode: 'none',
  }

  constructor(props) {
    super(props);

    this.state = {
      popupVisible: false,
      txt: 'Fallback',
      rowDisplay: 1,
      nav: 0,
      name: 'alert-circle-outline',
    };
  }

  // async componentDidMount() {
  //   try {
  //     await Font.loadAsync({
  //       'pacifico-regular': require('../../../assets/fonts/Pacifico-Regular.ttf'),
  //       'TitilliumWeb-SemiBold': require('../../../assets/fonts/TitilliumWeb-SemiBold.ttf'),
  //       'ReenieBeanie-Regular': require('../../../assets/fonts/ReenieBeanie-Regular.ttf'),
  //       'Montserrat-Regular': require('../../../assets/fonts/Montserrat-Regular.ttf'),
  //       'Montserrat-SemiBold': require('../../../assets/fonts/Montserrat-SemiBold.ttf'),
  //     });
  //     this.setState({ fontLoaded: true });
  //     console.log('fonts are loaded');
  //   } catch (error) {
  //     console.log(error);
  //   }

  //   // console.log(new Date(1990, 3, 12, 14, 27, 11));
  // }

  // componentDidUpdate(prevProps) {
  //   if (this.props.msg && !prevProps.msg) {
  //     this.setState({
  //       popupVisible: true,
  //       txt: this.props.msg,
  //       rowDisplay: 1,
  //       nav: 0,
  //     });
  //     // console.log('event is loaded');  
  //   }
  // } 

  onPressOut = () => {
    this.setState({ pressed: false });
  }

  onPressIn = () => {
    this.setState({ pressed: true });
  }

  onSubmit = () => {
    if (this.state.email && this.state.password) {
      this.props.signinUser({
        email: this.state.email, password: this.state.password, 
      }, this.props.navigation, this.props.route.params?.return).then((res) => {
        if (res) { this.setState({
          popupVisible: true,
          txt: this.props.msg,
        }); }
      });
    } else {
      if (!this.state.email) this.setState({ emailEmpty: true });
      if (!this.state.password) this.setState({ passwordEmpty: true });
    }
  }
  
  onChangeEmail = (text) => {
    this.setState({ email: text, emailEmpty: false });
  }

  renderEmail = () => {
    if (this.state.emailEmpty) {
      return (
        <BlurView tint="dark" intensity={40} blurType="dark" style={[styles.inputView, { borderWidth: 1, borderColor: 'red' }]}>
          <TextInput
            style={styles.inputField}
            onChangeText={(text) => this.setState({ email: text, emailEmpty: false })}
            autoCapitalize="none"
            placeholder="Email"
            placeholderTextColor="#CACACA"
            value={this.state.email}
          />
        </BlurView>
      );
    }
    else {
      return (
        <BlurView tint="dark" intensity={40} blurType="dark" style={styles.inputView}>
          <TextInput
            style={styles.inputField}
            onChangeText={(text) => this.setState({ email: text, emailEmpty: false })}
            autoCapitalize="none"
            placeholder="Email"
            placeholderTextColor="#CACACA"
            value={this.state.email}
          />
        </BlurView>
      );
    }
  }

  onChangePassword = (text) => {
    this.setState({ password: text, passwordEmpty: false });
  }

  renderPassword = () => {
    if (this.state.passwordEmpty) {
      return (
        <BlurView tint="dark" intensity={40} blurType="dark" style={[styles.inputView, { borderWidth: 1, borderColor: 'red' }]}>
          <TextInput
            style={styles.inputField}
            onChangeText={(text) => this.setState({ password: text, passwordEmpty: false })}
            autoCapitalize="none"
            secureTextEntry
            placeholder="Password"
            placeholderTextColor="#CACACA"
            value={this.state.password}
          />
        </BlurView>
      );
    }
    else {
      return (
        <BlurView tint="dark" intensity={40} blurType="dark" style={styles.inputView}>
          <TextInput
            style={styles.inputField}
            onChangeText={(text) => this.setState({ password: text, passwordEmpty: false })}
            autoCapitalize="none"
            secureTextEntry
            placeholder="Password"
            placeholderTextColor="#CACACA"
            value={this.state.password}
          />
        </BlurView>
      );
    }
  }

  renderPopup() {
    return (
      <Modal
        isVisible={this.state.popupVisible}
        backdropOpacity={0.3}
        onBackdropPress={this.state.nav ? () => this.setState({ popupVisible: false }, () => { this.props.navigation.pop(); }) : () => this.setState({ popupVisible: false })}
        style={{
          // borderColor: 'white',
          // borderWidth: 2, 
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View style={{
          // borderColor: 'white',
          // borderWidth: 2, 
          width: 0.9 * Dimensions.get('window').width,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: this.state.rowDisplay ? 'row' : 'column',
          minHeight: 20,
          backgroundColor: '#fff',
          borderRadius: 5,
          padding: 40,
          // backgroundColor: '#000',
        }}
        >
          <Icon type="MaterialCommunityIcons" name={this.state.name} style={{ fontSize: 30, color: '#FF5722', margin: 10 }} />
          <Text style={{ fontFamily: 'OpenSans-Regular', color: '#757575' }}>{this.state.txt}</Text>
        </View>
      </Modal>
    );
  }

  render() {
    // if (this.state.fontLoaded) {
    return (
      <View style={styles.container}>
        {this.renderPopup()}
        <ImageBackground blurRadius={0} style={[styles.container, styles.imageBackground]} source={require('../../../assets/images/signup-bg.jpg')}>
          {/* Join events... */}
          <View style={[{ flexDirection: 'column'}, styles.headerCont]}>
            <Text style={styles.headlineFont}>Join Events</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.headlineFont}>Right </Text>
              <Text style={styles.headlineFontFocus}>Next</Text>
              <Text style={styles.headlineFont}> to</Text>
            </View>
            <Text style={styles.headlineFont}>you</Text>
          </View>
          {/* signin or signup */}
          <View style={{ width: '100%', alignItems: 'center' }}>
            {/* {<Text style={{color: '#fff', marginBottom: 10}}>{this.props.msg}</Text>} */}
            {this.renderEmail()}
            {this.renderPassword()}
            <View style={styles.btnGroup}>
              {/* <Button title="SIGN UP WITH EMAIL" style={styles.themeBtn} /> */}
              <TouchableOpacity
                style={styles.themeBtnCont}
                activeOpacity={0.8}
                onPress={this.onSubmit}
              >
                {/* <Text style={styles.themeBtn}>SIGN IN WITH DUO</Text> */}
                <Text style={styles.themeBtn}>SIGN IN</Text>
              </TouchableOpacity>
              <View>
                <Text style={[styles.txt, { marginBottom: 5, marginTop: 5 }]}>———————— OR ————————</Text>
              </View>
                
              <View style={{ width: '100%', alignItems: 'center'}}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{ width: '60%', alignItems: 'center' }}
                  onPress={() => this.props.navigation.navigate('SignUp', {})}
                >
                  <BlurView intensity={60} style={styles.blurBtnCont}>
                    <Text style={styles.blurBtn}>SIGN UP WITH EMAIL</Text>
                  </BlurView>
                </TouchableOpacity>
              </View>
                
            </View>
            
            {/* Terms and conditions
              <View>
                <Text style={[styles.txtTerms, styles.txt]}>You are going to sign up. Please review our</Text>
                <Text style={[styles.txtTermsBold, styles.txt]}>Terms and conditions policies</Text>
              </View> */}

            <View style={{
              flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
            }}
            >
              <TouchableOpacity style={{}} onPress={() => this.props.navigation.navigate('Main', {})}>
                <Text style={[{ width: '100%', textAlign: 'center' }, styles.txt, { fontFamily: 'Montserrat-SemiBold' }]}>SKIP</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity style={{ marginTop: 15 }} onPress={() => { this.props.navigation.navigate('MyEvents', { }); }}>
                  <Text style={[{ width: '100%', textAlign: 'center' }, styles.txt, { fontFamily: 'Montserrat-SemiBold' }]}>My EVENTS</Text>
                </TouchableOpacity> */}
              {/* <TouchableOpacity style={{ marginTop: 15 }} onPress={() => { this.props.navigation.navigate('newEvent', { }); }}>
                  <Text style={[{ width: '100%', textAlign: 'center' }, styles.txt, { fontFamily: 'Montserrat-SemiBold' }]}>NEW EVENT</Text> */}
              {/* </TouchableOpacity> */}
              {/* <View style={{ width: '100%', alignItems: 'flex-end', justifyContent: 'center' }}>
                  <View style={{ marginBottom: 30 }}>
                    
                  </View>
                </View> */}
            </View>

          </View>
          {/* <View style={{
              flexDirection: 'row', justifyContent: 'center', position: 'absolute', bottom: 0,
            }}
            >
              <View style={{ width: '50%', justifyContent: 'space-around' }}>
                <View style={{ padding: 30 }}>
                  <Text style={[{ width: '100%' }, styles.txt]}>FORGOT</Text>
                  <Text style={[{ width: '100%' }, styles.txt]}>DETAILS?</Text>
                </View>
              </View>
              <View style={{ width: '50%', alignItems: 'flex-end', justifyContent: 'center' }}>
                <View style={{ padding: 30 }}>
                  <Text style={[{ width: '100%' }, styles.txt]}>PH</Text>
                </View>
              </View>
            </View> */}
        </ImageBackground>
      </View>
    );
    // } else {
    //   return (
    //     <View style={[styles.loading]}>
    //       <ActivityIndicator size="large" color="#FF5722" />
    //     </View>
    //   );
    // }
  }
}

const mapStateToProps = (state) => {
  return ({
    msg: state.auth.signinMsg,
  });
};

export default connect(mapStateToProps, { signinUser })(SignIn);
