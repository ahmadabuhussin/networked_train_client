import * as React from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import * as Consts from './Consts'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux'

const getData = async (key, setFunc) => {
  try {
    const value = await AsyncStorage.getItem(key)
    if (value !== null) {
      setFunc(value);
    }
  } catch (e) {
    console.log("storeData Error: " + e);
  }
}

function HomeScreen0(props) {
  const [storedUserId, setStoredUserId] = useState(null);
  const [storedUsername, setStoredUsername] = useState(null);
  const size = Dimensions.get('window'); // 600x450

  useEffect(() => {
    if (storedUserId == null) {
      getData('@userId', setStoredUserId);
      getData('@username', setStoredUsername);
    }
  }, []);



  return (

    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>

      <Image
        source={require("../images/appHomeScreen.png")}
        style={{
          bottom: 225,
          flex: 1,
          width: size.width / 1,
          height: size.height / 1.2,
          resizeMode: 'contain'
        }}
      />
      <TouchableOpacity
        onPress={() => {
          if (storedUserId != null) {
            props.setUserId(storedUserId);
            props.setUsername(storedUsername);
            props.navigation.navigate('Search2', { userId: storedUserId, username: storedUsername });
          } else {
            props.navigation.navigate('Login1')
          }
        }}
        style={{
          width: 350,
          height: 50,
          backgroundColor: "#1da1f2",
          borderRadius: 100,
          bottom: 350
        }}
      >
        <Text style={Consts.styles.buttonText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    setUserId: (id) => dispatch({ type: 'updateUserId', userId: id }),
    setUsername: (user) => dispatch({ type: 'updateUsername', username: user })
  }
}

export default connect(null, mapDispatchToProps)(HomeScreen0)