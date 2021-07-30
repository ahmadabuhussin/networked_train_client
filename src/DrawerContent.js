import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    Drawer
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux'
import * as Consts from './Consts'


const DrawerContent = function (props) {
    console.log("inside DrawerContent with userId: " + props.userId);
    console.log("inside DrawerContent with user: " + props.username);

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <Avatar.Image
                                source={{
                                    uri: 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'
                                }}
                                style={{ backgroundColor: '#f4f4f4' }}
                                size={50}
                            />
                            <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                                <Title style={styles.title}>{props.username}</Title>
                                <Caption style={styles.caption}>User number: {props.userId}</Caption>
                            </View>
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="arrow-left"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Back"
                            onPress={() => { props.navigation.navigate('Home') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="train"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="My Orders"
                            onPress={() => { 
                                fetch(Consts.SERVER + '/get_user_seats?user_id=' + props.userId, {
                                    method: 'GET'
                                  })
                                    .then((response) => response.json())
                                    .then((responseJson) => {
                                      props.navigation.navigate('MyOrders', { myOrders: responseJson, refresh: true });
                                    })
                                    .catch((error) => {
                                      console.error(error);
                                    }); }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="home-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Home"
                            onPress={() => { props.navigation.navigate('HomeScreen0') }}
                        />

                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({ color, size }) => (
                        <Icon
                            name="exit-to-app"
                            color={color}
                            size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={() => { props.navigation.navigate('Login1') }}
                />
            </Drawer.Section>
        </View>
    );
}

function mapStateToProps(state) {
    return {
        userId: state.userId,
        username: state.username
    }
}

export default connect(mapStateToProps)(DrawerContent)

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});