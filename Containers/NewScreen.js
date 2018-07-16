import React, { Component } from 'react'
import { 
  View, 
  Text,
  TextInput,
  Picker } from 'react-native'
import BackButton from '../Components/BackButton';
import styles from './Styles/NewScreenStyles';
import DatePicker from 'react-native-datepicker';
import ModalSelector from 'react-native-modal-selector';
import MultiSelect  from 'react-native-sectioned-multi-select';

const items = [
  {  
    name: "Australian",
    id: 1,
    children: [{
        name: "Pride of Ringwood",
        id: 101,
      },{
        name: "Melba",
        id: 102,
      },{
        name: "Vic Secret",
        id: 103,
      },{
        name: "Topaz",
        id: 104,
      },{
        name: "Sylva",
        id: 105,
      },{
        name: "Summer",
        id: 106,
      },{
        name: "Helga",
        id: 107,
      },{
        name: "Galaxy",
        id: 108,
      },{
        name: "Ella",
        id: 109,
      },{
        name: "Enigma",
        id: 110,
      }]
  },
  {
    name: "American",
    id: 2,
    children: [{
        name: "Cascade",
        id: 201,
      },{
        name: "Willamette",
        id: 202,
      },{
        name: "Warrior",
        id: 203,
      },{
        name: "Simcoe",
        id: 204,
      },{
        name: "Mosaic",
        id: 205,
      },{
        name: "El Dorado",
        id: 206,
      },{
        name: "Columbus",
        id: 207,
      },{
        name: "Cluster",
        id: 208,
      },{
        name: "Citra",
        id: 209,
      },{
        name: "Chinook",
        id: 210,
      },{
        name: "Centennial",
        id: 211,
      },{
        name: "Amarillo",
        id: 212,
      },{
        name: "Idaho",
        id: 213,
      }]
  },
  {
    name: "European",
    id: 3,
    children: [{
        name: "Hallertau",
        id: 301,
      },{
        name: "Mandarina",
        id: 302,
      },{
        name: "Tettnang",
        id: 303,
      },{
        name: "Styrian Goldings",
        id: 304,
      },{
        name: "Saaz",
        id: 305,
      },{
        name: "Perle",
        id: 306,
      },{
        name: "Northern Brewer",
        id: 307,
      },{
        name: "Magnum",
        id: 308,
      },{
        name: "Hersbrucker",
        id: 309,
      },{
        name: "Hallertau Blanc",
        id: 310,
      }]
  },
  {
    name: "British",
    id: 4,
    children: [{
        name: "Challenger",
        id: 401,
      },{
        name: "East Kent Goldings",
        id: 402,
      },{
        name: "Fuggles",
        id: 403,
      },{
        name: "Northdown",
        id: 404,
      }]
  },
  {
    name: "New Zealand",
    id: 5,
    children: [{
        name: "Dr Rudi",
        id: 501,
      },{
        name: "Taiheke",
        id: 502,
      },{
        name: "Moutere",
        id: 503,
      },{
        name: "Riwaka",
        id: 504,
      },{
        name: "Wakatu",
        id: 505,
      },{
        name: "Wai-iti",
        id: 506,
      },{
        name: "Nelson Sauvin",
        id: 507,
      },{
        name: "Motueka",
        id: 508,
      },{
        name: "Green Bullet",
        id: 509,
      },{
        name: "Waimea",
        id: 510,
      }]
  },
]

export default class NewScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: '2018-01-01',
      title: 'Batch name',
      group: 'beer',
      textInputValue: '',
      selectedItems: []
     };
  }
  componentWillMount(){
    // This runs before render()
    var currentDate = new Date();
    this.setState({
      date: currentDate
    })
  }

  onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedItems });
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

    return (
      <View style={styles.container}>
        <View style={styles.titleblock}> 
          <Text style={styles.title}>
            New Screen
          </Text>   
        </View>

        <View style={{alignItems:'center'}}>
          <TextInput
            style={{fontSize: 20,
              padding: 15, 
              color: 'black', 
              width: 300,
              textAlign: 'center'}}
            onChangeText={(title) => {
              this.setState({title})}}
            value={this.state.title}
          />
        </View>

        <View style={{alignItems:'center'}}>
          <ModalSelector
              data={beer}
              initValue="Select brew type"
              supportedOrientations={['landscape']}
              accessible={true}
              scrollViewAccessibilityLabel={'Scrollable options'}
              cancelButtonAccessibilityLabel={'Cancel Button'}
              onChange={(option)=>{ this.setState({textInputValue:option.label})}}>
              <TextInput
                  style={{fontSize: 20,
                    padding: 15, 
                    color: 'black', 
                    width: 300,
                  textAlign: 'center'}}
                  editable={false}
                  placeholder="Select brew type"
                  value={this.state.textInputValue} />
          </ModalSelector>
        </View>

     
        <MultiSelect
          hideTags
          items={items}
          uniqueKey="id"
          subKey='children'
          ref={(component) => { this.multiSelect = component }}
          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={this.state.selectedItems}
          selectText="Select hops"
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


        <View style={{alignItems:'center'}}>        
          <DatePicker
            style ={{width: 200}}
            date={this.state.date}
            placeholder="select date"
            mode="date"
            format="YYYY-MM-DD"
            minDate="2018-01-01"
            maxDate={this.state.date}
            showIcon={true}
            customStyles={{
            dateInput: {
                padding:5
            },
          }}
          onDateChange={(date) => {
            this.setState({date: date});}}/>
        </View>     


        <View style={{alignItems:'center', paddingTop:50}}> 
          <BackButton /> 
        </View>  
      </View>
    )
  }
}