package dispatchPlus.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "Devices")
public class Device implements Serializable {
    private static final long serialVersionUID = -6315855865631032458L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private int type; // 0: road robot; 1: drone

    private int status; // 0: idle; 1: reserved;

    @ManyToOne
    @JsonIgnore
    private Station station;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

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

    public Station getStation() {
        return station;
    }

    public void setStation(Station station) {
        this.station = station;
    }

}
