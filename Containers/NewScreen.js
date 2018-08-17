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
import hops from '../Data/hops';
import grains from '../Data/grains';
import Slider from "react-native-slider";
import RecipeCard from "../Components/RecipeCard";
import SubmitDataButton from '../Components/SubmitDataButton';

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
      modalVisible: false,
      //
      hopItems: [],
      hopData: [],
      selectedHops: [],
      hopBorder: false,
      //
      grainItems: [],
      grainData: [],
      selectedGrains: [],
      grainBorder: false
      //

     };
  }
  
  componentWillMount(){
    var currentDate = new Date();
    this.setState({
      date: currentDate
    })
  }

  getExistingKeys(dat){
    arrayOfKeys = []
    for (var obj in dat){
      arrayOfKeys.push(obj['key'])
    }
    return arrayOfKeys
  }

  getRandomInt(multiplier){
    randInt = Math.floor((Math.random() * multiplier) + 1)
    return randInt.toString()
  }

  createUniqueKey(dat){
    existingKeys = this.getExistingKeys(dat);
    tableArrayToReturn = [];
    processedKeys = [];
    
    for (i=0; i<dat.length; i++){
      isUnique = false;

      while (isUnique == false){
        randomKeyGen = this.getRandomInt(1000000);
        
        if (existingKeys.indexOf(randomKeyGen) == -1 &&
            processedKeys.indexOf(randomKeyGen) == -1){
          processedKeys.push(randomKeyGen);
          tempData = dat[i];
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

  onSelectedItemsChange = (hopItems) => {
    // mandatory -hops
    this.setState({ hopItems });
  }
 
  onSelectedGrainsChange = (grainItems) => {
    // mandatory - grains
    this.setState({ grainItems });
  }

  makeCopies(selectedArray){
    var clonedArray = JSON.parse(JSON.stringify(selectedArray))
    return clonedArray
  }

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

  clearSelectedHops = (hopItems) => {
    td = this.state.hopData
    sh = this.state.selectedHops
    td.push.apply(td, sh)
    this.setState({
      hopData: this.createUniqueKey(td),
    }, ()=>this.setState({
        hopItems: [],
        selectedHops: [],
        }, () => this.setBorderProp())
    )
  }

  clearSelectedGrains = (selectedGrains) => {
    td = this.state.grainData
    sh = this.state.selectedGrains
    td.push.apply(td, sh)
    this.setState({
      grainData: this.createUniqueKey(td),
    }, ()=>this.setState({
        grainItems: [],
        selectedGrains: [],
        }, () => this.setGrainBorderProp())
    )
  }

  deleteHandle(data, item) {
    var d = [...data]
    let idx = d.indexOf(item);
    d.splice(idx, 1)
    return d
  }

  deleteHop(item) {
    var dh = this.deleteHandle(this.state.hopData, item)
    this.setState({ hopData: dh
    }, () => this.setBorderProp())
  }

  deleteGrain(item) {
    var dh = this.deleteHandle(this.state.grainData, item)
    this.setState({ grainData: dh
    }, () => this.setGrainBorderProp())
  }

  setBorderProp() {
    // hops
    if (this.state.hopData.length == 0) {
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

  measureHandle(data, value, item, measure) {
    var dat = [...data]
    let idx = dat.indexOf(item);
    dat[idx][measure] = Math.round(value)
    return dat
  }

  setQuantity(value, item) {
    var d = this.measureHandle(
      this.state.hopData, value, item, 'quantity')
    this.setState({hopData: d});
  }

  setTime(value, item) {
    var d = this.measureHandle(
      this.state.hopData, value, item, 'boiltime')
    this.setState({hopData: d});
  }

  setGrainQuantity(value, item) {
    var d = this.measureHandle(
      this.state.grainData, value, item, 'quantity')
    this.setState({grainData: d});
  }

  setGrainTime(value, item) {
    var d = this.measureHandle(
      this.state.grainData, value, item, 'boiltime')
    this.setState({grainData: d});
  }

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

  submitData(){
    var data = {
      date: this.state.date,
      name: this.state.title,
      class: this.state.group,
      method: this.state.method,
      type: this.state.beerType,
      volume: this.state.volume,
      fermenter: this.state.fermenterType,
      steepgrains: this.state.grainData,
      hops: this.state.hopData
    }
    console.log(data)
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

          <View style={styles.volumeBarContainer}>
            <View style={styles.volumeBarContent}>
                <Text style={styles.volumeBarText}>
                  Volume (litres)
                </Text>
            </View>

            <TouchableOpacity style={styles.volumeBarMiniButton}
                onPress={() => this.setState({volume: 5})}>
              <Text style={styles.miniButtonText}>5</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.volumeBarMiniButton}
                onPress={() => this.setState({volume: 23})}>
              <Text style={styles.miniButtonText}>23</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.volumeBarMiniButton}
                onPress={() => this.setState({volume: 60})}>
              <Text style={styles.miniButtonText}>60</Text>
            </TouchableOpacity>

            <View style={styles.volumeSliderContent}>
                <Slider
                  value={this.state.volume}
                  step={0.5}
                  minimumValue={1}
                  maximumValue={100}
                  onValueChange={(value) => 
                    this.setState({volume: value}) }
                />
              </View>
              <View style={styles.volumeSliderTextContainer}>
                <Text style={styles.volumeSliderText}>
                  {this.state.volume}
                </Text>
            </View>
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
            selectText="Select steeping grains"
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
            onConfirm={this.clearSelectedHops}
            selectedItems={this.state.hopItems}
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
              data={this.state.hopData}
              renderItem={({item}) => this.renderHopCard(item)}
              keyExtractor={item => item.key}
            />
          </View>

        </View>

        <SubmitDataButton submitData={this.submitData.bind(this)} />
      </ScrollView>
    )
  }
}