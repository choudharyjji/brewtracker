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
    paddingBottom: 20
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
  text: { margin: 6 },
  row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
  btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
  btnText: { textAlign: 'center', color: '#fff' }
})