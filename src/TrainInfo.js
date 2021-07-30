import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import * as Consts from './Consts'

const TrainInfo = ({ route, navigation }) => {

  const [seats, setSeats] = useState(route.params.seats);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../images/background2.png")}
        resizeMode="cover"
        style={Consts.styles.bgimage}>
      </ImageBackground>
      <View style={{ marginTop: 230 }} />
      <Text style={{ ...Consts.styles.textBold, ...{ fontSize: 20 } }}>Train Info</Text>
      <View style={Consts.styles.infoView}>
        <Text style={{ ...Consts.styles.textBold, ...styles.textExtra }}>Date: {route.params.datetime}</Text>
        <Text style={{ ...Consts.styles.textBold, ...styles.textExtra }}>Train from: {route.params.startTrain} to {route.params.endTrain}</Text>
        <Text style={{ ...Consts.styles.textBold, ...styles.textExtra }}>Available seats: {route.params.seats}</Text>

      </View>
      <View style={{ paddingTop: 5 }} />
      <View style={Consts.styles.buttonView3}>
        <TouchableOpacity
          onPress={() => {
            console.log("seats inside trainInfo: " + seats);
            navigation.navigate('SaveSeatScreen4', {
              userId: route.params.userId,
              startTrain: route.params.startTrain,
              endTrain: route.params.endTrain,
              datetime: route.params.datetime,
              car: 1,
              savedSeats: seats,
              refresh: true
            })
          }}
          style={Consts.styles.buttonOpacity}
        >
          <Text style={Consts.styles.buttonText}>Book a seat</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

}

export default TrainInfo

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  textExtra: {
    fontSize: 15
  },
});
