import {
    StyleSheet
} from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 5,
    marginRight:5,
  },
  textInput: {
    fontSize: 28,
    color: 'black',
    textAlign: 'center'
  },
  modalText: {
    fontSize: 20,
    padding: 15, 
    color: 'black', 
    width: 300,
    textAlign: 'center'
  },
  viewSpacer: {
    alignItems:'center',
    //paddingBottom: 20
  },
  tablecontainer: { 
    flex: 1, 
    padding: 16, 
    paddingTop: 30, 
    backgroundColor: '#fff' 
  },
  head: { 
    height: 40, 
    backgroundColor: '#f1f8ff' 
  },
  text: { 
    margin: 6 
  },
  row: { 
    flexDirection: 'row', 
    backgroundColor: '#FFF1C1' 
  },
  btn: { 
    width: 58, 
    height: 18, 
    backgroundColor: '#78B7BB',  
    borderRadius: 2 
  },
  btnText: { 
    textAlign: 'center', 
    color: '#fff' 
  },
  volumeBarContainer: {
    flexDirection:'row',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  volumeBarContent: {
    flex: 2, 
    justifyContent: 'flex-end'
  },
  volumeBarText: {
    textAlign: 'center',
    fontSize: 18
  },
  volumeBarMiniButton: {
    flex: 1,
    borderRadius: 6,
    borderWidth: 0,
    backgroundColor: '#61A4ff',
    marginLeft: 2,
    marginRight: 2
  },
  miniButtonText: {
    textAlign: 'center',
    fontSize: 25,
    color:'white'
  },
  volumeSliderContent: {
    flex: 3,
    alignItems: 'stretch',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  volumeSliderTextContainer:{
    flex: 1
  },
  volumeSliderText: {
    textAlign: 'center',
    fontSize: 20
  },
  //ibu: { 
    //width: 50, 
    //height: 50, 
    //backgroundColor: '#78B7BB',  
    //borderRadius: 25,
    //justifyContent: 'center',
  //},
  //ibuText: {
    //textAlign: 'center',
    //fontSize: 15,
    //alignItems:'center'
  //}
})