import React, { Component } from 'react';
import { Image, TouchableOpacity, Dimensions, Text } from 'react-native';
// import greenSeatImg from 'https://trains-images.s3-eu-west-1.amazonaws.com/seatGreenNew.png'
// import greenSeatImgRotated from '../images/seatGreenNewRotated.png'
// import redSeatImg from 'https://trains-images.s3-eu-west-1.amazonaws.com/seatRedNew.png'
// import yellowSeatImg from 'https://trains-images.s3-eu-west-1.amazonaws.com/seatYellowNew.png'
// import seatChosen from '../images/seatChosenNew.png'
// import seatChosenRotated from '../images/seatChosenNewRotated.png'

export default class Seat extends Component {
  constructor(props) {
    super(props);
    const greenSeatImg = "https://trains-images.s3-eu-west-1.amazonaws.com/seatGreenNew.png";
    const redSeatImg = "https://trains-images.s3-eu-west-1.amazonaws.com/seatRedNew.png";
    const yellowSeatImg = "https://trains-images.s3-eu-west-1.amazonaws.com/seatYellowNew.png";
    const seatChosen = "https://trains-images.s3-eu-west-1.amazonaws.com/seatChosenNew.png";
    const seatChosenRotated = "https://trains-images.s3-eu-west-1.amazonaws.com/seatChosenNewRotated.png";

    if (this.props.status == 'free')
      var image = greenSeatImg;
    else if (this.props.status == 'saved')
      var image = yellowSeatImg;
    else
      var image = redSeatImg;

    if (this.props.rorate == true) {
      console.log("need to rotate");
    }

    this.state = {
      style: this.props.style,
      id: this.props.id,
      status: this.props.status, // also for sensor input
      selected: false,
      imageURL: this.props.uri,
      imageSeatChosen: seatChosen,
      imageSeatChosenRotated: seatChosenRotated,
      addSeat: this.props.addSeat,
      rotate: this.props.rotate
    };
  }

  toggleSelect = () => {
    console.log("toggleSelect");
    console.log("id in toggle func " + this.state.id);
    if (this.state.status != 'saved' && this.state.status != 'taken') {
      if (!this.state.selected) {
        this.setState({
          imageURL: this.state.rotate == true ? this.state.imageSeatChosen : this.state.imageSeatChosenRotated,
          selected: true
        })
        this.state.addSeat(true, this.state.id);
      } else {
        this.setState({
          imageURL: greenSeatImg,
          selected: false
        })
        this.state.addSeat(false, this.state.id);
      }
    }
  }

  render() {
    const size = Dimensions.get('window');
    return (
      <TouchableOpacity onPress={() => this.toggleSelect()} >
        <Text style={{ fontSize: 11 }}>Seat {this.props.id}</Text>
        <Image
          key={this.state.id.toString() + ' ' + this.state.status.toString()}
          source={{ uri: this.state.imageURL }}
          style={this.state.rotate == true ? { height: size.height / 20, width: size.width / 12, flexDirection: 'row' }
            : { height: size.height / 20, width: size.width / 12, flexDirection: 'row', transform: [{ rotate: '180deg' }], marginBottom: 20 }}
        />
        {/* {this.state.rotate == false ? <Text style={{ fontSize: 11 }}>Seat {this.props.id}</Text> : null} */}
      </TouchableOpacity>
    );
  }
}