import React, { Component } from 'react'
import { 
  View, 
  Text,
  TextInput,
  TouchableOpacity, 
  FlatList,
  Modal,
  ScrollView } from 'react-native'
import styles from './Styles/NewScreenStyles';
import DatePicker from 'react-native-datepicker';
import ModalSelector from 'react-native-modal-selector';
import MultiSelect  from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/FontAwesome';
import hops from '../Data/hops';
import Slider from "react-native-slider";

export default class NewScreen extends Component {
  constructor(props) {
    super(props)
    this.clearSelectObjects = this.clearSelectObjects.bind(this);
    this.state = {
      date: '2018-01-01',
      title: 'Batch name',
      group: 'beer',
      method: '',
      beerType: '',
      volume: 5,
      fermenterType: '',
      selectedItems: [],
      dataSource: [],
      tableData: [],
      selectedHops: [],
      test: '',
      modalVisible: false,
      hopBorder: false
     };
  }
  
  componentWillMount(){
    var currentDate = new Date();
    this.setState({
      date: currentDate
    })
  }

  getExistingKeys(objs){
    tableData = this.state.tableData
    arrayOfKeys = []
    for (var obj in tableData){
      arrayOfKeys.push(obj['key'])
    }
    return arrayOfKeys
  }

  getRandomInt(multiplier){
    randInt = Math.floor((Math.random() * multiplier) + 1)
    return randInt.toString()
  }

  createUniqueKey(objs){
    existingKeys = this.getExistingKeys(this.state.tableData);
    tableArrayToReturn = [];
    processedKeys = [];
    
    for (i=0; i<objs.length; i++){
      isUnique = false;

      while (isUnique == false){
        randomKeyGen = this.getRandomInt(1000000);
        
        if (existingKeys.indexOf(randomKeyGen) == -1 &&
            processedKeys.indexOf(randomKeyGen) == -1){
          processedKeys.push(randomKeyGen);
          tempData = objs[i];
          tempData['key'] = randomKeyGen;
          tableArrayToReturn.push(tempData);
          isUnique = true;
        } else {
          processedKeys.push(randomKeyGen);
        }
        
      }
    }
    return tableArrayToReturn
  }

  makeCopies(selectedArray){
    var clonedArray = JSON.parse(JSON.stringify(selectedArray))
    return clonedArray
  }

  onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedItems });
  }
 
  onSelectedObjectsChange = (selectedObjects) => {
    var copiedObjects = this.makeCopies(selectedObjects) 
    this.setState({
      selectedHops: copiedObjects
    })
  }

  clearSelectObjects = (selectedItems) => {
    td = this.state.tableData
    sh = this.state.selectedHops
    td.push.apply(td, sh)
    this.setState({
      tableData: this.createUniqueKey(td),
    }, ()=>this.setState({
        selectedItems: [],
        selectedHops: [],
        }, () => this.setBorderProp())
    )
  }

  deleteHop(item) {
    var tableDataTemp = [...this.state.tableData]
    let idx = tableDataTemp.indexOf(item);
    tableDataTemp.splice(idx, 1)
    this.setState({
      tableData: tableDataTemp
    }, () => this.setBorderProp())
  }

  setBorderProp() {
    if (this.state.tableData.length == 0) {
      this.setState({
        hopBorder: false
      })
    } else {
      this.setState({
        hopBorder: true
      })      
    }
  }

  setQuantity(value, item) {
    var tableDataTemp = [...this.state.tableData]
    let idx = tableDataTemp.indexOf(item);
    tableDataTemp[idx]['quantity'] = Math.round(value)
    this.setState({
      tableData: tableDataTemp
    });
  }

  setTime(value, item) {
    var tableDataTemp = [...this.state.tableData]
    let idx = tableDataTemp.indexOf(item);
    tableDataTemp[idx]['boiltime'] = Math.round(value)
    this.setState({
      tableData: tableDataTemp
    });
  }

  renderHopCard(cardItem) {
    return (
      <View style={{
          flexDirection:'row',
          flex: 1, 
          justifyContent: 'space-between'
          }}>

        <View style={{
          flex: 0.5,
          alignItems: 'center',
          justifyContent: 'center'}}>
          <TouchableOpacity 
            style={{justifyContent: 'center'}}
            onPress={() => this.deleteHop(cardItem)}>
            <Icon name="trash" size={20} color="black" />
          </TouchableOpacity>
        </View>

        <View style={{
            flex: 2,
            alignItems: 'flex-start',
            justifyContent: 'center'}}>
          <Text style={{fontSize:20}}>
              {cardItem.name}
          </Text>
        </View>

          
        <View style={{flex: 3,
            flexDirection: 'column',
            marginLeft: 10,
            marginRight: 10}}>

            <View style={{flexDirection: 'row'}}>
              <View style={{
                flex: 0.5,
                justifyContent: 'center'}}>
                <Icon name="balance-scale" size={20} color="black" />
              </View>
              <View style={{
                flex: 2,
                alignItems: 'stretch',
                justifyContent: 'center',
                marginLeft: 10,
                marginRight: 10}}>
                <Slider
                  value={cardItem.quantity}
                  step={1}
                  minimumValue={0}
                  maximumValue={40}
                  onValueChange={(value) => this.setQuantity(value, cardItem) }
                />
              </View>
              <View style={{
                flex: 0.5,
                justifyContent: 'center'}}>
                <Text style={{fontSize:20}}>
                    {cardItem.quantity}
                </Text>
              </View>
            </View>

            <View style={{flexDirection: 'row'}}>
              <View style={{
                flex: 0.5,
                justifyContent: 'center'}}>
                <Icon name="hourglass-half" size={20} color="black" />
              </View>
              <View style={{
                flex: 2,
                alignItems: 'stretch',
                justifyContent: 'center',
                marginLeft: 10,
                marginRight: 10}}>
                <Slider
                  value={cardItem.boiltime}
                  step={1}
                  minimumValue={0}
                  maximumValue={80}
                  onValueChange={(value) => this.setTime(value, cardItem) }
                />
              </View>
              <View style={{
                flex: 0.5,
                justifyContent: 'center'}}>
                <Text style={{fontSize:20}}>
                    {cardItem.boiltime}
                </Text>
              </View>
            </View>    
         </View>        
      </View>
    )
  }


  render () {
    let index = 0;
    const beer = [
      { key: index++, section: true, label: 'Beer' },
      { key: index++, label: 'India pale ale' },
      { key: index++, label: 'Pale ale' },
      { key: index++, label: 'Brown ale' }, 
      { key: index++, label: 'Amber ale' },
      { key: index++, label: 'Wheat'},
      { key: index++, label: 'Pilsner'},
      { key: index++, label: 'Pale lager' },
      { key: index++, label: 'Lager'},          
      { key: index++, label: 'Stout'},   
      { key: index++, label: 'Kolsch'}, 
      { key: index++, label: 'Porter' },
    ];
    const method = [
      { key: index++, section: false, label: 'Extract' },
      { key: index++, label: 'All grain' },
      { key: index++, label: 'Kit/canned' }
    ];
    const fermenters = [
      { key: index++, section: false, label: 'Carboy' },
      { key: index++, label: 'Demijohn' },
      { key: index++, label: 'Conical' },
      { key: index++, label: 'Plastic' },
      { key: index++, label: 'Steel Bucket' }
    ];


    return (

      <ScrollView style={styles.container}>

        <View style={{flex: 1}}>
          <View style={{paddingBottom: 20}}>
            <TextInput
              underlineColorAndroid='transparent'
              style={styles.textInput}
              onChangeText={(title) => {
                this.setState({title})}}
              placeholder={this.state.title}/>
          </View>
          <Text>{this.state.test.name}</Text>

          <View style={styles.viewSpacer}> 
            <DatePicker
              date={this.state.date}
              placeholder="select date"
              mode="date"
              format="YYYY-MM-DD"
              minDate="2018-01-01"
              maxDate={this.state.date}
              showIcon={false}
              customStyles={{
              dateInput: {
                  borderWidth:0,
              },
              dateText:{
                fontSize: 22,
                color: 'grey',
              }
            }}
            onDateChange={(date) => {
              this.setState({date: date});}}/>
          </View>  


          <View style={{alignItems:'center'}}>
          <ModalSelector
                data={method}
                initValue="Select method"
                supportedOrientations={['landscape']}
                accessible={true}
                scrollViewAccessibilityLabel={'Scrollable options'}
                cancelButtonAccessibilityLabel={'Cancel Button'}
                onChange={(option)=>{ this.setState({method:option.label})}}>
                <TextInput
                    style={styles.modalText}
                    editable={false}
                    placeholder="Select brew method"
                    value={this.state.method} />
            </ModalSelector>
            <ModalSelector
                data={beer}
                initValue="Select type"
                supportedOrientations={['landscape']}
                accessible={true}
                scrollViewAccessibilityLabel={'Scrollable options'}
                cancelButtonAccessibilityLabel={'Cancel Button'}
                onChange={(option)=>{ this.setState({beerType:option.label})}}>
                <TextInput
                    style={styles.modalText}
                    editable={false}
                    placeholder="Select beer type"
                    value={this.state.beerType} />
            </ModalSelector>
            <ModalSelector
                data={fermenters}
                initValue="Select type"
                supportedOrientations={['landscape']}
                accessible={true}
                scrollViewAccessibilityLabel={'Scrollable options'}
                cancelButtonAccessibilityLabel={'Cancel Button'}
                onChange={(option)=>{ this.setState({fermenterType:option.label})}}>
                <TextInput
                    style={styles.modalText}
                    editable={false}
                    placeholder="Select fermenter"
                    value={this.state.fermenterType} />
            </ModalSelector>

          </View>
          <View style={{
              flexDirection:'row',
              alignItems: 'center',
              marginLeft: 10,
              marginRight: 10}}>
            <View style={{
                flex: 2, 
                justifyContent: 'flex-end'}}>
              <Text style={{
                textAlign: 'center',
                fontSize: 18}}>
                  Volume (litres)
                </Text>
            </View>
            <TouchableOpacity style={{
                flex: 1,
                borderRadius: 6,
                borderWidth: 0,
                backgroundColor: '#61A4FF',
                marginLeft: 2,
                marginRight: 2}}
                onPress={() => this.setState({volume: 5})}
              >
              <Text style={{
                textAlign: 'center',
                fontSize: 25,
                color:'white'}}>5</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
                flex: 1,
                borderRadius: 6,
                borderWidth: 0,
                backgroundColor: '#61A4ff',
                marginLeft: 2,
                marginRight: 2}}
                onPress={() => this.setState({volume: 23})}
              >
              <Text style={{
                textAlign: 'center',
                fontSize: 25,
                color:'white'}}>23</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
                flex: 1,
                borderRadius: 6,
                borderWidth: 0,
                backgroundColor: '#61A4ff',
                marginLeft: 2,
                marginRight: 2}}
                onPress={() => this.setState({volume: 60})}
              >
              <Text style={{
                textAlign: 'center',
                fontSize: 25,
                color:'white'}}>60</Text>
            </TouchableOpacity>
            <View style={{
                  flex: 3,
                  alignItems: 'stretch',
                  justifyContent: 'center',
                  marginLeft: 10,
                  marginRight: 10}}>
                <Slider
                  value={this.state.volume}
                  step={0.5}
                  minimumValue={1}
                  maximumValue={100}
                  onValueChange={(value) => this.setState({volume: value}) }
                />
              </View>
              <View style={{flex: 1}}>
                <Text style={{
                textAlign: 'center',
                fontSize: 20}}>{this.state.volume}</Text>
            </View>
          </View>


          <MultiSelect
            hideTags
            items={hops}
            uniqueKey="id"
            subKey='data'
            styles = {{
              container: {
                paddingHorizontal: 10
              }
            }}
            ref={(component) => { this.multiSelect = component }}
            onSelectedItemsChange={this.onSelectedItemsChange}            
            onSelectedItemObjectsChange={this.onSelectedObjectsChange}
            onConfirm={this.clearSelectObjects}
            selectedItems={this.state.selectedItems}
            selectText="Select hops"
            showChips={false}
            searchInputPlaceholderText="Search Items..."
            onChangeInput={ (text)=> console.log(text)}
            altFontFamily="ProximaNova-Light"
            showDropDowns={true}
            readOnlyHeadings={true}
            tagRemoveIconColor="#CCC"
            tagBorderColor="#CCC"
            tagTextColor="#CCC"
            selectedItemTextColor="#CCC"
            selectedItemIconColor="#CCC"
            itemTextColor="#000"
            displayKey="name"
            searchInputStyle={{ color: '#CCC' }}
            submitButtonColor="#CCC"
            submitButtonText="Submit"
          />        
          <View style={
            [{backgroundColor: 'white'},
              this.state.hopBorder
                ? {borderWidth: 1} 
                : {borderWidth: 0}]}>
            <FlatList
              style={{flex: 1}}
              data={this.state.tableData}
              renderItem={({item}) => this.renderHopCard(item)}
              keyExtractor={item => item.key}
            />
          </View>
        </View>

      </ScrollView>
    )
  }
}