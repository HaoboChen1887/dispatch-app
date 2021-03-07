package dispatchPlus.service;

import dispatchPlus.dao.DeviceDao;
import dispatchPlus.entity.Device;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeviceService {

    @Autowired
    private DeviceDao deviceDao;

    public List<Device> getAllDevices() {
        return deviceDao.getAllDevices();
    }

    public Device getDeviceById(int deviceId) {
        return deviceDao.getDeviceById(deviceId);
    }

    public void deleteDevice(int deviceId) {
        deviceDao.deleteDevice(deviceId);
    }

    public void addDevice(Device device) {
        deviceDao.addDevice(device);
    }

    public void updateDevice(Device device) {
        deviceDao.updateDevice(device);
    }
}