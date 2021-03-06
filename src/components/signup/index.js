/* eslint-disable react/sort-comp */
/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Icon } from 'native-base';
import {
  View, Text, TouchableOpacity, TextInput, ImageBackground, Dimensions,
} from 'react-native';
import Modal from 'react-native-modal';
import { BlurView } from 'expo-blur';
import { connect } from 'react-redux';
import { signupUser } from './actions';
import { styles } from '../../../assets/styles/signup';

class SignUp extends Component {
  static navigationOptions = {
    header: null,
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
  //     // console.log('fonts are loaded');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  onPressOut = () => {
    this.setState({ pressed: false });
  }

  onPressIn = () => {
    this.setState({ pressed: true });
  }

  onSubmit = () => {
    if (this.state.userName && this.state.fullName && this.state.email && this.state.password) {
      this.props.signupUser({
        userName: this.state.userName, fullName: this.state.fullName, email: this.state.email, password: this.state.password, 
      }, this.props.navigation.navigate).then((res) => {
        if (res) { this.setState({
          popupVisible: true,
          txt: this.props.msg,
        }); }
      });
    } else {
      if (!this.state.fullName) this.setState({ fullNameEmpty: true });
      if (!this.state.userName) this.setState({ userNameEmpty: true });
      if (!this.state.email) this.setState({ emailEmpty: true });
      if (!this.state.password) this.setState({ passwordEmpty: true });
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

  onChangeFullName = (text) => {
    this.setState({ fullName: text, fullNameEmpty: false });
  }

  renderFullName = () => {
    if (this.state.fullNameEmpty) {
      return (
        <BlurView tint="dark" intensity={40} blurType="dark" style={[styles.inputView, { borderWidth: 1, borderColor: 'red' }]}>
          <TextInput
            style={styles.inputField}
            onChangeText={this.onChangeFullName}
            placeholder="Full Name"
            placeholderTextColor="#CACACA"
            value={this.state.fullName}
          />
        </BlurView>
      );
    }
    else {
      return (
        <BlurView tint="dark" intensity={40} blurType="dark" style={styles.inputView}>
          <TextInput
            style={styles.inputField}
            onChangeText={this.onChangeFullName}
            placeholder="Full Name"
            placeholderTextColor="#CACACA"
            value={this.state.fullName}
          />
        </BlurView>
      );
    }
  }

  onChangeUserName = (text) => {
    this.setState({ userName: text, userNameEmpty: false });
  }

  renderUserName = () => {
    if (this.state.userNameEmpty) {
      return (
        <BlurView tint="dark" intensity={40} blurType="dark" style={[styles.inputView, { borderWidth: 1, borderColor: 'red' }]}>
          <TextInput
            style={styles.inputField}
            onChangeText={this.onChangeUserName}
            autoCapitalize="none"
            placeholder="Username"
            placeholderTextColor="#CACACA"
            value={this.state.userName}
          />
        </BlurView>
      );
    }
    else {
      return (
        <BlurView tint="dark" intensity={40} blurType="dark" style={styles.inputView}>
          <TextInput
            style={styles.inputField}
            onChangeText={(text) => this.setState({ userName: text, userNameEmpty: false })}
            autoCapitalize="none"
            placeholder="Username"
            placeholderTextColor="#CACACA"
            value={this.state.userName}
          />
        </BlurView>
      );
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
            {this.renderFullName()}
            {this.renderUserName()}
            {this.renderEmail()}
            {this.renderPassword()}
            <View style={styles.btnGroup}>
              {/* <Button title="SIGN UP WITH EMAIL" style={styles.themeBtn} /> */}
              <TouchableOpacity
                style={styles.themeBtnCont}
                activeOpacity={0.8}
                onPress={this.onSubmit}
              >
                <Text style={styles.themeBtn}>SIGN UP WITH EMAIL</Text>
              </TouchableOpacity>
              <View>
                <Text style={[styles.txt, { marginBottom: 5, marginTop: 5 }]}>———————— OR ————————</Text>
              </View>
                
              <View style={{ width: '100%', alignItems: 'center'}}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{ width: '60%', alignItems: 'center' }}
                  onPress={() => this.props.navigation.navigate('SignIn', {})}  
                >
                  <BlurView intensity={60} style={styles.blurBtnCont}>
                    <Text style={styles.blurBtn}>SIGN IN WITH DUO</Text>
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
              flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
            }}
            >
              <TouchableOpacity style={{}} onPress={() => this.props.navigation.navigate('Main', {})}>
                <Text style={[{ width: '100%', textAlign: 'center' }, styles.txt, { fontFamily: 'Montserrat-SemiBold' }]}>SKIP</Text>
              </TouchableOpacity>
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
  //   } else {
  //     return (
  //       <View style={[styles.loading]}>
  //         <ActivityIndicator size="large" color="#FF5722" />
  //       </View>
  //     );
    // }
  }
}

const mapStateToProps = (state) => {
  return ({
    msg: state.auth.signupMsg,
  });
};

export default connect(mapStateToProps, { signupUser })(SignUp);
