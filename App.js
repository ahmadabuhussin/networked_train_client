
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import EntypoIcon from "react-native-vector-icons/Entypo";
import * as Consts from './src/Consts'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import HomeScreen0 from './src/HomeScreen0';
import Login1 from './src/Login1';
import Search2 from './src/Search2';
import SearchScroll3 from './src/SearchScroll3';
import SaveSeatScreen4 from './src/SaveSeatScreen4';
import Payment5 from './src/Payment5';
import Approve6 from './src/Approve6';
import MyOrders from './src/MyOrders'
import TrainInfo from './src/TrainInfo'
import DrawerContent from './src/DrawerContent';


// initial state for redux
const initialState = {
  userId: null,
  username: null,
}

// reducer for redux
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'updateUserId':
      return {
        userId: action.userId,
        username: state.username
      }
    case 'updateUsername':
      return {
        userId: state.userId,
        username: action.username
      }
  }
  return state;
}

// redux store
const store = createStore(reducer);


const debugParams = {
  userId: 1,
  startTrain: "tel aviv",
  endTrain: "herzelia",
  datetime: "18:17 3/5/21",
  reservedSeats: "43,44"
  // search: [["23/4/21", "24/4/21"], ["18:17"]]
};

const Drawer = createDrawerNavigator();
const MainStack = createStackNavigator();

const MainStackScreen = ({ navigation }) => (
  <MainStack.Navigator
    screenOptions={{
      headerShown: true
    }}
  >
    {/* <MainStack.Screen name="Payment5" component={Payment5} initialParams={debugParams} /> */}

    <MainStack.Screen name="HomeScreen0" component={HomeScreen0} options={{
      title: 'Welcome',
    }} />

    <MainStack.Screen name="Login1" component={Login1} options={{
      title: 'Login',
    }} />

    <MainStack.Screen name="Search2" component={Search2} options={{
      title: 'Search Trains',
      headerRight: () => (
        <EntypoIcon
          name="menu"
          style={Consts.styles.drawerNav}
          onPress={() => navigation.toggleDrawer()}
        />
      )
    }} />

    <MainStack.Screen name="SearchScroll3" component={SearchScroll3} options={{
      title: 'Search Trains',
      headerRight: () => (
        <EntypoIcon
          name="menu"
          style={Consts.styles.drawerNav}
          onPress={() => navigation.toggleDrawer()}
        />
      )
    }} />

    <MainStack.Screen name="SaveSeatScreen4" component={SaveSeatScreen4} options={{
      title: 'Reserve Seats',
      headerRight: () => (
        <EntypoIcon
          name="menu"
          style={Consts.styles.drawerNav}
          onPress={() => navigation.toggleDrawer()}
        />
      )
    }} />

    <MainStack.Screen name="MyOrders" component={MyOrders} options={{
      title: 'My Orders',
      headerRight: () => (
        <EntypoIcon
          name="menu"
          style={Consts.styles.drawerNav}
          onPress={() => navigation.toggleDrawer()}
        />
      )
    }} />

    <MainStack.Screen name="Payment5" component={Payment5} options={{
      title: 'Payment',
      headerRight: () => (
        <EntypoIcon
          name="menu"
          style={Consts.styles.drawerNav}
          onPress={() => navigation.toggleDrawer()}
        />
      )
    }} />

    <MainStack.Screen name="Approve6" component={Approve6} options={{
      title: 'Approve',
      headerRight: () => (
        <EntypoIcon
          name="menu"
          style={Consts.styles.drawerNav}
          onPress={() => navigation.toggleDrawer()}
        />
      ),
      gestureEnabled: false,
      headerLeft: null
    }} />

    <MainStack.Screen name="TrainInfo" component={TrainInfo} options={{
      title: 'Train Info',
      headerRight: () => (
        <EntypoIcon
          name="menu"
          style={Consts.styles.drawerNav}
          onPress={() => navigation.toggleDrawer()}
        />
      )
    }} />

  </MainStack.Navigator>
);

function App(props) {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator drawerPosition="right" drawerContent={props => <DrawerContent {...props} />}>
          <Drawer.Screen name="Home" component={MainStackScreen} />
          <Drawer.Screen name="My Orders" component={MyOrders} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
*
export default App
