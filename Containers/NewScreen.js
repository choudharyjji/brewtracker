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
import extracts from '../Data/extracts';
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
      method: 'Extract',
      beerType: 'Pale ale',
      volume: 4.5,
      fermenterType: 'Carboy',
      dataSource: [],
      modalVisible: false,
      //
      hopItems: [],
      hopData: [],
      selectedHops: [],
      hopBorder: false,
      //
      extractItems: [],
      extractData: [],
      selectedExtracts: [],
      extractBorder: false,
      //
      grainItems: [],
      grainData: [],
      selectedGrains: [],
      grainBorder: false,
      //
      IBU: 0

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

  onSelectedExtractsChange = (extractItems) => {
    // mandatory - extracts
    this.setState({ extractItems });
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

  onSelectedExtractsObjectChange = (selectedExtractObjects) => {
    // extracts
    var copiedExtractObjects = this.makeCopies(selectedExtractObjects) 
    this.setState({
      selectedExtracts: copiedExtractObjects
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

  clearSelectedExtracts = (selectedExtracts) => {
    td = this.state.extractData
    sh = this.state.selectedExtracts
    td.push.apply(td, sh)
    this.setState({
      extractData: this.createUniqueKey(td),
    }, ()=>this.setState({
        extractItems: [],
        selectedExtracts: [],
        }, () => this.setExtractBorderProp())
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

  deleteExtract(item) {
    var dh = this.deleteHandle(this.state.extractData, item)
    this.setState({ extractData: dh
    }, () => this.setExtractBorderProp())
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
    // Grains
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

  setExtractBorderProp() {
    // Extracts
    if (this.state.extractData.length == 0) {
      this.setState({
        extractBorder: false
      })
    } else {
      this.setState({
        extractBorder: true
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

  setExtractQuantity(value, item) {
    var d = this.measureHandle(
      this.state.extractData, value, item, 'quantity')
    this.setState({extractData: d});
  }

  setExtractTime(value, item) {
    var d = this.measureHandle(
      this.state.extractData, value, item, 'boiltime')
    this.setState({extractData: d});
  }

  renderHopCard(cardItem) {
    return (
      <RecipeCard 
        mark={cardItem} 
        deleteItem={this.deleteHop.bind(this)} 
        setQuantity={this.setQuantity.bind(this)} 
        setTime={this.setTime.bind(this)}
        maxQuantity={this.hopToVolumeRatio(this.state.volume)}/>
    )
  }

  renderGrainCard(cardItem) {
    return (
      <RecipeCard 
        mark={cardItem} 
        deleteItem={this.deleteGrain.bind(this)} 
        setQuantity={this.setGrainQuantity.bind(this)} 
        setTime={this.setGrainTime.bind(this)}
        maxQuantity={this.grainToVolumeRatio(this.state.volume)}/>
    )
  }

  renderExtractCard(cardItem) {
    return (
      <RecipeCard 
        mark={cardItem} 
        deleteItem={this.deleteExtract.bind(this)} 
        setQuantity={this.setExtractQuantity.bind(this)} 
        setTime={this.setExtractTime.bind(this)}
        maxQuantity={this.maltToVolumeRatio(this.state.volume)}/>
    )
  }

  gramsToOunces(mass) {
    return mass * 0.035274
  }

  ouncesToGrams(mass) {
    return mass * 28.3495
  }

  gallonToLitre(volume) {
    return volume * 3.78541
  }

  litreToGallon(volume) {
    return volume * 0.264172
  }

  maltToVolumeRatio(volume) {
    return (volume/4.5) * 550
  }

  hopToVolumeRatio(volume) {
    return (volume/4.5) * 20
  }

  grainToVolumeRatio(volume) {
    return (volume/4.5) * 250
  }

  calculateAlphaAcidUnits(weight, alphaAcid) {
    // weight in oz 
    // alpha acid in whole number (e.g. 6.1)
    return weight * alphaAcid
  }

  calculateGravity(weight, points, volume) {
    // weight in llbs of extract
    // points in whole numbers (e.g. 40)
    // volumne in gallons
    return (weight * points) / volume
  }

  calculateUtilisation(gravity, time) {
    // gravity = original gravity
    // time = integer representing minutes 
    var fg = 1.65 * 0.000125^(gravity-1)
    var ft = (1-Math.E^(-0.04 * time))/4.15
    return fg * ft
  }

  calculateIBU(aau, utilisation, conversion, volume) {
    // aau is alpha acid units 
    // utilisation is a function of gravity and time
    // coversion is 75 for imperial and 10 for metric
    // volume is the recipe volume
    return (aau * utilisation * conversion) / volume
  }

  recipeIBU() {
    // if extract
    try {
      var edat = Object.keys(this.state.extractData).length
      var hdat = Object.keys(this.state.hopData).length
      if (edat > 0 && hdat > 0) {
        // get total weight* 
        // get avg points*
        // get recipe_volume*
        // og* = calculateGravity(weight, points, recipe_volume)
        //
        //
        // if hops
        // empty_array*
        // loop through hop data
        // get boiltime*  
        // util* = calculateUtilisation(og, boiltime)
        // get hop quantity*
        // get hop alpha acids*
        // aau* = calculateAlphaAcidUnits(quantity, alphaAcids)
        // ibu* = calculateIBU(aau, util, 75, recipe_volume)
        // empty_array.append(ibu*) 
        //
        // recipeIBU = sum of all hop additions in empty_array
        // return recipeIBU
        this.setState({
          IBU: 100
        })
      } 
    } catch(err) {
        console.log(err.message);
    }
  } 

  

  formatData(mydictionary){
    var dat = Object.values(mydictionary)
    var arr = dat.join('\n')
    return arr
  }

  submitData(){
    this.recipeIBU()
    var data = {
      date: this.state.date,
      name: this.state.title,
      class: this.state.group,
      method: this.state.method,
      type: this.state.beerType,
      volume: this.state.volume,
      fermenter: this.state.fermenterType,
      steeping_grains: this.state.grainData,
      extract: this.state.extractData,
      hops: this.state.hopData,
      ibu: this.state.IBU
    }
    console.log(data)
    alert(this.formatData(data))
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
                  Recipe volume
                </Text>
            </View>

            <TouchableOpacity style={styles.volumeBarMiniButton}
                onPress={() => this.setState({volume: 4.5})}>
              <Text style={styles.miniButtonText}>4.5</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.volumeBarMiniButton}
                onPress={() => this.setState({volume: 10})}>
              <Text style={styles.miniButtonText}>10</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.volumeBarMiniButton}
                onPress={() => this.setState({volume: 23})}>
              <Text style={styles.miniButtonText}>23</Text>
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
            items={extracts}
            uniqueKey="id"
            subKey='data'
            styles = {{
              container: {
                paddingHorizontal: 10
              }
            }}
            ref={(comp) => { this.multiSelect = comp }}
            onSelectedItemsChange={this.onSelectedExtractsChange}            
            onSelectedItemObjectsChange={this.onSelectedExtractsObjectChange}
            onConfirm={this.clearSelectedExtracts}
            selectedItems={this.state.extractItems}
            selectText="Select malt extract"
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
              this.state.extractBorder
                ? {borderWidth: 1} 
                : {borderWidth: 0}]}>
            <FlatList
              style={{flex: 1}}
              data={this.state.extractData}
              renderItem={({item}) => this.renderExtractCard(item)}
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