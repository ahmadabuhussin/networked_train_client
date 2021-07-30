// import React, { Component } from 'react';
// import { TextInput, Text, Alert, Button, View, StyleSheet } from 'react-native';
// import RNPickerSelect from 'react-native-picker-select';
// import * as Consts from './Consts'


// export default class SelectedTrain extends Component {
//   constructor(props) {
//     super(props);
//     console.log("SelectedTrain userId:" + props.route.params.userId);

//     this.state = {
//       userId: props.route.params.userId,
//       startTrain: props.route.params.startTrain,
//       endTrain: props.route.params.endTrain,
//       hour: props.route.params.hour
//     };
//   }


//   componentDidMount() {
//     console.log("trying to fetch: " + Consts.SERVER + '/get_seats?fromStop=' + this.state.startTrain + '&toStop=' + this.state.endTrain + '&time=' + this.state.hour);

//     // fetching the saved seats for this train
//     fetch(Consts.SERVER + '/get_seats?fromStop=' + this.state.startTrain + '&toStop=' + this.state.endTrain + '&time=' + this.state.hour, {
//       method: 'GET'
//     })
//       .then((response) => response.json())
//       .then((responseJson) => {
//         console.log("finally " + responseJson)
//         this.setState({
//           savedSeats: responseJson
//         })
//       })
//       .catch((error) => {
//         console.error(error);
//       });

//   }

//   render() {
//     const placeholder = {
//       label: 'בחר תחנה...',
//       value: null,
//       color: '#9EA0A4',
//     };
//     const { userId, startTrain, endTrain, hour } = this.state;

//     return (
//       <>
//         <Text>{hour + " " + startTrain + " to " + endTrain}</Text>

//         <Button
//           title={'שמור מושב פנוי'}
//           // style={styles.input}
//           onPress={() =>
//             this.props.navigation.navigate('SaveSeatScreen4', { userId: userId, startTrain: startTrain, endTrain: endTrain, hour: hour.toString(), savedSeats: this.state.savedSeats, startSeat: 1})
//           }
//         />
//       </>

//     );
//   }
// }
