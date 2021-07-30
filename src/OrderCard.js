import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import * as Consts from './Consts'

const OrderCard = ({ navigation, from, to, datetime, seats, userId, index, removeFunc }) => {

  const viewTrain = () => {
    fetch(Consts.SERVER + '/get_seats_num?fromStop=' + from + '&toStop=' + to + '&time=' + datetime, {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("seats response: " + responseJson);
        navigation.navigate('TrainInfo', { userId: userId, startTrain: from, endTrain: to, datetime: datetime, seats: responseJson });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.cardBody}>
        <View style={styles.bodyContent}>
          <Text style={styles.title}>{from} to {to}</Text>
          <Text style={styles.subtitle}>Scheduled for: {datetime}</Text>
          <Text style={styles.subtitle}>Seats number: {seats}</Text>
        </View>
        <Image
          source={require("../images/seatGreen.png")}
          style={styles.cardImage}
        ></Image>
      </View>
      <View style={styles.actionBody}>
        <TouchableOpacity style={styles.cardViewButton} onPress={viewTrain}>
          <Text style={styles.cardViewButtonText}>VIEW TRAIN</Text>
        </TouchableOpacity>
        <View style={{ padding: 5 }} />
        <TouchableOpacity style={styles.cardRemoveButton} onPress={() => removeFunc(index)}>
          <Text style={styles.cardRemoveButtonText}>REMOVE SEAT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default OrderCard;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 10,
    borderColor: "#CCC",
    flexWrap: "nowrap",
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 3,
    overflow: "hidden"
  },
  cardBody: {
    height: 120,
    width: 359,
    marginTop: 10,
    marginLeft: 8,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  bodyContent: {
    padding: 16,
    paddingTop: 24,
    flex: 1
  },
  title: {
    fontSize: 24,
    color: "#000",
    paddingBottom: 12
  },
  subtitle: {
    fontSize: 14,
    color: "#000",
    lineHeight: 16,
    opacity: 0.5,
    paddingBottom: 5,
  },
  cardImage: {
    height: 100,
    width: 75,
    margin: 16
  },
  actionBody: {
    padding: 20,
    flexDirection: "row"
  },
  cardViewButton: {
    padding: 10,
    height: 36,
    backgroundColor: "#66aeff",
    borderRadius: 15,
  },
  cardViewButtonText: {
    fontSize: 14,
    color: "#fff",
    opacity: 0.9
  },
  cardRemoveButton: {
    padding: 10,
    height: 36,
    backgroundColor: "#ff4d4d",
    borderRadius: 15,
  },
  cardRemoveButtonText: {
    fontSize: 14,
    color: "#fff",
    opacity: 0.9
  }
});

