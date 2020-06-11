/* eslint-disable max-len */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable global-require */
import React, { Component } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, Dimensions, ImageBackground, SafeAreaView, ScrollView,
} from 'react-native';
// import { Button, Overlay } from 'react-native-elements';
import Modal from 'react-native-modal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import {
  fetchImdownEvents, imdownEvent, unimdownEvent,
} from './actions';

class EventPreview extends Component {
  constructor(props) {
    super(props);
    // Text.defaultProps.style = { fontFamily: 'Futura' }
    this.state = {
      EventPreviewVisible: true,
      success: false,
      imdown: 0,
      // title: eventTitle
      //  skillLevel={obj.skillLevel} 
      //  startTime={obj.startTime} 
      //  description={obj.description} 
      //  id={obj.id}
    };
  }

  componentDidMount() {
    if (this.props.token) {
      this.props.fetchImdownEvents(this.props.token).then((res) => {
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < res.length; i++) { this.setState({ imdown: 0 }); }
        if (res[i].id === this.props.event.id) {
          this.setState({ imdown: 1 });
          console.log(res[i]);
          i = res.length;
        }
      });
    }
  }

  onDown = () => {
    // eslint-disable-next-line no-alert
    if (!this.props.token) { alert('You need to login first!'); }
    else if (this.state.imdown === 0) {
      this.props.imdownEvent(this.props.token, this.props.event.id).then(() => {
        this.setState({
          imdown: 1,
          success: !this.success,
        });
      });
    }
  }

  customFormatTime = (dateString) => {
    const date = new Date(dateString);
    const tks = date.toDateString().split(' ');
    // eslint-disable-next-line no-nested-ternary
    const hours = date.getHours() === 0 ? '12' : date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    const minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
    const ampm = date.getHours() < 12 ? 'AM' : 'PM';
    const formattedTime = `${hours}:${minutes} ${ampm}`;
    return `${formattedTime}`;
  }

  openPreview = () => {
    this.setState({
      EventPreviewVisible: true,
    });
  }

  // toggleModal = () => {
  //   this.setState({
  //     success: !this.success,
  //   });
  // }

  closePreview = () => {
    console.log(this.props.count);
    this.setState({
      EventPreviewVisible: false,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal animationIn="slideInUp" animationOut="slideOutDown" isVisible={this.state.EventPreviewVisible} onBackdropPress={() => this.closePreview()}>

          <Modal animationIn="slideInUp" animationOut="slideOutDown" isVisible={this.state.success} onBackdropPress={() => { this.setState({ success: false }); }}>

            <View style={styles.modal2}>
              <Text style={{
                textAlign: 'center', fontFamily: 'Futura', color: '#FF5722', fontSize: 18, padding: 10,
              }}
              >Added to My Event!
              </Text>
              <Text style={{
                textAlign: 'center', color: 'grey', fontStyle: 'italic', fontSize: '10',
              }}
              >click outside to go back to the main page
              </Text>
            </View>
          </Modal>

          <View style={styles.modal1}>
            <ImageBackground source={require('../../../assets/background.jpg')}
              style={styles.bgImage}
            >
              <View style={styles.exclude} />
              <View style={styles.title}>
                <Text style={styles.titleFont}>{this.props.title} </Text>
                <Text style={styles.timeFont}>{this.customFormatTime(this.props.startTime)} </Text>
              </View>
              <View style={styles.people}>
                <View style={styles.host}>
                  <Text style={styles.hostFont}>{this.props.hostName} </Text>
                </View>
                <View style={styles.participants}>
                  <FontAwesome name="heart" color="#FF5722" size={20} />
                  <Text style={{ marginLeft: 5, color: '#FF5722', fontFamily: 'GillSans-SemiBold' }}>20+</Text>
                </View>
              </View>
              <View style={styles.people}>
                <View style={styles.skillLevel1}>
                  <Text style={styles.hostFont}>
                    skill level
                  </Text>
                </View>
                <View style={styles.skillLevel2}>
                  <Text style={styles.hostFont}>{this.props.skillLevel} </Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => {
                  this.onDown();
                  console.log(this.state.success);
                }}
                title="I'm Down"
                style={styles.eventScreenButton}

              >
                <View style={styles.buttonGroup}>
                  <FontAwesome name="thumb-tack" color="white" size={30} style={styles.down} />
                  <Text style={styles.eventText}>I'm down!</Text>

                </View>
              </TouchableOpacity>
              <View style={styles.shortDescription}>
                <Text style={styles.bioFont1}>Short Description</Text>

                <ScrollView style={styles.bio}>
                  {/* <View style={styles.bio}> */}
                  <Text style={styles.bioFont2}>
                    {this.props.description}
                  </Text>
                </ScrollView>

              </View>
              <View style={styles.participants}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigate('Chat', { eventId: this.props.event.id });
                    this.closePreview();
                  }}
                >
                  <FontAwesome name="commenting" color="#FF5722" size={22} style={styles.icon1} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigate('EventInfo', { event: this.props.event });
                    this.closePreview();
                  }}
                >
                  <FontAwesome name="ellipsis-h" color="#FF5722" size={22} style={styles.icon2} />
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    left: 17,

  },

  modal1: {

    marginLeft: 10,
    borderRadius: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    maxHeight: Dimensions.get('window').height / 2 - 50,
    maxWidth: Dimensions.get('window').width,
    justifyContent: 'center',
    alignContent: 'center',
    height: 400,
    flex: 1,
    zIndex: 100,
  },
  bgImage: {
    // ...StyleSheet.absoluteFill,
    flex: 1,
    width: null,
    height: null,
    borderRadius: 15,
  },
  modal2: {
    overflow: 'scroll',
    padding: 20,
    backgroundColor: 'white',
    maxHeight: Dimensions.get('window').height / 8,
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 2,
    zIndex: 100,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: 'white',

  },

  exclude: {
    padding: 5,
    zIndex: 1,
    backgroundColor: '#FF5722',
    width: 124,
    height: 40,
    left: 17,
    top: 27,
    opacity: 0.8,
  },
  title: {
    overflow: 'hidden',
    zIndex: 20,
    backgroundColor: '#EEEEEE',
    padding: 3,
    maxHeight: Dimensions.get('window').height / 10,
    width: 300,
    left: 25,
    opacity: 0.9,
    flexDirection: 'row',
  },
  titleFont: {
    fontFamily: 'GillSans-SemiBoldItalic',
    fontSize: 25,
    fontStyle: 'italic',
    fontWeight: '400',
  },
  timeFont: {
    fontFamily: 'GillSans-Light',
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 20,
  },

  people: {

    marginTop: 10,
    width: 300,
    height: 25,

    left: 23,
    opacity: 0.9,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  host: {
    overflow: 'hidden',
    flex: 1,
    backgroundColor: '#EEEEEE',
    width: 138,
    flexDirection: 'row',
  },
  hostFont: {
    fontFamily: 'GillSans-Light',
    fontSize: 16,

  },

  participants: {

    overflow: 'hidden',
    padding: 1,
    justifyContent: 'flex-end',
    flex: 1,
    left: 20,
    opacity: 0.9,
    flexDirection: 'row',
    marginRight: 20,
  },
  skillLevel1: {
    overflow: 'hidden',
    flex: 1,
    backgroundColor: '#EEEEEE',
    width: 135,
    flexDirection: 'row',
    marginRight: 10,
  },
  skillLevel2: {
    overflow: 'hidden',
    flex: 1,
    backgroundColor: '#EEEEEE',
    width: 135,
    flexDirection: 'row',
    marginLeft: 10,
    justifyContent: 'flex-end',
  },

  bio: {
    overflow: 'scroll',
    backgroundColor: '#EEEEEE',
    maxHeight: 40,
    width: 300,
    left: 27,
    marginTop: 5,
  },

  bioFont1: {
    fontFamily: 'GillSans-Light',
    fontSize: 10,
    left: 27,
  },
  bioFont2: {
    textAlign: 'center',
    fontFamily: 'GillSans-Light',
    fontSize: 13,
    padding: 5,

  },

  icons: {

    marginTop: 30,
    width: 300,
    height: 25,
    alignItems: 'flex-end',
    opacity: 0.9,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingBottom: 5,

  },
  icon1: {
    marginTop: 30,
    marginRight: 30,
  },
  icon2: {
    marginTop: 30,
    marginRight: 20,
  },

  buttonGroup: {
    flexDirection: 'row',
    paddingTop: 5,
    justifyContent: 'center',
  },
  down: {
    justifyContent: 'center',
    marginRight: 15,
    marginLeft: 30,
  },
  eventScreenButton: {
    justifyContent: 'center',
    width: 300,
    height: 50,
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: '#FF5722',
    borderRadius: 60,
    borderWidth: 1,
    borderColor: '#fff',
  },

  eventText: {
    marginRight: 30,
    justifyContent: 'center',
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Futura',
    fontSize: 28,
    fontWeight: '600',
    paddingBottom: 5,
  },
});

// const mapStateToProps = (state) => {
//   return ({
//     events: state.eventsSh.all,
//   });
// };
const mapStateToProps = (state) => {
  return ({
    subscribeError: state.eventsSh.subscribeError,
    subscribedEvents: state.eventsSh.subscribedEvents,
    token: state.auth.token,
    // count: state.modal,

  });
};
export default connect(mapStateToProps, {
  fetchImdownEvents, imdownEvent, unimdownEvent,
})(EventPreview);