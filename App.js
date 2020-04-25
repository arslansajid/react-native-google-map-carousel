import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Carousel from "react-native-snap-carousel";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default class App extends Component {
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
      markers: [
        { id: 0, title: "Card 1", LatLng: { latitude: 37.78825, longitude: -122.4324 } },
        { id: 1, title: "Card 2", LatLng: { latitude: 37.77825, longitude: -122.4424 } },
        { id: 2, title: "Card 3", LatLng: { latitude: 37.76825, longitude: -122.4524 } },
        { id: 3, title: "Card 4", LatLng: { latitude: 37.75825, longitude: -122.4624 } },
        { id: 4, title: "Card 4", LatLng: { latitude: 37.74825, longitude: -122.4724 } }
      ]
    };
  }
  renderCarouselItem = (value, index) => (
    <View
      key={(index, value.item.title)}
      style={{
        backgroundColor: "#fff",
        borderColor: "#000",
        borderWidth: 1,
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center",
        height: "100%"
      }}
    >
      <Text>Title: {value.item.title}</Text>
      <Text>Latitude: {value.item.LatLng.latitude}</Text>
      <Text>Longitude: {value.item.LatLng.longitude}</Text>
    </View>
  );

  goToCarosuelItem = index => {
    if (this.carouselRef && index !== null) this.carouselRef.snapToItem(index);
  };

  selectMarker = id => {
    this.mapViewRef.animateToRegion(
      {
        latitude: parseFloat(this.state.markers[id].LatLng.latitude),
        longitude: parseFloat(this.state.markers[id].LatLng.longitude),
        latitudeDelta: 0.0122,
        longitudeDelta: 0.0121
      },
      500
    );
  };

  selectItem = id => {
    this.setState(prevstate => {
        if (prevstate.selectedId != id) {
          return { selectedId: id };
        }
        return null;
      }, () => {
        this.goToCarosuelItem(id);
        this.selectMarker(id);
      }
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <MapView
          ref={ref => {
            this.mapViewRef = ref;
          }}
          // provider={MapView.PROVIDER_GOOGLE}
          initialRegion={this.state.initialRegion}
          style={styles.mapStyle}
        >
          {this.state.markers.map((value, index) => (
            <Marker
              key={index + value.title}
              coordinate={value.LatLng}
              stopPropagation={true}
              onPress={e => {
                e.stopPropagation();
                this.selectItem(value.id);
              }}
            >
              <View
                key={index + value.title + "inner"}
                style={{
                  width: 50,
                  height: 30,
                  backgroundColor: this.state.selectedId === value.id ? "red" : "#fff",
                  borderColor: this.state.selectedId === value.id ? "#fff" : "#000",
                  borderWidth: 1,
                  borderRadius: 4,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text style={{ color: this.state.selectedId === value.id ? "#fff" : "#000" }}>{value.title}</Text>
              </View>
            </Marker>
          ))}
        </MapView>
        <View style={{ position: "absolute", flex: 1, width: "100%", height: 100, zIndex: 1, bottom: 25, overflow: "hidden" }}>
          <Carousel
            ref={ref => {
              this.carouselRef = ref;
            }}
            data={this.state.markers}
            renderItem={this.renderCarouselItem}
            sliderWidth={SCREEN_WIDTH}
            itemWidth={SCREEN_WIDTH - 25}
            useScrollView={false}
            removeClippedSubviews={false} // https://github.com/archriss/react-native-snap-carousel/issues/238, see description of method triggerRenderingHack() on githubb docs. setting false addreses issue where carosuel is not visible on first render.
            onSnapToItem={index => {
              // console.log("carousel onSnapToItem: ", index);
              this.selectItem(index);
            }}
          />
        </View>
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
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  },
});
