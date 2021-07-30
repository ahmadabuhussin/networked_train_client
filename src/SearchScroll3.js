import { Text, View, StyleSheet, ImageBackground } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useState } from 'react';
import * as React from 'react';
import * as Consts from './Consts'
import { connect } from 'react-redux'

const SearchScroll3 = ({ route, navigation, userId }) => {

  const [search, setSearch] = useState({ date: null, time: null, car: null, choose: null });
  const [showTime, setShowTime] = useState(false);
  const [showCar, setShowCar] = useState(false);
  const [showChoose, setShowChoose] = useState(false);
  const [update, setUpdate] = useState(false);
  const searchDates = route.params.search[0];
  const searchTime = route.params.search[1];
  const searchWeekdays = route.params.search[2];
  const searchAllTime = route.params.search[3];

  const addSearchSelection = function (type, selection) {
    setSearch(search => {
      if (type === 'date') {
        search.date = selection;
        setShowTime(true);
      }
      else if (type === 'time') {
        search.time = selection;
        setShowChoose(true);
      }
      else if (type === 'choose') {
        if (selection === 'save')
          setShowCar(true);
        else
          setShowCar(false);
        search.choose = selection;
      } else if (type === 'car') {
        search.car = selection;
      }
      return search;
    });
    if (type === 'car') {
      onSearch();
    }
    setUpdate((update) => !update);
    console.log("updated to: " + search.date + ',' + search.time + ',' + search.car);
  }

  const onSearch = () => {
    console.log("got inside onSearch: " + search.date + " " + search.time + " " + search.car + " " + search.choose);
    // if (search.date == null || search.time == null || search.car == null) {
    //   Alert.alert("Please pick a date, time and a car number");
    //   return;
    // }
    console.log('trying to fetch: /get_seats?fromStop=' + route.params.startTrain + '&toStop=' + route.params.endTrain + '&time=' + search.time + ' ' + search.date);
    fetch(Consts.SERVER + '/get_seats?fromStop=' + route.params.startTrain + '&toStop=' + route.params.endTrain + '&time=' + search.time + ' ' + search.date, {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("fetched inside searchScroll " + responseJson)
        navigation.navigate('SaveSeatScreen4', {
          userId: userId,
          startTrain: route.params.startTrain,
          endTrain: route.params.endTrain,
          datetime: search.time + ' ' + search.date,
          car: search.car,
          savedSeats: responseJson
        })
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <View>
      <ImageBackground
        source={require("../images/background2.png")}
        resizeMode="cover"
        style={Consts.styles.bgimage}>
      </ImageBackground>

      <View style={{ marginTop: 240 }} />
      <Text style={Consts.styles.textSearchScroll}>Choose a date:</Text>
      <ScrollView showsHorizontalScrollIndicator={false} style={Consts.styles.scrollView} horizontal={true} >
        {searchDates.map((text, index) => (
          <Text style={search.date && search.date === text ? Consts.styles.searchComponentSelected : Consts.styles.searchComponent}
            key={index} onPress={() => addSearchSelection('date', text)}>{text + '\n' + searchWeekdays[index]}</Text>
        ))}
      </ScrollView>
      <Text style={Consts.styles.textSearchScroll}>Choose a time:</Text>
      <ScrollView showsHorizontalScrollIndicator={false} style={{ ...Consts.styles.scrollView, ...{ opacity: showTime ? 100 : 0 } }} horizontal={true}>

        {search.date === searchDates[0] ?
          searchTime.map((text, index) => (
            <Text style={search.time && search.time === text ? Consts.styles.searchComponentSelected : Consts.styles.searchComponent}
              key={index} onPress={() => addSearchSelection('time', text)}>{text}</Text>
          )) :
          searchAllTime.map((text, index) => (
            <Text style={search.time && search.time === text ? Consts.styles.searchComponentSelected : Consts.styles.searchComponent}
              key={index} onPress={() => addSearchSelection('time', text)}>{text}</Text>
          ))}
      </ScrollView>
      <Text style={Consts.styles.textSearchScroll}>Choose a Status:</Text>
      <ScrollView style={{ ...Consts.styles.scrollView, ...{ opacity: showChoose ? 100 : 0 } }} horizontal={true}>
        <Text style={search.choose && search.choose === 'save' ? Consts.styles.searchComponentSelected : Consts.styles.searchComponent}
          onPress={() => addSearchSelection('choose', 'save')}>Save Seat</Text>
        <Text style={search.choose && search.choose === 'info' ? Consts.styles.searchComponentSelected : Consts.styles.searchComponent}
          onPress={() => {
            addSearchSelection('choose', 'info');
            fetch(Consts.SERVER + '/get_seats_num?fromStop=' + route.params.startTrain + '&toStop=' + route.params.endTrain + '&time=' + search.time + ' ' + search.date, {
              method: 'GET'
            })
              .then((response) => response.json())
              .then((responseJson) => {
                console.log("seats response: " + responseJson);
                navigation.navigate('TrainInfo', {
                  userId: userId,
                  startTrain: route.params.startTrain,
                  endTrain: route.params.endTrain,
                  datetime: search.time + ' ' + search.date,
                  seats: responseJson
                })
              })
              .catch((error) => {
                console.error(error);
              });

          }
          }>Train Info</Text>
      </ScrollView>
      <Text style={Consts.styles.textSearchScroll}>Choose a car number:</Text>
      <ScrollView style={{ ...Consts.styles.scrollView, ...{ opacity: showCar ? 100 : 0 } }} horizontal={true}>
        <Text style={search.car && search.car === '2' ? Consts.styles.searchComponentSelected : Consts.styles.searchComponent}
          onPress={() => addSearchSelection('car', '2')}>Car 2</Text>
        <Text style={search.car && search.car === '1' ? Consts.styles.searchComponentSelected : Consts.styles.searchComponent}
          onPress={() => addSearchSelection('car', '1')}>Car 1</Text>
      </ScrollView>
    </View>
  );
}

function mapStateToProps(state) {
  return {
    userId: state.userId
  }
}

export default connect(mapStateToProps)(SearchScroll3)
