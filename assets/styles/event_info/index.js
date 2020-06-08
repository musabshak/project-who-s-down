import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'space-around',
    alignItems: 'center',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCont: {
    width: '100%',
    position: 'absolute',
    top: 0,
    alignItems: 'center',
    flexDirection: 'row',
    // padding: 30,
    paddingTop: 35,
    backgroundColor: '#fff',
    shadowOffset: { width: 0, height: 10 },
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    // justifyContent: 'space-around',
  },
  headerIcon: {
    flex: 0.25,
    textAlign: 'center',
  },
  header: {
    flex: 0.5,
    fontSize: 36,
    color: '#FF5722',
    padding: 10,
    fontFamily: 'pacifico-regular',
    textAlign: 'center',
  },
  tabBarCont: {
    alignSelf: 'stretch',
    // flex: 2,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    shadowOffset: { width: 0, height: -3 },
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    // justifyContent: 'space-around',
  },
  btnCont: {
    backgroundColor: '#fff',
    // flex: 0.5,
    width: '100%',
    alignItems: 'center',
    padding: 20,
    // alignSelf: 'stretch',
  },
  btnContWithOutBackground: {
    // backgroundColor: '#fff',
    flex: 1,
    // alignItems: 'center',
    // padding: 20,
    // alignSelf: 'stretch',
  },
  buttonPress: {
  },
  btnContWithBackground: {
    backgroundColor: '#FF5722',
    // flex: 0.5,
    width: '50%',
    alignItems: 'center',
    padding: 20,
    // alignSelf: 'stretch',
  },
  mapCardCont: {
    marginTop: 150,
    width: '90%',
    height: '30%',
    // alignItems: 'center',
    justifyContent: 'center',
    // flexDirection: 'column',
    // backgroundColor: '#FF5722',
    overflow: 'hidden',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    // maxWidth: '90%',
    // maxHeight: 300,
  },
  mapCardInfo: {
    // paddingLeft: 20,
    backgroundColor: '#FF5722',
    justifyContent: 'center',
    alignItems: 'center',
    // flex: 0.2,
    height: '20%',
    width: '100%',
    paddingTop: 5,
    paddingBottom: 5,
    shadowOffset: { width: 0, height: 10 },
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowRadius: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  mapCard: {
    // flex: 0.8,
    width: '100%',
    height: '80%',
    // width: 200,
    // height: 200,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    // overflow: 'hidden',
    // minHeight: 200,
    // minWidth: 200,
  }, 
  mapCardImage: {
    flex: 0.8,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  contentCont: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  addrCat: {
    padding: 20,
    width: '55%',
    fontFamily: 'TitilliumWeb-SemiBold',
    fontSize: 30,
  },
  catTagCont: {
    width: '45%',
    marginTop: 28, 
    paddingRight: 20,
    height: 60,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  catTag: {
    
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF5722',
    // paddingLeft: 5,
    // paddingRight: 5,
    borderRadius: 25,
  },
  catTagImg: {
    marginRight: 8,
  },
  catTagText: {
    fontFamily: 'TitilliumWeb-SemiBold',
    color: '#fff',
    fontSize: 20,
  },
  addr: {
    fontFamily: 'OpenSans-Regular',
    paddingLeft: 20,
    fontSize: 16,
    color: '#757575',
    width: '100%',
    marginBottom: 5,
  },
  timeLabel: {
    fontFamily: 'OpenSans-Regular',
    paddingLeft: 20,
    fontSize: 16,
    color: '#FF5722',
    width: '100%',
    marginBottom: 20,
  },
  btnGroup: {
    width: '100%',
    height: 100,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  btnDist: {
    backgroundColor: '#FF5722',
    justifyContent: 'center',
    alignItems: 'center',
    width: '23%',
    // paddingLeft: 15,
    // paddingRight: 15,
    borderRadius: 8,
    shadowOffset: { width: 0, height: 5 },
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  btnDistImg: {
  },
  btnDistText: {
    fontFamily: 'OpenSans-Regular',
    marginTop: 5,
    fontSize: 13,
    color: '#fff',
  },
  btnTime: {
    backgroundColor: '#FF5722',
    justifyContent: 'center',
    alignItems: 'center',
    // paddingLeft: 15,
    // paddingRight: 15,
    width: '23%',
    borderRadius: 8,
    shadowOffset: { width: 0, height: 5 },
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  btnTimeImg: {
  },
  btnTimeText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 13,
    marginTop: 5,
    overflow: 'scroll',
    color: '#fff',
  },
  btnChat: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    // paddingLeft: 15,
    // paddingRight: 15,
    width: '23%',
    borderRadius: 8,
    shadowOffset: { width: 0, height: 5 },
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  btnChatImg: {

  },
  btnChatText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 13,
    marginTop: 5,
    color: '#FF5722',
    padding: 0,
  },
  btnSubs: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    // paddingLeft: 15,
    // paddingRight: 15,
    width: '23%',
    borderRadius: 8,
    shadowOffset: { width: 0, height: 5 },
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  btnSubsImg: {

  },
  btnSubsText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 13,
    marginTop: 5,
    color: '#FF5722',
    padding: 0,
  },
  desc: {
    fontFamily: 'OpenSans-Regular',
    paddingLeft: 20,
    fontSize: 16,
    color: '#757575',
    width: '100%',
    marginTop: 5,
  },
});