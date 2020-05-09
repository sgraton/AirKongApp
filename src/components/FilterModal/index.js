
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';


import GodzillaButton from '../Shared/GodzillaButton';
import { setFilter, getRooms } from '../../actions/room';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#007B7F',
  },
  address: {
      color: '#E2E2E2',
      fontSize: 16,
      fontWeight: 'bold',
  },
  addressInput: {
      color: '#E2E2E2',
      marginBottom: 40,
  },
  datePicker: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 40,
  },
  datePickerButton: {
      flex: 1,
  },
  datePickerText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#E2E2E2',
  },
});

class FilterModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: props.filter.address, 
            startDate: props.filter.startDate,
            endDate: props.filter.endDate,
            showStartDate: false, 
            showEndDate: false,
        }
    }

    onStartDateChange = (event, date) => {
      if (date !== undefined) {
        console.log(date);
        this.setState({startDate: moment(date).format('DD-MM-YYYY'), showStartDate: false});
      }
    }

    onEndDateChange = (event, date) => {
      if (date !== undefined) {

        this.setState({endDate: moment(date).format('DD-MM-YYYY'), showEndDate: false});
      }
    }

    showStart = () => {
      this.setState({showStartDate: true});
    };

    showEnd = () => {
      this.setState({showEndDate: true});
    };

    onSearch() {
      // Step 1 : Set filter setFilter()
      this.props.setFilter(this.state);

      // Step 2 : Go back ExploreTab
      this.props.navigation.goBack();

      // Step 3 : Get new list of rooms based on search criteria
      this.props.getRooms();
    }

  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
          <Text style={styles.address}>WHERE TO ?</Text>
          <TextInput 
            style={styles.addressInput} 
            underlineColorAndroid='#E2E2E2' 
            value={this.state.address} 
            onChangeText={address => this.setState({address})} 
          />

            <View style={styles.datePicker}>
                <TouchableOpacity style={styles.datePickerButton} onPress={ () => this.showStart() }>
                    <Text style={styles.datePickerText}>{this.state.startDate || 'Start Date'}</Text>
                </TouchableOpacity>

                <Text style={[styles.datePickerText, {flex : 1}]}>to</Text>

                <TouchableOpacity style={styles.datePickerButton} onPress={ () => this.showEnd() }>
                    <Text style={styles.datePickerText}>{this.state.endDate || 'End Date'}</Text>
                </TouchableOpacity>
            </View>

            <GodzillaButton
              onPress={ () => this.onSearch() } 
              backgroundColor='#2F868E' 
              textColor='#E2E2E2'
              label='Search'
            />

            {this.renderStartPicker()}
            {this.renderEndPicker()}
      </ScrollView>
    );
  }

  renderStartPicker() {
    if (this.state.showStartDate) {
      return (<DateTimePicker
        value={new Date()}
        minimumDate={new Date()}
        mode="date"
        onChange={this.onStartDateChange}
      />
      );
    }
  }

  renderEndPicker() {
    if (this.state.showEndDate) {
      return (<DateTimePicker
        value={new Date()}
        minimumDate={new Date()}
        mode="date"
        onChange={this.onEndDateChange}
      />
      );
    }
  }
}

const mapStateToProps = state => ({
  filter: state.room.filter,
});

const mapDispatchToProps = dispatch => ({
  setFilter: (filter) => dispatch(setFilter(filter)),
  getRooms: () => dispatch(getRooms()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterModal);
