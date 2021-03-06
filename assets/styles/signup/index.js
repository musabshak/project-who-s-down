import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  imageBackground: {
    // position: 'absolute',
    // top: 0,
    width: '100%',
    // height: '100%',
    // justifyContent: 'space-evenly',
    // alignItems: 'center',
  },
  headlineFont: {
    fontFamily: 'ReenieBeanie-Regular',
    fontSize: 64,
    color: '#fff',
    textAlign: 'center',
  },
  headlineFontFocus: {
    fontFamily: 'ReenieBeanie-Regular',
    fontSize: 64,
    fontWeight: '500',
    color: '#FF5722',
    textAlign: 'center',
  },
  headerCont: {
    marginTop: 50,
    // marginBottom: 50,
  },
  headerIcon: {
    flex: 0.25,
    textAlign: 'center',
  },
  header: {
    flex: 0.5,
    fontSize: 36,
    color: '#FF5722',
    padding: 15,
    fontFamily: 'pacifico-regular',
    textAlign: 'center',
  },
  inputView: {
    // backgroundColor: 'rgba(0,0,0,1)',
    height: 40,
    paddingLeft: 15,
    borderRadius: 6,
    marginBottom: 10,
    width: '65%',
  },
  inputField: {
    height: 40,
    borderWidth: 0, 
    color: '#fff',
  },
  txt: {
    color: '#fff',
    fontFamily: 'Montserrat-Regular',
  },
  txtTerms: {
    textAlign: 'center',
  },
  txtTermsBold: {
    textAlign: 'center',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
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
    flex: 0.5,
    alignItems: 'center',
    padding: 20,
    // alignSelf: 'stretch',
  },
  btnGroup: {
    width: '100%',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 50,
    flexDirection: 'column',
  },
  themeBtnCont: {
    width: '60%',
    backgroundColor: '#FF5722',
    padding: 12,
    borderRadius: 25,
  },
  themeBtn: {
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'Montserrat-SemiBold',
  },
  blurBtnCont: {
    width: '100%',
    // backgroundColor: '#FF5722',
    padding: 12,
    borderRadius: 25,
  },
  blurBtn: {
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'Montserrat-SemiBold',
  },
});