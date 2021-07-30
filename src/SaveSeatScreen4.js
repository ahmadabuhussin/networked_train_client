import { useEffect, useState } from 'react';
import * as React from 'react';
import { Text, ScrollView, View, StyleSheet, ActivityIndicator, Alert, ImageBackground, TouchableOpacity, Image } from 'react-native';
import Seat from './Seat'
import * as Consts from './Consts'
import line from '../images/line.png'
import { connect } from 'react-redux'

const SaveSeatScreen4 = ({ route, navigation, userId }) => {
  const [savedSeats, setSavedSeats] = useState(route.params.savedSeats[0]);
  const [takenSeats, setTakenSeats] = useState(route.params.savedSeats[1]);
  const [reservedSeats, setReservedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(0);

  const [line1, setLine1] = useState([]);
  const [line2, setLine2] = useState([]);
  const [line3, setLine3] = useState([]);
  const [line4, setLine4] = useState([]);

  function mapSeatsToLines() {
    var tempLine1 = [], tempLine2 = [], tempLine3 = [], tempLine4 = [];
    var tempSeat = {};
    const startSeat = route.params.car == 1 ? 1 : 53;
    var flip = false;
    for (var i = startSeat; i < startSeat + 56; i++) {
      if ((i - 1) % 4 == 0) {
        var flip = !flip;
      }
      if (savedSeats.some(seat => seat == String(i)))
        tempSeat = { id: i, status: 'saved', key: i };
      else if (takenSeats.some(seat => seat == String(i)))
        tempSeat = { id: i, status: 'taken', key: i };
      else
        tempSeat = { id: i, status: 'free', key: i };
        
      if (tempSeat.status === 'free')
        tempSeat.uri = "https://trains-images.s3-eu-west-1.amazonaws.com/seatGreenNew.png";
      else if (tempSeat.status === 'saved')
        tempSeat.uri = "https://trains-images.s3-eu-west-1.amazonaws.com/seatYellowNew.png";
      else if (tempSeat.status === 'taken')
        tempSeat.uri = "https://trains-images.s3-eu-west-1.amazonaws.com/seatRedNew.png";
      if (i % 4 == 0)
        tempLine1.push({ ...tempSeat, ...{ rotate: flip } });
      if (i % 4 == 1)
        tempLine2.push({ ...tempSeat, ...{ rotate: flip } });
      if (i % 4 == 2)
        tempLine3.push({ ...tempSeat, ...{ rotate: flip } });
      if (i % 4 == 3)
        tempLine4.push({ ...tempSeat, ...{ rotate: flip } });
    }
    setLine1(tempLine1);
    setLine2(tempLine2);
    setLine3(tempLine3);
    setLine4(tempLine4);
  }

  const AddSeatsFunc = function (flag, id) {
    console.log("id inside func " + id);
    console.log("flag inside func " + flag);
    if (flag)
      setReservedSeats(reservedSeats => reservedSeats.concat(id));
    else
      setReservedSeats(reservedSeats => {
        reservedSeats.splice(reservedSeats.indexOf(id), 1);
        return reservedSeats;
      });
  }


  useEffect(() => {
    setLoading(true);
    console.log("saveSeatScreen useEffect with " + route.params.savedSeats);
    setSavedSeats(route.params.savedSeats[0]);
    setTakenSeats(route.params.savedSeats[1]);
    setCounter(counter+1);

    console.log("this is savedSeats: " + savedSeats);
    console.log("this is counter: " + counter);
    for (var i=0; i<line1.length; i++) {
      console.log("line1[" + line1[i].id + "] key: " + line1[i].id + counter);
    }
    mapSeatsToLines();
    console.log()
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, [route.params.savedSeats]);

  const onSearch = () => {
    if (reservedSeats.length == 0) {
      Alert.alert("Please select a seat");
      return;
    }
    navigation.navigate('Payment5', {
      userId: userId,
      startTrain: route.params.startTrain,
      endTrain: route.params.endTrain,
      datetime: route.params.datetime,
      reservedSeats: Array.from(new Set(reservedSeats)).toString()
    })
  }


  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../images/background2.png")}
        resizeMode="cover"
        style={Consts.styles.bgimage}>
      </ImageBackground>

      {loading ? <ActivityIndicator style={{ paddingTop: 270 }} size="large" /> : null}
      <View style={{ flex: 1, opacity: loading ? 0 : 100 }}>
        <View style={{ paddingTop: 250, height: 100 }} />
        <ScrollView>
          {/* <Text>אנא בחר מושב:</Text> */}

          <View style={{ flex: 1, marginLeft: 0, flexDirection: 'row', paddingLeft: 25 }}>

            <View style={{ flex: 3 }}>
              {line2.map((seat) => (
                <Seat status={seat.status} uri={seat.uri} id={seat.id} key={seat.id} addSeat={AddSeatsFunc} rotate={seat.rotate} />
              ))}
            </View>

            <View style={{ flex: 3 }}>
              {line3.map((seat) => (
                <Seat status={seat.status} uri={seat.uri} id={seat.id} key={seat.id} addSeat={AddSeatsFunc} rotate={seat.rotate} />
                ))}
            </View>

            <Image source={line} style={{ paddingLeft: 0 }} />

            <View style={{ flex: 5 }}></View>
            <Image source={line} />

            <View style={{ flex: 3 }}>
              {line4.map((seat) => (
                <Seat status={seat.status} uri={seat.uri} id={seat.id} key={seat.id} addSeat={AddSeatsFunc} rotate={seat.rotate} />
                ))}
            </View>

            <View style={{ flex: 3 }}>
              {line1.map((seat) => (
                <Seat status={seat.status} uri={seat.uri} id={seat.id} key={seat.id} addSeat={AddSeatsFunc} rotate={seat.rotate} />
                ))}
            </View>
          </View>
        </ScrollView>
        <View style={Consts.styles.buttonViewSaveSeats}>
          <TouchableOpacity
            onPress={onSearch}
            style={Consts.styles.buttonOpacitySaveSeats}
          >
            <Text style={Consts.styles.buttonTextSaveSeats}>Save Seats</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function mapStateToProps(state) {
  return {
    userId: state.userId
  }
}

export default connect(mapStateToProps)(SaveSeatScreen4)

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    height: '100%'
  },
  container2: {
    flex: 2,
    alignItems: 'flex-start',
    flexDirection: 'column',
    height: '100%'
  },
  container3: {
    flex: 9,
    flexDirection: 'row',
    height: '100%'
  },
  container4: {
    flex: 10,
    flexDirection: 'row',
    height: '100%'
  },
  item: {
    width: '100%'
  },
})