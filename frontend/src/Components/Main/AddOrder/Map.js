import React from 'react';
import { compose, withProps, lifecycle } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer, Polyline } from "react-google-maps";
import { ICON_BASE, MAP_API_KEY } from "./constants";
import stationPin from "../../Images/station_pin.png"
import targetPin from "../../Images/target_pin.png"
import startPin from "../../Images/start_pin.png"

//import axios from 'axios';
//import GoogleMapReact from 'google-map-react';
//import Marker from "./Marker";
const google = window.google;

const Map = compose(
  withProps({
    option: 2,
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${MAP_API_KEY}`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `800px`}} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      const { start, dest, stationList, option, robotRouteIdx, droneRouteIdx } = this.props;
      this.props.onRef(this);
      this.setState(preState => ({
        option: option,
        path: [
          stationList[droneRouteIdx],
          start,
          dest,
          stationList[droneRouteIdx]
        ]
      }));

      const DirectionsService = new google.maps.DirectionsService();
      DirectionsService.route({
        origin: new google.maps.LatLng(stationList[robotRouteIdx].lat, stationList[robotRouteIdx].lng),
        destination: new google.maps.LatLng(stationList[robotRouteIdx].lat, stationList[robotRouteIdx].lng),
        waypoints: [{location: new google.maps.LatLng(start.lat, start.lng)}, {location: new google.maps.LatLng(dest.lat, dest.lng)}],
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING,
        avoidHighways: true
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState(preState => ({
            ...preState,
            direction: result,
          }));
        } else {
          console.error(`error fetching directions ${result}`);
        }
      });
    }
  })
)((props) => {
  const { start, dest, direction, path, option, stationList } = props;
  console.log("in Map", props);
  const stationMarkers = [];
  let count = 0;
  const stationMarker = {
    url: stationPin,
    scaledSize: new google.maps.Size(25, 43),
  };
  const startMarker = {
    url: startPin,
    scaledSize: new google.maps.Size(25, 43),
  };
  const targetMarker = {
    url: targetPin,
    scaledSize: new google.maps.Size(25, 43),
  };
  stationList.forEach(function(station){
    stationMarkers.push(<Marker key={count} position={{ lat:station.lat, lng:station.lng }} icon={stationMarker}/>);
    count++;
  })
  return (
    <GoogleMap
      defaultZoom={13}
      defaultCenter={{ lat: start.lat, lng: start.lng }}
      defaultOptions={{styles: [{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#d6e2e6"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#cfd4d5"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#7492a8"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text.fill","stylers":[{"lightness":25}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#dde2e3"}]},{"featureType":"landscape.man_made","elementType":"geometry.stroke","stylers":[{"color":"#cfd4d5"}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"color":"#dde2e3"}]},{"featureType":"landscape.natural","elementType":"labels.text.fill","stylers":[{"color":"#7492a8"}]},{"featureType":"landscape.natural.terrain","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#dde2e3"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#588ca4"}]},{"featureType":"poi","elementType":"labels.icon","stylers":[{"saturation":-100}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#a9de83"}]},{"featureType":"poi.park","elementType":"geometry.stroke","stylers":[{"color":"#bae6a1"}]},{"featureType":"poi.sports_complex","elementType":"geometry.fill","stylers":[{"color":"#c6e8b3"}]},{"featureType":"poi.sports_complex","elementType":"geometry.stroke","stylers":[{"color":"#bae6a1"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#41626b"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"saturation":-45},{"lightness":10},{"visibility":"on"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#c1d1d6"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#a6b5bb"}]},{"featureType":"road.highway","elementType":"labels.icon","stylers":[{"visibility":"on"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry.fill","stylers":[{"color":"#9fb6bd"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"transit","elementType":"labels.icon","stylers":[{"saturation":-70}]},{"featureType":"transit.line","elementType":"geometry.fill","stylers":[{"color":"#b4cbd4"}]},{"featureType":"transit.line","elementType":"labels.text.fill","stylers":[{"color":"#588ca4"}]},{"featureType":"transit.station","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"transit.station","elementType":"labels.text.fill","stylers":[{"color":"#008cb5"},{"visibility":"on"}]},{"featureType":"transit.station.airport","elementType":"geometry.fill","stylers":[{"saturation":-100},{"lightness":-5}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#a6cbe3"}]}]}}
//      defaultOptions={{ styles: [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"administrative","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"landscape","elementType":"all","stylers":[{"visibility":"simplified"},{"hue":"#0066ff"},{"saturation":74},{"lightness":100}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"off"},{"weight":0.6},{"saturation":-85},{"lightness":61}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"simplified"},{"color":"#5f94ff"},{"lightness":26},{"gamma":5.86}]}] }}
    >
      <Marker className="pin" position={{ lat: start.lat, lng: start.lng }} icon={startMarker}/>
      { stationMarkers }
      <Marker className="pin" position={{ lat: dest.lat, lng: dest.lng }} icon={targetMarker}/>
      { option === 2 ? (direction &&
        <DirectionsRenderer directions={ direction } options={{suppressMarkers: true}}/>)
        :
        (path && <Polyline
          path={path}
          options={{
            geodesic: true,
            strokeColor: "#82c851",
            strokeOpacity: 0.7,
            strokeWeight: 6,
          }}
        />)}
    </GoogleMap>
  )
})

export default Map;