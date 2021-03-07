package dispatchPlus.entity;

public class StationSummary {
    private int id;

    private String address;

    private int numOfRoadRobots;

    private int numOfDrones;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getNumOfRoadRobots() {
        return numOfRoadRobots;
    }

    public void setNumOfRoadRobots(int numOfRoadRobots) {
        this.numOfRoadRobots = numOfRoadRobots;
    }

    public int getNumOfDrones() {
        return numOfDrones;
    }

    public void setNumOfDrones(int numOfDrones) {
        this.numOfDrones = numOfDrones;
    }
}
