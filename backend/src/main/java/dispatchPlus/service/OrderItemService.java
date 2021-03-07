package dispatchPlus.service;

import dispatchPlus.entity.Device;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dispatchPlus.dao.OrderItemDao;
import dispatchPlus.entity.Cart;
import dispatchPlus.entity.OrderItem;

@Service
public class OrderItemService {

    @Autowired
    private OrderItemDao orderItemDao;

    public void updateOrderItem(OrderItem orderItem) {
        orderItemDao.updateOrderItem(orderItem);
    }

    public OrderItem getOrderItemById(int cartId) {
        return orderItemDao.getOrderItemById(cartId);
    }

    public void addCartItem(OrderItem orderItem) {
        orderItemDao.addCartItem(orderItem);
    }

    public void removeCartItem(int orderItemId) {
        orderItemDao.removeCartItem(orderItemId);
    }

    public void removeAllCartItems(Cart cart) {
        orderItemDao.removeAllCartItems(cart);
    }
}