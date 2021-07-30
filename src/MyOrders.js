import React, { useEffect, useState } from 'react';
import { Text, Alert, View, StyleSheet, ImageBackground, ScrollView, ActivityIndicator } from 'react-native';
import OrderCard from './OrderCard'
import * as Consts from './Consts'
import { connect } from 'react-redux'

const MyOrders = ({ navigation, route, userId }) => {

  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  function fetchUserSeats() {
    setLoading(true);
    fetch(Consts.SERVER + '/get_user_seats?user_id=' + userId, {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setOrders(responseJson);
        console.log("refreshing MyOrders with: " + responseJson);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    setLoading(true);
    console.log(route.params.myOrders)
    setOrders(route.params.myOrders);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [route.params.myOrders]);

  const onRemoveOrder = function (index) {
    Alert.alert(
      //title
      'Remove Seat',
      //body
      'Are you sure you want to remove seat?',
      [
        {
          text: 'Yes', onPress: () => {
            console.log("trying to remove seats with url: " + Consts.SERVER + '/remove_seat?fromStop=' + orders[index][0] + '&toStop=' + orders[index][1] + '&seat=' + orders[index][3] +
              '&user_id=' + userId + '&time=' + orders[index][2]);
            fetch(Consts.SERVER + '/remove_seat?fromStop=' + orders[index][0] + '&toStop=' + orders[index][1] + '&seat=' + orders[index][3] +
              '&user_id=' + userId + '&time=' + orders[index][2], {
              method: 'POST'
            })
              .then((response) => response.json())
              .then((responseJson) => {
                console.log("removed seats successfuly, got :" + responseJson);
              })
              .catch((error) => {
                console.error(error);
              });
            setTimeout(function () {
              fetchUserSeats();
            }, 500);
          }
        },
        {
          text: 'No',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
    setOrders(orders);
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../images/background2.png")}
        resizeMode="cover"
        style={Consts.styles.bgimage}>
      </ImageBackground>
      <View style={{ marginTop: 240 }} />

      <Text style={{ ...Consts.styles.textBold, ...{ fontSize: 24 } }}>My Orders</Text>
      <ScrollView showsVerticalScrollIndicator={false} style={Consts.styles.scrollViewMyOrders} vertical={true}>

        <View style={{ marginBottom: 80 }}>
          {loading ? <ActivityIndicator style={{ paddingTop: 190 }} size="large" /> : null}

          {loading ? null : orders.map((saved, index) => (
            <OrderCard key={index} index={index} removeFunc={onRemoveOrder} from={saved[0]} to={saved[1]} datetime={saved[2]}
              navigation={navigation} seats={saved[3]} userId={userId} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

function mapStateToProps(state) {
  return {
    userId: state.userId
  }
}

export default connect(mapStateToProps)(MyOrders)

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
  inputext: {
    width: 200,
    height: 44,
    padding: 10,
    marginTop: 50,
    textAlign: 'center',
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  OrderCard: {

  },
});