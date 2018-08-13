import React, { Component } from 'react'
import { 
  View, 
  Text,
  TextInput,
  TouchableOpacity, 
  FlatList,
  ScrollView } from 'react-native'
import styles from './Styles/NewScreenStyles';
import DatePicker from 'react-native-datepicker';
import ModalSelector from 'react-native-modal-selector';
import MultiSelect  from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/FontAwesome';
import hops from '../Data/hops';
import grains from '../Data/grains';
import Slider from "react-native-slider";
import RecipeCard from "../Components/RecipeCard";

export default class NewScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: '2018-01-01',
      title: 'Batch name',
      group: 'beer',
      method: '',
      beerType: '',
      volume: 5,
      fermenterType: '',
      dataSource: [],
      //
      selectedItems: [],
      tableData: [],
      selectedHops: [],
      hopBorder: false,
      //
      grainItems: [],
      grainData: [],
      selectedGrains: [],
      grainBorder: false,
      //
      test: '',
      modalVisible: false
     };
  }
  
  componentWillMount(){
    var currentDate = new Date();
    this.setState({
      date: currentDate
    })
  }

  /*---------------------------------------*/
  getExistingKeys(objs){
    // hops
    tableData = this.state.tableData
    arrayOfKeys = []
    for (var obj in tableData){
      arrayOfKeys.push(obj['key'])
    }
    return arrayOfKeys
  }

  getExistingKeysGrains(objs){
    // grains
    grainData = this.state.grainData
    arrayOfKeys = []
    for (var obj in grainData){
      arrayOfKeys.push(obj['key'])
    }
    return arrayOfKeys
  }

  /*---------------------------------------*/
  getRandomInt(multiplier){
    randInt = Math.floor((Math.random() * multiplier) + 1)
    return randInt.toString()
  }

  /*---------------------------------------*/
  createUniqueKey(objs){
    // hops
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

  createUniqueKeyGrains(objs){
    // Grains
    existingKeys = this.getExistingKeysGrains(this.state.grainData);
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

  /*---------------------------------------*/
  makeCopies(selectedArray){
    var clonedArray = JSON.parse(JSON.stringify(selectedArray))
    return clonedArray
  }

  /*---------------------------------------*/
  onSelectedItemsChange = (selectedItems) => {
    // mandatory -hops
    this.setState({ selectedItems });
  }
 
  onSelectedGrainsChange = (grainItems) => {
    // mandatory - grains
    this.setState({ grainItems });
  }

  /*---------------------------------------*/
  onSelectedObjectsChange = (selectedObjects) => {
    // hops
    var copiedObjects = this.makeCopies(selectedObjects) 
    this.setState({
      selectedHops: copiedObjects
    })
  }

  onSelectedGrainsObjectChange = (selectedGrainObjects) => {
    // grains
    var copiedGrainObjects = this.makeCopies(selectedGrainObjects) 
    this.setState({
      selectedGrains: copiedGrainObjects
    })
  }

  /*---------------------------------------*/
  clearSelectObjects = (selectedItems) => {
    // hops
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
  clearSelectedGrains = (selectedGrains) => {
    // grains
    td = this.state.grainData
    sh = this.state.selectedGrains
    td.push.apply(td, sh)
    this.setState({
      grainData: this.createUniqueKeyGrains(td),
    }, ()=>this.setState({
        grainItems: [],
        selectedGrains: [],
        }, () => this.setGrainBorderProp())
    )
  }

  /*---------------------------------------*/
  deleteHop(item) {
    // hops
    var tableDataTemp = [...this.state.tableData]
    let idx = tableDataTemp.indexOf(item);
    tableDataTemp.splice(idx, 1)
    this.setState({
      tableData: tableDataTemp
    }, () => this.setBorderProp())
  }
  deleteGrain(item) {
    // grains
    var grainDataTemp = [...this.state.grainData]
    let idx = grainDataTemp.indexOf(item);
    grainDataTemp.splice(idx, 1)
    this.setState({
      grainData: grainDataTemp
    }, () => this.setGrainBorderProp())
  }

  /*---------------------------------------*/
  setBorderProp() {
    // hops
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
  setGrainBorderProp() {
    // hops
    if (this.state.grainData.length == 0) {
      this.setState({
        grainBorder: false
      })
    } else {
      this.setState({
        grainBorder: true
      })      
    }
  }

  /*---------------------------------------*/
  setQuantity(value, item) {
    // hops
    var tableDataTemp = [...this.state.tableData]
    let idx = tableDataTemp.indexOf(item);
    tableDataTemp[idx]['quantity'] = Math.round(value)
    this.setState({
      tableData: tableDataTemp
    });
  }
  setGrainQuantity(value, item) {
    // grains
    var grainDataTemp = [...this.state.grainData]
    let idx = grainDataTemp.indexOf(item);
    grainDataTemp[idx]['quantity'] = Math.round(value)
    this.setState({
      grainData: grainDataTemp
    });
  }

  /*---------------------------------------*/
  setTime(value, item) {
    // hops
    var tableDataTemp = [...this.state.tableData]
    let idx = tableDataTemp.indexOf(item);
    tableDataTemp[idx]['boiltime'] = Math.round(value)
    this.setState({
      tableData: tableDataTemp
    });
  }
  setGrainTime(value, item) {
    // grains
    var grainDataTemp = [...this.state.grainData]
    let idx = grainDataTemp.indexOf(item);
    grainDataTemp[idx]['boiltime'] = Math.round(value)
    this.setState({
      grainData: grainDataTemp
    });
  }

  /*---------------------------------------*/
  renderHopCard(cardItem) {
    return (
      <RecipeCard 
        mark={cardItem} 
        deleteItem={this.deleteHop.bind(this)} 
        setQuantity={this.setQuantity.bind(this)} 
        setTime={this.setTime.bind(this)}/>
    )
  }

  renderGrainCard(cardItem) {
    return (
      <RecipeCard 
        mark={cardItem} 
        deleteItem={this.deleteGrain.bind(this)} 
        setQuantity={this.setGrainQuantity.bind(this)} 
        setTime={this.setGrainTime.bind(this)}/>
    )
  }

  /*---------------------------------------*/
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

          <MultiSelect
            hideTags
            items={grains}
            uniqueKey="id"
            subKey='data'
            styles = {{
              container: {
                paddingHorizontal: 10
              }
            }}
            ref={(comp) => { this.multiSelect = comp }}
            onSelectedItemsChange={this.onSelectedGrainsChange}            
            onSelectedItemObjectsChange={this.onSelectedGrainsObjectChange}
            onConfirm={this.clearSelectedGrains}
            selectedItems={this.state.grainItems}
            selectText="Select grains"
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
              this.state.grainBorder
                ? {borderWidth: 1} 
                : {borderWidth: 0}]}>
            <FlatList
              style={{flex: 1}}
              data={this.state.grainData}
              renderItem={({item}) => this.renderGrainCard(item)}
              keyExtractor={item => item.key}
            />
          </View>
        </View>

      </ScrollView>
    )
  }
}