package dispatchPlus.controller;

import dispatchPlus.entity.AddDeviceRequestBody;
import dispatchPlus.entity.Device;
import dispatchPlus.entity.Station;
import dispatchPlus.service.DeviceService;
import dispatchPlus.service.StationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class DeviceController {

    @Autowired
    private DeviceService deviceService;
    @Autowired
    private StationService stationService;

    @RequestMapping(value = "/get_device_by_id", method = RequestMethod.GET)
    public Device getDeviceById(@RequestParam(value = "device_id") int deviceId) {
        Device device = deviceService.getDeviceById(deviceId);
        return device;
    }

    @RequestMapping(value = "/admin/add_device", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.CREATED)
    public void addDevice(@RequestBody AddDeviceRequestBody body) {
        Station station = stationService.getStationById(body.getStationId());
        Device device = new Device();
        device.setType(body.getType());
        device.setStatus(body.getStatus());
        device.setStation(station);
        deviceService.addDevice(device);
        return;
    }

    @RequestMapping(value = "/admin/delete_device", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void deleteDevice(@RequestParam(value = "device_id") int deviceId) {
        deviceService.deleteDevice(deviceId);
        return;
    }

    @RequestMapping(value = "/admin/edit_device", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void editDevice(@RequestBody Device device,
                            @RequestParam(value = "device_id") int deviceId) {
        device.setId(deviceId);
        deviceService.updateDevice(device);
        return;
    }
}