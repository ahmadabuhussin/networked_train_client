import React from 'react';
import { Text, View, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native';
import * as Consts from './Consts'
import approvePic from '../images/approve.png'


const Approve6 = ({ route, navigation }) => {

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../images/background2.png")}
        resizeMode="cover"
        style={Consts.styles.bgimage}>
      </ImageBackground>
      <View style={{ marginTop: 250 }} />
      <Image
        source={approvePic}
        style={{ flexDirection: 'row', width: 70, height: 70 }}
      />
      <Text style={{ ...Consts.styles.textBold, ...{ fontSize: 24 } }}>Order Approved!</Text>

      <View style={Consts.styles.approveView}>
        <Text style={{ ...Consts.styles.textBold, ...styles.textExtra }}>Date: {route.params.datetime}</Text>
        <Text style={{ ...Consts.styles.textBold, ...styles.textExtra }}>Train from: {route.params.startTrain} to {route.params.endTrain}</Text>
        <Text style={{ ...Consts.styles.textBold, ...styles.textExtra }}>Seats numbers: {route.params.reservedSeats}</Text>
      </View>
      <View style={{ paddingTop: 5 }} />

      <Text style={{ ...Consts.styles.textBold, ...styles.textExtra }}>Thank you & safe travel!</Text>

      <View style={Consts.styles.buttonView2}>
        <TouchableOpacity
          onPress={() => {
            fetch(Consts.SERVER + '/get_user_seats?user_id=' + route.params.userId, {
              method: 'GET'
            })
              .then((response) => response.json())
              .then((responseJson) => {
                navigation.navigate('MyOrders', { myOrders: responseJson, refresh: true });
              })
              .catch((error) => {
                console.error(error);
              });
          }}
          style={Consts.styles.buttonOpacity}
        >
          <Text style={Consts.styles.buttonText}>View in My Orders</Text>
        </TouchableOpacity>
        <View style={{ paddingTop: 15 }} />
        <TouchableOpacity
          onPress={() => navigation.navigate('Search2', { userId: route.params.userId })}
          style={Consts.styles.buttonOpacity}
        >
          <Text style={Consts.styles.buttonText}>New Search</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Approve6


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  textExtra: {
    fontSize: 18
  },
});