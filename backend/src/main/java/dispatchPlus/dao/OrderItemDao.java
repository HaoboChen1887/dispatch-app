package dispatchPlus.dao;

import java.util.List;

import dispatchPlus.entity.Device;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import dispatchPlus.entity.Cart;
import dispatchPlus.entity.OrderItem;

@Repository
public class OrderItemDao {
    @Autowired
    private SessionFactory sessionFactory;

    public void updateOrderItem(OrderItem orderItem) {
        Session session = null;
        try {
            session = sessionFactory.openSession();
            session.beginTransaction();
            session.saveOrUpdate(orderItem);
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
    public OrderItem getOrderItemById(int orderItemId) {
        OrderItem orderItem = null;
        try (Session session = sessionFactory.openSession()) {
            orderItem = session.get(OrderItem.class, orderItemId);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return orderItem;
    }

    public void addCartItem(OrderItem orderItem) {
        Session session = null;
        try {
            session = sessionFactory.openSession();
            session.beginTransaction();
            session.saveOrUpdate(orderItem);
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

    public void removeCartItem(int orderItemId) {
        Session session = null;
        try {
            session = sessionFactory.openSession();
            OrderItem orderItem = session.get(OrderItem.class, orderItemId);
            Cart cart = orderItem.getCart();
            List<OrderItem> orderItems = cart.getOrderItems();
            orderItems.remove(orderItem);
            session.beginTransaction();
            session.delete(orderItem);
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

    public void removeAllCartItems(Cart cart) {
        List<OrderItem> orderItems = cart.getOrderItems();
        for (OrderItem orderItem : orderItems) {
            removeCartItem(orderItem.getId());
        }
    }
}