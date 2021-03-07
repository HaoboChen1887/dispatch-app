package dispatchPlus.controller;

import dispatchPlus.entity.Device;
import dispatchPlus.entity.StationSummary;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


import dispatchPlus.entity.Station;
import dispatchPlus.service.StationService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

@RestController
public class StationController {

    @Autowired
    private StationService stationService;

    @RequestMapping(value = "/get_all_stations", method = RequestMethod.GET)
    public List<StationSummary> getAllStations() {
        List<Station> stations = stationService.getAllStationsDetail();
        List<StationSummary> result = new ArrayList<>();
        for (Station station : stations) {
            StationSummary stationSummary = new StationSummary();
            stationSummary.setId(station.getId());
            stationSummary.setAddress(station.getAddress());
            List<Device> devices = station.getDevices();
            int numOfRoadRobots = 0;
            int numOfDrones = 0;
            for (Device device : devices) {
                if (device.getStatus() == 0) {
                    if (device.getType() == 0) {
                        numOfRoadRobots++;
                    }
                    else {
                        numOfDrones++;
                    }
                }
            }
            stationSummary.setNumOfRoadRobots(numOfRoadRobots);
            stationSummary.setNumOfDrones(numOfDrones);
            result.add(stationSummary);
        }
        return result;
    }

    @RequestMapping(value = "/get_all_stations_detail", method = RequestMethod.GET)
    public List<Station> getAllStationsDetail() {
        List<Station> stations = stationService.getAllStationsDetail();
        return stations;
    }

    @RequestMapping(value = "/get_station_by_id", method = RequestMethod.GET)
    public Station getStationById(@RequestParam(value = "station_id") int stationId) {
        Station station = stationService.getStationById(stationId);
        return station;
    }

    @RequestMapping(value = "/admin/add_station", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.CREATED)
    public void addStation(@RequestBody Station station) {
        stationService.addStation(station);
        return;
    }

    @RequestMapping(value = "/admin/delete_station", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void deleteStation(@RequestParam(value = "station_id") int stationId) {
        stationService.deleteStation(stationId);
        return;
    }

    @RequestMapping(value = "/admin/edit_station", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void editStation(@RequestBody Station station,
                              @RequestParam(value = "station_id") int stationId) {
        station.setId(stationId);
        stationService.updateStation(station);
        return;
    }
}