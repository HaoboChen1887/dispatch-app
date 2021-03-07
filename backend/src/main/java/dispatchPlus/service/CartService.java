package dispatchPlus.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dispatchPlus.dao.CartDao;
import dispatchPlus.entity.Cart;

@Service
public class CartService {

    @Autowired
    private CartDao cartDao;

    public Cart getCartById(int cartId) {
        return cartDao.getCartById(cartId);
    }

    public void updateCart(Cart cart) {
        try {
            cartDao.validate(cart.getId());
        }catch (Exception e) {
            e.printStackTrace();
        }
    }
}