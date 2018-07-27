import React, { Component } from 'react'
import { 
  View, 
  Text,
  TextInput,
  TouchableOpacity, 
  ScrollView } from 'react-native'
import styles from './Styles/NewScreenStyles';
import DatePicker from 'react-native-datepicker';
import ModalSelector from 'react-native-modal-selector';
import MultiSelect  from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/FontAwesome';
import hops from '../Data/hops';
import { 
  Cell,
  Table,
  TableWrapper, 
  Row, 
  Rows } from 'react-native-table-component';

export default class NewScreen extends Component {
  constructor(props) {
    super(props)
    this.get_table_data = this.get_table_data.bind(this);
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
      test: ''
     };
  }
  componentWillMount(){
    // This runs before render()
    var currentDate = new Date();
    this.setState({
      date: currentDate
    })
  }

  /*
  componentDidMount(){
    return fetch('https://api.myjson.com/bins/7c2vu')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataSource: responseJson,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
    }
    */
  get_table_data(objs){
    tableArray = []
    for (i=0; i<objs.length; i++){
      tableArray.push([objs[i].id, objs[i].name, 'sel', 'min'])
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
    tableData = this.state.tableData
    td = this.get_table_data(this.state.tableTemp)
    for (i=0;i<td.length;i++) {
      tableData.push(td[i])
    }
    this.setState({
      tableData: tableData,
    }, ()=>this.setState({
      selectedItems: [],
      tableTemp: []
    }))
  }

  deleteHop(index) {
    td = this.state.tableData
    td.splice(index, 1)
    this.setState({
      tableData: td
    })
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

    const state = this.state;
    const element = (data, index) => (
      <TouchableOpacity 
        style={{alignItems:'center'}}
        onPress={() => this.deleteHop(index)}>
        <Icon name="trash" size={20} color="#78B7BB" />
      </TouchableOpacity>
    );


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
          <View style={styles.tablecontainer}>
            <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
            <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
              {
                state.tableData.map((rowData, index) => (
                  <TableWrapper key={index} style={styles.row}>
                  {
                      rowData.map((cellData, cellIndex) => (
                      <Cell 
                          key={cellIndex} 
                          data={cellIndex === 0 ? element(cellData, index) : cellData} 
                          textStyle={styles.text}/>
                      ))
                  }
                  </TableWrapper>
                ))
              }
            </Table>
          </View>
        </View>

      </ScrollView>
    )
  }
}