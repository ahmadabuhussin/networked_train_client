import React, { Component } from 'react';
import { TextInput, Text, Alert, View, ImageBackground, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as Consts from './Consts'
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';

class Login1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      navigation: props.navigation,
      loading: false
    };
  }

  async storeData(key, value) {
    try {
      await AsyncStorage.setItem(key, value.toString());
    } catch (e) {
      console.log("storeData Error: " + e);
    }
  }

  onLogin() {
    const { username, password } = this.state;
    this.setState({
      loading: true
    });
    if (username === '' || password === '') {
      Alert.alert("Please enter username and password");
    } else {
      fetch(Consts.SERVER + '/sign?user=' + username + '&password=' + password, {
        method: 'GET'
      })
        .then((response) => response.json())
        .then((responseJson) => {
          const user = this.state.username;
          this.setState({
            loading: false,
            username: '',
            password: ''
          });
          if (Array.isArray(responseJson)) {
            Alert.alert("Error. Wrong username/password.");
            return;
          }
          // Alert.alert("You've logged in successfully");
          this.storeData('@userId', responseJson);
          this.storeData('@username', user);
          this.props.setUserId(responseJson);
          this.props.setUsername(user);
          this.props.navigation.navigate('Search2', { userId: responseJson });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  render() {
    return (
      <View style={Consts.styles.container}>
        <ImageBackground
          source={require("../images/background2.png")}
          resizeMode="cover"
          style={Consts.styles.bgimage}>
        </ImageBackground>
        {this.state.loading ? <ActivityIndicator style={{ paddingTop: 0, position: 'absolute' }} size="large" /> : null}
        <Text style={{ ...Consts.styles.textBold, ...{ fontSize: 24 } }}>Login</Text>
        <TextInput
          placeholder="Username"
          placeholderTextColor="#95cbec"
          value={this.state.username}
          onChangeText={(username) => this.setState({ username })}
          label='Email'
          textContentType='oneTimeCode'
          style={Consts.styles.textInput}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#95cbec"
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          label='Password'
          textContentType='oneTimeCode'
          secureTextEntry={true}
          style={Consts.styles.textInput}
        />
        <View style={Consts.styles.buttonView}>
          <TouchableOpacity
            onPress={this.onLogin.bind(this)}
            style={Consts.styles.buttonOpacity}
          >
            <Text style={Consts.styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setUserId: (id) => dispatch({ type: 'updateUserId', userId: id }),
    setUsername: (user) => dispatch({ type: 'updateUsername', username: user })
  }
}

export default connect(null, mapDispatchToProps)(Login1)