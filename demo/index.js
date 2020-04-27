import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import MapCarousel from "../App";

const Marker = () => (
        <View
            style={{
              width: 50,
              height: 30,
              backgroundColor: 'yellow',
              borderColor: 'green',
              borderWidth: 1,
              borderRadius: 4,
            }}
          >
          </View>
    )

class Demo extends Component {
    constructor() {
        super();
        this.state = {
            selectedId: 0,
            initialRegion: {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
              },
            items: [
                { id: 0, title: "Card 0", LatLng: { latitude: 37.78825, longitude: -122.4324 } },
                { id: 1, title: "Card 1", LatLng: { latitude: 37.77825, longitude: -122.4424 } },
                { id: 2, title: "Card 2", LatLng: { latitude: 37.76825, longitude: -122.4524 } },
                { id: 3, title: "Card 3", LatLng: { latitude: 37.75825, longitude: -122.4624 } },
                { id: 4, title: "Card 4", LatLng: { latitude: 37.74825, longitude: -122.4724 } }
            ]
        };
    }

    cardItem = (value, index) => {
        return (
            <View key={index} style={{flexDirection: "row"}}>
                <View style={{flex: 1}}>
                    <Text>Title: {value.item.title}</Text>
                </View>
                <View style={{flex: 1}}>
                    <Text>Latitude: {value.item.LatLng.latitude}</Text>
                    <Text>Longitude: {value.item.LatLng.longitude}</Text>
                </View>
            </View>
        )
    }

    render() {
        const {initialRegion, items} = this.state;
        return (
            <View style={styles.container}>
                <MapCarousel
                    initialRegion={initialRegion}
                    items={items}
                    marker={<Marker />}
                    autoPlay={false}
                    layout={"default"}
                    cardItem={this.cardItem}
                    // containerCustomStyle={{backgroundColor: "red"}}
                    // contentContainerCustomStyle={{backgroundColor: "green"}}
                    // firstItem={2}
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
});


export default Demo;