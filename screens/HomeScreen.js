import React, { Component } from "react";
import { StyleSheet, Text, View, StatusBar, ListView } from 'react-native';
import { Container, Content, Header, Form, Input, Button, Label, Item, Icon, List, ListItem } from 'native-base'
//import firebase and using it
import * as firebase from 'firebase';
//Test data for view
//var data = ["Binh", "Nguyen"]
var data = []
export default class HomeScreen extends React.Component {

    constructor(props) {
        super(props);

        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

        this.state = {
            listViewData: data,
            newContact: ""
        }
    }
    //using firebase to push and delete item from list and update data to firebase realtime database
    componentDidMount() {
        var that = this
        firebase.database().ref('/orders').on('child_added', function (data) {
            //store data form listviewdata to newdata
           //then with adddata into newdata and update data to list view data
            var newData = [...that.state.listViewData]
            newData.push(data)
            that.setState({ listViewData: newData })
        })
    }

    //Add method
    addRow(data) {
        var key = firebase.database().ref('/orders').push().key
        firebase.database().ref('/orders').child(key).set({Order: data})
    }
    //Delete method
    async deleteRow(secId, rowId, rowMap, data) {
        await firebase.database().ref('orders/' + data.key).set(null)

        rowMap['${ secId } ${ rowId }'].props.closeRow();
        var newData = [...this.state.listViewData];
        newData.splice(rowId, 1)
        this.setState({ listViewData: newData });
    }
   
    render() {
        return (
            <Container style={styles.container}>
                <Header style={{ marginTop: StatusBar.currentHeight }}>
                    <Content>
                        <Item>
                            <Input
                                onChangeText={(newContact) => this.setState({ newContact })}
                                placeholder="Add order"
                            />
                            <Button onPress={() => this.addRow(this.state.newContact)}>
                                <Icon name="add"/>
                            </Button>
                        </Item>
                    </Content>
                </Header>
                <Content>
                    <List
                        enableEmptySections
                        dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                        renderRow={data =>
                            <ListItem>
                                <Text>
                                    {data.val().Order}
                                </Text>
                            </ListItem>
                        }
                        //for right button using delete
                        renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                          
                            <Button full danger onPress={() => this.deleteRow(secId,rowId,rowMap,data)}>
                            <Icon name="trash" />
                        </Button>
                    }
                    //Display size button
                    rightOpenValue={-75}
                    />
                </Content>
            </Container>
            );
    }
}


//some type for container
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#c5d1e5',
    }
});