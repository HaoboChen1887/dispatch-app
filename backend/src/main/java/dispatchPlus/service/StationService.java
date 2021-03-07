package dispatchPlus.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dispatchPlus.dao.StationDao;
import dispatchPlus.entity.Station;

@Service
public class StationService {

    @Autowired
    private StationDao stationDao;

    public List<Station> getAllStationsDetail() {
        return stationDao.getAllStationsDetail();
    }

    public Station getStationById(int stationId) {
        return stationDao.getStationById(stationId);
    }

    public void deleteStation(int stationId) {
        stationDao.deleteStation(stationId);
    }

    public void addStation(Station station) {
        stationDao.addStation(station);
    }

    public void updateStation(Station station) {
        stationDao.updateStation(station);
    }
}