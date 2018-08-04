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
    //this.get_table_data = this.get_table_data.bind(this);
    this.clearSelectObjects = this.clearSelectObjects.bind(this);
    this.state = {
      date: '2018-01-01',
      title: 'Batch name',
      group: 'beer',
      method: '',
      beerType: '',
      vol: '',
      fermenterType: '',
      selectedItems: [],
      dataSource: [],
      tableHead: ['delete', 'hop', 'volume', 'time'],
      tableData: [],
      tableTemp: [],
      test: '',
      modalVisible: false
     };
  }
  
  componentWillMount(){
    // This runs before render()
    var currentDate = new Date();
    this.setState({
      date: currentDate
    })
  }

  createUniqueKey(objs){
    tableArray = []
    for (i=0; i<objs.length; i++){
      unique_key = i+1
      dat = objs[i]
      dat['key'] = unique_key.toString();
      tableArray.push(dat)
    }
    return tableArray
  }

  onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedItems });
  }
 
  onSelectedObjectsChange = (selectedObjects) => {
    this.setState({
      tableTemp: selectedObjects
    })
  }

  clearSelectObjects = (selectedItems) => {
    td = this.state.tableData
    tt = this.state.tableTemp
    td.push.apply(td, tt)
    this.setState({
      tableData: this.createUniqueKey(td),
    }, ()=>this.setState({
      selectedItems: [],
      tableTemp: []
    }))
  }

  deleteHop(item) {
    var tableDataTemp = [...this.state.tableData]
    let idx = tableDataTemp.indexOf(item);
    tableDataTemp.splice(idx, 1)
    this.setState({
      tableData: tableDataTemp
    }, ()=> console.log(this.state.tableData))
  }

  setQuantity(value, item) {
    var tableDataTemp = [...this.state.tableData]
    let idx = tableDataTemp.indexOf(item);
    tableDataTemp[idx]['quantity'] = Math.round(value)
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

        <View style={{
            flex: 0.5,
            alignItems: 'flex-end',
            justifyContent: 'center'}}>
          <Text style={{fontSize:20}}>
              {cardItem.quantity}
          </Text>
        </View>

        <View style={{
          flex: 2,
          alignItems: 'stretch',
          justifyContent: 'center',
          marginLeft: 10,
          marginRight: 10}}>
          <Slider
            value={60}
            step={1}
            minimumValue={0}
            maximumValue={80}
            onValueChange={(value) => this.setQuantity(value, cardItem) }
          />
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
          <View style={styles.viewSpacer}>
            <TextInput
              underlineColorAndroid='transparent'
              style={styles.textInput}
              onChangeText={(title) => {
                this.setState({title})}}
              value={this.state.title}/>
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
            <Text>
              {this.state.dataSource.name}
            </Text>
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
          <View style={{borderWidth: 1}}>
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