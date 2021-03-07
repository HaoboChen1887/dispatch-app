package dispatchPlus.dao;

import dispatchPlus.entity.Device;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class DeviceDao {

    @Autowired
    private SessionFactory sessionFactory;

    public void addDevice(Device device) {
        Session session = null;
        try {
            session = sessionFactory.openSession();
            session.beginTransaction();
            session.save(device);
            session.getTransaction().commit();
        } catch (Exception e) {
            e.printStackTrace();
            session.getTransaction().rollback();
        } finally {
            if (session != null) {
                session.close();
            }
        }
    }

    public void deleteDevice(int deviceId) {
        Session session = null;
        try {
            session = sessionFactory.openSession();
            session.beginTransaction();
            Device device = session.get(Device.class, deviceId);
            session.delete(device);
            session.getTransaction().commit();
        } catch (Exception e) {
            e.printStackTrace();
            session.getTransaction().rollback();
        } finally {
            if (session != null) {
                session.close();
            }
        }

    }

    public void updateDevice(Device device) {
        Session session = null;
        try {
            session = sessionFactory.openSession();
            session.beginTransaction();
            session.saveOrUpdate(device);
            session.getTransaction().commit();
        } catch (Exception e) {
            e.printStackTrace();
            session.getTransaction().rollback();
        } finally {
            if (session != null) {
                session.close();
            }
        }
    }

    public Device getDeviceById(int deviceId) {
        try (Session session = sessionFactory.openSession()) {
            return session.get(Device.class, deviceId);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public List<Device> getAllDevices() {
        List<Device> devices = new ArrayList<>();
        try (Session session = sessionFactory.openSession()) {
            devices = session.createCriteria(Device.class).list();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return devices;
    }
}