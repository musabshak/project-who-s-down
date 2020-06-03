import { StyleSheet } from 'react-native';

export { styles };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // justifyContent: 'space-between',
    // alignItems: 'stretch',
    // position: 'relative',
    backgroundColor: 'white',
  },
  row0: {
    height: 20,
    backgroundColor: 'black',
  },
  row1: {
    // flex: 1,
    height: 50,
    position: 'relative',
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    // justifyContent: 'center',
  },
  row2: {
    height: 70,
    borderColor: 'black',
    borderWidth: 1,
  },
  row3: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 70,
    borderColor: 'black',
    borderWidth: 1,
  },
  row4: {
    height: 70,
  },
  row: {
    flex: 1,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    position: 'relative',
  },
  title: {
    width: 300,
    height: 50,
    borderColor: 'red',
    borderWidth: 1,
    position: 'absolute',
    top: 100,
  },
  createBtn: {
    height: 40,
    width: 120,
    borderRadius: 8,
    backgroundColor: '#ff5722',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    top: 5,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'TitilliumWeb-Regular',
    fontSize: 17,
  },
  iconBtn: {
    backgroundColor: 'blue',
    borderColor: 'black',
    borderWidth: 5,
    height: 50,
    width: 59,
  },
  closeIcon: {
    fontSize: 35,
    color: 'black',
    // position: 'absolute',
    // left: 0,
    // top: 5,
  },
  timeIcon: {
    fontSize: 40,
  },
  titleField: {
    fontFamily: 'TitilliumWeb-Regular',
    fontSize: 25,
  },
  dateFieldText: {
    fontFamily: 'TitilliumWeb-Regular',
    fontSize: 15,
  },
  timeField: {
    width: 80,
  },
  location: {
    height: 900,
    position: 'absolute',
  },
  map: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    bottom: 0,
    height: 600,
    margin: 0,
    padding: 0,
  },
  mapModal: {
    padding: 0,
  },

});