package dispatchPlus.entity;

public class AddDeviceRequestBody {
    private int type; // 0: road robot; 1: drone
    private int status; // 0: idle; 1: reserved; 2: scheduled
    private int stationId;

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public int getStationId() {
        return stationId;
    }

    public void setStationId(int stationId) {
        this.stationId = stationId;
    }
}
