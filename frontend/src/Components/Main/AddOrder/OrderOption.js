import React, {Component} from 'react';
import Map from './Map';
import { Radio, Input, Button, Spin } from "antd";
import { STATION_LIST, ROBOT_BASE_COST, ROBOT_ACCU_COST, DRONE_BASE_COST, DRONE_ACCU_COST, METER_TO_MILE } from "./constants";
import { LoadingOutlined } from '@ant-design/icons';
import axios from "axios";
// import moment from 'moment';

const google = window.google;

class OrderOption extends Component {
  constructor() {
    super();
    this.state = {
      option: 2,
      start: null,
      stationList: [],
      dest: null,
      droneRouteIdx: 0,
      robotRouteIdx: 0,
      dronePrice: null,
      robotPrice: null,
      droneDistance: 0,
      robotDistance: 0,
      robotStationToDest: [],
      robotStationToStart: [],
      robotStartToDest: [],
      droneStationToDest: [],
      droneStationToStart: [],
      droneStartToDest: [],
    }
  }

  onRef = (ref) => {
    this.child = ref
  }



  setLocations = () => {
    const geocoder = new google.maps.Geocoder();
    const stationList = [];
    const { orderInfo } = this.props;
    return geocoder.geocode({ address: orderInfo.startAddress }, (results, status) => {
      if (status === "OK") {
        const start = {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng()
        }

        this.setState(preState => ({
          ...preState,
          start: start,
        }), this.calcDist);
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    })
      .then(() =>
        geocoder.geocode({ address: orderInfo.destAddress }, (results, status) => {
          if (status === "OK") {
            const dest = {
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng()
            }
            this.setState(preState => ({
              ...preState,
              dest: dest,
            }), this.calcDist);
          } else {
            alert("Geocode was not successful for the following reason: " + status);
          }
        })
      )
      .then(() => {
        const promises = [];
        for (let i = 0; i < STATION_LIST.length; i++) {
          let address = STATION_LIST[i];

          promises.push(geocoder.geocode({ address: address }, (results, status) => {
            if (status === "OK") {
              stationList.push({
                lat: results[0].geometry.location.lat(),
                lng: results[0].geometry.location.lng()
              });
              this.setState(preState => ({
                ...preState,
                stationList: stationList,
              }), this.calcDist);
            } else {
              alert("Geocode was not successful for the following reason: " + status);
            }
          }));
        }
        return Promise.all(promises);
      }
    )
  }

  calcPrice = (dist, option) => {
    dist /= METER_TO_MILE;
    if (option === "robot") {
      return Math.round((ROBOT_BASE_COST + dist * ROBOT_ACCU_COST) * 100) / 100;
    } else {
      return Math.round((DRONE_BASE_COST + dist * DRONE_ACCU_COST) * 100) / 100;
    }
  }

  calcDirectDist = (lat1, lng1, lat2, lng2) => {
    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI/180; // φ, λ in radians
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lng2-lng1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d = R * c; // in metres
    return d;
  }

  getBestDroneDist = () => {
    const { droneStationToStart, droneStationToDest, droneStartToDest } = this.state;
    if ( droneStationToStart.length === STATION_LIST.length
      && droneStationToDest.length === STATION_LIST.length
      && droneStartToDest.length === 1 ) {
      let minIdx = 0;
      for (let i = 1; i < droneStationToDest.length; i++) {
        let sum = droneStationToDest[i] + droneStationToStart[i];
        if (sum < droneStationToStart[minIdx] + droneStationToDest[minIdx]) {
          minIdx = i;
        }
      }
      this.setState(preState => ({
        ...preState,
        droneRouteIdx: minIdx,
        dronePrice: this.calcPrice(droneStartToDest[0] + droneStationToStart[minIdx] + droneStationToDest[minIdx], "drone"),
        droneDistance: droneStartToDest[0] + droneStationToStart[minIdx] + droneStationToDest[minIdx]
      }))
    }
  }

  calcDroneDist = () => {
    const {start, dest, stationList} = this.state;
    const droneStationToStart = [];
    const droneStationToDest = [];
    const droneStartToDest = [];
    for (let i = 0; i < stationList.length; i++) {
      let station = stationList[i];
      droneStationToStart.push(this.calcDirectDist(start.lat, start.lng, station.lat, station.lng));
      droneStationToDest.push(this.calcDirectDist(dest.lat, dest.lng, station.lat, station.lng));
    }
    droneStartToDest.push(this.calcDirectDist(start.lat, start.lng, dest.lat, dest.lng));
    this.setState(preState => ({
      ...preState,
      droneStartToDest: droneStartToDest,
      droneStationToStart: droneStationToStart,
      droneStationToDest: droneStationToDest
    }), this.getBestDroneDist);
  }

  getBestRobotDist = () => {
    const { robotStationToStart, robotStationToDest, robotStartToDest } = this.state;
    if ( robotStationToStart.length === STATION_LIST.length
      && robotStationToDest.length === STATION_LIST.length
      && robotStartToDest.length === 1 ) {
      let minIdx = 0;
      for (let i = 1; i < robotStationToDest.length; i++) {
        let sum = robotStationToDest[i] + robotStationToStart[i];
        if (sum < robotStationToStart[minIdx] + robotStationToDest[minIdx]) {
          minIdx = i;
        }
      }
      this.setState(preState => ({
        ...preState,
        robotRouteIdx: minIdx,
        robotPrice: this.calcPrice(robotStartToDest[0] + robotStationToStart[minIdx] + robotStationToDest[minIdx], "robot"),
        robotDistance: robotStartToDest[0] + robotStationToStart[minIdx] + robotStationToDest[minIdx]
      }))
    }
  }

  calcDist = () => {
    const { start, dest, stationList } = this.state;
    if (start && dest && stationList.length == STATION_LIST.length) {
      this.calcRobotDist();
      this.calcDroneDist();
    }
  }

  calcRobotDist = () => {
    const { start, dest, stationList } = this.state;
    console.log("ready to calc");
    const service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix({
      origins: [start],
      destinations: stationList,
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.IMPERIAL,
      avoidHighways: true
    }, (response, status) => {
      if (status !== "OK") {
        alert("Error was: " + status);
      } else {
        this.setState(preState => ({
          ...preState,
          robotStationToStart: response.rows[0].elements.map(x => x.distance.value)
        }), this.getBestRobotDist)
      }
    })
      .then(() => service.getDistanceMatrix({
          origins: [dest],
          destinations: stationList,
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.IMPERIAL,
          avoidHighways: true
        }, (response, status) => {
          if (status !== "OK") {
            alert("Error was: " + status);
          } else {
            this.setState(preState => ({
              ...preState,
              robotStationToDest: response.rows[0].elements.map(x => x.distance.value)
            }), this.getBestRobotDist)
          }
        })
      )
      .then(() => service.getDistanceMatrix({
          origins: [start],
          destinations: [dest],
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.IMPERIAL,
          avoidHighways: true
        }, (response, status) => {
          if (status !== "OK") {
            alert("Error was: " + status);
          } else {
            this.setState(preState => ({
              ...preState,
              robotStartToDest: response.rows[0].elements.map(x => x.distance.value)
            }), this.getBestRobotDist)
          }
        })
      )
  }

  componentDidMount() {
    this.setLocations()
  }

  onChange = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      option: e.target.value,
    });
    this.child.setState({
      option: e.target.value,
    });
  };

  dateToString = (d) => {
    let year = d.getFullYear();
    let month = (d.getMonth()+1);
    if (month < 10) {
      month = '0' + month;
      console.log("month = ", month);
    }
    let day = d.getDate();
    if (day < 10) {
      day = '0' + day;
    }
    let hour = d.getHours();
    if (hour < 10) {
      hour = '0' + hour;
    }
    let minute = d.getMinutes();
    if (minute < 10) {
      minute = '0' + minute;
    }
    let second = d.getSeconds();
    if (second < 10) {
      second = '0' + second;
    }
    const s =  year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    return s;
  }
  // step back function
  stepBack = () => {
    this.setState((preState) => ({step: preState.step - 1}));
  }

  handleConfirm = () => {
    const {option, droneRouteIdx, robotRouteIdx, robotStationToDest, robotStationToStart,
      robotStartToDest, droneStationToDest, droneStationToStart, droneStartToDest} = this.state;
    const cur = new Date();
    const d1 = option === 1 ? droneStationToStart[droneRouteIdx] : robotStationToStart[robotRouteIdx];
    const d2 = option === 1 ? droneStartToDest[0] : robotStartToDest[0];
    const d3 = option === 1 ? droneStationToDest[droneRouteIdx] : robotStationToDest[robotRouteIdx];
    const departTime = new Date(cur.setMinutes(cur.getMinutes() + 5));
    const pickupTime = new Date(departTime.getTime() + d1 * 600);
    const deliverytime = new Date(pickupTime.getTime() + d2 * 600);
    const arriveTime = new Date(deliverytime.getTime() + d3 * 600);

    const info = {
      'status': 0,
      'departureTime': this.dateToString(departTime),
      'pickUpTime': this.dateToString(pickupTime),
      'deliveryTime': this.dateToString(deliverytime),
      'arriveTime': this.dateToString(arriveTime),
      'pickUpAddress': this.props.orderInfo.startAddress,
      'deliveryAddress': this.props.orderInfo.destAddress,
      'price': this.state.order === 1 ? this.state.dronePrice : this.state.robotPrice,
      'deviceType': this.state.order - 1,
      'description': this.props.orderInfo.description
    }

    console.log(this.state);
    console.log(info);

    axios.post('/dispatchPlus/add_order', info,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then((response) => {
        console.log(response);
        if (response.status != 201) throw Error(response.statusText);
        return response.data;
      })
      .then((data) => {
        this.props.changeID(data.id);
        this.props.onNextStep("OrderConfirm");
      })
      .catch((error) => console.log(error));
  }

  render() {
    const droneable = (this.props.orderInfo["weight"] < 10);
    const { start, dest, option, stationList, robotRouteIdx, droneRouteIdx, robotPrice, dronePrice } = this.state;
    console.log(this.state);
    return (
      <div>
        { start && dest && stationList.length === STATION_LIST.length ?
          <div className="map">
            <Map
              onRef={this.onRef}
              option={ option }
              start={ start }
              stationList={ stationList }
              robotRouteIdx={ robotRouteIdx }
              droneRouteIdx={ droneRouteIdx }
              dest={ dest }
            />
          </div>
          :
          <Spin indicator={ <LoadingOutlined style={{ fontSize: 50 }} spin /> } />
        }
        { robotPrice && dronePrice &&
          <div className="option-radio">
            <Radio.Group onChange={this.onChange} value={this.state.option}>
              <Radio className="drone-robot-option" value={1} disabled={!droneable}>
                Drone ${ dronePrice }
              </Radio>
              <Radio className="drone-robot-option" value={2}>
                Robot ${ robotPrice }
              </Radio>
            </Radio.Group>
            <Button
              className="confirm-button"
              htmlType="submit"
              onClick={this.handleConfirm}
            >
              Confirm
            </Button>
          </div>
        }
      </div>
    );
  }
}

export default OrderOption;