import React, { Component } from 'react';
import { Text, Alert, View, StyleSheet, ImageBackground, TouchableOpacity, ActivityIndicator } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import * as Consts from './Consts'
import { connect } from 'react-redux'

class Search2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.userId,
      stops: [],
      loading: false
    };
  }

  componentDidMount() {
    fetch(Consts.SERVER + '/get_stops', {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("search got : " + responseJson);
        this.setState({
          stops: responseJson
        })
      })
      .catch((error) => {
        console.error(error);
      });
  }

  onSearch() {
    const { userId, startTrain, endTrain } = this.state;
    if (startTrain == null || endTrain == null) {
      Alert.alert("Please enter start and end destinations")
      return;
    } else if (userId == null) {
      Alert.alert("Error. Please login again.");
      return;
    } else {
      this.setState({
        loading: true
      });
      fetch(Consts.SERVER + '/get_trains?fromStop=' + startTrain + '&toStop=' + endTrain, {
        method: 'GET'
      })
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            loading: false
          });
          if (responseJson == "") {
            Alert.alert("Error. No trains were found.");
            return;
          }
          this.props.navigation.navigate('SearchScroll3', { userId: userId, startTrain: startTrain, endTrain: endTrain, search: responseJson });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  render() {
    const placeholder = {
      label: 'Choose a stop...',
      value: null,
      color: '#9EA0A4',
    };
    const { stops } = this.state;

    return (
      <View style={Consts.styles.container}>
        <ImageBackground
          source={require("../images/background2.png")}
          resizeMode="cover"
          style={Consts.styles.bgimage}>
        </ImageBackground>

        {this.state.loading ? <ActivityIndicator style={{ paddingTop: 0, position: 'absolute' }} size="large" /> : null}
        <Text style={{ ...Consts.styles.textBold, ...{ fontSize: 20 } }}>Please choose train stops:</Text>
        {/* <View paddingVertical={0} /> */}
        <View>
          <Text style={{ ...Consts.styles.textBold, ...{ fontSize: 18 } }}>From:</Text>
          <RNPickerSelect
            placeholder={placeholder}
            items={stops}
            onValueChange={value => {
              this.setState({
                startTrain: value,
              });
            }}
            style={Consts.pickerSelectStyles}
            value={this.state.startTrain}
          />
          <View paddingVertical={20} />
          <Text style={{ ...Consts.styles.textBold, ...{ fontSize: 18 } }}>To:</Text>
          <RNPickerSelect
            placeholder={placeholder}
            items={stops}
            onValueChange={value => {
              this.setState({
                endTrain: value,
              });
            }}
            style={Consts.pickerSelectStyles}
            value={this.state.endTrain}
          />
        </View>
        <View paddingVertical={10} />

        <View style={Consts.styles.buttonView}>
          <TouchableOpacity
            onPress={this.onSearch.bind(this)}
            style={Consts.styles.buttonOpacity}>
            <Text style={Consts.styles.buttonText}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    userId: state.userId
  }
}

export default connect(mapStateToProps)(Search2)
