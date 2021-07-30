import { StyleSheet } from 'react-native';

export const SERVER = 'http://52.209.48.81:8080'

// export const SERVER = 'http://192.168.0.100:8081'

export const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    width: 350,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 40,
    color: 'black',
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 12,
    width: 350,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 40,
    color: 'black',
  },
});

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  textBold: {
    height: 44,
    padding: 10,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoView: {
    // alignItems: 'center',
    fontSize: 16,
    overflow: 'hidden',
    paddingVertical: 0,
    marginTop: 15,
    flex: 0.35,
    // flexWrap: 'wrap',
    marginHorizontal: 25,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#eaeaea',
    borderRadius: 10,
    color: 'black'
  },
  approveView: {
    alignItems: 'center',
    fontSize: 16,
    overflow: 'hidden',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#3ab54a',
    borderRadius: 50,
    color: 'black'
  },
  paymentRow: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: 'space-between',
  },
  bgimage: {
    top: 0,
    left: 0,
    height: 280,
    marginTop: -50,
    position: "absolute",
    right: 0,
    flexDirection: "row"
  },
  drawerNav: {
    color: "#1da1f2",
    fontSize: 25,
    height: 27,
    width: 25,
    marginLeft: 340,
    marginRight: 15,
    left: 'auto'
  },
  arrowBackNav: {
    color: "#1da1f2",
    fontSize: 24,
    marginTop: 2,
    marginLeft: 1
  },
  text: {
    color: "#1da1f2",
    textAlign: 'center',
    borderColor: "#1da1f2",
    borderWidth: 0,
    borderBottomWidth: 2,
    fontSize: 18,
  },
  textInput: {
    marginTop: 60,
    width: 339,
    height: 42,
    color: "#1da1f2",
    borderColor: "#1da1f2",
    borderWidth: 0,
    borderBottomWidth: 2,
    fontSize: 18,
  },
  textInputPayment: {
    height: 42,
    color: "#1da1f2",
    borderColor: "#1da1f2",
    borderWidth: 0,
    borderBottomWidth: 2,
    fontSize: 18,
  },
  buttonText: {
    textAlign: 'center',
    color: "#ffffff",
    fontSize: 24,
    top: 10,
  },
  buttonView: {
    alignItems: 'center',
    top: 200,
  },
  buttonView2: {
    alignItems: 'center',
    top: 150,
  },
  buttonView3: {
    alignItems: 'center',
    top: 170,
  },
  buttonOpacity: {
    width: 350,
    height: 50,
    backgroundColor: "#1da1f2",
    borderRadius: 100,
    top: -154,
  },
  buttonTextSaveSeats: {
    textAlign: 'center',
    color: "#ffffff",
    fontSize: 24,
    top: 10,
  },
  buttonViewSaveSeats: {
    alignItems: 'center',
    top: 120,
  },
  buttonOpacitySaveSeats: {
    marginTop: 45,
    width: 350,
    height: 50,
    backgroundColor: "#1da1f2",
    borderRadius: 100,
    top: -154,
  },
  scrollView: {
    flexDirection: 'row',
  },
  textSearchScroll: {
    color: "#1da1f2",
    textAlign: 'center',
    borderColor: "#1da1f2",
    borderWidth: 0,
    borderBottomWidth: 2,
    fontSize: 20,
    marginLeft: 20,
    textAlign: 'left',
  },
  scrollViewMyOrders: {
    flexDirection: 'column',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  searchComponent: {
    flexDirection: "row",
    paddingVertical: 20,
    paddingHorizontal: 20,
    margin: 16,
    borderWidth: 1,
    borderColor: "#20232a",
    borderRadius: 30,
    textAlign: "center",
    fontSize: 20,
  },
  searchComponentSelected: {
    flexDirection: "row",
    paddingVertical: 20,
    paddingHorizontal: 20,
    margin: 16,
    borderWidth: 1,
    borderColor: "#20232a",
    borderRadius: 30,
    backgroundColor: "#5496ff",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    overflow: 'hidden',
  },
});


