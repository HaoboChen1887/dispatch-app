package dispatchPlus.dao;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import dispatchPlus.entity.Station;

import javax.persistence.criteria.CriteriaQuery;

@Repository
public class StationDao {

    @Autowired
    private SessionFactory sessionFactory;

    public void addStation(Station station) {
        Session session = null;
        try {
            session = sessionFactory.openSession();
            session.beginTransaction();
            session.save(station);
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

    public void deleteStation(int stationId) {
        Session session = null;
        try {
            session = sessionFactory.openSession();
            session.beginTransaction();
            Station station = session.get(Station.class, stationId);
            session.delete(station);
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

    public void updateStation(Station station) {
        Session session = null;
        try {
            session = sessionFactory.openSession();
            session.beginTransaction();
            session.saveOrUpdate(station);
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

    public Station getStationById(int stationId) {
        try (Session session = sessionFactory.openSession()) {
            return session.get(Station.class, stationId);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public List<Station> getAllStationsDetail() {
        List<Station> stations = new ArrayList<>();
        try (Session session = sessionFactory.openSession()) {
            // create Criteria
            CriteriaQuery<Station> criteriaQuery = session.getCriteriaBuilder().createQuery(Station.class);
            criteriaQuery.from(Station.class);

            stations = session.createQuery(criteriaQuery).getResultList();
            //stations = session.createCriteria(Station.class).list();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return stations;
    }
}