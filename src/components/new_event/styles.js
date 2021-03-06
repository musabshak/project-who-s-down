import { StyleSheet, Dimensions } from 'react-native';

const borderWidth = 0;
const borderColor = 'black';
const labelFontSize = 20;
const marginBottomRow = 30;

export { styles };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // justifyContent: 'space-between',
    // alignItems: 'stretch',
    // position: 'relative',
    backgroundColor: 'white',
    paddingHorizontal: 15,
    margin: 0,
  },
  
  row1: {
    flex: 0.8,
    // height: 50,
    position: 'relative',
    backgroundColor: 'white',
    borderColor,
    borderWidth,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    // justifyContent: 'center',
    marginBottom: 10,
  },
  row2: {
    flex: 1,
    // height: 70,
    borderColor,
    borderWidth,
    marginBottom: marginBottomRow,
  },
  row3: {
    flex: 1.5,
    // height: 100,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderColor,
    borderWidth,
    marginBottom: marginBottomRow + 5,
  },
  row4: {
    flex: 1,
    // height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor,
    borderWidth,
    marginBottom: marginBottomRow + 5,
  },
  row5: {
    flex: 2.5,
    backgroundColor: 'white',
    alignItems: 'center',
    borderColor,
    borderWidth,
    // position: 'relative',
    marginBottom: 20,
  },
  row6: {
    flex: 2.5,
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor,
    borderWidth,
    // position: 'relative',
    marginBottom: 10,
  },
  row7: {
    flex: 2,
    // alignItems: 'center',
    backgroundColor: 'white',
    borderColor,
    borderWidth,
    paddingBottom: 15,
    // position: 'relative',
  },
  title: {
    width: 300,
    height: 50,
    borderColor,
    borderWidth,
    position: 'absolute',
    top: 100,
  },
  createBtnContainer: {
    position: 'absolute',
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    flex: 1,
  },
  createBtn: {
    height: 45,
    width: 120,
    // marginRight: 10,
    borderRadius: 8,
    backgroundColor: '#ff5722',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // position: 'absolute',
    // right: 0,
    // top: '40%',
  },
  buttonText: {
    color: 'white',
    fontFamily: 'TitilliumWeb-Regular',
    fontSize: 17,
  },
  iconBtn: {
    backgroundColor: 'transparent',
    // borderColor,
    // borderWidth,
    height: 50,
    width: 59,
  },
  closeIcon: {
    fontSize: 35,
    color: 'black',
   
  },
  timeIcon: {
    fontSize: 40,
    color: '#ff5722',
  },
  titleField: {
    fontFamily: 'TitilliumWeb-Regular',
    fontSize: 30,
    color: 'black',
    borderBottomWidth: 0,
    marginRight: 5,
    backgroundColor: 'white',
  },
  dateFieldText: {
    fontFamily: 'TitilliumWeb-Regular',
    fontSize: 14,
  },
  timeField: {
    width: 80,
  },
  // location: {
  //   height: 900,
  //   position: 'absolute',
  // },
  mapModal: {
    padding: 0,
    margin: 10,
    flex: 1,
    display: 'flex',
  },
  mapContainer: {
    flex: 4,
    borderColor,
    borderWidth,
    margin: 0,
    padding: 0,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // height: 550,
    margin: 0,
    padding: 0,
   
  },
  mapMarkerContainer: { 
    // position: 'absolute',
    // top: '31%',
    // left: '45%',
  },
  mapMarkerIcon: {
    fontSize: 40,
    color: '#ff5722',
  },
  detailSection: {
    flex: 1.2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 5,
    borderRadius: 10,
    borderColor,
    borderWidth,
  },
  spinnerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationBtn: {
    borderRadius: 8,
    backgroundColor: '#ff5722',
    display: 'flex',
    padding: 5,
    height: 55, 
    width: 200,
    marginTop: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'stretch',
    // borderColor: 'red',
    // borderWidth: 5,
  },
  addLocationField: {
    fontFamily: 'TitilliumWeb-Regular',
    fontSize: labelFontSize,
    borderBottomColor: 'silver',
    borderBottomWidth: 1.2, 
    borderBottomEndRadius: 20,
    backgroundColor: 'white',
    flex: 1,
    marginRight: 7,
  },
  labelText: {
    fontFamily: 'TitilliumWeb-Regular',
    fontSize: labelFontSize,
    marginBottom: 5,
  },
  categoryIcon: {
    fontSize: 35,
    color: '#ff5722',
  },
  categoryTitle: {
    fontFamily: 'TitilliumWeb-Regular',
    fontSize: 26,
    // color: '#ff5722',
    color: '#2b2b2b',
    textAlign: 'center',
  },
  
  textareaContainer: {
    // height: 0,
    flex: 1,
    height: 300,
    padding: 5,
    backgroundColor: 'floralwhite',
  },
  textarea: {
    fontFamily: 'TitilliumWeb-Regular',
    fontSize: labelFontSize - 4,
    textAlignVertical: 'top', // hack android
    height: 330,
    color: '#333',
  },


});