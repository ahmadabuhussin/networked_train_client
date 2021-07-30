import React, { useState } from 'react';
import { TextInput, Text, View, StyleSheet, ImageBackground, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as Consts from './Consts'

const Payment5 = ({ route, navigation }) => {

  const [cardNum, setCardNum] = useState('');
  const [cardExpireMonth, setCardExpireMonth] = useState('');
  const [cardExpireYear, setCardExpireYear] = useState('');
  const [CVV, setCVV] = useState('');
  const [loading, setLoading] = useState(false);

  const onPress = () => {
    // if (isNaN(cardNum) || cardNum.length == 0 || isNaN(cardExpireMonth) || cardExpireMonth.length != 2 ||
    //   isNaN(cardExpireYear) || cardExpireYear.length != 4 || isNaN(CVV) || CVV.length != 3) {
    //   Alert.alert("Credit card information are invalid. Please try again");
    //   return;
    // }
    setLoading(true);
    setTimeout(function () {
      console.log("trying to send seat: " + route.params.reservedSeats);
      fetch(Consts.SERVER + '/save_seat?fromStop=' + route.params.startTrain + '&toStop=' + route.params.endTrain + '&seat=' + route.params.reservedSeats +
        '&user_id=' + route.params.userId + '&time=' + route.params.datetime, {
        method: 'POST'
      })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log("added seats successfuly, got :" + responseJson);
        })
        .catch((error) => {
          console.error(error);
        });

      setLoading(false);
      // navigating to approve screen
      navigation.navigate('Approve6', route.params);
      setLoading(false);
    }, 1500);
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../images/background2.png")}
        resizeMode="cover"
        style={Consts.styles.bgimage}>
      </ImageBackground>

      <View style={{ marginTop: 250 }} />
      <Text style={styles.text}>Credit Card Payment</Text>
      <Text style={{ ...Consts.styles.text, ...{ paddingBottom: 20 } }}>You're paying for seats: {route.params.reservedSeats} on the train from: {route.params.startTrain} to: {route.params.endTrain} at {route.params.datetime}</Text>
      {loading ? <ActivityIndicator style={{ paddingTop: 350, position: 'absolute' }} size="large" /> : null}

      <TextInput
        style={{ ...Consts.styles.textInputPayment, ...{ width: 300 } }}
        placeholder="Credit Card Number"
        value={cardNum}
        onChangeText={(cardNum) => setCardNum(cardNum)}
      />
      <View style={Consts.styles.paymentRow}>
        <TextInput
          style={{ ...Consts.styles.textInputPayment, ...{ width: 70 } }}
          placeholder="Month"
          value={cardExpireMonth}
          onChangeText={(cardExpireMonth) => setCardExpireMonth(cardExpireMonth)}
        />
        <Text style={styles.text}>/</Text>
        <TextInput
          style={{ ...Consts.styles.textInputPayment, ...{ width: 70 } }}
          placeholder="Year"
          value={cardExpireYear}
          onChangeText={(cardExpireYear) => setCardExpireYear(cardExpireYear)}
        />
      </View>
      <TextInput
        style={{ ...Consts.styles.textInputPayment, ...{ width: 60 } }}
        placeholder="CVV"
        value={CVV}
        onChangeText={(CVV) => setCVV(CVV)}
      />

      <View style={Consts.styles.buttonView}>
        <TouchableOpacity
          disabled={loading}
          onPress={onPress}
          style={Consts.styles.buttonOpacity}
        >
          <Text style={Consts.styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Payment5

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  text: {
    // width: 200,
    height: 44,
    padding: 10,
    // textAlign: 'center',
    fontWeight: 'bold',
    // borderWidth: 1,
    // borderColor: 'black',
    marginBottom: 10,
  },
});