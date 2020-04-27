import React, { Component } from "react";
import { Text, View, Dimensions } from "react-native";
import PropTypes from "prop-types";
import MapView, { Marker } from "react-native-maps";
import Carousel from "react-native-snap-carousel";
const SCREEN_WIDTH = Dimensions.get("window").width;
import styles from "./styles";

class App extends Component {
  constructor() {
    super();
    this.state = {
      selectedId: 0,
    };
  }
  renderCarouselItem = (value, index) => (
    this.props.cardItem ? (
      <View
        style={[{
          backgroundColor: "#fff",
          borderColor: "#000",
          borderWidth: 1,
          borderRadius: 4,
          justifyContent: "center",
          alignItems: "center",
          height: "100%"
        }, !!this.props.contentContainerCustomStyle ? this.props.contentContainerCustomStyle : {}]}
      >
        {this.props.cardItem(value, index)}
      </View>
    )
      :
      <View
        key={(index, value.item.title)}
        style={[{
          backgroundColor: "#fff",
          borderColor: "#000",
          borderWidth: 1,
          borderRadius: 4,
          justifyContent: "center",
          alignItems: "center",
          height: "100%"
        }, !!this.props.contentContainerCustomStyle ? this.props.contentContainerCustomStyle : {}]}
      >
        <Text>Title: {value.item.title}</Text>
        <Text>Latitude: {value.item.LatLng.latitude}</Text>
        <Text>Longitude: {value.item.LatLng.longitude}</Text>
      </View>
  );

  goToCarosuelItem = index => {
    if (this.carouselRef && index !== null) {
      this.carouselRef.snapToItem(index);
    }
  };

  selectMarker = id => {
    this.mapViewRef.animateToRegion(
      {
        latitude: parseFloat(this.props.items[id].LatLng.latitude),
        longitude: parseFloat(this.props.items[id].LatLng.longitude),
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
    const { initialRegion, items, marker, autoPlay, firstItem, layout, containerCustomStyle, contentContainerCustomStyle } = this.props;
    return (
      <View style={styles.container}>
        <MapView
          ref={ref => {
            this.mapViewRef = ref;
          }}
          // provider={MapView.PROVIDER_GOOGLE}
          initialRegion={initialRegion}
          style={styles.mapStyle}
        >
          {items.map((value, index) => (
            <Marker
              key={index + value.title}
              coordinate={value.LatLng}
              stopPropagation={true}
              onPress={e => {
                e.stopPropagation();
                this.selectItem(value.id);
              }}
            >
              {
                !!marker
                  ?
                  <View
                    key={index + value.title + "inner"}>
                    {marker}
                  </View>
                  :
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
              }
            </Marker>
          ))}
        </MapView>
        <View style={{ position: "absolute", flex: 1, width: "100%", height: 100, zIndex: 1, bottom: 25, overflow: "hidden" }}>
          <Carousel
            ref={ref => {
              this.carouselRef = ref;
            }}
            containerCustomStyle={containerCustomStyle}
            layout={layout}
            autoplay={autoPlay}
            firstItem={firstItem - 1}
            data={items}
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

App.propTypes = {
  initialRegion: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  marker: PropTypes.node,
  cardItem: PropTypes.func,
  layout: PropTypes.oneOf(["default", "stack", "tinder"]),
  autoPlay: PropTypes.bool,
  firstItem: PropTypes.number,
  contentContainerCustomStyle: PropTypes.object,
  containerCustomStyle: PropTypes.object,
};

App.defaultProps = {
  autoPlay: false,
  firstItem: 0,
  layout: "default",
  containerCustomStyle: {}
};

export default App;